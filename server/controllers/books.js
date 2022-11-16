import mongoose from 'mongoose';
import BookForm25 from '../models/book25.js';

function formatDate(date){
    let d = new Date(date),
        month = '' + d.getMonth(),
        day = '' + d.getDate(),
        year = d.getFullYear();

    let monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    let newDate = [day, monthName[month], year].join(' ');
    return new Date(newDate)
}

// open new date for booking
export const createBook = async (req, res) => {
    const bookingdate = req.body.newdatebook;
    const max = req.body.capacitybook;

    const newBook = await BookForm25({bookingdate: new Date(bookingdate).toISOString(), max: max});
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
        
        if(arr.length < 1) return res.status(404).send({message: "Saat ini semua tanggal masih penuh"})
        res.json({ data: arr })
    } catch (error) {
        res.status(409).json({ message: err.message });
    }
}

// first step for booking, make an appointment and save it on the database list
export const makeAppointment = async (req, res) => {
    console.log("someone make an appoinment")
    
    const { name, cellphone, sessionbook, bookingcode } = req.body;
    const id = req.params.dateID;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({title:"Penuh", message:"Tanggal tesebut belum terima booking"})

    const book = await BookForm25.findById(id);
    book[sessionbook].push({name, cellphone, bookingcode, timestamp: new Date()});

    const capacityShift = `${sessionbook}Available`;
    if(book[capacityShift] == false) return res.status(404).send({message: "Jam ini sudah penuh"});

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
    console.log("get the appoinment")

    const { dateID, bookID } = req.params;
    const { shiftquery } = req.query;
    
    if(!mongoose.Types.ObjectId.isValid(dateID)) return res.status(404).send("Tanggal tesebut belum terima booking")

    const allBooksToSpecificDate = await BookForm25.findById(dateID);

    let book, index;
    let newData = {}

    allBooksToSpecificDate[shiftquery].map((item, ind) => {
        if(item._id.toString() == bookID){
            book = item;
            index = ind;
        }
    })
    
    
    if(book){
        newData.name = book.name;
        newData.cellphone = book.cellphone;
        newData.bookingcode = book.bookingcode;
        newData.timestamp = book.timestamp;
        newData.bookingdate = allBooksToSpecificDate.bookingdate;
        newData.shift = shiftquery;
        newData.index = index;
        newData.id = book._id;
    }
    
    res.json(newData);
}