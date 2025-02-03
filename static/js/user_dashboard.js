
const loadReview= () => {
    fetch("https://hotel-backend-cmcn.onrender.com/bookeds/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const tableBody = document.getElementById("hotelBooked");
        tableBody.innerHTML = ""; // Clear any existing rows
        
        data.forEach((item,index) => {
          const row = document.createElement("tr");
          
          row.innerHTML = `
            <th scope="row">${index + 1}</th> 
            <td>${item.hotel_name}</td>
            <td>${item.room}</td>
            <td>${item.in_date}</td>     
            <td>${item.out_date}</td>
            <td>${item.payment}</td>
      
          `;
          
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };






  const userProfile = () => {
    const user_id = localStorage.getItem("user_id"); // Get the user ID
    console.log("Logged-in User ID:", user_id);
  
    fetch("https://hotel-backend-cmcn.onrender.com/client/users/")
      .then((res) => res.json())
      .then((data) => {
        const currentUser = data.find((item) => item.id === parseInt(user_id));
        if (!currentUser) {
          console.error("User not found!");
          return;
        }
  
        const parent = document.getElementById("user_profile");
        parent.innerHTML = ""; // Clear previous content
  
        const div = document.createElement("div");
        div.classList.add("user-profile-container", "d-flex", "justify-content-center", "align-items-center", "vh-75");
  
        div.innerHTML = `
          <div class="card user-card shadow-lg border-0 rounded-4 p-4" style="max-width: 400px; background-color: #f8f9fa;">
            <div class="card-body text-center">
              <div class="profile-image mb-3">
                <img src="/Images/man_img.jpg" class="rounded-circle shadow-sm" alt="Profile Picture" style="width: 120px; height: 120px; object-fit: cover;">
              </div>
              <h3 class="card-title text-dark fw-bold">${currentUser.username}</h3>
              <p class="text-muted">(${currentUser.first_name} ${currentUser.last_name})</p>
              <p class="email text-secondary"><i class="bi bi-envelope-fill text-primary"></i> ${currentUser.email}</p>
              <hr class="my-3">
              <a href="#" class="btn btn-primary w-100 rounded-pill">Edit Profile</a>
            </div>
          </div>
        `;
  
        parent.appendChild(div);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };
  
  userProfile();
  