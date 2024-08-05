// Register Form Submission
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('https://taimoor-khan-zxmp.onrender.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });

    const data = await response.json();
    if (data.status === 'ok') {
        alert('Registration successful!');
        window.location.href = 'login.html';
    } else {
        alert(data.error);
    }
});

// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('https://taimoor-khan-zxmp.onrender.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();
    if (data.status === 'ok') {
        alert('Login successful!');
        // You can save the token in localStorage or cookies and redirect to another page if needed
        localStorage.setItem('token', data.user);
        window.location.href = '../update.html'; // Redirect to a dashboard or another page
    } else {
        alert('Login failed: ' + data.error);
    }
});
