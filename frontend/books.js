document.addEventListener('DOMContentLoaded', function() {
    console.log(4)
    document.getElementById('addBookForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect the input values
        const description = document.getElementById('conferenceContent').value;
        const subDescription = document.getElementById('jouDoi').value;
        const doiLink = document.getElementById('doiLink').value;


        // Create the new book entry
        const newBook = document.createElement('div');
        newBook.innerHTML = `
            <div>
                <strong>${description}</strong>${subDescription ? `, ${subDescription}` : ''}
                ${subDescription ? `<p class="text-danger">${subDescription}</p>` : ''}
            </div>
            ${doiLink ? `
                <div class="mb-4">
                    <strong>DOI: </strong>
                    <a class="read fw-bold" href="${doiLink}" target="_blank">${doiLink}</a>
                </div>` : ''}
        `;
        console.log(newBook)

        // Append the new book entry to the books content
        document.querySelector('#booksContent .academic-block').appendChild(newBook);

        // Optionally, clear the form
        document.getElementById('addBookForm').reset();
    });
});