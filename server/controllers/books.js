import mongoose from 'mongoose';
import BookForm25 from '../models/book25.js';

// functions
import { formatDate } from '../utils/utils.js';

// open new date for booking
export const createBook = async (req, res) => {
    if(!req.userId) return res.json({ message: 'Unauthenticated' });
    console.log("req.body")
    console.log(req.body)

    const { creator, maxbooking, shifts } = req.body;
    const bookingdate = req.body.newdatebook;
    const max = req.body.capacitybook;
    const schedules = req.body.schedule;
    const shiftInfo = { quantity: shifts, schedules }

    const newBook = await BookForm25({bookingdate: new Date(bookingdate).toISOString(), max: max, maxbooking, shiftInfo, creator});
    console.log(newBook)
    try {
        await newBook.save()
        res.status(201).json(newBook)
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

// fetch all available dates for booking
export const getDates = async (req, res) => {
    console.log("Someone access the available date");

    const { date: availableDate } = req.params;
    let newDate = formatDate(availableDate);

    try {
        const arr = await BookForm25.find({ $and: [{ bookingdate: { $gte: newDate} }, { available: true }] })
        res.json(arr)
    } catch (error) {
        res.status(409).json({ message: err.message });
    }
}

// first step for booking, make an appointment and save it on the database list
export const makeAppointment = async (req, res) => {
    console.log("someone make an appoinment")
    
    const { name, cellphone, sessionbook, bookingcode } = req.body;
    const id = req.params.dateID;
    
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Tanggal tesebut belum terima booking")
    // if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({message:"Tanggal tesebut belum terima booking", type: "err_data"})
    
    const book = await BookForm25.findById(id);
    const maxBooking = book.maxbooking;

    // check apakah shift yang dipilih masih ada tempat atau tidak
    const capacityShift = `${sessionbook}Available`;
    if(book[capacityShift] == false){
        return res.json({message: "Jam ini sudah penuh", type: "err_data"})
    };

    //check apakah sudah booking 2x
    let count = 0;
    let shifts = ['shift1', 'shift2', 'shift3']

    for (let i = 0; i < shifts.length; i++){
        book[shifts[i]].map((item) => {
            if(item.cellphone == cellphone){
                count++
            }
        })
    }

    console.log("count:", count)
    if(count >= maxBooking){
        return res.json({message: `Maaf anda sudah booking ${maxBooking} kali. Booking anda tidak berhasil` , type: "err_data"})
    }

    book[sessionbook].push({name, cellphone, bookingcode, timestamp: new Date()});

    if(book[sessionbook].length >= book['max']){
        book[capacityShift] = false;
        if(book['shift1Available'] == false && book['shift2Available'] == false && book['shift3Available'] == false){
            book['available'] = false;
            console.log("full, close the date, at:", new Date())
        }
    }
    
    const updatedBook = await BookForm25.findByIdAndUpdate(id, book, {new: true});

    let bookingID; 
    updatedBook[sessionbook].map((booked) => {
        if(booked.bookingcode === bookingcode){
            bookingID = booked._id
        }
    })

    res.json(bookingID);
}

// second step for booking, get the data from the given bookID
export const getAppointment = async (req, res) => {
    console.log("get the appointment")

    const { dateID, bookID } = req.params;
    const { shiftquery } = req.query;
    let book, index;
    let newData = {}
    
    if(!mongoose.Types.ObjectId.isValid(dateID)) return res.status(404).send("Tanggal tesebut belum terima booking")

    const booksOnTheDate = await BookForm25.findById(dateID);


    booksOnTheDate[shiftquery].map((item, ind) => {
        if(item._id.toString() == bookID){
            book = item;
            index = ind;
        }
    })
    
    if(book){
        console.log(book)
        newData.name = book.name;
        newData.cellphone = book.cellphone;
        newData.bookingcode = book.bookingcode;
        newData.timestamp = book.timestamp;
        newData.bookingdate = booksOnTheDate.bookingdate;
        newData.shift = shiftquery;
        newData.index = index;
        newData.id = book._id;
    }
    
    res.json(newData);
}