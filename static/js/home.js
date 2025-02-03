
const baseURL = "https://hotel-backend-cmcn.onrender.com/hotels/";
const loadServices = (search) => {
  console.log('Search term:', search);
  const url = search && search.trim() !== '' ? `${baseURL}?search=${search}` : `${baseURL}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((error)=>console.log(error))
};

const allhotels = () => {
  fetch(baseURL)
    .then((res) => res.json())
    .then((data) => hotelName(data))
    .catch((error)=>console.log(error))
};
loadServices();
allhotels();



const displayService = (hotels) => {
  console.log(hotels);
  const parent = document.getElementById("service-container");
  parent.innerHTML = ''; // Clear previous results

  if (!hotels || hotels.length === 0) {
    parent.innerHTML = '<h2 class="text-center text-danger fw-bold mt-4">Hotel Not Found.</h2>';
    return;
  }

  hotels.forEach((hotel) => {
    const li = document.createElement("li");
    li.classList.add("list-unstyled"); // Remove default list styles

    const imageUrl = hotel.image.startsWith("http") ? hotel.image : `${baseURL}${hotel.image}`;

    // Ensure description is a string and trim excess spaces
    const descriptionText = (hotel.description || "").trim();

    // Split the description by spaces and get the first 10 words
    const descriptionWords = descriptionText.split(/\s+/).slice(0, 10).join(" ") + "...";

    li.innerHTML = `
      <div class="card hotel-card shadow-lg border-0 overflow-hidden">
        <div class="hotel-img-container">
          <img src="${imageUrl}" class="card-img-top hotel-img" alt="Hotel Image">
        </div>
        <div class="card-body d-flex flex-column">
          <h3 class="hotel-title fw-bold text-black">${hotel.hotel_name}</h3>
          <h5 class="hotel-address text-muted mb-2">
            <i class="bi bi-geo-alt-fill text-danger"></i> ${hotel.address}
          </h5>
          <div class="d-flex align-items-baseline mb-3">
            <h4 class="hotel-price fw-bold text-success me-2">$${hotel.price_per_night}</h4>
            <span class="fw-bold text-muted">/per room</span>
          </div>
          <p class="hotel-description text-secondary">${descriptionWords}</p>
          <p class="hotel-district text-primary fw-bold">${hotel.district_name}</p>
   
        </div>
        <div class="card-footer d-flex justify-content-between bg-light">
          <a href="hotel_view.html?id=${hotel.id}" class="btn btn-outline-primary w-50 me-2">Details</a>
          <a href="booking.html?id=${hotel.id}" class="btn btn-primary w-50">Booking</a>
        </div>
     
      </div>
    `;
    
    parent.appendChild(li);
  });
};





let debounceTimer;
const handleSerch = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const value = document.getElementById("search").value.trim();
    loadServices(value);
  }, 300); // Delay in milliseconds
};





const loadDistrict = () => {
  fetch("https://hotel-backend-cmcn.onrender.com/district/")
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("district");

      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.district_name; // Set the value of the option
        option.textContent = item.district_name; // Set the display text
        parent.appendChild(option);
      });

      // Add an event listener for the select element
      parent.addEventListener("change", (event) => {
        const selectedDistrict = event.target.value;
        console.log("Selected District:", selectedDistrict); // Debugging log
        loadServices(selectedDistrict); // Call loadServices with the selected value
      });
    })

};

loadDistrict();





const loadHotelDetails = () => {
  // Get hotel ID from query parameters
  const params = new URLSearchParams(window.location.search);
  const hotelId = params.get("id");

  // Fetch hotel details
  fetch(`https://hotel-backend-cmcn.onrender.com/hotels/${hotelId}`)
    .then((res) => res.json())
    .then((data) => displayHotelDetails(data))
    .catch((err) => console.log(err));
    
};



const displayHotelDetails = (hotel) => {
  const parent = document.getElementById("hotel-details-container");

  // Create hotel card container
  const div = document.createElement("div");
  div.classList.add("card", "h-150", "hotel-card");
  div.style.height = "52vh"; // Set height to 50% of the viewport

  // Hotel card content
  div.innerHTML = `
    <div class="card-body p-4 d-flex flex-column overflow-auto">
      <h2 class="hotel-title text-black fw-bold mb-3 p-1">${hotel.hotel_name}</h2>
      <h4 class="hotel-address text-black mb-1 p-1 fw-bold">${hotel.address}</h4>
      <h5>⭐⭐⭐⭐ 4.0 <span>⚅</span> 102  order <span class="text-success">In stock</span></h5>
      <div class="d-flex ">
        <h5 class="hotel-price text-balck fw-bold"> $${hotel.price_per_night} </h3>
        <span class="fw-bold text-muted ">/per room</span>
      </div> 
      <p class="hotel-description text-secondary mb-4 fw-bold">${hotel.description}</p>

      <p class="hotel-description text-secondary mb-4 fw-bold text-black">${hotel.district_name}</p>
    </div>
  `;
  // Append to parent container
  parent.appendChild(div);
  // Set hotel name to input field
  const hotelNameInput = document.getElementById("hotel_name");
  hotelNameInput.value = hotel.hotel_name;
};
loadHotelDetails();

const getValue = (id) => {
    const value = document.getElementById(id); // Trim to remove extra spaces
    return value;
  };
  



