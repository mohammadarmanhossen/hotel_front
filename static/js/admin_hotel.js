
const loadAllHotel = () => {
    fetch("https://hotel-backend-cmcn.onrender.com/hotels/")
      .then((res) => res.json())
      .then((data) => {
        const tableBody = document.getElementById("hotelTableBody");
        tableBody.innerHTML = ""; // Clear the table body before adding rows
  
        data.forEach((hotel, index) => {
          const row = document.createElement("tr");
  
          row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${hotel.address}</td>
            <td>${hotel.available_room}</td>
            <td>${hotel.hotel_name}</td>
            <td>${hotel.district_name}</td>
            <td><img src="${hotel.image}" alt="Hotel Image" style="width: 100px; height: auto;"></td>
            <td>${hotel.description}</td>
            <td>${hotel.price_per_night}</td>
            <td><button class="btn btn-danger btn-sm" data-id="${hotel.id}">Delete</button></td>
          `;
  
          tableBody.appendChild(row);
        });
  
        // Attach delete functionality to buttons
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
  
  // Load hotels when the page is ready
  document.addEventListener("DOMContentLoaded", loadAllHotel);
  
  const handleHotel = (event) => {
    event.preventDefault();
    const address = document.getElementById("address-name").value;
    const rooms = document.getElementById("rooms-name").value;
    const name = document.getElementById("name-name").value;
    const district = document.getElementById("districts").value;
    const description = document.getElementById("description-name").value;
    const price = document.getElementById("price-night-name").value;
    const image = document.getElementById("image").files[0]; // Get the file
  
    // Use FormData to handle the file upload
    const formData = new FormData();
    formData.append("hotel_name", name);
    formData.append("address", address);
    formData.append("available_room", rooms);
    formData.append("district", district);
    formData.append("description", description);
    formData.append("price_per_night",price);
    formData.append("image", image);
  
    console.log(formData);
  
    fetch("https://hotel-backend-cmcn.onrender.com/hotels/",{
      method: "POST",
      body: formData, // Send FormData directly
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };






  // post hotel load distict

const loadDistrictsForForm = () => {
    fetch("https://hotel-backend-cmcn.onrender.com/district/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch districts: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        const districtsDropdown = document.getElementById("districts");
  
        // Clear existing options except the default one
        districtsDropdown.innerHTML = '<option value="" disabled selected>Select District</option>';
  
        // Populate districts
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.district_name; // Use district name as value
          option.textContent = item.district_name; // Display district name
          districtsDropdown.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error fetching districts:", error);
        const districtsDropdown = document.getElementById("districts");
        districtsDropdown.innerHTML = '<option value="" disabled>Error loading districts</option>' ;
      });
  };

  // Call the function when the page loads
loadAllUser();
loadAllHotel();
loadAllDistirct();
loadReview()
loadDistrictsForForm();