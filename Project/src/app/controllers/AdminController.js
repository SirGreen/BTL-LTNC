class AdminController{
    index(req, res){
        res.render('admin')
    }
    
    //POST
    AddNewVehicle(){

    }

    //POST
    AddNewDriver(){

    }

    //GET
    DisplayVehicle(){

    }

    //GET
    DisplayDriver(){

    }

    CalDisAndPrice(){

    }

    //POST
    AddJourney()
    {
        this.CalDisAndPrice();
    }

    //POST 
    UpdateVehicleInfo()
    {

    }
}

module.exports = new AdminController;