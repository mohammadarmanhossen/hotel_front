const loadAllContact= () => {
    fetch("https://hotel-backend-arcx.onrender.com/client/contact/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const tableBody = document.getElementById("contactTableBody");
        tableBody.innerHTML = ""; // Clear any existing rows
        
        data.forEach((item,index) => {
          const row = document.createElement("tr");
          
          row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${item. subject}</td>
            <td>${item.message}</td>
          `;
          
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

loadAllContact();
