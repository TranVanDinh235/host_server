const db = require('../helpers/Database').db;
const Utils = require('../helpers/Utils');

module.exports.get = (houseId) => {
    const sql = "SELECT * FROM houses WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(houses[0]);
            }
        })
    });
};

module.exports.getByHost = (houseId) => {
    const sql = "SELECT * FROM houses WHERE host_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, houses) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(houses);
            }
        })
    });
};

module.exports.getPhotos = (houseId) =>{
    const sql = "SELECT * FROM photos WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId], function (err, photos){
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(photos);
            }
        })
    })
};

module.exports.updateCalendar = (houseId, date) =>{
    const sql = "UPDATE calendar SET state = 2 WHERE house_id = ? AND date = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId, date], function (err, calendar){
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(calendar);
            }
        })
    })
};

module.exports.getCityByName = (name) =>{
    const sql = "SELECT * FROM city WHERE name = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [name], function (err, city){
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(city[0]);
            }
        })
    })
};

module.exports.updateHouseCity = (cityId, houseId) =>{
    const sql = "UPDATE houses SET city_id = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [cityId, houseId], function (err, house){
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(house);
            }
        })
    })
};

module.exports.insertHouse = (req) =>{
    const sql = "INSERT INTO houses(host_id, title, photo, promotion, type, address, description, guests, max_guests, check_in, "+
        "check_out, house_rules, bedrooms, bathrooms, beds, create_date, price, addition_fee, facilities, room_facilities, "+
        "kitchen_facilities, special_facilities, entertainment, families) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.query(sql, [req.user_id, req.title, req.photo, req.promotion, req.type, req.address, req.description,
        req.guest, req.max_guest, req.check_in, req.check_out, req.house_rule, req.bed_room, req.bathroom, req.beds, req.create_date, 
        req.price, req.addition_fee, req.facilities, req.room_facilities, req.kitchen_facilities, req.special_facilities, 
        req.entertainment, req.families], function (err, house){
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(house);
            }
        })
    })
};

module.exports.getTripsUpcoming = (userId) =>{
    const today = Utils.getTimeStartDay();
    const sql = "SELECT h.title, h.photo, h.price, g.pic_url, g.user_name, b.* " +
    "FROM houses h INNER JOIN booking b ON h.id = b.house_id " + 
    "INNER JOIN guest g ON g.id = b.guest_id "+
    "WHERE h.host_id = ? AND b.end_date > ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [userId, today], function (err, houses){
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(houses);
            }
        })
    })
};

module.exports.getTripsFinish = (userId) =>{
    const today = Utils.getTimeStartDay();
    const sql = "SELECT h.title, h.photo, h.price, g.pic_url, g.user_name, b.* "+
    "FROM houses h INNER JOIN booking b ON h.id = b.house_id "+
    "INNER JOIN guest g ON g.id = b.guest_id "+
    "WHERE h.host_id = ? AND b.end_date < ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [userId, today], function (err, houses){
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(houses);
            }
        })
    })
};

