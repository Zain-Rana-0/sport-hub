const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'club-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 
    }   
});

// POST route to create a new club
router.post('/create', upload.single('club_logo'), async (req, res) => {
    try {
        // Validate required fields
        const requiredFields = ['club_name', 'club_type', 'club_email', 'president_name', 'president_email'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    message: `${field} is required`
                });
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(req.body.club_email) || !emailRegex.test(req.body.president_email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Check if club already exists
        const existingClub = await Club.findOne({ club_email: req.body.club_email });
        if (existingClub) {
            return res.status(400).json({
                success: false,
                message: 'Club with this email already exists'
            });
        }

        // Create club object
        const clubData = {
            ...req.body,
            club_logo: req.file ? `/uploads/${req.file.filename}` : null,
            membership_fee: req.body.membership_fee ? Number(req.body.membership_fee) : 0
        };

        const club = new Club(clubData);
        await club.save();

        res.status(201).json({
            success: true,
            message: 'Club created successfully',
            data: club
        });

    } catch (error) {
        console.error('Club creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating club',
            error: error.message
        });
    }
});

// GET route to fetch all clubs
router.get('/', async (req, res) => {
    try {
        const clubs = await Club.find({});
        res.status(200).json({
            success: true,
            data: clubs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching clubs',
            error: error.message
        });
    }
});

module.exports = router;
