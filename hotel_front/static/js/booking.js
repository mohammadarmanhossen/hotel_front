

const hotel=()=>{
  fetch("https://hotel-backend-cmcn.onrender.com/hotels/")
  .then((res)=>res.json())
  .then((data)=>console.log(data))

}

const hotelName=(hotels)=>{
hotels.forEach((hotel)=>{
  const parent=document.getElementById("Hotel_booked")
  const option=document.createElement("option")
  option.value=hotel.id
  option.innerText=`
  ${hotel.hotel_name}
  `;
  parent.appendChild(option);
});

}
// hotelName()


const hotelBooked = (event) => {
event.preventDefault();
console.log("Hello World");
const user_id = localStorage.getItem("user_id"); // Get the user ID
console.log("Logged-in User ID:", user_id);
if(user_id){

const hotel_name = getValue("Hotel_booked").value;
const room = getValue("Room").value;
const in_date = getValue("start_date").value;
const out_date = getValue("end_date").value;
const payment = getValue("payment_method").value;

const info = {
  hotel_name,
  room,
  in_date,
  out_date,
  payment,
};
console.log(info);

// Validate form fields before submitting
if (!hotel_name || !room || !in_date || !out_date || !payment) {
  alert("Please fill in all required fields.");
  return;
}

// Submit data to the API
fetch("https://hotel-backend-cmcn.onrender.com/bookeds/", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(info),
})
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error("Failed to book the hotel");
  })
  .then((data) => {
    console.log(data);
    alert("Succesfully Booking Hotel")
  });
}
else{
  alert("place login")
  window.location.href = "login.html";
}
};





const hotelReview=(event)=>{
  event.preventDefault();
  const user_id = localStorage.getItem("user_id"); // Get the user ID

  if(user_id){
    const body=document.getElementById("review_body").value.trim();
    const rating=document.getElementById("rating_body").value.trim();
    const reviewData={
      body,
      rating,
    }
    console.log(reviewData);
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
    fetch("https://hotel-backend-cmcn.onrender.com/reviews/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Failed to book the hotel");
      })
      .then((data) => {
        console.log("Booking successful:", data);
      })
    }
    else{
      alert("Place Login Your Account")
      window.location.href = "login.html";
    }
  
}




