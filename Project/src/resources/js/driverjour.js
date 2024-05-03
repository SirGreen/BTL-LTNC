// Function to display user information
var journeyid;
var cjourney_list= [];
var journeyInfo;
var cjourneyInfo;
var driverInfo;
var driver_id;
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

function displayUserInfo(user) { 
  // Set an item in local storage

  // Get an item from local storage
  // const user = JSON.parse(localStorage.getItem('user'))

  console.log(`User Information:`);
  console.log(`ID: ${user._id}`);
  driver_id=user._id;
  console.log(`Name: ${user.Name}`);
  console.log(`Phone Number: ${user.PhoneNumber}`);
  console.log(`Driving Experience: ${user.DrivingExperience} year(s)`);
  console.log(`License Number: ${user.LiscenceNumber}`);
  console.log(`Journey List: ${user.JourneyList.join(", ")}`);
 // cjourney_list= user.JourneyList;
  console.log(`Journey Incharge: ${user.JourneyIncharge}`);
  //journeyid= user.JourneyIncharge;
  console.log(`Account: ${user.Account}`);
  console.log(`Password (hashed): ${user.Password}`);
  console.log(`Version: ${user.__v}`);
  // driverInfo = {
  //   _id: user._id,
  //   Name: user.Name,
  //   PhoneNumber: user.PhoneNumber,
  //   DrivingExperience: user.DrivingExperience,
  //   LiscenceNumber: user.LiscenceNumber,
  //   JourneyList: user.JourneyList,
  //   JourneyIncharge: user.JourneyIncharge,
  //   Account: user.Account,
  //   Password: user.Password,
  // };
}
async function fetchDrivers() {
  const response = await fetch('/curUser');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const drivers = await response.json();
  return drivers;
}

async function loadDriver() {
  await fetchDrivers()
    .then(driver => {
        displayUserInfo(driver)
        driverInfo = {
          _id: driver._id,
          Name: driver.Name,
          PhoneNumber: driver.PhoneNumber,
          DrivingExperience: driver.DrivingExperience,
          LiscenceNumber: driver.LiscenceNumber,
          JourneyList: driver.JourneyList,
          JourneyIncharge: driver.JourneyIncharge,
          Account: driver.Account,
          Password: driver.Password,
        };

        cjourney_list=driverInfo.JourneyList;
        journeyid=driverInfo.JourneyIncharge;
      
      
    })
    .catch((e) =>
      console.error(
        "There was a problem with the fetch operation: " + e.message
      )
    );
}
document.addEventListener("DOMContentLoaded", async function() {
  // displayUserInfo(user) ;
  
  try {
      // Gọi hàm loadDriver để tự động tải danh sách tài xế khi trang được truy cập
      await loadDriver();
      await loadjourney();
      await loadCompletedjourney(); 
      console.log(cjourney_list);
      console.log(journeyid);
  } catch (error) {
      console.error('Error loading journeys:', error);
  }
});
async function fetchCompletedJourneys() {
  const journeys = []; // Initialize an array to store the journeys

    for (let journey_id of cjourney_list) {
        try {
            const response = await fetch('journey/' + journey_id);
            if (!response.ok) {
                console.error(`HTTP error for journey ${journey_id}! Status: ${response.status}`);
                continue; // Skip this iteration and proceed with the next journey_id
            }
            
            const journey = await response.json(); // Parse the JSON response
            journeys.push(journey); // Store the journey data in the array
        } catch (error) {
            console.error(`Error fetching journey ${journey_id}: ${error.message}`);
            continue; // Skip this iteration and proceed with the next journey_id
        }
    }
    console.log(10);
    console.log(journeys);

    return journeys;
}
async function fetchJourneys() {
  const response = await fetch('journey/'+ journeyid);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const journeys = await response.json();
  return journeys;
}
async function loadjourney(){
  await  fetchJourneys()
      .then(journey => {
        
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
        
         document.getElementById("List-container").appendChild(journey_info);

        
        // journey_list.push(journey_info);
        addEventListenerToButtons(journey_info,journeyInfo);
        
       // console.log(driverElements);

      
      })
      .catch(e => console.error('There was a problem with the fetch operation: ' + e.message));
}
// async function loadCompletedjourney(){
//   await  fetchCompletedJourneys()
//       .then(journeys => {
//         for (let journey of journeys)
//         {
//             cjourneyInfo = {
//               _id: journey._id,
//               Transportation: journey.Transportation,
//               TransportationType: journey.TransportationType,
//               Driver: journey.Driver,
//               Kilomet: journey.Kilomet,
//               Price: journey.Price,
//               DateTime: journey.DateTime,
//               StartLocation: journey.StartLocation,
//               EndLocation: journey.EndLocation,
//               Status: journey.Status,
//               Time: journey.Time,
//             };
//          const journey_info = createJourneyElement(cjourneyInfo);
        
