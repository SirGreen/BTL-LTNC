function NewTrip(event) {
    event.preventDefault();
    // Get the values from the form fields
    var nameInput = document.getElementById("Driver").value;
    var vehircleInput = document.getElementById("Vehircle").value;
    var numInput = document.getElementById("Num").value;
    var serviceInput = document.getElementById("Service").value;
    var pickupInput = document.getElementById("pickUpAddress").value;
    var destinationsInput = document.getElementById("Destinations").value;
    if (!nameInput.trim() || !vehircleInput.trim() || !numInput.trim() || !serviceInput.trim() || !pickupInput.trim() || !destinationsInput.trim()) {
        alert("All fields are required. Please fill out all fields.");
        return; // Exit the function
    }

    // Create a new list item
    var li = document.createElement("li");
    // Add the form data to the list item
    li.innerHTML = "<strong>Driver:</strong> " + nameInput + "<br>" +
                   " <strong>Vehircle:</strong> " + vehircleInput + "<br>" +
                   " <strong>Vehircle Number:</strong> " + numInput + "<br>" +
                   " <strong>Type of Service:</strong> " + serviceInput + "<br>" +
                   " <strong>Pick-up:</strong> " + pickupInput + "<br>" +
                   " <strong>Destinations:</strong> " + destinationsInput;

    // Append the list item to the list container
    document.getElementById("List-container").appendChild(li);
    let span=document.createElement("span");
    span.innerHTML= "x";
    li.appendChild(span);
    // Hide the form and overlay
    document.getElementById("myForm").reset();
    hideForm(event);
    

}
document.addEventListener('DOMContentLoaded', function() {
    const lisCon = document.getElementById("List-container");
    if (lisCon) {
        lisCon.addEventListener('click', function(e) {
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

function NewDriver(event) {
    event.preventDefault();
    var newDiv = document.createElement("div");
    newDiv.classList.add("col-sm-6", "col-md-4", "col-lg-4");

// Tạo phần tử box và thêm vào div
    var boxDiv = document.createElement("div");
    boxDiv.classList.add("box");
    newDiv.appendChild(boxDiv);

// Tạo phần tử a và thêm vào boxDiv
    var aTag = document.createElement("a");
    aTag.href = "#";
    boxDiv.appendChild(aTag);
     // Prevent form submission

     var name = document.getElementById("Driver").value;
     var phone = document.getElementById("phone").value;
 
     var selectedLicenses = [];
     var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
     checkboxes.forEach(function(checkbox) {
         selectedLicenses.push(checkbox.name);
     });
    var pictureInput = document.getElementById("picture");
    var pictureFile = pictureInput.files[0];
    if (pictureFile) {
        var img = document.createElement("img");
        img.src = URL.createObjectURL(pictureFile); // Set the image source
        aTag.appendChild(img);
    }

// Tạo phần tử img và thêm vào aTag
    

// Tạo phần tử overlay và thêm vào boxDiv
    var overlayDiv = document.createElement("div");
    overlayDiv.classList.add("overlaya");
    boxDiv.appendChild(overlayDiv);

// Tạo phần tử content và thêm vào overlayDiv
    var contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    overlayDiv.appendChild(contentDiv);

    




// Tạo phần tử span và thêm vào aTag2
    var spanTag = document.createElement("span");
    spanTag.innerHTML = "Name: " + name + "<br>" +
                        "Phone: " + phone + "<br>" +
                        "License: " + selectedLicenses.join(", ");
    
    contentDiv.appendChild(spanTag);

// Lấy phần tử cha và append newDiv vào
    document.getElementById("Driver_list").appendChild(newDiv);




    // Create a close button for the infoBox
    var closeButton = document.createElement("span");
    closeButton.innerHTML = "x";
    closeButton.classList.add("close-button");
    newDiv.appendChild(closeButton);
    // Add event listener to remove the infoBox when close button is clicked
    closeButton.addEventListener("click", function() {
        newDiv.remove();
    });

    // Append the close button to the infoBox
    
    // Hide the form and overlay
    document.getElementById("myForm").reset();
    hideForm(event);


    // Append the list item to the list container
    
}