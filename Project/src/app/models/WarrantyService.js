const mongoose = require("mongoose")
const Schema = mongoose.Schema

function threeMonthFromNow() {
    let d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d;
}

const WarrantyService = new Schema({
    IsWarranty : {type: Boolean, default: true},
    WarrantyTime : {type: Date, default: threeMonthFromNow},
    WarrantyHis : [Date]
})

module.exports = mongoose.model("WarrantyService", WarrantyService);