const db = require('../helpers/Database').db;

module.exports.get = (id) => {
    const sql = "SELECT * FROM review WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, id, function (err, reviews) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(reviews[0]);
            }
        })
    });
};

module.exports.getByHouse = (houseId) => {
    const sql = "SELECT * FROM review WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, houseId, function (err, reviews) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(reviews);
            }
        })
    })
};

module.exports.getNumOfReview = (house) => {
    const sql = "SELECT COUNT(*) AS total_review, AVG(rating) AS rating FROM review WHERE house_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [house.id], function (err, reviews) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                house.total_review = reviews[0].total_review;
                house.rating = reviews[0].rating;
                resolve(house);
            }
        })
    });
};
