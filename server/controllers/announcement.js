import mongoose from 'mongoose';
import AnnouncementForm from '../models/announce.js';

// fetch if there is an opening massage
export const getAnnouncement = async (req, res) => {
    console.log("Get Opening Announcement");

    const { id } = req.params;

    try {
        const announcement = await AnnouncementForm.findById(id)
        res.json(announcement)
    } catch (error) {
        res.status(409).json({ message: err.message });
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
    } catch (err) {
        res.status(409).json({ message: err.message });
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
        res.status(409).json({ message: err.message });
    }
}