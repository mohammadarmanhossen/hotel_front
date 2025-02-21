
const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get('hotel_id');
const amount = urlParams.get('amount');
const quantity = urlParams.get('quantity');
console.log(hotelId,amount,quantity);


document.getElementById("hotelroom").innerText=`Room : ${quantity}`
document.getElementById("amount").innerText=`Amount : ${amount}$`

document.getElementById('payButton').addEventListener('click', function() {
    const user_id = localStorage.getItem("user_id");
    const name = document.getElementById("name").value || "Default Name";
    const email = document.getElementById("email").value || "default@email.com";
    
    fetch("https://hotel-backend-arcx.onrender.com/payment/create_payment/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user_id,
            name: name,
            email: email,
            total_amount: amount,
            hotelId: hotelId,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.payment_url) {
            window.location.href = data.payment_url;  
        } else {
            alert("Payment session creation failed.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error with the payment process.");
    });
});














