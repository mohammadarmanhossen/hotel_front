

const navbarLoad=()=>{
    const navbar=document.getElementById("navbarElement")
    const user_id = localStorage.getItem("user_id"); 
    console.log(user_id);

    if(user_id ){
        navbar.innerHTML=`

    <li class="nav-item"><a class="nav-link text-black fw-bold px-3 mx-3" href="home.html">HOME</a></li>
    <li class="nav-item"><a class="nav-link text-black fw-bold px-3 mx-3" href="service.html">SERVICES</a></li>
    <li class="nav-item"><a class="nav-link text-black fw-bold px-3 mx-3" href="booking.html">BOOKING</a></li>
    <li class="nav-item"><a class="nav-link text-black fw-bold px-3 mx-3" href="contact.html">CONTACT</a></li>
    <div class="dropdown px-5 mx-5">
      <button class="btn dropdown border-0 px-5" type="button" data-bs-toggle="dropdown" aria-expanded="false d-flex">   
        <img src="/Images/man_img.jpg" alt="Account" class="rounded-circle" width="40px" height="40"/>
      </button>
      <ul class="dropdown-menu text-center ">
      <li class="p-2">
    <a
      class="fw-bold text-decoration-none bg-light text-black d-block m-auto p-2 rounded"
      href="user_dashboard.html"
      aria-label="Go to Dashboard"
    >
      Dashboard
    </a>
  </li>
  <li class="p-2">
    <form id="logout" onsubmit="handleLogout(event)" class="m-0">
      <div class="text-center">
        <button type="submit" class="btn btn-light text-danger fw-bold px-4 py-2 rounded" aria-label="Logout">
          Logout
        </button>
    </div>
    </form>
  </li>
</ul>
</div>
            
    `
        
     }
    else{
        navbar.innerHTML=`

       <li class="nav-item"><a class="nav-link text-black fw-bold px-3 mx-3" href="home.html">HOME</a></li>
            <li class="nav-item"><a class="nav-link text-black fw-bold  px-3 mx-3" href="service.html">SERVICES</a></li>
            <li class="nav-item"><a class="nav-link text-black fw-bold  px-3 mx-3" href="booking.html">BOOKING</a></li>
            <li class="nav-item"><a class="nav-link text-black  fw-bold px-3 mx-3" href="contact.html">CONTACT</a></li>
          
            <li class="nav-item"><a class="nav-link text-black fw-bold  px-3 mx-3" href="registration.html">SIGN UP</a></li>
            <li class="nav-item"><a class="nav-link text-black  fw-bold px-3 mx-3"href="login.html">LOGIN</a></li>
        
            `

    }
}
navbarLoad();














