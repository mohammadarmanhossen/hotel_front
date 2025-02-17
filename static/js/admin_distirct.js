const loadAllDistirct= () => {
    fetch("http://127.0.0.1:8000/district/")
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
          `;
          
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };
  
  

loadAllDistirct();
