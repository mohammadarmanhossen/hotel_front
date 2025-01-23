
const contact = () => {
  const user_id = localStorage.getItem("user_id"); // Get the user ID
  console.log("Logged-in User ID:", user_id);
  if(user_id){


    const subject = document.getElementById('subject_name').value.trim();
    const message = document.getElementById('message_name').value;
    const contactData = {
      subject,
      message,
  
    };
    console.log(contactData);
    fetch("https://hotel-backend-cmcn.onrender.com/client/contact/",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show()
      })
    }
    else{
      alert("Please login your account");
      window.location.href = "login.html";
    }
  };
  