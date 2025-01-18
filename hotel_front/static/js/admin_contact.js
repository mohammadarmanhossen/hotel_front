const loadAllContact= () => {
    fetch("https://hotel-backend-cmcn.onrender.com/client/contact/")
      .then((res) => res.json())
      .then((data) => {
        const tableBody = document.getElementById("districtTableBody");
        tableBody.innerHTML = ""; // Clear any existing rows
        
        data.forEach((item,index) => {
          const row = document.createElement("tr");
          
          row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${item. district_name}</td>
            <td>${item.slug}</td>
             <td><button class="btn btn-danger btn-sm">Delete</button></td>
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