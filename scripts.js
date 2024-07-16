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

  
});
