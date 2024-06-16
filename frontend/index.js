document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addAwardForm');
    const awardsTableBody = document.getElementById('awardsTableBody');

    // Fetch and display existing awards
    fetch('https://taimoor-khan.onrender.com/api/awards/read')
        .then(response => response.json())
        .then(data => {
            data.forEach(award => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${award.year}</th>
                    <td>${award.name}</td>
                    <td>${award.organisation}</td>
                `;
                awardsTableBody.appendChild(row);
            });
        });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const newAward = {
            year: form.year.value,
            name: form.name.value,
            organisation: form.organisation.value
        };

        fetch('https://taimoor-khan.onrender.com/api/awards/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newAward)
        })
        .then(response => response.json())
        .then(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${data.year}</th>
                <td>${data.name}</td>
                <td>${data.organisation}</td>
            `;
            awardsTableBody.appendChild(row);
            form.reset();
            
        })
        .catch(error => console.error('Error:', error));
    });
});
