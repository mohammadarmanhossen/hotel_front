

const loadAllHotel = () => {
  fetch("https://hotel-backend-arcx.onrender.com/hotels/")
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






const handleHotel = async (event) => {
  event.preventDefault();

  const address = document.getElementById("address-name").value;
  const rooms = document.getElementById("rooms-name").value;
  const name = document.getElementById("name-name").value;
  const district = document.getElementById("districts").value;
  const description = document.getElementById("description-name").value;
  const price = document.getElementById("price-night-name").value;
  const imageInput = document.getElementById("image").files[0];  

  if (!imageInput) {
      alert("Please select an image!");
      return;
  }

  let imageUrl = '';


  const imgFormData = new FormData();
  imgFormData.append('image', imageInput);

  fetch('https://api.imgbb.com/1/upload?key=91eb0ab92307af61f7bffe3b9d728952', {
      method: 'POST',
      body: imgFormData
  })
  .then(response => response.json())
  .then(imgbbData => {
      if (imgbbData.status === 200) {
          imageUrl = imgbbData.data.url;
          

          const formData = new FormData();
          formData.append("hotel_name", name);
          formData.append("address", address);
          formData.append("available_room", rooms);
          formData.append("district_names", district);
          formData.append("description", description);
          formData.append("price_per_night", price);
          formData.append("image_url", imageUrl); 

          return fetch("https://hotel-backend-arcx.onrender.com/hotels/", {
              method: "POST",
              body: formData,
          });
      } else {
          alert("Image upload failed!");
          throw new Error("Image upload failed!");
      }
  })
  .then(response => response.json())
  .then(data => {
      alert("Hotel added successfully!");
      console.log(data);
  })
  .catch(error => {
      console.error("Error:", error);
      alert("Something went wrong!");
  });
};











//   const handleHotel = (event) => {
//     event.preventDefault();
    
//     const address = document.getElementById("address-name").value;
//     const rooms = document.getElementById("rooms-name").value;
//     const name = document.getElementById("name-name").value;
//     const district = document.getElementById("districts").value;
//     const description = document.getElementById("description-name").value;
//     const price = document.getElementById("price-night-name").value;
//     const imageInput = document.getElementById("image");
//     console.log(imageInput);

//     if (!imageInput) {
//         alert("Please select an image!");
//         return;
//     }

//     let imageUrl = '';

//         const imgFormData = new FormData();
//         imgFormData.append('image', imageInput);

//         const imgbbResponse =fetch('https://api.imgbb.com/1/upload?key=91eb0ab92307af61f7bffe3b9d728952', {
//             method: 'POST',
//             body: imgFormData
//         });

//         const imgbbData = imgbbResponse.json();
//         console.log(imgbbData);
//         if (imgbbData.status === 200) {
//             imageUrl = imgbbData.data.url;
        
//         } else {
//             alert('Image upload failed!');
//             return;
//         }
//         const formData = new FormData();
//         formData.append("hotel_name", name);
//         formData.append("address", address);
//         formData.append("available_room", rooms);
//         formData.append("district_names", district);
//         formData.append("description", description);
//         formData.append("price_per_night", price);
//         formData.append("image_url", imageUrl); 

//         const response =fetch("http://127.0.0.1:8000/hotels/", {
//             method: "POST",
//             body: formData,
//         });

//         const data =response.json();
//         alert("Hotel added successfully!");
//         console.log(data);
  
// };












  const loadDistrictsForForm = () => {
    fetch("https://hotel-backend-arcx.onrender.com/district/")
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
    fetch(`https://hotel-backend-arcx.onrender.com/hotels/${hotelId}/`, {
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