 import { LocalStorage } from 'node-localstorage';
const localStorage = new LocalStorage("./UserData");
const storedUserJSON = localStorage.getItem("user");

// Parse the JSON string to an object
const storedUser = JSON.parse(storedUserJSON);

// Function to display user information
function displayUserInfo(user) {
  console.log(`User Information:`);
  console.log(`ID: ${user._id}`);
  console.log(`Name: ${user.Name}`);
  console.log(`Phone Number: ${user.PhoneNumber}`);
  console.log(`Driving Experience: ${user.DrivingExperience} year(s)`);
  console.log(`License Number: ${user.LiscenceNumber}`);
  console.log(`Journey List: ${user.JourneyList.join(", ")}`);
  console.log(`Journey Incharge: ${user.JourneyIncharge}`);
  console.log(`Account: ${user.Account}`);
  console.log(`Password (hashed): ${user.Password}`);
  console.log(`Version: ${user.__v}`);
}

// Display the user information
displayUserInfo(storedUser);
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