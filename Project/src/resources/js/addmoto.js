async function fetchDrivers() {
  const response = await fetch("driver/all");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const drivers = await response.json();
  return drivers;
}


async function fetchJourneys() {
  const response = await fetch("journey/all");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const drivers = await response.json();
  return drivers;
}
//let getData= localStorage.getItem('userProfile')? JSON.parse(localStorage.getItem('userProfile')):[]

// async function showForm() {
//   // overlay.style.display = "block";
//   // var modal = document.getElementById("formContainer");
//   // modal.style.display = "block";
//   await  fetchJourneys()
//   .then(Journeys => {
//     console.log(Journeys)
//   })
//   .catch(e => console.error('There was a problem with the fetch operation: ' + e.message));


//   await  fetchDrivers()
//   .then(drivers => {
//     for (let driver of drivers)
//       console.log(driver)
//   })
//   .catch(e => console.error('There was a problem with the fetch operation: ' + e.message));
// }
// function hideForm(event) {
//   event.preventDefault(); // Prevent default behavior
//   var modal = document.getElementById("formContainer");
//   modal.style.display = "none";
//   overlay.style.display = "none";
// }
// function fetchDriver(){
//     fetch('http://localhost:3000/driver/all')
//         .then(res=>res.json())
//         .then(data =>{
//             data.forEach(user =>{
//             const info= {

//             }

//         });});
// }
function loadDriver(){
    fetch('http://localhost:3000/admin/addDriver', {
        method: 'POST',
        body: JSON.stringify(driverInfo),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res=>res.json())
        .then(data => console.log(data))
}
//var overlay= document.getElementById("overlay");
function showForm() {
   overlay.style.display="block";
    var modal = document.getElementById("formContainer");
    modal.style.display = "block";
  }
  function showreadForm() {
    overlay.style.display="block";
    var modal2 = document.getElementById("readData");
    modal2.style.display = "block";
  }
  
  function hideForm(event) {
    event.preventDefault(); // Prevent default behavior
    modal.style.display = "none";
    overlay.style.display = "none";
  }


  function hidereadForm(event) {
    event.preventDefault(); // Prevent default behavior
    var modal = document.getElementById("readData");
    modal.style.display = "none";
    overlay.style.display = "none";
  }
  window.addEventListener("click", function(event) {
    var modal = document.getElementById("formContainer");
    if (event.target == modal) {
        event.preventDefault(); // Prevent default behavior
        modal.style.display = "none";
        overlay.style.display = "none";
    }
  });
  let isEdit= false, editID
  
function NewTrip(event) {
  event.preventDefault();
  // Get the values from the form fields
  /*var nameInput = document.getElementById("Driver").value;
    var vehircleInput = document.getElementById("Vehicle").value;
    var numInput = document.getElementById("Num").value;
    var serviceInput = document.getElementById("Service").value;*/
  var pickupInput = document.getElementById("pickUpAddress").value;
  var destinationsInput = document.getElementById("Destinations").value;
  var RDistance = document.getElementById("distance").value;
  var estitime = document.getElementById("EstTime").value;
  /*
    if (!nameInput.trim() || !vehircleInput.trim() || !numInput.trim() || !serviceInput.trim() || !pickupInput.trim() || !destinationsInput.trim()) {
        alert("All fields are required. Please fill out all fields.");
        return; // Exit the function
    }*/

  // Create a new list item
  var li = document.createElement("li");
  // Add the form data to the list item
  li.innerHTML =
    " <strong>Pick-up:</strong> " +
    pickupInput +
    "<br>" +
    " <strong>Destinations:</strong> " +
    destinationsInput;
  " <strong>Distance:</strong> " +
    RDistance +
    "<br>" +
    " <strong>EstTime:</strong> " +
    estitime;
  /*
    li.innerHTML = "<strong>Driver:</strong> " + nameInput + "<br>" +
                   " <strong>Vehicle:</strong> " + vehircleInput + "<br>" +
                   " <strong>Vehicle Number:</strong> " + numInput + "<br>" +
                   " <strong>Type of Service:</strong> " + serviceInput + "<br>" +
                   " <strong>Pick-up:</strong> " + pickupInput + "<br>" +
                   " <strong>Destinations:</strong> " + destinationsInput;*/

  // Append the list item to the list container
  // li.classList.add("infoBox");
  document.getElementById("List-container").appendChild(li);
  let closespan = document.createElement("span");
  // closespan.classList.add("close-info")
  closespan.innerHTML = "x";
  li.appendChild(closespan);
  /*closespan.addEventListener("click", function() {
        li.remove();
    });*/
  // Hide the form and overlay
  document.getElementById("myForm").reset();
  hideForm(event);
}
document.addEventListener("DOMContentLoaded", function () {
  const lisCon = document.getElementById("List-container");
  if (lisCon) {
    lisCon.addEventListener("click", function (e) {
      if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        if (e.target.classList.contains("checked")) {
          completedTrip(e.target);
        }
      } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
      }
    });
  } else {
    console.error("List-container element not found");
  }
});

function completedTrip(li) {
  // Do something with the completed <li> element
  document.getElementById("CList-container").appendChild(li);
}
document.addEventListener("DOMContentLoaded", function () {
  const ClisCon = document.getElementById("CList-container");
  if (ClisCon) {
    ClisCon.addEventListener("click", function (e) {
      if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
      }
    });
  } else {
    console.error("List-container element not found");
  }
});


function submitForm() {
  console.log("HI")
}