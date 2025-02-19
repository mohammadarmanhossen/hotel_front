
const userProfile = () => {
  const user_id = localStorage.getItem("user_id"); 
  console.log("Logged-in User ID:", user_id);

  fetch("http://127.0.0.1:8000/client/users/")
    .then((res) => res.json())
    .then((data) => {
      const currentUser = data.find((item) => item.id === parseInt(user_id));
      if (!currentUser) {
        console.error("User not found!");
        return;
      }

      const parent = document.getElementById("user_profile");
      parent.innerHTML = ""; 

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



// const loadReview = () => {
//   let totalBookings = 0;
//   let totalAmount = 0;


//   fetch("http://127.0.0.1:8000/bookeds/")
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       const tableBody = document.getElementById("hotelBooked");
//       tableBody.innerHTML = "";

//       data.forEach((item, index) => {
//         totalAmount += item.total_amount; 
//         totalBookings += 1;

//         const row = document.createElement("tr");
//         row.setAttribute("data-booking-id", item.id);
        
//         let paymentButton = ''; 
//         let disableButton = ''; 
        
//         if (item.is_paid) {
//             paymentButton = `<td><a class="btn btn-success me-3">Complete</a></td>`;
//             disableButton = `<td><p class="btn btn-secondary me-3">Disable</p></td>`;
//         } else {
//             paymentButton = `<td><a class="btn btn-info me-3" href="chekout.html?hotel_id=${item.id}&amount=${item.total_amount}&quantity=${item.room}">Payment</a></td>`;
//             disableButton = `<td><p class="btn btn-danger me-3" onclick="deleteBooking(${item.id}, ${item.total_amount})">Delete</p></td>`;
//         }
        
//         row.innerHTML = `
//             <th scope="row">${index + 1}</th>
//             <td>${item.hotel_name}</td>
//             <td>${item.room}</td>
//             <td>${item.in_date}</td>
//             <td>${item.out_date}</td>
//             <td>${item.total_amount}</td>
//             ${paymentButton}
//             ${disableButton}
//         `;
        
//         tableBody.appendChild(row);
        

//     tableBody.appendChild(row);

//       });

//       document.getElementById("totalAmountDisplay").innerText = `Total Amount: $${totalAmount.toFixed(2)}`;
//       document.getElementById("totalBookings").innerText = `Total Hotel: ${totalBookings}`;
//     })
//     .catch((error) => console.error("Error fetching user data:", error));
// };









const loadReview = () => {
  let totalBookings = 0;
  let totalAmount = 0;

  fetch("http://127.0.0.1:8000/bookeds/")
      .then((res) => res.json())
      .then((data) => {
          console.log("Fetched Data:", data);
          const tableBody = document.getElementById("hotelBooked");
          if (!tableBody) {
              console.error("Error: Element with ID 'hotelBooked' not found!");
              return;
          }
          tableBody.innerHTML = "";

          data.forEach((item, index) => {
              totalAmount += item.total_amount;
              totalBookings += 1;

              const row = document.createElement("tr");
              row.setAttribute("data-booking-id", item.id);

              let paymentButton = '';
              let disableButton = '';

              if (item.is_paid) {
                  paymentButton = `<td><a class="btn btn-success me-3">Complete</a></td>`;
                  disableButton = `<td><p class="btn btn-secondary me-3">Disable</p></td>`;
              } else {
                  paymentButton = `<td><a class="btn btn-info me-3" href="chekout.html?hotel_id=${item.id}&amount=${item.total_amount}&quantity=${item.room}">Payment</a></td>`;
                  disableButton = `<td><p class="btn btn-danger me-3" onclick="deleteBooking(${item.id}, ${item.total_amount})">Delete</p></td>`;
              }

              row.innerHTML = `
                  <th scope="row">${index + 1}</th>
                  <td>${item.hotel_name}</td>
                  <td>${item.room}</td>
                  <td>${item.in_date}</td>
                  <td>${item.out_date}</td>
                  <td>${item.total_amount}</td>
                  ${paymentButton}
                  ${disableButton}
              `;

              tableBody.appendChild(row);
          });

          document.getElementById("totalAmountDisplay").innerText = `Total Amount: $${totalAmount.toFixed(2)}`;
          document.getElementById("totalBookings").innerText = `Total Hotel: ${totalBookings}`;
      })
      .catch((error) => console.error("Error fetching user data:", error));
};



loadReview();




// const deleteBooking = (bookingId, bookingAmount) => {
//   console.log(bookingId);
//   console.log(bookingAmount);
//   const confirmation = confirm("Are you sure you want to delete this booking?");
//   if (confirmation) {
//     fetch(`http://127.0.0.1:8000/bookeds/${bookingId}/`, {
//       method: "DELETE",
//     })
//     .then((response) => {
//       if (response.ok) {
//         totalAmount -= bookingAmount; 
//         document.getElementById("totalAmountDisplay").innerText = `Total Amount: $${totalAmount.toFixed(2)}`; 
//         loadReview(); 
//       } else {
//         alert("Failed to delete the booking.");
//       }
//     })
//     .catch((error) => {
//       console.error("Error deleting the booking:", error);

//     });
//   }
// };





const deleteBooking = (bookingId, bookingAmount) => {
  console.log(bookingId);
  console.log(bookingAmount);

    fetch(`http://127.0.0.1:8000/bookeds/${bookingId}/`, {
      method: "DELETE",
    })
    .then((response) => {
      if (response.ok) {
        totalAmount -= bookingAmount; 
        document.getElementById("totalAmountDisplay").innerText = `Total Amount: $${totalAmount.toFixed(2)}`; 
        loadReview(); 
        window.location.reload();
      } else {
        alert("Failed to delete the booking.");
      }
    })
    .catch((error) => {
      console.error("Error deleting the booking:", error);

    });

};