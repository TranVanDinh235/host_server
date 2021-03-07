const houseService = require('../model/House');
const calendarService = require('../model/Calendar');
const userService = require('../model/User');
const Review = require('../model/Review');
const Upload = require('../helpers/upload')

module.exports.get = async (req, res, next) => {
    try{
        let house = await houseService.get(req.params.id);
        house.photos = await houseService.getPhotos(house.id);
        house = await Review.getNumOfReview(house);
        let reviews = await Review.getByHouse(house.id);
        for(let review of reviews){
            let guest = await userService.get(review.guest_id);
            review.user_name = guest.user_name;
            review.pic_url = guest.pic_url;
        }
        house.reviews = reviews;
        house = await calendarService.getCalendarByHouse(house);
        return res.status(200).json({
            status_code: 200,
            house,
            error: ""
        })
    } catch (err) {
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};

module.exports.getByHost = async (req, res, next) => {
    try{
        let houses = await houseService.getByHost(req.params.id);
        for(let house of houses){
            house.photos = await houseService.getPhotos(house.id);
            house = await Review.getNumOfReview(house);
            let reviews = await Review.getByHouse(house.id);
            for(let review of reviews){
                let guest = await userService.getGuest(review.guest_id);
                review.user_name = guest.user_name;
                review.pic_url = guest.pic_url;
            }
            house.reviews = reviews;
            house = await calendarService.getCalendarByHouse(house);
        }
        
        return res.status(200).json({
            status_code: 200,
            house_list: {
                houses: houses
            },
            error: ""
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};


module.exports.newHouse = async (req, res, next) => {
    try{
        console.log(req.body)
        let house = await houseService.insertHouse(req.body);
        let city = await houseService.getCityByName(req.city);
        if(city != undefined){
            await houseService.updateHouseCity(city.id, house.id)
        } else  await houseService.updateHouseCity(0, house.id);
        return res.status(200).json({
            status_code: 200,
            error: ""
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};

module.exports.insert = async (req, res, next) => {
    try{
        return res.status(200).json({
            status_code: 200,
            house,
            error: ""
        })
    } catch (err) {
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};

module.exports.update = async (req, res, next) => {
    try{
        return res.status(200).json({
            status_code: 200,
            house,
            error: ""
        })
    } catch (err) {
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};

module.exports.remove = async (req, res, next) => {
    try{
        return res.status(200).json({
            status_code: 200,
            house,
            error: ""
        })
    } catch (err) {
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};

module.exports.booking = async (req, res, next) => {
    try {
        const userId = req.body.user_id;
        const houseId = req.body.house_id;
        const dates = req.body.dates;

        await houseService.insertBooking(userId, houseId, dates[0], dates[dates.length-1]);

        for (const date of dates) {
            await houseService.updateCalendar(houseId, date);
        }
        return res.status(200).json({
            status_code: 200,
            error: ""
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};

module.exports.getTripsUpcoming = async (req, res, next) => {
    try {
        const hostId = req.params.id;
        const houses = await houseService.getTripsUpcoming(hostId);
        return res.status(200).json({
            status_code: 200,
            house_list: {
                bookings: houses
            },
            error: ""
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};

module.exports.getTripsFinish = async (req, res, next) => {
    try {
        const hostId = req.params.id;
        const houses = await houseService.getTripsFinish(hostId);
        return res.status(200).json({
            status_code: 200,
            house_list: {
                bookings: houses
            },
            error: ""
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status_code: 500,
            error: err
        })
    }
};