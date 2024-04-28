var journeyInfo;
var journey_list=[];

document.addEventListener("DOMContentLoaded", async function() {
  try {
      // Gọi hàm loadDriver để tự động tải danh sách tài xế khi trang được truy cập
      await loadjourney();
  } catch (error) {
      console.error('Error loading journeys:', error);
  }
});
async function fetchJourneys() {
  const response = await fetch("journey/all");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const drivers = await response.json();
  return drivers;
}

function addEventListenerToButtons(journey_info, journeyInfo) {
  // Lấy các nút từ newDiv

  var closeButton = journey_info.querySelector(".close-info");
  
  
  // Thêm sự kiện vào nút closeButton
  closeButton.addEventListener("click", function(event) {
      event.preventDefault();
      if(journeyInfo.Status=== 2){
        journey_info.remove();
      deleteJourney(journeyInfo); 
      
      }else{
        alert("can't delete!");
      }

  });
  journey_info.addEventListener("click", function(event) {
    // Kiểm tra xem sự kiện xảy ra trên phần tử span close-info hay không
    if (event.target !== closeButton) {
      // Nếu không phải sự kiện xảy ra trên closeButton, thực hiện hành động check()
      if(journeyInfo.Status=== 2){
        journey_info.classList.toggle("checked");

        if (journey_info.classList.contains("checked")) {
          completedTrip(journey_info);
        
        }
      } else {
        alert("can't complete");
        
      }
    }
    });
  
}
async function loadjourney(){
  await  fetchJourneys()
      .then(journeys => {
        for (let journey of journeys)
        {
            journeyInfo = {
              _id: journey._id,
              Transportation: journey.Transportation,
              TransportationType: journey.TransportationType,
              Driver: journey.Driver,
              Kilomet: journey.Kilomet,
              Price: journey.Price,
              DateTime: journey.DateTime,
              StartLocation: journey.StartLocation,
              EndLocation: journey.EndLocation,
              Status: journey.Status,
              Time: journey.Time,
            };
         const journey_info = createJourneyElement(journeyInfo);
        
         document.getElementById("List-container").appendChild(journey_info);

        
        journey_list.push(journey_info);
        addEventListenerToButtons(journey_info,journeyInfo);
        }
       // console.log(driverElements);

      
      })
      .catch(e => console.error('There was a problem with the fetch operation: ' + e.message));
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
  function deleteJourney(journeyInfo){
    console.log(journeyInfo._id);
    fetch('admin/deleteJourney/' + journeyInfo._id, {
      method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => console.log(res))
  }
function createJourneyElement(journeyInfo){
  var li = document.createElement("li");
  // Add the form data to the list item
  li.innerHTML =
    " <strong>Pick-up:</strong> " +
    journeyInfo.StartLocation +
    "<br>" +
    " <strong>Destinations:</strong> " +
    journeyInfo.EndLocation + "<br>" +
  " <strong>Distance:</strong> " +
    journeyInfo.Kilomet +
    "<br>" +
    " <strong>EstTime:</strong> " +
    journeyInfo.Time +
    "<br>" +
    " <strong>Price:</strong> " +
    journeyInfo.Price;
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
  closespan.classList.add("close-info");
  closespan.innerHTML = "x";
  li.appendChild(closespan);
  return li;
}
function NewTrip(event) {
  event.preventDefault();
  // Get the values from the form fields
  /*var nameInput = document.getElementById("Driver").value;
    var vehircleInput = document.getElementById("Vehicle").value;
    var numInput = document.getElementById("Num").value;
    how">Start Point</div>
      <div id="showSearchEnd">Start End</div>
      <div id="showTravelTime">Travel Time</div>
      <div id="showTravelLength
    var serviceInput = document.getElementById("Service").value;*/
  var pickupInput = document.getElementById("showSearchStart").value;
  var destinationsInput = document.getElementById("showSearchEnd").value;
  var RDistance = document.getElementById("distance").value;
  var estitime = document.getElementById("EstTime").value;
  const options = document.querySelectorAll('input[name="type"]');
    
      let selectedValue = null;
      for (const option of options) {
          if (option.checked) {
              selectedValue = option.value;
              break; 
          }
      }
  
  journeyInfo = {
    TransportationType: options,
    Driver: journey.Driver,
    Kilomet: RDistance,
    Price: RDistance*5000,
    
    StartLocation: pickupInput,
    EndLocation: destinationsInput,
    
    Time: estitime,
  };
  
  /*closespan.addEventListener("click", function() {
        li.remove();
    });*/
  // Hide the form and overlay
  document.getElementById("myForm").reset();
  hideForm(event);
}
// document.addEventListener("DOMContentLoaded", function () {
//   const lisCon = document.getElementById("List-container");
//   if (lisCon) {
//     lisCon.addEventListener("click", function (e) {
//       if (e.target.tagName === "LI") {

//         e.target.classList.toggle("checked");

//         if (e.target.classList.contains("checked")) {
//           completedTrip(e.target);
//         }
//       } else if (e.target.tagName === "SPAN") {
//         e.target.parentElement.remove();
        
//       }
//     });
//   } else {
//     console.error("List-container element not found");
//   }
// });

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
    console.error("CList-container element not found");
  }
});


function submitForm() {
  console.log("HI")
}