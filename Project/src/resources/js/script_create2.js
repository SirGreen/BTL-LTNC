function showForm() {
    overlay.style.display = "block";
    var modal = document.getElementById("formContainer");
    modal.style.display = "block";
}

function hideForm(event) {
    event.preventDefault(); // Prevent default behavior
    var modal = document.getElementById("formContainer");
    modal.style.display = "none";
    overlay.style.display = "none";
}

var vehicleInfo;
var vehicle_list =[];
let isEdit=false, editID;
/////////////////////
document.addEventListener("DOMContentLoaded", async function() {
    try {
        // Gọi hàm loadDriver để tự động tải danh sách tài xế khi trang được truy cập
        await loadCar();
    } catch (error) {
        console.error('Error loading Cars:', error);
    }
});
async function fetchCar() {
    const response = await fetch("/truck");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const drivers = await response.json();
    return drivers;
  }

   function addEventListenerToButtons(vehicleElement, vehicleInfo) {
//     // Lấy các nút từ newDiv
//     var editButton = vehicleElement.querySelector(".editbutton");
//     var viewButton = vehicleElement.querySelector(".viewbutton");
       var closeButton = vehicleElement.querySelector(".close-button");
    
//     // Thêm sự kiện vào nút editButton
//     editButton.addEventListener("click", function(event) {
//         event.preventDefault();
//         editInfo(vehicleInfo);
//     });
    
//     // Thêm sự kiện vào nút viewButton
//     viewButton.addEventListener("click", function(event) {
//         event.preventDefault();
//         readInfo(vehicleInfo);
//         showreadForm();
//     });
    
    //Thêm sự kiện vào nút closeButton
        closeButton.addEventListener("click", function(event) {
        event.preventDefault();
        deleteCar(vehicleInfo);
    });
 }
async function loadCar(){
    await  fetchCar()
      .then(drivers => {
        for (let driver of drivers)
        {
            vehicleInfo = {
                Brand: driver.Brand,
                _id: driver._id,
                Capacity: driver.Capacity,
                Size: driver.Size,
                TypeOfFuel: driver.TypeOfFuel,
                VehicleStatus: driver.VehicleStatus,
                Warranty: driver.Warranty,
                Journey: driver.Journey,
                License: driver.License,
            };
         const vehicleElement = createVehicleElement(vehicleInfo);
        
         document.getElementById("ROW").appendChild(vehicleElement);

        
         vehicle_list.push(vehicleElement);
         addEventListenerToButtons(vehicleElement, vehicleInfo);
        }
        console.log(vehicle_list);

      
      })
      .catch(e => console.error('There was a problem with the fetch operation: ' + e.message));
}
function deleteCar(vehicleInfo){
    console.log(vehicleInfo._id);
    fetch('admin/deleteTransportation/truck/' + vehicleInfo._id, {
      method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => console.log(res))
}  


// Attach a click event listener to the button
function CarAdd(event) {
    // Call the function onSubmit() when the button is clicked
    event.preventDefault();
    NewTrip(event);
}
function createVehicleElement(vehicleInfo){
    var div = document.createElement("div");
    div.classList.add("col-sm-6", "col-md-4", "col-lg-4");

    var divbox = document.createElement("div");
    divbox.classList.add("box");

    var a = document.createElement("a");

    // Add the form data to the list item
    var elem = document.createElement("img");

   // var img=document.createElement("img");
    if (vehicleInfo.Brand === 'VAN DONGBEN') {
        elem.setAttribute("src", "floai_ltnc/t1.png");
        elem.setAttribute("alt", "added_car");
        // Thực hiện các thao tác tương ứng với thương hiệu SUZUKI XL7
    } else if (vehicleInfo.Brand === 'VAN KENBO') {
        elem.setAttribute("src", "floai_ltnc/t2.png");
        elem.setAttribute("alt", "added_car");
    } else if (vehicleInfo.Brand === 'VAN FOTON') {
        elem.setAttribute("src", "floai_ltnc/t3.png");
        elem.setAttribute("alt", "added_car");
    } else if (vehicleInfo.Brand === 'VAN SUZUKI BLIND') {
        elem.setAttribute("src", "floai_ltnc/pickup-truck-isolated-white-background-d-render-pickup-truck-isolated-205954001.webp");
        elem.setAttribute("alt", "added_car");
    } else {
        console.log('Unknown brand.');
        // Thực hiện các thao tác cho trường hợp thương hiệu không xác định
    }
    //document.getElementById("Carimg").appendChild(img);


    a.appendChild(elem);
    divbox.appendChild(a);
    div.appendChild(divbox);

    var divbox2 = document.createElement("div");
    divbox2.classList.add("content");

    var a2 = document.createElement("a");
    a2.setAttribute("href", 'truck1_admin?productId='+vehicleInfo._id);
    a2.innerHTML = "<span> " + vehicleInfo.Brand + "</span> <br>";
    //editCar(vehicleInfo);

    divbox2.appendChild(a2);
    divbox.appendChild(divbox2);
   
   // document.getElementById("ROW").appendChild(div);
   var closeButton = document.createElement("div");
   closeButton.innerHTML = "x";
   closeButton.classList.add("close-button");
   divbox.appendChild(closeButton);
  
   closeButton.addEventListener("click", function () {
     div.remove();
     
   });

   
    return div;
}
async function NewTrip(event) {
    event.preventDefault();
    console.log(123);
    // Get the values from the form fields
  //  var nameInput = document.getElementById("Carbrand").value;
    const brands = document.querySelectorAll('input[name="brandoption"]');
    
      let nameInput = null;
      for (const brand of brands) {
          if (brand.checked) {
              nameInput = brand.value;
              break; 
          }
      }
      console.log(nameInput);
    var vehircleInput = document.getElementById("FuelType").value;
    var VLicense = document.getElementById("Num").value;
    var VCapacity= document.getElementById("Capacity").value;
    var VSize= document.getElementById("Size").value;
   
    
    

    // if (!nameInput.trim() || !vehircleInput.trim() || !numInput.trim() || !serviceInput.trim()) {
    //     alert("All fields are required. Please fill out all fields.");
    //     return; // Exit the function
    // }
    vehicleInfo = {
        Brand: nameInput,
        Capacity: VCapacity,
        Size: VSize,
        TypeOfFuel: vehircleInput,
        //VehicleStatus: selectedValue,
        License: VLicense,
    };
    //hideForm(event);
    console.log(vehicleInfo);
 
    
    try {
      const drivers = await fetchCar();
      console.log(drivers);
      console.log(isEdit);
      {
          // Thêm tài xế mới vào danh sách drivers
          drivers.push(vehicleInfo);
          localStorage.setItem('drivers', JSON.stringify(drivers));
          // Gửi yêu cầu POST để thêm tài xế mới
          const response = await fetch('admin/addTransportation/truck', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(vehicleInfo)
          });
          
          // Kiểm tra phản hồi
          if (!response.ok) {
              const errorMessage = await response.text();
              console.error('Problem with the POST request: ' + errorMessage);
              return;
          }
          
          const data = await response.json();
          console.log(data);
       }
     
  } catch (e) {
      console.error('There was a problem with the POST request: ' + e.message);
  };
   
    window.location.reload();
  
    document.getElementById("myForm").reset();
    hideForm(event);

}