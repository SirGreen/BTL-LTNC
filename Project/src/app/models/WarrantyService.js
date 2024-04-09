const mongoose = require("mongoose")
const Schema = mongoose.Schema

function threeMonthFromNow() {
    var d = Date.now();
    var targetMonth = (d.getMonth() + 3)%12;
    d.setMonth(targetMonth);
    d.setDate(0);
    return d;
}

const WarrantyService = new Schema({
    IsWarranty : {type: Boolean, default: true},
    WarrantyTime : {type: Date, default: threeMonthFromNow},
    WarrantyHis : [Date]
})

module.exports = mongoose.model("WarrantyService", WarrantyService);