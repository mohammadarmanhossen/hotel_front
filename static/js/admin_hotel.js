

const loadAllHotel = () => {
  fetch("http://127.0.0.1:8000/hotels/")
    .then((res) => res.json())
    .then((data) => {
      const tableBody = document.getElementById("hotelTableBody");
      tableBody.innerHTML = ""; 

      data.forEach((hotel, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${hotel.address}</td>
          <td>${hotel.available_room}</td>
          <td>${hotel.hotel_name}</td>
          <td>${hotel.district_name}</td>
          <td><img src="${hotel.image_url}" alt="Hotel Image" style="width: 100px; height: auto;"></td>
          <td>${hotel.description}</td>
          <td>${hotel.price_per_night}</td>
          <td><button class="btn btn-danger btn-sm" data-id="${hotel.id}">Delete</button></td>
        `;

        tableBody.appendChild(row);
      });

      const deleteButtons = document.querySelectorAll(".btn-danger");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const hotelId = event.target.getAttribute("data-id");
          deleteHotel(hotelId);
        });
      });
    })
    .catch((error) => {
      console.error("Error loading hotels:", error);
    });
};

document.addEventListener("DOMContentLoaded", loadAllHotel);








  const handleHotel = (event) => {
    event.preventDefault();
    const address = document.getElementById("address-name").value;
    const rooms = document.getElementById("rooms-name").value;
    const name = document.getElementById("name-name").value;
    const district = document.getElementById("districts").value;
    const description = document.getElementById("description-name").value;
    const price = document.getElementById("price-night-name").value;
    const imageInput = document.getElementById("image");  
    const image = imageInput.files[0];
  

    const formData = new FormData();
    formData.append("hotel_name", name);
    formData.append("address", address);
    formData.append("available_room", rooms);
    formData.append("district_names", district);
    formData.append("description", description);
    formData.append("price_per_night",price);
    formData.append("image", image);

  
    console.log(formData);
  
    fetch("http://127.0.0.1:8000/hotels/",{
      method: "POST",
      body: formData, 
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const loadDistrictsForForm = () => {
    fetch("http://127.0.0.1:8000/district/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Districts data:", data); 
        const districtsDropdown = document.getElementById("districts");

        districtsDropdown.innerHTML = '<option value="" disabled selected>Select District</option>';

        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.id;
          option.name = item.id;    
          option.textContent = item.district_name;  
          districtsDropdown.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
};


document.addEventListener("DOMContentLoaded", loadDistrictsForForm);












// const loadDistrictsForForm = () => {
//     fetch("http://127.0.0.1:8000/district/")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Failed to fetch districts: ${res.statusText}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         const districtsDropdown = document.getElementById("districts");
  

//         districtsDropdown.innerHTML = '<option value="" disabled selected>Select District</option>';
  
      
//         data.forEach((item) => {
//           const option = document.createElement("option");
//           option.value = item.district_name;
//           option.textContent = item.district_name; 
//           districtsDropdown.appendChild(option);
//         });
//       })
//       .catch((error) => {
//         console.error("Error fetching districts:", error);
//         const districtsDropdown = document.getElementById("districts");
//         districtsDropdown.innerHTML = '<option value="" disabled>Error loading districts</option>' ;
//       });
//   };









  const deleteHotel = (hotelId) => {
    fetch(`http://127.0.0.1:8000/hotels/${hotelId}/`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Hotel Deleted")
        console.log("Hotel deleted:", data);
        loadAllHotel();
      })
      .catch((error) => {
        console.error("Error deleting hotel:", error);
      });
  };


  const deleteButtons = document.querySelectorAll(".btn-danger");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const hotelId = event.target.getAttribute("data-id");
      deleteHotel(hotelId);
    });
  });
  





loadAllUser();
loadAllHotel();
loadAllDistirct();
loadReview()
loadDistrictsForForm(); 