//          document.getElementById("CList-container").appendChild(journey_info);
//          journey_info.classList.toggle("checked");

        
//         journey_list.push(journey_info);
//         //addEventListenerToButtons(journey_info,journeyInfo);
//         }
//        // console.log(driverElements);

      
//       })
//       .catch(e => console.error('There was a problem with the fetch operation: ' + e.message));
//     }
async function loadCompletedjourney() {
  try {
      const journeys = await fetchCompletedJourneys(); // Await fetchCompletedJourneys()
      console.log(90);
    console.log(journeys);

      for (let journey of journeys) {
          // Create a journey information object
          const cjourneyInfo = {
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

          // Create a journey element
          const journeyInfoElement = createJourneyElement(cjourneyInfo);

          // Append the journey element to the container
          document.getElementById("CList-container").appendChild(journeyInfoElement);
           addEventListenerToCButtons(journeyInfoElement,cjourneyInfo);

          // Toggle the "checked" class
          journeyInfoElement.classList.toggle("checked");

          
      }
  } catch (error) {
      console.error('There was a problem with the fetch operation: ' + error.message);
  }
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
      closespan.classList.add("view-carinfo");
      li.appendChild(closespan);
      return li;
    };
    function addEventListenerToCButtons(journeyInfoElement,cjourneyInfo){
      var closeButton = journeyInfoElement.querySelector(".view-carinfo");
       var url;
      
      
      // // Thêm sự kiện vào nút closeButton
       closeButton.addEventListener("click", function() {
        if(cjourneyInfo.TransportationType=='car'){
        url = 'car1_driver?productId=' + cjourneyInfo.Transportation;
        
      } else if(cjourneyInfo.TransportationType=='coach'){
        url = 'coach1_driver?productId=' + cjourneyInfo.Transportation;
      }else if(cjourneyInfo.TransportationType=='truck'){
         url = 'truck1_driver?productId=' + cjourneyInfo.Transportation;
      }else{
        console.log("No transport");
      }
      console.log(123);


        // Navigate to the URL
       window.location.href = url;
    
      });

    };
    function addEventListenerToButtons(journey_info, journeyInfo) {
      // Lấy các nút từ newDiv
    
       var closeButton = journey_info.querySelector(".view-carinfo");
       var url;
      
      
      // // Thêm sự kiện vào nút closeButton
       closeButton.addEventListener("click", function() {
        if(journeyInfo.TransportationType=='car'){
        url = 'car1_driver?productId=' + journeyInfo.Transportation;
        
      } else if(journeyInfo.TransportationType=='coach'){
        url = 'coach1_driver?productId=' + journeyInfo.Transportation;
      }else if(journeyInfo.TransportationType=='truck'){
         url = 'truck1_driver?productId=' + journeyInfo.Transportation;
      }else{
        console.log("No transport");
      }
      console.log(123);


        // Navigate to the URL
        window.location.href = url;
    
      });
      journey_info.addEventListener("click", async function(event) {
        // Kiểm tra xem sự kiện xảy ra trên phần tử span close-info hay không
        
          // Nếu không phải sự kiện xảy ra trên closeButton, thực hiện hành động check()
           if(journeyInfo.Status!== 0){
             journey_info.classList.toggle("checked");
    
            if (journey_info.classList.contains("checked")) {
              completedTrip(journey_info);
              journeyInfo.Status= 2;
              cjourney_list.push(journeyInfo._id);
              try {
            
                  // Gửi yêu cầu PUT để chỉnh sửa tài xế
                  const putResponse = await fetch("/driver/completeJourney/" + driverInfo._id , {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(journeyInfo),
                  });
            
                  const putContentType = putResponse.headers.get("Content-Type");
                  if (!putResponse.ok) {
                    const errorMessage = await putResponse.text();
                    console.error("Problem with the PUT request: " + errorMessage);
                    return;
                  }
            
                  const data = await putResponse.json();
                  console.log(data);
                
              } catch (e) {
                console.error("There was a problem with the JourneyUp request: " + e);
              }

              try {
                
                 // driverInfo.JourneyIncharge=null;
                  driverInfo=cjourney_list;
            
                  // Gửi yêu cầu PUT để chỉnh sửa tài xế
                  const putResponse = await fetch("/admin/update/driver/" + driverInfo._id, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(driverInfo),
                  });
            
                  const putContentType = putResponse.headers.get("Content-Type");
                  if (!putResponse.ok) {
                    const errorMessage = await putResponse.text();
                    console.error("Problem with the PUT request: " + errorMessage);
                    return;
                  }
            
                  const data = await putResponse.json();
                  console.log(data);
                
              } catch (e) {
                console.error("There was a problem with the POST request: " + e);
              }
            
              //window.location.reload();
            }
            
            //}
          // } else {
          //   alert("can't complete");
            
          //}
          }else{
            alert("can complete! *");
          }
        });
      
    }
    function deleteJourney(journeyInfo){
      console.log(journeyInfo._id);
      fetch('admin/deleteJourney/' + journeyInfo._id, {
        method: 'DELETE',
      })
      .then(res => res.text())
      .then(res => console.log(res))
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
//     console.error("List-container element not found");
//   }
// });
