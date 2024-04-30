

var driverInfo;
var driverElements = [];

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Gọi hàm loadDriver để tự động tải danh sách tài xế khi trang được truy cập
    await loadDriver();
  } catch (error) {
    console.error("Error loading drivers:", error);
  }
});
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

async function showForm() {
  overlay.style.display = "block";
  var modal = document.getElementById("formContainer");
  modal.style.display = "block";
  // await  fetchJourneys()
  // .then(Journeys => {
  //   console.log(Journeys)
  // })
  // .catch(e => console.error('There was a problem with the fetch operation: ' + e.message));

  // await  fetchDrivers()
  // .then(drivers => {
  //   for (let driver of drivers)
  //     console.log(driver)
  // })
  // .catch(e => console.error('There was a problem with the fetch operation: ' + e.message));
}
function hideForm(event) {
  event.preventDefault(); // Prevent default behavior
  var modal = document.getElementById("formContainer");
  modal.style.display = "none";
  overlay.style.display = "none";
}
function addEventListenerToButtons(driverElement, driverInfo) {
  // Lấy các nút từ newDiv
  var editButton = driverElement.querySelector(".editbutton");
  var viewButton = driverElement.querySelector(".viewbutton");
  var closeButton = driverElement.querySelector(".close-button");

  // Thêm sự kiện vào nút editButton
  editButton.addEventListener("click", function (event) {
    event.preventDefault();
    editInfo(driverInfo);
  });

  // Thêm sự kiện vào nút viewButton
  viewButton.addEventListener("click", function (event) {
    event.preventDefault();
    readInfo(driverInfo);
    showreadForm();
  });

  // Thêm sự kiện vào nút closeButton
  closeButton.addEventListener("click", function (event) {
    event.preventDefault();
    deleteDriver(driverInfo);
  });
}
async function loadDriver() {
  await fetchDrivers()
    .then((drivers) => {
      for (let driver of drivers) {
        driverInfo = {
          _id: driver._id,
          Name: driver.Name,
          PhoneNumber: driver.PhoneNumber,
          DrivingExperience: driver.DrivingExperience,
          LiscenceNumber: driver.LiscenceNumber,
          JourneyList: driver.JourneyList,
          Account: driver.Account,
          Password: driver.Password,
        };
        const driverElement = createDriverElement(driverInfo);

        document.getElementById("Driver_list").appendChild(driverElement);

        driverElements.push(driverElement);
        addEventListenerToButtons(driverElement, driverInfo);
      }
      console.log(driverElements);
    })
    .catch((e) =>
      console.error(
        "There was a problem with the fetch operation: " + e.message
      )
    );
}

function showForm() {
  overlay.style.display = "block";
  var modal = document.getElementById("formContainer");
  modal.style.display = "block";
}
function showreadForm() {
  overlay.style.display = "block";
  var modal2 = document.getElementById("readData");
  modal2.style.display = "block";
}

function hideForm(event) {
  event.preventDefault(); // Prevent default behavior
  var modal = document.getElementById("formContainer");
  modal.style.display = "none";
  overlay.style.display = "none";
}

function hidereadForm(event) {
  event.preventDefault(); // Prevent default behavior
  var modal = document.getElementById("readData");
  modal.style.display = "none";
  overlay.style.display = "none";
}
window.addEventListener("click", function (event) {
  var modal = document.getElementsByClassName("modal");
  if (event.target == modal) {
    event.preventDefault(); // Prevent default behavior
    modal.style.display = "none";
    overlay.style.display = "none";
  }
});
let isEdit = false,
  editID;

