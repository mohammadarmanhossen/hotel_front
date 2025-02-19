

const hotel=()=>{
  fetch("http://127.0.0.1:8000/hotels/")
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





const hotelBooked = (event) => {
event.preventDefault();
const user_id = localStorage.getItem("user_id");
console.log("Logged-in User ID:", user_id);
if(user_id){

const hotel_name = getValue("Hotel_booked").value;
const room = getValue("Room").value;
const in_date = getValue("start_date").value;
const out_date = getValue("end_date").value;
const total_amount=getValue("amount");

const info = {
  hotel_name,
  room,
  in_date,
  out_date,
  total_amount,
};
console.log("hello ",info);


if (!hotel_name || !room || !in_date || !out_date || !total_amount) {
  alert("Please fill in all required fields.");
  return;
}

// Submit data to the API
fetch("http://127.0.0.1:8000/bookeds/", {
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
    
    Swal.fire({
      title: 'Success!',
      text: 'Hotel Booking Successfully.',
      icon: 'success',
      confirmButtonText: 'Great!',
    })
  });
}
else{
  Swal.fire({
  title: 'Error!',
  text: 'Login Your Account',
  icon: 'error',
  confirmButtonText: 'Cool'

  }).then(()=>{
     window.location.href="login.html";
  })
}
};







const hotelBookeds = (event) => {
  event.preventDefault();
  const user_id = localStorage.getItem("user_id"); // Get the user ID
  console.log("Logged-in User ID:", user_id);
  if(user_id){
  
  const hotel_name = getValue("Hotel_booked").value;
  const room = getValue("Room").value;
  const in_date = getValue("start_date").value;
  const out_date = getValue("end_date").value;
  const total_amount = document.getElementById("amount").value.trim();
  
  const info = {
    hotel_name,
    room,
    in_date,
    out_date,
    total_amount,
  };
  console.log("hello ",info);
  
  // Validate form fields before submitting
  if (!hotel_name || !room || !in_date || !out_date || !total_amount) {
    alert("Please fill in all required fields.");
    return;
  }
  
  // Submit data to the API
  fetch("http://127.0.0.1:8000/bookeds/", {
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
      
      Swal.fire({
        title: 'Success!',
        text: 'Hotel Booking Successfully.',
        icon: 'success',
        confirmButtonText: 'Great!',
      })
    });
  }
  else{
    Swal.fire({
    title: 'Error!',
    text: 'Login Your Account',
    icon: 'error',
    confirmButtonText: 'Cool'
  
    }).then(()=>{
       window.location.href="login.html";
    })
  }
  };
  
  
  






const hotelReview=(event)=>{
  event.preventDefault();
  const user_id = localStorage.getItem("user_id"); // Get the user ID

  if(user_id){
    const body=document.getElementById("review_body").value.trim();
    const rating=document.getElementById("rating_body");
    const reviewData={
      user_id,
      body,
      rating,
    }
    console.log(reviewData);
    Swal.fire({
      title: 'Success!',
      text: 'Hotel Review Successfully.',
      icon: 'success',
      confirmButtonText: 'Great!',
    })
    fetch("http://127.0.0.1:8000/reviews/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Failed to book the hotel");
      })
      .then((data) => {
       console.log(data);
      })
    }
    else{
      swal.fire({
        title: 'Error!',
        text: 'Please Login Your Account',
        icon: 'error',
        confirmButtonText: 'Okay',
        
      }).then(()=>{
        window.location.href = "login.html";
      })
    }
  
}




