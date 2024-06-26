var journeyInfo;
var journey_list=[];
function formatDateTime(isoString) {
  const date = new Date(isoString);
  
  // Extract date components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  
  // Extract time components
  // console.log("Hours "+date.getHours()+isoString)
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  // Construct formatted date/time string
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  
  // Return formatted date/time string
  return `${formattedDate} - ${formattedTime}`;
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
              DateTime: formatDateTime(journey.DateTime),
              StartLocation: journey.StartLocation,
              EndLocation: journey.EndLocation,
              Status: journey.Status,
              Time: journey.Time,
            };
         const journey_info = createJourneyElement(journeyInfo);
         if(journeyInfo.Status===2){
          journey_info.classList.add("checked");
          
          var closeButton = journey_info.querySelector(".close-info");
          journey_info.removeChild(closeButton);
          document.getElementById("CList-container").appendChild(journey_info);
          addEventListenerToCButtons(journey_info,journeyInfo);

         }else{
         document.getElementById("List-container").appendChild(journey_info);
            addEventListenerToButtons(journey_info,journeyInfo);}
        }
       // console.log(driverElements);

      
      })
      .catch(e => console.error('There was a problem with the fetch operation: ' + e.message));
    }
    
document.addEventListener("DOMContentLoaded", async function() {
  try {
      // Gọi hàm loadDriver để tự động tải danh sách tài xế khi trang được truy cập
      await loadjourney();
      await showIncome();
      console.log(12300);
  } catch (error) {
      console.error('Error loading journeys:', error);
  }
});
async function fetchJourneys() {
  const response = await fetch("journey/all");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const journeys = await response.json();
  return journeys;
}
async function showIncome(){
  const response = await fetch("/curUser");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const user = await response.json();

  
  var p=document.createElement("h1");
  p.innerHTML=user.Income;
  document.getElementById("incomeShow").appendChild(p);
  

}
function showmodal() {
  overlay.style.display = "block";
  var modal = document.getElementById("IncomeBox");
  modal.style.display = "block";
}
function hidemodal() {
   // Prevent default behavior
  var modal = document.getElementById("IncomeBox");
  modal.style.display = "none";
  overlay.style.display = "none";
  // window.location.reload();
}
function addEventListenerToCButtons(journey_info,journeyInfo){
  var Button = journey_info.querySelector(".view-carinfo");
       var url;
      
      
      // // Thêm sự kiện vào nút closeButton
       Button.addEventListener("click", function() {
        if(journeyInfo.TransportationType=='car'){
        url = 'car1_admin?productId=' + journeyInfo.Transportation;
        window.location.href = url;
        
      } else if(journeyInfo.TransportationType=='coach'){
        url = 'coach1_admin?productId=' + journeyInfo.Transportation;
        window.location.href = url;
      }else if(journeyInfo.TransportationType=='truck'){
         url = 'truck1_admin?productId=' + journeyInfo.Transportation;
         window.location.href = url;
      }else{
        console.log("No transport");
        url="#";
      }
      console.log(123);



        // Navigate to the URL
      //  window.location.href = url;
    });
}

function addEventListenerToButtons(journey_info, journeyInfo) {
  // Lấy các nút từ newDiv

  var closeButton = journey_info.querySelector(".close-info");
  
  
  // Thêm sự kiện vào nút closeButton
  closeButton.addEventListener("click", function(event) {
      event.preventDefault();
      if(journeyInfo.Status!== 2){
        
      deleteJourney(journeyInfo); 
      journey_info.remove();
      }else{
        alert("can't delete!");
      }

  });
  var Button = journey_info.querySelector(".view-carinfo");
       var url;
      
      
      // // Thêm sự kiện vào nút closeButton
       Button.addEventListener("click", function() {
        if(journeyInfo.TransportationType=='car'){
        url = 'car1_admin?productId=' + journeyInfo.Transportation;
        window.location.href = url;
        
      } else if(journeyInfo.TransportationType=='coach'){
        url = 'coach1_admin?productId=' + journeyInfo.Transportation;
        window.location.href = url;
      }else if(journeyInfo.TransportationType=='truck'){
         url = 'truck1_admin?productId=' + journeyInfo.Transportation;
         window.location.href = url;
      }else{
        console.log("No transport");
        url="#";
      }
      console.log(123);


        // Navigate to the URL
      //  window.location.href = url;
    });
  journey_info.addEventListener("click", function(event) {
    // Kiểm tra xem sự kiện xảy ra trên phần tử span close-info hay không
    if (event.target !== closeButton && event.target !== Button ) {
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
    console.log(journeyInfo.Status);
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
    " <strong>Date & Time:</strong> " +
    journeyInfo.DateTime + "<br>" +
  " <strong>Distance (km):</strong> " +
    journeyInfo.Kilomet +
    "<br>" +
    " <strong>EstTime (minutes):</strong> " +
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
  //document.getElementById("List-container").appendChild(li);
  let closespan = document.createElement("span");
  closespan.classList.add("close-info");
  closespan.innerHTML = "x";
  li.appendChild(closespan);

  //show xe ddang chay
  let closespan1 = document.createElement("span");
  closespan1.classList.add("view-carinfo");
 
  li.appendChild(closespan1);

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
// document.addEventListener("DOMContentLoaded", function () {
//   const ClisCon = document.getElementById("CList-container");
//   if (ClisCon) {
//     ClisCon.addEventListener("click", function (e) {
//       if (e.target.tagName === "SPAN") {
//         e.target.parentElement.remove();
//       }
//     });
//   } else {
//     console.error("CList-container element not found");
//   }
// });


function submitForm() {
  console.log("HI")
}