function createDriverElement(driverInfo) {
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
  var pictureInput = document.getElementById("picture");
  var pictureFile = pictureInput.files[0];
  if (pictureFile) {
    var img = document.createElement("img");
    img.src = URL.createObjectURL(pictureFile); // Set the image source
    aTag.appendChild(img);
  }
  var overlayDiv = document.createElement("div");
  overlayDiv.classList.add("overlaya");
  boxDiv.appendChild(overlayDiv);

  // Tạo phần tử content và thêm vào overlayDiv
  var contentDiv = document.createElement("div");
  contentDiv.classList.add("content");
  overlayDiv.appendChild(contentDiv);
  var spanTag = document.createElement("span");
  spanTag.innerHTML =
    "Name: " +
    driverInfo.Name +
    "<br>" +
    "Phone: " +
    driverInfo.PhoneNumber +
    "<br>" +
    "Acc: " +
    driverInfo.Account +
    "<br>" +
    "License: " +
    driverInfo.LiscenceNumber;

  contentDiv.appendChild(spanTag);

  var closeButton = document.createElement("span");
  closeButton.innerHTML = "x";
  closeButton.classList.add("close-button");
  newDiv.appendChild(closeButton);

  closeButton.addEventListener("click", function () {
    newDiv.remove();
  });

  const editButton = document.createElement("span");

  editButton.classList.add("editbutton");
  editButton.id = "edit";

  newDiv.appendChild(editButton);

  const viewButton = document.createElement("span");

  viewButton.classList.add("viewbutton");
  viewButton.id = "view";

  newDiv.appendChild(viewButton);

  return newDiv;
}

function editInfo(driverInfo) {
  console.log(driverInfo._id);
  (isEdit = true),
    (editID = driverInfo._id),
    (document.querySelector("#Driver").value = driverInfo.Name),
    (document.querySelector("#phone").value = driverInfo.PhoneNumber),
    (document.querySelector("#newDriverAccount").value = driverInfo.Account),
    (document.querySelector("#password").value = driverInfo.Password),
    (document.querySelector("#license").value = driverInfo.LiscenceNumber);
  const options = document.querySelectorAll('input[name="option"]');

  for (const option of options) {
    if (option.value == driverInfo.DrivingExperience) {
      option.checked = true;
      break;
    }
    // option.disabled = true;
  }

  showForm();
}
function deleteDriver(driverInfo) {
  console.log(driverInfo._id);
  fetch("admin/deleteDriver/" + driverInfo._id, {
    method: "DELETE",
  })
    .then((res) => res.text())
    .then((res) => console.log(res));
}

async function NewDriver(event) {
  event.preventDefault();
  var name = document.getElementById("Driver").value;
  var phone = document.getElementById("phone").value;
  var account = document.getElementById("newDriverAccount").value;
  var pw = document.getElementById("password").value;

  var driverLicense = document.getElementById("license").value;
  const options = document.querySelectorAll('input[name="option"]');

  let selectedValue = null;
  for (const option of options) {
    if (option.checked) {
      selectedValue = option.value;
      break;
    }
  }

  const driverInfo = {
    Name: name,
    PhoneNumber: phone,
    DrivingExperience: selectedValue,
    LiscenceNumber: driverLicense,
    JourneyList: [],
    Account: account,
    Password: pw,
  };
  //hideForm(event);
  console.log(driverInfo);

  try {
    const drivers = await fetchDrivers();
    console.log(drivers);
    console.log(isEdit);
    if (!isEdit) {
      // Thêm tài xế mới vào danh sách drivers
      drivers.push(driverInfo);
      localStorage.setItem("drivers", JSON.stringify(drivers));
      // Gửi yêu cầu POST để thêm tài xế mới
      const response = await fetch("/admin/addDriver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driverInfo),
      });

      // Kiểm tra phản hồi
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Problem with the POST request: " + errorMessage);
        return;
      }

      const data = await response.json();
      console.log(data);
    } else {
      drivers[editID] = driverInfo;
      isEdit = false;

      // Gửi yêu cầu PUT để chỉnh sửa tài xế
      const putResponse = await fetch("/admin/update/driver/" + editID, {
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
    }
  } catch (e) {
    console.error("There was a problem with the POST request: " + e);
  }

  window.location.reload();
}

function readInfo(driverInfo) {
  (document.querySelector("#showDriver").value = driverInfo.Name),
    (document.querySelector("#showphone").value = driverInfo.PhoneNumber),
    (document.querySelector("#shownewDriverAccount").value =
      driverInfo.Account),
    (document.querySelector("#showpassword").value = driverInfo.Password),
    (document.querySelector("#showlicense").value = driverInfo.LiscenceNumber);
  console.log(driverInfo.DrivingExperience);
  const options = document.querySelectorAll('input[name="showoption"]');

  for (const option of options) {
    if (option.value == driverInfo.DrivingExperience) {
      option.checked = true;
      break;
    }
    option.disabled = true;
  }
}

function submitForm() {
  console.log("HI");
}
