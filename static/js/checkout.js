let totalAmount = 0; 
const loadReview = () => {
    let totalBookings = 0; 
   
  
    fetch("https://hotel-backend-3ybx.vercel.app/bookeds/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const tableBody = document.getElementById("hotelBookedtotal");
        tableBody.innerHTML = ""; 
  
        data.forEach((item) => {
          totalAmount += item.total_amount;
          totalBookings += 1;
  

            const row = document.createElement("tr");
          row.innerHTML = `
  
          `;
          tableBody.appendChild(row);
        });
  
        document.getElementById("totalAmountDisplay").innerText = `Total Amount: ${totalAmount}$`;
        document.getElementById("totalBookings").innerText = `Total Hotel : ${totalBookings}`;
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };
  
  

  document.getElementById('payButton').addEventListener('click', function() {
    const user_id = localStorage.getItem("user_id");
    const name = document.getElementById("name").value || "Default Name";
    const email = document.getElementById("email").value || "default@email.com";

    

    fetch("http://127.0.0.1:8000/payment/create_payment/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user: user_id,
            name: name,
            email: email,
            total_amount: totalAmount,
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












