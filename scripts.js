document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Placeholder for login logic
        if (username === 'admin' && password === 'password') {
            alert('Login successful!');
            window.location.href = 'home.html';
        } else {
            alert('Invalid username or password');
        }
    });

    document.getElementById('sellMilkForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const buyerId = document.getElementById('buyerId').value;
        const buyerName = document.getElementById('buyerName').value;
        const quantity = document.getElementById('quantity').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const milkType = document.getElementById('milkType').value;
        const transactionId = `TXN${Date.now()}`;

        // Create a JavaScript object for the sale
        const saleData = {
            transactionId: transactionId,
            buyerId: buyerId,
            buyerName: buyerName,
            quantity: quantity,
            paymentMethod: paymentMethod,
            milkType: milkType
        };

        // Send the sale data to server-side endpoint
        fetch('/saveMilkSales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saleData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data saved:', data);
            // Display confirmation to the user or handle next steps
            alert(`Milk Sold!\n\nTransaction ID: ${transactionId}\nBuyer ID: ${buyerId}\nBuyer: ${buyerName}\nQuantity: ${quantity} liters\nPayment: ${paymentMethod}\nMilk Type: ${milkType}`);
            
            // Reset the form
            document.getElementById('sellMilkForm').reset();
        })
        .catch(error => {
            console.error('Error saving data:', error);
            // Handle error scenario
            alert('Failed to save data. Please try again later.');
        });
    });
});
