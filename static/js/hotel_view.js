const baseURL = "https://hotel-backend-3ybx.vercel.app/hotels/";

const loadServices = (search) => {
  console.log("Search term:", search);
  const url =
    search && search.trim() !== ""
      ? `${baseURL}?search=${search}`
      : `${baseURL}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayService(data))
    .catch((error) => console.log(error));
};

const allhotels = () => {
  fetch(baseURL)
    .then((res) => res.json())
    .then((data) => hotelName(data));
};
loadServices();
allhotels();

const displayService = (hotels) => {
  const parent = document.getElementById("service-container");
  parent.innerText = "";
  if (!hotels || hotels.length === 0) {
    parent.innerHTML =
      '<h class="text-center fs-3 fw-bold">Hotel Not Found.</h1>';
    return;
  }
  hotels.forEach((hotel) => {
    const li = document.createElement("li");
    const imageUrl = hotel.image_url.startsWith("http")
      ? hotel.image_url
      : `${baseURL}${hotel.image_url}`;
    const descriptionWords =
      hotel.description.split(" ").slice(0, 10).join(" ") +
      (hotel.description.split(" ").length > 10 ? "..." : "");
    const namenWords =
      hotel.hotel_name.split(" ").slice(0, 2).join(" ") +
      (hotel.description.split(" ").length > 10 ? "..." : "");
    const addressWords =
      hotel.address.split(" ").slice(0, 5).join(" ") +
      (hotel.description.split(" ").length > 10 ? "..." : "");

    li.innerHTML = `
      <div class="card border-1 rounded-3">
        <div class="ratio ratio-16x9">
          <img src="${imageUrl}" class="card-img-top" alt="Hotel Image" />
        </div>
        <div class="card-body p-4 d-flex flex-column">
          <h2 class="hotel-title fw-bold mb-3 text-black">${namenWords}</h2>
          <h6 class="hotel-address text-muted mb-2">
            <i class="bi bi-geo-alt-fill text-danger"></i> ${addressWords}
          </h6>
          <div class="d-flex align-items-baseline mb-3">
            <h5 class="hotel-price fw-bold text-success me-2"> $${hotel.price_per_night} </h5>
            <span class="fw-bold text-muted">/per room</span>
          </div>
          <p class="hotel-description text-secondary">${descriptionWords}</p>
          <p class="hotel-description text-secondary">${hotel.district_name}</p>
        </div>
        <div class="card-footer d-flex justify-content-between bg-light">
          <a href="hotel_view.html?id=${hotel.id}" class="btn btn-outline-secondary w-50 me-2" data-id="${hotel.id}">Details</a>
          <a href="booking.html?id=${hotel.id}" class="btn btn-secondary w-50" data-id="${hotel.id}">Booking</a>
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
  }, 300); 
};

const loadDistrict = () => {
  fetch("https://hotel-backend-3ybx.vercel.app/district/")
    .then((res) => res.json())
    .then((data) => {
      const parent = document.getElementById("district");

      data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.district_name; 
        option.textContent = item.district_name; 
        parent.appendChild(option);
      });

      parent.addEventListener("change", (event) => {
        const selectedDistrict = event.target.value;
        console.log("Selected District:", selectedDistrict); 
        loadServices(selectedDistrict); 
      });
    });
};

loadDistrict();

const loadHotelDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const hotelId = params.get("id");


  fetch(`https://hotel-backend-3ybx.vercel.app/hotels/${hotelId}`)
    .then((res) => res.json())
    .then((data) => displayHotelDetails(data))
    .catch((err) => console.log(err));
};

const displayHotelDetails = (hotel) => {
  const parent = document.getElementById("hotel-details-container");


  const div = document.createElement("div");
  div.classList.add("card", "h-150", "hotel-card");
  div.style.height = "55vh"; 


  div.innerHTML = `
    <div class="card-body  d-flex flex-column ">
      <h2 class="hotel-title text-black fw-bold mb-3 p-1">${hotel.hotel_name}</h2>
      <h4 class="hotel-address text-black mb-1 p-1 fw-bold">${hotel.address}</h4>
      <h5>⭐⭐⭐⭐ 4.0 <span>⚅</span> 102  order <span class="text-success">In stock</span></h5>
      <div class="d-flex ">
        <h5 class="hotel-price text-balck fw-bold"> $${hotel.price_per_night} </h3>
        <span class="fw-bold text-muted ">/per room</span>
      </div> 
        <span class="fw-bold text-muted ">Available Room :${hotel.available_room}</span>
      <p class="hotel-description text-secondary mb-4 fw-bold">${hotel.description}</p>
      <p class="hotel-description text-secondary mb-4 fw-bold text-black">${hotel.district_name}</p>
    </div>
  `;

  parent.appendChild(div);

  const hotelNameInput = document.getElementById("hotel_names");
  hotelNameInput.value = hotel.id;
};
loadHotelDetails();

const hotel_view_booked = (event) => {
  event.preventDefault();
  const user_id = localStorage.getItem("user_id"); 
  console.log("Logged-in User ID:", user_id);
  if (user_id) {
    const hotel_name = document.getElementById("hotel_names").value;
    const room = document.getElementById("rooms").value;
    const in_date = document.getElementById("in_dates").value;
    const out_date = document.getElementById("out_dates").value;
    const total_amount = document.getElementById("total_amount").value;

   
    const booked = {
      hotel_name,
      room,
      in_date,
      out_date,
      total_amount,
      // payment,
    };
    
    console.log(booked);
    fetch("https://hotel-backend-3ybx.vercel.app/bookeds/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booked),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        swal.fire({
          title: "Success!",
          text: "Hotel Booking Successfully.",
          icon: "success",
          confirmButtonText: "Great!",
        });
      });
  } else {
    swal
      .fire({
        title: "Error!",
        text: "Please Login Your Account",
        icon: "error",
        confirmButtonText: "Okay",
      })
      .then(() => {
        window.location.href = "login.html";
      });
  }
};
  