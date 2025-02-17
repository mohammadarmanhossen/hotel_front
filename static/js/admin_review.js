const loadReview= () => {
    fetch("http://127.0.0.1:8000/reviews/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const tableBody = document.getElementById("reviewTableBody");
        tableBody.innerHTML = "";
        
        data.forEach((item,index) => {
          const row = document.createElement("tr");
          
          row.innerHTML = `
            <th scope="row">${index + 1}</th>  
            <td>${item.rating}</td>    
            <td>${item.created}</td>
            <td>${item.body}</td>
          `;
          
          tableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };


loadReview()



