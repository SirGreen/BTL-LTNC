window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollTopBtn").style.display = "none";
  }
}

function scrollToTop() {
  document.body.scrollTop = 0; // Đối với Safari
  document.documentElement.scrollTop = 0; // Đối với các trình duyệt khác
}
// Function to show the modal form
function showForm() {
  overlay.style.display="block";
  var modal = document.getElementById("formContainer");
  modal.style.display = "block";
}

function hideForm(event) {
  event.preventDefault(); // Prevent default behavior
  var modal = document.getElementById("formContainer");
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




