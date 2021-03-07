module.exports.getTimeStartDay = function () {
    const now = new Date();
    const date = new Date(now.toLocaleDateString());
    return date.getTime()/1000;
};

module.exports.getDayOfWeek = function () {
    const now = new Date();
    return now.getDay();
};

