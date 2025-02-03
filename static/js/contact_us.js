
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
        Swal.fire({
          title: 'successfully !',
           text: 'You successfully Send Messege.',
          icon: 'success',
          confirmButtonText: 'OK'
        })

      })
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
  