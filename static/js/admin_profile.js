

document.addEventListener("DOMContentLoaded", function () {
    const isAdmin = localStorage.getItem("is_admin");
    const adminName = localStorage.getItem("admin_username");
    const adminRole = localStorage.getItem("admin_role");

    if (isAdmin === "true") {
        document.getElementById("admin-name").innerText = adminName;
        document.getElementById("admin-role").innerText = adminRole;
    } else {
        alert("No admin");
        window.location.href = "login.html";
    }
});




const handleAdminLogout = () => {
    localStorage.removeItem("is_admin");
    localStorage.removeItem("admin_username");
    localStorage.removeItem("admin_role");

    Swal.fire({
        title: 'Logout Successful!',
        text: 'Logout you',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        window.location.href = "login.html";
    });
};


const adminNavbar=()=>{

    if(isAdmin){
        <nav class="navbar navbar-expand-lg navbar-dark bg-light">
        <div class="container">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon bg-dark"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Admin
                </button>
    
                  <ul class="dropdown-menu text-center">
                    <li><a class="text-decoration-none fw-bold bg-light  px-4 py-1 rounded" href="admin_profile.html">Admin Profile</a><button class="dropdown-item" type="button"></button></li>
                    <li><a class="text-decoration-none fw-bold bg-light px-4 py-1 rounded" href="home.html">Logout</a><button class="dropdown-item" type="button"></button></li>
        
                  </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    }
}