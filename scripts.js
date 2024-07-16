
  


document.addEventListener('DOMContentLoaded', function() {
    const sellMilkForm = document.getElementById('sellMilkForm');
    if (sellMilkForm) {
        sellMilkForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const buyerId = document.getElementById('buyerId').value;
            const buyerName = document.getElementById('buyerName').value;
            const quantity = document.getElementById('quantity').value;
            const paymentMethod = document.getElementById('paymentMethod').value;
            const milkType = document.getElementById('milkType').value;
            const shift = document.getElementById('shift').value;
            const useCurrentDateTime = document.getElementById('useCurrentDateTime').checked;
            let saleDate = document.getElementById('saleDate').value;

            if (useCurrentDateTime || !saleDate) {
                saleDate = new Date().toLocaleString();
            }

            const transactionId = `TXN${Date.now()}`;

            // Create a JavaScript object for the sale
            const saleData = {
                transactionId: transactionId,
                buyerId: buyerId,
                buyerName: buyerName,
                quantity: quantity,
                paymentMethod: paymentMethod,
                milkType: milkType,
                shift: shift, // Include the shift
                saleDate: saleDate // Include the sale date and time
            };

            fetch('http://127.0.0.1:3000/saveMilkSales', {
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
                alert(`Milk Sold!\n\nTransaction ID: ${transactionId}\nBuyer ID: ${buyerId}\nBuyer: ${buyerName}\nQuantity: ${quantity} liters\nPayment: ${paymentMethod}\nMilk Type: ${milkType}\nShift: ${shift}\nDate: ${saleDate}`);
                
                // Reset the form
                document.getElementById('sellMilkForm').reset();
            })
            .catch(error => {
                console.error('Error saving data:', error);
                // Handle error scenario
                alert('Failed to save data. Please try again later.');
            });
        });
    }
});

