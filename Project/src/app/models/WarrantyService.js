const mongoose = require("mongoose")
const Schema = mongoose.Schema

function threeMonthFromNow() {
    let d = new Date();
 
    console.log("Today's Date: "
        + d.toLocaleDateString());
    
    d.setMonth(d.getMonth() + 3);
 
    console.log("3 months Prior Date: "
        + d.toLocaleDateString());
    return d;
}

const WarrantyService = new Schema({
    IsWarranty : {type: Boolean, default: true},
    WarrantyTime : {type: Date, default: threeMonthFromNow},
    WarrantyHis : [Date]
})

module.exports = mongoose.model("WarrantyService", WarrantyService);