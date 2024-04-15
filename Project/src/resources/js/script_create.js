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
function NewTrip(event) {
    event.preventDefault();
    // Get the values from the form fields
    var nameInput = document.getElementById("Driver").value;
    var vehircleInput = document.getElementById("Vehircle").value;
    var numInput = document.getElementById("Num").value;
    var serviceInput = document.getElementById("Service").value;

    if (!nameInput.trim() || !vehircleInput.trim() || !numInput.trim() || !serviceInput.trim()) {
        alert("All fields are required. Please fill out all fields.");
        return; // Exit the function
    }
    // Create a new list item
    var div = document.createElement("div");
    div.classList.add("col-sm-6", "col-md-4", "col-lg-4");

    var divbox = document.createElement("div");
    divbox.classList.add("box");

    var a = document.createElement("a");

    // Add the form data to the list item
    var elem = document.createElement("img");
    elem.setAttribute("src", "floai_ltnc/car white background 1.png");
    elem.setAttribute("alt", "added_car");
    a.appendChild(elem);
    divbox.appendChild(a);
    div.appendChild(divbox);

    var divbox2 = document.createElement("div");
    divbox2.classList.add("content");

    var a2 = document.createElement("a");

    a2.innerHTML = "<span> " + nameInput + "</span> <br>";

    divbox2.appendChild(a2);
    div.appendChild(divbox2);
    document.getElementById("ROW").appendChild(div);

    // Hide the form and overlay
    document.getElementById("myForm").reset();
    hideForm(event);

}

function NewTrip1(event) {
    event.preventDefault();
    // Get the values from the form fields
    var nameInput = document.getElementById("Driver").value;
    var vehircleInput = document.getElementById("Vehircle").value;
    var numInput = document.getElementById("Num").value;
    var serviceInput = document.getElementById("Service").value;

    if (!nameInput.trim() || !vehircleInput.trim() || !numInput.trim() || !serviceInput.trim()) {
        alert("All fields are required. Please fill out all fields.");
        return; // Exit the function
    }
    // Create a new list item
    var div = document.createElement("div");
    div.classList.add("col-sm-6", "col-md-4", "col-lg-4");

    var divbox = document.createElement("div");
    divbox.classList.add("box");

    var a = document.createElement("a");

    // Add the form data to the list item
    var elem = document.createElement("img");
    elem.setAttribute("src", "floai_ltnc/t1.png");
    elem.setAttribute("alt", "added_car");
    a.appendChild(elem);
    divbox.appendChild(a);
    div.appendChild(divbox);

    var divbox2 = document.createElement("div");
    divbox2.classList.add("content");

    var a2 = document.createElement("a");

    a2.innerHTML = "<span> " + nameInput + "</span> <br>";

    divbox2.appendChild(a2);
    div.appendChild(divbox2);
    document.getElementById("ROW").appendChild(div);

    // Hide the form and overlay
    document.getElementById("myForm").reset();
    hideForm(event);

}

function NewTrip2(event) {
    event.preventDefault();
    // Get the values from the form fields
    var nameInput = document.getElementById("Driver").value;
    var vehircleInput = document.getElementById("Vehircle").value;
    var numInput = document.getElementById("Num").value;
    var serviceInput = document.getElementById("Service").value;

    if (!nameInput.trim() || !vehircleInput.trim() || !numInput.trim() || !serviceInput.trim()) {
        alert("All fields are required. Please fill out all fields.");
        return; // Exit the function
    }
    // Create a new list item
    var div = document.createElement("div");
    div.classList.add("col-sm-6", "col-md-4", "col-lg-4");

    var divbox = document.createElement("div");
    divbox.classList.add("box");

    var a = document.createElement("a");

    // Add the form data to the list item
    var elem = document.createElement("img");
    elem.setAttribute("src", "floai_ltnc/c6.jpg");
    elem.setAttribute("alt", "added_car");
    a.appendChild(elem);
    divbox.appendChild(a);
    div.appendChild(divbox);

    var divbox2 = document.createElement("div");
    divbox2.classList.add("content");

    var a2 = document.createElement("a");

    a2.innerHTML = "<span> " + nameInput + "</span> <br>";

    divbox2.appendChild(a2);
    div.appendChild(divbox2);
    document.getElementById("ROW").appendChild(div);

    // Hide the form and overlay
    document.getElementById("myForm").reset();
    hideForm(event);

}