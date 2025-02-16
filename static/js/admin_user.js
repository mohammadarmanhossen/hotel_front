

const loadAllUser = () => {
    fetch("http://127.0.0.1:8000/client/users/")
      .then((res) => res.json())
      .then((data) => {
        const tableBody = document.getElementById("userTableBody");
        tableBody.innerHTML = ""; // Clear any existing rows
        
        data.forEach((user, index) => {
          const row = document.createElement("tr");
          
          row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td><img src="./Images/man.png" alt="" style="height:50px"></td>
            <td>${user.username}</td>
            <td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td>${user.email}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button></td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  // Call the function when the page loads
loadAllUser();
loadAllHotel();
loadAllDistirct();
loadReview()
loadDistrictsForForm();