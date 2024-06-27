document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addAwardForm');
    const awardsTableBody = document.getElementById('awardsTableBody');
    const project = document.getElementById('addProjectForm');
    const projectTableBody = document.getElementById('table');

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
    //handel project submission
    project.addEventListener('submit', (event) => {
        event.preventDefault();

        const newProject = {
            investigator: project.investigator.value,
            foreign_collaborator: project.name.value,
            project_Title: project.project_title.value,
            funding_Agency:project.founding_agency.value,
            funds:project.funds.value,
        };
        console.log(newProject);

        fetch('http://localhost:1335/projects/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        })
        .then(response => response.json())
        .then(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${data.investigator}</th>
                <td>${data.foreign_collaborator}</td>
                <td>${data.project_Title}</td>
                <td>${data.funding_Agency}</td>
                <td>${data.funds}</td>

            `;
            projectTableBody.appendChild(row);
            project.reset();
            
        })
        .catch(error => console.error('Error:', error));
    });
});
