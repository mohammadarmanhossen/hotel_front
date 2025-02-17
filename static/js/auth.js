
const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username").value;
    const first_name = getValue("first_name").value;
    const last_name = getValue("last_name").value;
    const email = getValue("email").value;
    const password = getValue("password").value;
    const confirm_password = getValue("confirm_password").value;
    const info = {
      username,
      first_name,
      last_name,
      email,
      password,
      confirm_password,
    };
    console.log(info);
  
    if (password === confirm_password) {
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          password
        )
      )
       {
        
        fetch("http://127.0.0.1:8000/client/register/", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(info),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              title: 'Email Confirmed!',
               text: 'Your email has been verified successfully. Please log in to continue.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(()=>{
               window.location.href="login.html";
            })
          });
          
      }
    } 
    
    else 
    {

      document.getElementById("error").innerText =
        "password and confirm password do not match";
      alert("password and confirm password do not match");
    }
  };





  const handleLogin = (event) => {
    event.preventDefault();
  
    const username = getValue("login-username").value;
    const password = getValue("login-password").value;

   
  
    // Check if both username and password are provided
    if (username && password) {
      const data = {
        username: username,
        password: password
      };
  
      // Admin login request
      fetch("http://127.0.0.1:8000/client/admin/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // Send the data as JSON
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Admin login success
          localStorage.setItem("token", data.token);
          localStorage.setItem("admin_id", data.admin_id);
  
          Swal.fire({
            title: 'Success!',
            text: 'Admin logged in successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.href = "admin_panel.html"; // Redirect to the admin dashboard
          });
        } 


        else {
          const data = {
            username: username,
            password: password
          };
          // If admin login fails, check for normal user login
          fetch("http://127.0.0.1:8000/client/login/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // Send the data as JSON
          })
          .then(res => res.json())
          .then(data => {
            if (data.token && data.user_id) {
              // Normal user login success
              localStorage.setItem("token", data.token);
              localStorage.setItem("user_id", data.user_id);
  
              Swal.fire({
                title: 'Success!',
                text: 'Your Account has been logged in successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
              }).then(() => {
                window.location.href = "home.html"; // Redirect to home page
              });
            } else {
              // If both admin and normal user login fail
              Swal.fire({
                title: 'Error!',
                text: 'Invalid credentials.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          })
          .catch(error => {
            Swal.fire({
              title: 'Error!',
              text: 'There was a problem with the login request.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            console.error("Error during user login:", error);
          });
        }
      })
      .catch(error => {
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem with the login request.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error("Error during admin login:", error);
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter both username and password.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  





const handleLogout = (event) => {
  event.preventDefault();

    console.log("Logging out...");
    const token = localStorage.getItem("token");
    console.log(token);
    fetch("http://127.0.0.1:8000/client/logout/", {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("Logout successful", data);
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");


        Swal.fire({
          title: 'Success!',
          text: 'Your account has been successfully logged out.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(()=>{
           window.location.href="home.html";
        })
        
      })
    
  };
  
  

  const handleAdminLogout = () => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/client/admin/logout/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Logged out successfully") 
          {  
            localStorage.removeItem("token"); 
            localStorage.removeItem("admin_id");
            window.location.href = "login.html"; 

            Swal.fire({
                title: 'Success!',
                text: 'Admin logged out successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: data.error || 'There was an error logging out.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    })
    .catch(error => {
        Swal.fire({
            title: 'Error!',
            text: 'There was a problem with the logout request.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error("Error during admin logout:", error);
    });
};


  const getValue = (id) => {
    const value=document.getElementById(id);
    return value; 
  };





  