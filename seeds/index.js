const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const User = require('../models/user');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

// Array of diverse campground images
const campgroundImages = [
    {
        url: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80',
        filename: 'YelpCamp/tent1'
    },
    {
        url: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1153&q=80',
        filename: 'YelpCamp/tent2'
    },
    {
        url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/camp1'
    },
    {
        url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/camp2'
    },
    {
        url: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/lake1'
    },
    {
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/mountain1'
    },
    {
        url: 'https://images.unsplash.com/photo-1510312305653-8ed496efcaf0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/forest1'
    },
    {
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/forest2'
    },
    {
        url: 'https://images.unsplash.com/photo-1472791108553-c9405341e398?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/sunset1'
    },
    {
        url: 'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/beach1'
    },
    {
        url: 'https://images.unsplash.com/photo-1518602164578-cd0074062767?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/fire1'
    },
    {
        url: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/river1'
    },
    {
        url: 'https://images.unsplash.com/photo-1480497490787-505ec076689f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1369&q=80',
        filename: 'YelpCamp/stars1'
    },
    {
        url: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80',
        filename: 'YelpCamp/desert1'
    },
    {
        url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        filename: 'YelpCamp/canyon1'
    },
    {
        url: 'https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
        filename: 'YelpCamp/woods1'
    }
];

// Array of realistic campground descriptions
const campgroundDescriptions = [
    "Experience the perfect blend of wilderness and comfort at this scenic campground. With hiking trails, fishing spots, and breathtaking views, it's an ideal retreat for nature lovers seeking adventure and tranquility.",
    "Nestled in pristine wilderness, this campground offers excellent facilities for families and outdoor enthusiasts. Enjoy stargazing, wildlife watching, and easy access to nearby attractions and recreational activities.",
    "A hidden gem surrounded by towering trees and crystal-clear waters. This peaceful campground provides the perfect escape from city life with well-maintained facilities and stunning natural beauty.",
    "Discover this amazing campground featuring spacious sites, clean amenities, and spectacular mountain views. Popular activities include hiking, fishing, and photography in this picturesque setting.",
    "This family-friendly campground offers a unique camping experience with modern conveniences and easy access to outdoor adventures. Perfect for creating lasting memories in nature's embrace.",
    "Located in the heart of natural beauty, this campground provides excellent opportunities for outdoor recreation. Enjoy peaceful surroundings, wildlife viewing, and unforgettable sunsets.",
    "A premier destination for camping enthusiasts, offering well-equipped sites and access to hiking trails, fishing spots, and scenic overlooks. Experience the beauty of untouched wilderness.",
    "Escape to this tranquil campground where adventure meets relaxation. With excellent facilities and stunning landscapes, it's perfect for both seasoned campers and beginners alike.",
    "This picturesque campground combines natural beauty with modern amenities. Enjoy hiking, swimming, and exploring the diverse ecosystem while staying in comfortable, well-maintained sites.",
    "Situated in a breathtaking natural setting, this campground offers the perfect basecamp for outdoor adventures. Experience incredible wildlife, scenic vistas, and peaceful camping under the stars.",
    "A spectacular camping destination featuring pristine natural surroundings and excellent recreational opportunities. Whether you're seeking adventure or relaxation, this campground delivers both.",
    "This charming campground offers an authentic outdoor experience with modern conveniences. Explore nearby trails, enjoy fishing, and create unforgettable memories in this beautiful wilderness setting.",
    "Nestled among ancient trees and rolling hills, this campground provides a perfect retreat for nature enthusiasts. Enjoy hiking, bird watching, and the serene atmosphere of untouched wilderness.",
    "Experience the magic of outdoor camping at this well-appointed campground. With access to recreational activities and stunning natural beauty, it's an ideal destination for outdoor adventurers.",
    "This peaceful campground offers a unique opportunity to connect with nature while enjoying modern amenities. Perfect for families and groups seeking outdoor adventure and relaxation.",
    "Discover this exceptional camping destination where natural beauty meets outdoor recreation. With excellent facilities and breathtaking scenery, it's perfect for creating lifelong memories.",
    "A beautiful campground surrounded by diverse wildlife and stunning landscapes. Enjoy hiking, photography, and the peaceful sounds of nature in this pristine wilderness setting.",
    "This scenic campground offers the perfect balance of adventure and comfort. With well-maintained facilities and access to outdoor activities, it's ideal for all types of campers.",
    "Located in a spectacular natural environment, this campground provides excellent opportunities for outdoor exploration. Experience fishing, hiking, and wildlife viewing in pristine surroundings.",
    "Experience camping at its finest at this remarkable destination. With beautiful sites, modern amenities, and access to recreational activities, it offers the perfect outdoor getaway."
];


const seedDB = async () => {
    await Campground.deleteMany({});
    await User.deleteMany({});
    
    // Create a seed user
    const seedUser = new User({
        email: 'seed@example.com',
        username: 'seeduser'
    });
    await User.register(seedUser, 'password123');
    
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: seedUser._id,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: sample(campgroundDescriptions),
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                sample(campgroundImages),
                sample(campgroundImages)
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})