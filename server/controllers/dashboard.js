import mongoose from 'mongoose';
import AnnouncementForm from '../models/announce.js';
import InitialSetup from '../models/initialSetup.js';
import BookForm25 from '../models/book25.js';

// functions
import { formatDate } from '../utils/utils.js'

// fetch if there is an opening massage
export const getAnnouncement = async (req, res) => {
    console.log("Get Opening Announcement");

    const { id } = req.params;

    try {
        const announcement = await AnnouncementForm.findById(id);
        res.json(announcement)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// only 1 time needed, next we just update the existing announcement
export const createAnnouncement = async (req, res) => {
    console.log("Make new data place for an opening announcement")

    const { duration, message } = req.body;
    const announcement = await AnnouncementForm({timestamp: new Date(), duration, message})

    try {
        await announcement.save()
        res.status(201).json(announcement)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// edit he existing opening announcement
export const updateAnnouncement = async (req, res) => {
    console.log("Make (update) announcement")

    const { duration, message, status } = req.body;
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({title:"Error", message:"Harap buat announcement baru"})
        
    try {
        const announcement = await AnnouncementForm.findByIdAndUpdate(id, {duration, message, status, timestamp: new Date()}, {new: true});
        res.status(201).json(announcement)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// fetch initial setup
export const getInitialSetup = async (req, res) => {
    console.log("Get initial setup");

    const { id } = req.params;

    try {
        const setup = await InitialSetup.findById(id);
        res.json(setup)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// make initial setup
export const createInitialSetup = async (req, res) => {
    console.log("Make new Setup")
    console.log(req.body)

    const { max, maxbooking, shifts, schedules } = req.body;
    
    const initialSetup = await InitialSetup({ max, maxbooking, shifts, schedules: schedules })
    console.log(initialSetup)
    try {
        await initialSetup.save()
        console.log(newSetup)
        res.json(initialSetup)
        // res.status(201).json(initialSetup)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// edit he existing opening announcement
export const updateInitialSetup = async (req, res) => {
    console.log("Make (update) setup")

    const { max, maxbooking, shifts, schedules } = req.body;
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send({title:"Error", message:"Harap buat setup baru"})
        
    try {
        // const setup = await InitialSetup.findByIdAndUpdate(id, {max, maxbooking, shifts, schedules: schedule}, {new: true});
        const oldSetup = await InitialSetup.findById(id);
        console.log(req.body)
        oldSetup.max = max;
        oldSetup.maxbooking = maxbooking;
        oldSetup.shifts = shifts;
        console.log("change");
        
        for(let i = 0; i < schedules.length; i++){
            console.log("change", i)
            oldSetup.schedules[i].schedule = schedules[i].schedule;
            // oldSetup.schedules[i].schedule = changeArrofObject(oldSetup.schedules, schedules[i].schedule, i)
        }
        console.log("change");
        console.log(oldSetup)

        const newSetup = await InitialSetup.findByIdAndUpdate(id, oldSetup, {new: true})
        // console.log(newSetup)
        res.status(201).json(newSetup)
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// fetch customers data
export const getCustomers = async (req, res) => {
    console.log("Get customer");

    const { date: getDate } = req.params;
    let newDate = formatDate(getDate);

    try {
        const arr = await BookForm25.find({ $and: [{ bookingdate: { $gte: newDate} }, { available: true }] })

        res.json(arr)
    } catch (error) {
        res.status(409).json({ message: err.message });
    }
}