

const navbarLoad=()=>{
    const navbar=document.getElementById("navbarElement")
    const user_id = localStorage.getItem("user_id"); 
    console.log(user_id);

    if(user_id){
        navbar.innerHTML=`
                  <li class="nav-item"><a class="nav-link text-black fw-bold px-3 mx-3" href="home.html">HOME</a></li>
        <li class="nav-item"><a class="nav-link text-black fw-bold  px-3 mx-3" href="service.html">SERVICES</a></li>
        <li class="nav-item"><a class="nav-link text-black fw-bold  px-3 mx-3" href="booking.html">BOOKING</a></li>
        <li class="nav-item"><a class="nav-link text-black  fw-bold px-3 mx-3" href="contact.html">CONTACT</a></li>

        <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                  aria-expanded="false">Account</button>
                <ul class="dropdown-menu text-center">
                  <li><a class="fw-bold text-decoration-none bg-info px-3 text-black m-5 p-1 rounded"
                      href="deposite.html">Deposite</a><button class="dropdown-item text-decoration-none"
                      type="button"></button></li>
                  <li>
                   <li><a class="fw-bold text-decoration-none bg-primary px-3 text-black m-4 p-1 rounded"
                      href="user_account.html">Profile</a><button class="dropdown-item text-decoration-none"
                      type="button"></button></li>
                  <li>
              
                    <form id="logout" onsubmit="handleLogout(event)">
                      <div class="text-center">
                        <button type="submit" class="btn btn-danger px-3">Logout</button>
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