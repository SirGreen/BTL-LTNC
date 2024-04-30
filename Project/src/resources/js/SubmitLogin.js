document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission
    // console.log(event)
    const UserType = document.getElementById("TypeofUser").innerHTML;
    // Get the username and password from the form
    const userAuth = {
      Account: document.getElementById("Account").value,
      Password: document.getElementById("Password").value,
    };

    try {
      // Make a POST request to authenticate the user
      let response;
      if (UserType == "Admin") {
        response = await fetch("/sendform_admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userAuth),
        });
      } else
      {
        response = await fetch("/sendform_driver", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userAuth),
          });
      }

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      // Parse the response JSON
      const userData = await response.json();
      // Save user data to local storage
      localStorage.setItem('user', userData);   
    //   const user = localStorage.getItem("user");
    //   return console.log(user)
      // Additional lines of code after successful authentication
      if (UserType == "Admin") {
        window.location.href = "/admin.html";
      } else {
        window.location.href = "/driver.html";
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle login failure (e.g., display error message to the user)
    }
  });
