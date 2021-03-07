const db = require('../helpers/Database').db;

module.exports.getCalendarByHouse = (house) => {
    const sql = "SELECT * FROM calendar WHERE house_id = ?";

    return new Promise((resolve, reject) => {
        db.query(sql, [house.id], function (err, calendar) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                delete calendar.house_id;
                house.calendar = calendar;
                resolve(house);
            }
        })
    });
};

module.exports.insert = (houseId, date) => {
    const sql = "INSERT INTO calendar(house_id, date, state) VALUES (?, ?, 1)";
    return new Promise((resolve, reject) => {
        db.query(sql, [houseId, date], function (err, calendar) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(calendar);
            }
        })
    });
};

module.exports.getDateHouse = (houseId, start, end) => {
    const sql = "SELECT * FROM calendar WHERE house_id = ? AND date >= ? AND date < ?";

    return new Promise((resolve, reject) => {
        db.query(sql, [houseId, start, end], function (err, calendars) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(calendars);
            }
        })
    });
};