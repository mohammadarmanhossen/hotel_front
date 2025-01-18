let totalAmount = 0;

  // Function to handle deposit
  function depositAmount() {
    const depositInput = document.getElementById('depositAmount');
    const amountDisplay = document.getElementById('amount-display');

    // Get the deposit amount value
    const depositValue = parseInt(depositInput.value);

    // Check if the deposit value is valid
    if (depositValue && depositValue > 0) {
      // Add deposit to the total amount
      totalAmount += depositValue;

      // Update the displayed total amount
      amountDisplay.textContent = totalAmount;

      // Clear the input field
      depositInput.value = '';

      alert(`Successfully deposited ${depositValue}. Your new total is ${totalAmount}.`);
    } else {
      alert('Please enter a valid deposit amount greater than 0.');
    }
  }