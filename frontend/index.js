document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addAwardForm');
    const awardsTableBody = document.getElementById('awardsTableBody');
    const projectTableBody = document.getElementById('projectTableBody');
    const projectForm = document.getElementById('addProjectForm');
    const adminExpBody = document.getElementById('adminExpBody');
    const adminExpForm = document.getElementById('addadministrativeForm');
    const journalsBody = document.getElementById('journalsContainer');
    const journalForm = document.getElementById('addjournalForm');
    const conferenceForm = document.getElementById('addConferenceForm');
    const conferenceBody = document.getElementById('conferenceBody');
    const booksbody = document.getElementById('booksbody');
    const booksForm = document.getElementById('addBookForm');
    const bTechBody = document.getElementById('b.techBody');
    const bTeckForm = document.getElementById('addbTechForm');
    const mTechTableBody = document.getElementById('mTechThesisBody');
    const mTechForm = document.getElementById('addmTechForm');
    const phdthesisBody = document.getElementById('phdthesisBody');
    const phdForm = document.getElementById('addphdtForm');
    const reasearchForm = document.getElementById('addreserchsclForm');
    const foreignCollaborations = document.querySelector('#foreignCollaborations');
    const indianCollaborations = document.querySelector('#indianCollaborations');
    const collaborationContent = document.getElementById('collaborationContent');
    const ieeeContent = document.getElementById('ieeeTableBody');
    const serviceForm = document.getElementById('addserviceForm');
    const talksForm = document.getElementById('addInvitedTalkForm');
    const talksList = document.getElementById('talksList');
    const ongoingProjectsBody = document.getElementById('ongoingProjectsBody');
    const completedProjectsBody = document.getElementById('completedProjectsBody');
    const addMembershipForm = document.getElementById('addMembershipForm');
    const membershipsTableBody = document.getElementById('membershipsTableBody');
    const editorialbody = document.getElementById('editorialContainer');
    const addEditorialsForm = document.getElementById('addEditorials');
    const patent  = document.getElementById('patentContent');
    const addPatent = document.getElementById('addPatent');
    const addBookChapForm = document.getElementById('addBookChapForm');
    const bookChBody = document.getElementById('bookChContent')
    // if (!table) {
    //     console.error('Error: Table with id "ieeeContent" not found.');
    //     return;
    // }

    // console.log(bTechBody)
    // console.log(adminExpForm);
    
    //     console.log(2+3)
    if(awardsTableBody){
        
        fetch('https://taimoor-khan-zxmp.onrender.com/api/awards/read')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.year - b.year);
            // console.log('Data fetched:', data);
            data.forEach(award => {
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${award.year}</th>
                    <td>${award.name}</td>
                    <td>${award.organisation}</td>
                `;
                // console.log('row', row);
                awardsTableBody.insertBefore(row, awardsTableBody.firstChild);
            });
        });
    }

    // Handle form submission
    if(form){
        form.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const newAward = {
                year: form.year.value,
                name: form.name.value,
                organisation: form.organisation.value
            };
            // console.log("newAward",newAward);
            window.location.href = 'index.html';
            
            fetch('https://taimoor-khan-zxmp.onrender.com/api/awards/add', {
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
                awardsTableBody.insertBefore(row, awardsTableBody.firstChild);
                window.location.href = 'index.html';
                // form.reset();
            })
            .catch(error => console.error('Error:', error));
        });
    }

    
    //handel project submission
    if(projectTableBody){
        fetch('https://taimoor-khan-zxmp.onrender.com/api/projects/read')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // console.log('Projects Data fetched:', data);
            data.forEach((project,index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                   
                    <td>${project.investigator}</td>
                    <td>${project.foreign_collaborator}</td>
                    <td>${project.project_Title}</td>
                    <td>${project.funding_Agency}</td>
                    <td>${project.funds}</td>
                `;
                // console.log(project.status);
                // console.log(ongoingProjectsBody)
                if (project.status.toLowerCase() === 'ongoing') {
                    ongoingProjectsBody.insertBefore(row, ongoingProjectsBody.firstChild);
                } else {
                    completedProjectsBody.insertBefore(row, completedProjectsBody.firstChild);
                }
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
    }


    if(projectForm){
        projectForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const newProject = {
                investigator: projectForm.investigator.value,
                foreign_collaborator: projectForm.foreignCollab.value,
                project_Title: projectForm.title.value,
                funding_Agency:projectForm.founding.value,
                funds:projectForm.funds.value,
                status:projectForm.status.value,
            };
            // console.log("newProject",newProject);
            window.location.href = 'index.html';
    
            fetch('https://taimoor-khan-zxmp.onrender.com/api/projects/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProject)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Project added:', data);
                const row = document.createElement('tr');
                row.innerHTML = `
                    
                    <td scope="row">${data.investigator}</td>
                    <td></td>
                    <td>${data.foreign_collaborator}</td>
                    <td>${data.project_Title}</td>
                    <td>${data.funding_Agency}</td>
                    <td>${data.funds}</td>
    
                `;
                console.log(data.status)
                if (data.status.toLowerCase() === 'ongoing') {
                    ongoingProjectsBody.insertBefore(row, ongoingProjectsBody.firstChild);
                } else {
                    completedProjectsBody.insertBefore(row, completedProjectsBody.firstChild);
                }
            
               
                projectForm.reset();
                
                
            })
            .catch(error => console.error('Error:', error));
            });
    }

    if(adminExpBody){
        fetch('https://taimoor-khan-zxmp.onrender.com/api/administratives/read')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // console.log("response",response);
            return response.json();
        })
        .then(data => {
            // console.log('adminExp Data fetched:', data);
            data.forEach((adminExp,index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    
                    <td>${adminExp.institute}</td>
                    <td>${adminExp.designation}</td>
                    <td>${adminExp.from}</td>
                    <td>${adminExp.to}</td>
                    <td>${adminExp.duration}</td>
                `;
                // console.log(row);
                adminExpBody.insertBefore(row, adminExpBody.firstChild);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
    }

    if(adminExpForm){
        adminExpForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const newAdminExp = {
                institute: adminExpForm.institute.value,
                designation: adminExpForm.designation.value,
                from: adminExpForm.from.value,
                to:adminExpForm.to.value,
                duration:adminExpForm.duration.value,
            };
            console.log("newAdminExp",newAdminExp);
            window.location.href = 'index.html';
    
            fetch('https://taimoor-khan-zxmp.onrender.com/api/administratives/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAdminExp)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log('newAdminExp added:', data);
                const row = document.createElement('tr');
                row.innerHTML = `
                    
                    <td >${data.institute}</td>
                    <td>${data.designation}</td>
                    <td>${data.from}</td>
                    <td>${data.to}</td>
                    <td>${data.duration}</td>
    
                `;
                console.log("row",row)
                projectTableBody.insertBefore(row, adminExpBody.firstChild);
               
                projectForm.reset();
                
                
            })
            .catch(error => console.error('Error:', error));
            });
    }
    
        // Fetch and display existing journals
        if (journalsBody) {
            fetch('https://taimoor-khan-zxmp.onrender.com/api/journals/read')
                .then(response => response.json())
                .then(data => {
                    // Organize data by year
                    data.sort((a, b) => b.year - a.year);
                    // console.log(data);
                    const journalsByYear = {};
                    data.forEach(journal => {
                        
                        if (!journalsByYear[journal.year]) {
                            journalsByYear[journal.year] = [];
                        }
                        journalsByYear[journal.year].push(journal);
                    });
                    // Generate HTML for each year
                    for (const [year, journals] of Object.entries(journalsByYear)) {
                        const yearHeader = document.createElement('div');
                        yearHeader.classList.add('h4');
                        yearHeader.textContent = year;
    
                        const journalEntries = journals.map((journal, index) => {
                            return `
                                <div class="academic-block mb-4">
                                    <div>
                                        <strong>${index + 1}.</strong> ${journal.description}
                                    </div>
                                    <div class="mb-4">
                                        <strong>DOI: </strong>
                                        <a class="read fw-bold" href="${journal.doiLink}" target="_blank">${journal.doiLink}</a>
                                    </div>
                                </div>
                            `;
                        }).join('');
    
                        journalsBody.insertAdjacentHTML('afterbegin', yearHeader.outerHTML + journalEntries);
                    }
                })
                .catch(error => console.error('Error fetching journals:', error));
        }
    
        // Handle form submission
        if (journalForm) {
            // console.log("journal form")
            journalForm.addEventListener('submit', (event) => {
                event.preventDefault();
                // console.log("journal form submission")
                const newJournal = {
                    year: journalForm.year.value,
                    description: journalForm.description.value,
                    doiLink: journalForm.doiLink.value,
                };
                // console.log("newJournal",newJournal);
                window.location.href = 'index.html';
                fetch('https://taimoor-khan-zxmp.onrender.com/api/journals/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newJournal)
                })
                .then(response => response.json())
                .then(data => {
                    // console.log("Journal added:", data.doi);
                    data.sort((a, b) => b.year - a.year);
                    const journalBlock = document.createElement('div');
                    journalBlock.classList.add('academic-block', 'mb-4');
                    journalBlock.innerHTML = `
                        <div class="h4">${data.year}</div>
                            <div>
                                <strong>${data.description}</strong>
                            </div>
                            <div class="mb-4">
                                <strong>DOI: </strong>
                                <a class="read fw-bold" href="${data.doi}" target="_blank">${data.doi}</a>
                            </div>
                        `;
                    journalsBody.style.borderLeft = '0';
                    journalsBody.style.paddingLeft = '0px';
                    journalsBody.appendChild(journalBlock);
                    journalForm.reset();
                    
                    let yearHeader = Array.from(journalsBody.querySelectorAll('.h4'))
                .find(header => header.textContent === data.year.toString());
            
                if (!yearHeader) {
                    yearHeader = document.createElement('div');
                    yearHeader.classList.add('h4');
                    yearHeader.textContent = data.year;
                    journalsBody.insertBefore(yearHeader, journalsBody.firstChild);
                }
                        
                    })
                .catch(error => console.error('Error:', error));
            });
        }
        if(conferenceBody){
            fetch('https://taimoor-khan-zxmp.onrender.com/api/conferences/read')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // console.log("response",response);
                return response.json();
            })
            .then(data => {
                let index = 58;
                // console.log('adminExp Data fetched:', data);
                data.forEach(conference => {
                    const conferenceBlock = document.createElement('div');
                    conferenceBlock.classList.add('academic-block', 'mb-4');
                    conferenceBlock.innerHTML = `
                        <div class="lucida-console h5 academic-name language mb-0">
                        ${index++}. ${conference.conferenceContent}
                        </div>
                        <div class="pub-authors mb-4"><span class="pub-author"> 
                                ${conference.subdescription}
                            </div>
                    `;
                    conferenceBlock.style.borderLeft = '0';
                    conferenceBlock.style.paddingLeft = '0px';
                    console.log(conferenceBlock);
                    conferenceBody.insertBefore(conferenceBlock, conferenceBody.firstChild);
                });
            })
            .catch(error => console.error('Error fetching projects:', error));
        }
    
        if(conferenceForm){
            conferenceForm.addEventListener('submit', (event) => {
                event.preventDefault();
        
                const newConference = {
                    conferenceContent: conferenceForm.conferenceContent.value,
                    subdescription: conferenceForm.subdescription.value,
                    
                };
                console.log("newConference",newConference);
                window.location.href = 'index.html';
        
                fetch('https://taimoor-khan-zxmp.onrender.com/api/conferences/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newConference)
                })
                .then(response => {    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                        console.log("conference data",data);
                        const conferenceBlock = document.createElement('div');
                        conferenceBlock.classList.add('academic-block', 'mb-4');
                        conferenceBlock.innerHTML = `
                            <div class="lucida-console h5 academic-name language mb-0">
                                    ${data.conferenceContent}
                            </div>
                            <div class="pub-authors mb-4"><span class="pub-author"> Taimoor Khan </span>and Partha
                                    ${data.subdescription}
                                </div>
                        `;
                        console.log(conferenceBlock);
                        conferenceBlock.style.marginLeft = '0';
                        conferenceBody.appendChild(conferenceBlock);
                        conferenceForm.reset();
                   
                    
                    
                })
                .catch(error => console.error('Error:', error));
                });
        }
        

    

        if(booksbody){
            const booksList = booksbody.querySelector('ul');
            fetch('https://taimoor-khan-zxmp.onrender.com/api/books/read')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // console.log("response",response);
                return response.json();
            })
            .then(data => {
                
                // console.log('book Data fetched:', data);
                data.forEach(book => {
                    const newBook = document.createElement('li');
                    // newBook.classList.add('academic-block','mb-4')

                    newBook.innerHTML =`
                        <div>
                            <strong>taimoor Khan</strong> ${book.author}, <strong>“${book.description}” ${book.name}</strong>, ${book.place} ${book.isbn ? `ISBN:${book.isbn} ${book.date}`:''} ${book.subdescription ? `<p class="text-danger">(${book.subdescription})</p>` : ''}
                            ${book.doiLink ? `
                            <div class="mb-4">
                                <strong>DOI: </strong>
                                <a class="read fw-bold" href="${book.doiLink}" target="_blank">${book.doiLink}</a>
                            </div>` : ''}
                        </div>
                    `;
                    booksList.insertBefore(newBook,booksList.firstChild);
                });
                
            })
            .catch(error => console.error('Error fetching projects:', error));
        }
            // Handle form submission
    if(booksForm){
        booksForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const newBook = {
                author:booksForm.author.value,
                description: booksForm.description.value,
                subdescription: booksForm.subdescription.value,
                doiLink: booksForm.doiLink.value,
                name:booksForm.name.value,
                place:booksForm.place.value,
                date:booksForm.date.value,
                isbn:booksForm.isbn.value,
            };
            // console.log('newbook',newBook);
            window.location.href = 'index.html';
            fetch('https://taimoor-khan-zxmp.onrender.com/api/books/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBook)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Book added:", data);
                const newBookElement = document.createElement('li');
                newBookElement.innerHTML = `
                    <div>
                        <strong>${data.author}</strong>, <strong>“${data.description}” ${data.name}</strong>  ${data.isbn ? `ISBN:${data.isbn} ${data.date}`:''}, ${data.place} <p class="text-danger">(${data.subDescription})</p>
                        ${data.doiLink ? `
                        <div class="mb-4">
                            <strong>DOI: </strong>
                            <a class="read fw-bold" href="${data.doiLink}" target="_blank">${data.doiLink}</a>
                        </div>` : ''}
                    </div>
                `;
                booksbody.insertBefore(newBookElement, booksbody.firstChild);
                booksForm.reset();
            })
            .catch(error => console.error('Error submitting book:', error));
        });
    }    

        if (bTechBody) {
            const thesisList = bTechBody.querySelector('ul'); // Adjust selector as needed
        
            fetch('https://taimoor-khan-zxmp.onrender.com/api/btechthesis/read')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // Sort by year in descending order
                    data.sort((a, b) => b.startyear - a.startyear);
        
                    // Group thesis data by year
                    const bTechThesisByYear = {};
                    data.forEach(thesis => {
                        const yearRange = `${thesis.startyear} - ${thesis.endingyear}`;
                        if (!bTechThesisByYear[yearRange]) {
                            bTechThesisByYear[yearRange] = [];
                        }
                        bTechThesisByYear[yearRange].push(thesis);
                    });
        
                    // Create and insert year headers and thesis entries
                    for (const [yearRange, thesisAll] of Object.entries(bTechThesisByYear)) {
                        const yearHeader = document.createElement('div');
                        yearHeader.classList.add('container', 'text-center');
                        yearHeader.innerHTML = `<strong class="text-danger">Academic Year ${yearRange}</strong>`;
                        thesisList.appendChild(yearHeader);
        
                        thesisAll.forEach((thesis, index) => {
                            const thesisEntry = document.createElement('li');
                            thesisEntry.innerHTML = `
                            
                                <p>${thesis.name}, <strong>"${thesis.description}"</strong>, ${thesis.startyear}-${thesis.endingyear}
                                ${thesis.subdescription ? `<p>${thesis.subdescription}</p>` : ''}
                            <hr>
                            `;
                            thesisList.appendChild(thesisEntry);
                        });
                    }
                })
                .catch(error => console.error('Error fetching B.Tech thesis:', error));
        }
        
        // Handle new B.Tech thesis form submission
        if (bTeckForm) {
            bTeckForm.addEventListener('submit', (event) => {
                event.preventDefault();
        
                const newBTechThesis = {
                    startyear: bTeckForm.startyear.value,
                    endingyear: bTeckForm.endingyear.value,
                    name: bTeckForm.name.value,
                    description: bTeckForm.description.value,
                    subdescription: bTeckForm.subdescription.value
                };
                window.location.href = 'index.html';
                fetch('https://taimoor-khan-zxmp.onrender.com/api/btechthesis/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newBTechThesis)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // const newThesisEntry = document.createElement('li');
                    // newThesisEntry.innerHTML = `
                    //     <p>${data.name}, <strong>"${data.description}"</strong>, ${data.startyear}-${data.endingyear}
                    //     ${data.subdescription ? `<p class="text-danger">${data.subdescription}</p>` : ''}
                    // `;
                    // Insert new thesis entry into the list
                    const existingYearHeader = Array.from(bTechBody.querySelectorAll('.text-danger'))
                        .find(header => header.textContent === data.startyear.toString());
        
                    if (existingYearHeader) {
                        existingYearHeader.nextElementSibling.insertBefore(newThesisEntry, existingYearHeader.nextElementSibling.firstChild);
                    } else {
                        // Create a new year header if it doesn't exist
                        const newYearHeader = document.createElement('div');
                        newYearHeader.classList.add('container', 'text-center');
                        newYearHeader.innerHTML = `<strong class="text-danger">Academic Year{data.startyear}-${data.endingyear}</strong>`;
                        thesisList.insertBefore(newYearHeader, thesisList.firstChild);
                        // const hrElement = document.createElement('hr');
   
                        
                        // Add the new thesis entry
                        const thesisListItem = document.createElement('li');
                        thesisListItem.innerHTML = `
                            <hr>
                            <p>${data.name}, <strong>"${data.description}"</strong>, ${data.startyear}-${data.endingyear}
                            ${data.subdescription ? `<p>${data.subdescription}</p>` : ''}
                            </hr>
                        `;
                        thesisList.appendChild(thesisListItem);
                    }
        
                    bTeckForm.reset();
                })
                .catch(error => console.error('Error:', error));
            });
        }
        if(mTechTableBody){
            const mTechList = mTechTableBody.querySelector('ul');
            fetch('https://taimoor-khan-zxmp.onrender.com/api/mtechthesis/read')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // console.log("response",response);
                return response.json();
            })
            .then(data => {
                
                // console.log('book Data fetched:', data);
                data.forEach(thesis => {
                    const newMtechThesis = document.createElement('li');
                    // console.log(thesis.mtechThesisContent)
                    // console.log(thesis.academicYear)
                    // newBook.classList.add('academic-block','mb-4')

                    newMtechThesis.innerHTML =`
                    <hr>
                        <p><strong>“${thesis.mtechThesisContent}”,</strong>,
                                ${thesis.academicYear},
                                ${thesis.depertment}, ${thesis.institute} </p>
                            <p class="text-danger">(${thesis.role})</p>
                        </hr>    
                    `;
                    mTechList.insertBefore(newMtechThesis,mTechList.firstChild);
                });
                
            })
            .catch(error => console.error('Error fetching projects:', error));
        } 
        if (mTechForm) {
            mTechForm.addEventListener('submit', (event) => {
                event.preventDefault();
        
                const newMTechThesis = {
                    mtechThesisContent: mTechForm.mtechThesisContent.value,
                    academicYear: mTechForm.academicYear.value,
                    depertment: mTechForm.depertment.value,
                    institute: mTechForm.institute.value,
                    role: mTechForm.role.value,
                };
                console.log("newMtechThesis",newMTechThesis);
                window.location.href = 'index.html';
                fetch('https://taimoor-khan-zxmp.onrender.com/api/mtechthesis/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newMTechThesis)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const newThesisEntry = document.createElement('li');
                    newThesisEntry.innerHTML = `
                        <p><strong>“${data.mtechThesisContent}”,</strong>,
                                ${data.academicYear},
                                ${data.depertment}, ${data.institute} </p>
                            <p class="text-danger">(${data.role})</p>
                    `;
                    // Insert new thesis entry into the list
                    mTechTableBody.appendChild(newMTechThesis);
                   
                    mTechForm.reset();
                })
                .catch(error => console.error('Error:', error));
            });
        }
        // if(mTechTableBody){
        //     const mTechList = mTechTableBody.querySelector('ul');
        //     fetch('https://taimoor-khan-zxmp.onrender.com/api/mtechthesis/read')
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         // console.log("response",response);
        //         return response.json();
        //     })
        //     .then(data => {
                
        //         // console.log('book Data fetched:', data);
        //         data.forEach(thesis => {
        //             const newMtechThesis = document.createElement('li');
        //             console.log(thesis.mtechThesisContent)
        //             console.log(thesis.academicYear)
        //             // newBook.classList.add('academic-block','mb-4')

        //             newMtechThesis.innerHTML =`
        //             <hr>
        //                 <p><strong>“${thesis.mtechThesisContent}”,</strong>,
        //                         ${thesis.academicYear},
        //                         ${thesis.depertment}, ${thesis.institute} </p>
        //                     <p class="text-danger">(${thesis.role})</p>
        //                 </hr>    
        //             `;
        //             mTechList.insertBefore(newMtechThesis,mTechList.firstChild);
        //         });
                
        //     })
        //     .catch(error => console.error('Error fetching projects:', error));
        // } 
        if(phdthesisBody){
            fetch('https://taimoor-khan-zxmp.onrender.com/api/phdthesis/read')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const ongoingThesis = data.filter(thesis => thesis.status.toLowerCase() === 'ongoing');
                const completedThesis = data.filter(thesis => thesis.status.toLowerCase() === 'completed');
                const ongoingText = document.getElementById('ongoingText');
                const guidedText = document.getElementById('guidedText');
                let ongoingSection = document.querySelector('#ongoing');
                let guidedSection = document.querySelector('#guided');
                // if (!ongoingSection) {
                //     ongoingSection = document.createElement('div');
                //     ongoingSection.id = 'ongoingThesis';
                //     ongoingSection.innerHTML = '<h2 class="text-center">Ongoing</h2>';
                //     phdBody.appendChild(ongoingSection);
                // }

                // let completedSection = document.querySelector('#completedThesis');
                // if (!completedSection) {
                //     completedSection = document.createElement('div');
                //     completedSection.id = 'completedThesis';
                //     completedSection.innerHTML = '<h2 class="text-center">Completed</h2>';
                //     phdBody.appendChild(completedSection);
                // }

                ongoingThesis.forEach(thesis => {
                    const thesisEntry = document.createElement('div');
                    thesisEntry.innerHTML = `
                        <p>${thesis.name} (Registration Id: ${thesis.sclId}), Thesis Topic (proposed): <strong>“${thesis.phdThesisContent}”</strong>.</p>
                        <p class="text-right text-danger ">[${thesis.role}]</p>
                        <hr>
                    `;

                    ongoingText.insertBefore(thesisEntry,ongoingText.firstChild);
                });

                completedThesis.forEach(thesis => {
                    const thesisEntry = document.createElement('div');
                    thesisEntry.innerHTML = `
                        <p>${thesis.name} (Registration Id: ${thesis.sclId}), Thesis Topic: <strong>${thesis.phdThesisContent}</strong>. (${thesis.startyear}-${thesis.endingyear})</p>
                        <hr>
                    `;
                    guidedText.insertBefore(thesisEntry,guidedText.firstChild);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
        }
        if (phdForm) {
            phdForm.addEventListener('submit', (event) => {
                event.preventDefault();
        
                const newphdThesis = {
                    name:phdForm.name.value,
                    sclId:phdForm.sclId.value,
                    status:phdForm.status.value,
                    phdThesisContent:phdForm.phdThesisContent.value,
                    startyear:phdForm.startyear.value,
                    endingyear:phdForm.endingyear.value,
                    role:phdForm.role.value,
                };
                // console.log("newPhdThesis",newphdThesis);
                window.location.href = 'index.html';
                fetch('https://taimoor-khan-zxmp.onrender.com/api/phdthesis/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newphdThesis)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const thesisStatus = data.status.toLowerCase();
                    
                    const newThesisEntry = document.createElement('div');
                    if(thesisStatus==='ongoing'){
                        newThesisEntry.innerHTML = `
                       <p>${data.name} (Registration Id: ${data.sclId}), Thesis Topic (proposed): <strong>“${data.phdThesisContent}”</strong>. (${data.startYear}-${data.endYear})</p>
                         <p class="text-right text-danger ">[${data.role}]</p>
                        <hr>
                     `
                     let ongoingSection = document.querySelector('#ongoing');
                if (!ongoingSection) {
                    ongoingSection = document.createElement('div');
                    ongoingSection.id = 'ongoingThesis';
                    ongoingSection.innerHTML = '<h2 class="text-center">Ongoing</h2>';
                    phdthesisBody.insertBefore(ongoingSection, phdBody.firstChild);
                }
                ongoingSection.insertBefore(newThesisEntry,  ongoingSection.firstChild);
            } else {
                newThesisEntry.innerHTML = `
                    <p>${data.name} (Registration Id: ${data.sclId}), Thesis Topic: <strong>${data.phdThesisContent}</strong>. (${data.startYear}-${data.endYear})</p>
                    <hr>
                `;

                let completedSection = document.querySelector('#guided');
                if (!completedSection) {
                    completedSection = document.createElement('div');
                    completedSection.id = 'guided';
                    completedSection.innerHTML = '<h2 class="text-center">Guided</h2>';
                    phdBody.appendChild(completedSection);
                }
                completedSection.insertBefore(newThesisEntry, completedSection.querySelector('hr'));
                    

                    }
                    
                    // Insert new thesis entry into the list
                    // mTechTableBody.appendChild(newMTechThesis);
                   
                    // mTechForm.reset();
                })
                .catch(error => console.error('Error:', error));
            });
        }
        if(collaborationContent){
            fetch('https://taimoor-khan-zxmp.onrender.com/api/researches/read')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Clear existing rows
                // foreignCollaborations.innerHTML = '';
                // indianCollaborations.innerHTML = '';

                data.forEach(collaboration => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${collaboration.name}</td>
                    <td>${collaboration.affiliation}<strong>Email:</strong> <a class="link-danger"
                                        href="${collaboration.email}"
                                        class="link-danger">${collaboration.email}</a></td>
                    <td>${collaboration.collabNature}</td>
                    `;
                    // console.log("data",data)
                    if (collaboration.type.toLowerCase() === 'foreign') {
                        foreignCollaborations.insertBefore(row,foreignCollaborations.firstChild);
                    } else if (collaboration.type.toLowerCase() === 'indian') {
                        indianCollaborations.insertBefore(row,indianCollaborations.firstChild);
                    }
                });
            })
            .catch(error => console.error('Error fetching collaborations:', error));
        }
        if(reasearchForm){
            reasearchForm.addEventListener('submit', (event) => {
                event.preventDefault();
               
                const newResearch = {
                     name:reasearchForm.name.value,
                     affiliation: reasearchForm.affiliation.value,
                     email: reasearchForm.email.value,
                     collabNature: reasearchForm.projectTitle.value,
                     type: reasearchForm.type.value.toLowerCase(),
                }

                // console.log("newResearch",newResearch);
                window.location.href = 'index.html';
                const newRow = document.createElement('tr');
                fetch('https://taimoor-khan-zxmp.onrender.com/api/researches/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newResearch)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data =>{
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                    <td>${newResearch.name}</td>
                    <td>${newResearch.affiliation}<strong>Email:</strong> <a class="link-danger"
                                        href="${newResearch.email}"
                                        class="link-danger">${newResearch.email}</a></td>
                    <td>${newResearch.collabNature}</td>
                   `;
                if (type === 'foreign') {
                    foreignCollaborations.insertBefore(newRow, foreignCollaborations.firstChild);
                } else if (type === 'indian') {
                    indianCollaborations.insertBefore(newRow, indianCollaborations.firstChild);
                }
                reasearchForm.reset();
                })
                 // Clear the form
            });
        }
        
        if(ieeeContent){
        
            fetch('https://taimoor-khan-zxmp.onrender.com/api/ieeeservices/read')
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) =>a.year - b.year);
                // console.log('Data fetched:', data);
                data.forEach(service => {
                    
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <th scope="row">${service.year}</th>
                        <td>${service.description}</td>
                        <td>${service.branch}</td>
                    `;
                    // console.log('row', row);
                    ieeeContent.insertBefore(row, ieeeContent.firstChild);
                });
            });
        }
        if(serviceForm){
            serviceForm.addEventListener('submit', (event) => {
                event.preventDefault();
                
                const newService = {
                    year: serviceForm.year.value,
                    description: serviceForm.description.value,
                    branch: serviceForm.branch.value
                };
                // console.log("newAward",newAward);
                window.location.href = 'index.html';
                
                fetch('https://taimoor-khan-zxmp.onrender.com/api/ieeeservices/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newService)
                })
                .then(response => response.json())
                .then(data => {
                    
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <th scope="row">${data.year}</th>
                        <td>${data.description}</td>
                        <td>${data.branch}</td>
                    `;
                    ieeeContent.insertBefore(row, ieeeContent.firstChild);
                    window.location.href = 'index.html';
                    // form.reset();
                })
                .catch(error => console.error('Error:', error));
            });
        }
        if(talksList){
            // console.log('talks',talksList)
            fetch('https://taimoor-khan-zxmp.onrender.com/api/invitedtalk/read')
            .then(response => response.json())
            .then(data => {
                console.log("data",data);
                data.forEach(talk => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    
                    <td>${talk.description}</td>`;
                    talksList.insertBefore(row, talksList.firstChild); // Add the new talk at the top
                    row.style.backgroundColor = 'white';
                    row.style.color = 'black';
                });
            })
            .catch(error => console.error('Error fetching talks:', error));
        }


    // Handle form submission
    if (talksForm) {
        talksForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const newTalk = {
                year: talksForm.year.value,
                description: talksForm.description.value
            };
            console.log(newTalk);
            // window.location.href = 'index.html'
            fetch('https://taimoor-khan-zxmp.onrender.com/api/invitedtalk/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTalk)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Talk added:", data);
                const row = document.createElement('tr');
                
                
                row.innerHTML = `
                
                <td>${data.description}</td>
                <br/>`;
                talksList.insertBefore(row, talksList.firstChild); // Add the new talk at the top
                talksForm.reset();
            })
            .catch(error => console.error('Error submitting talk:', error));
        });
    }

    if(membershipsTableBody){
        fetch('https://taimoor-khan-zxmp.onrender.com/api/memberships/read')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('membership Data fetched:', data);
            data.sort((a, b) => a.year - b.year);
            data.forEach((membership,index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                   
                    <td>${membership.year}</td>
                    <td>${membership.name}</td>
                    <td>${membership.organisation}</td>
                
                `;
                membershipsTableBody.insertBefore(row, membershipsTableBody.firstChild);
                
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
    }
    if (addMembershipForm) {
        addMembershipForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            
            const newMembership = {
                year: addMembershipForm.year.value,
                name: addMembershipForm.name.value,
                organisation: addMembershipForm.organisation.value
            };
            // alert(newMembership.organisation);
            window.location.href = 'index.html';
            
            // Fetch data and add membership
            fetch('https://taimoor-khan-zxmp.onrender.com/api/memberships/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMembership)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                // console.log('Success:', data);
                // console.log('Membership added:', data);
                data.sort((a, b) => b.year - a.year);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${data.year}</th>
                    <td>${data.name}</td>
                    <td>${data.organisation}</td>
                `;
                const membershipsTableBody = document.getElementById('membershipsTableBody');
                membershipsTableBody.insertBefore(row, membershipsTableBody.firstChild);
    
                // addMembershipForm.reset();
                // window.location.href = 'index.html';
                addMembershipForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
    if (editorialbody) {
        // alert("edit")
        fetch('https://taimoor-khan-zxmp.onrender.com/api/editorials/read')
            .then(response => response.json())
            .then(data => {
                
                // Organize data by year
                data.sort((a, b) => b.year - a.year);
    
                const editorialsByYear = {};
                data.forEach(journal => {
                    if (!editorialsByYear[journal.year]) {
                        editorialsByYear[journal.year] = [];
                    }
                    editorialsByYear[journal.year].push(journal);
                });
    
                // Generate HTML for each year
                for (const [year, editorials] of Object.entries(editorialsByYear)) {
                    const yearHeader = document.createElement('div');
                    yearHeader.classList.add('h4');
                    yearHeader.textContent = year;
    
                    const editorialEntries = editorials.map((journal, index) => {
                        return `
                            <div class="academic-block mb-4">
                                <div>
                                    <strong>${index + 1}.</strong> ${journal.description}
                                </div>
                                <div class="mb-4">
                                    <strong>DOI: </strong>
                                    <a class="read fw-bold" href="${journal.doiLink}" target="_blank">${journal.doiLink}</a>
                                </div>
                            </div>
                        `;
                    }).join('');
                    editorialbody.style.borderLeft = '0';
                    editorialbody.style.paddingLeft = '0px';
                    editorialbody.insertAdjacentHTML('afterbegin', yearHeader.outerHTML + editorialEntries);
                }
            })
            .catch(error => console.error('Error fetching editorial:', error));
    }
    
    if (addEditorialsForm) {
        addEditorialsForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const newJournal = {
                year: addEditorialsForm.year.value,
                description: addEditorialsForm.description.value,
                doiLink: addEditorialsForm.doiLink.value,
            };
            alert(newJournal.year);
            window.location.href = 'index.html';
            fetch('https://taimoor-khan-zxmp.onrender.com/api/editorials/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newJournal)
            })
            .then(response => response.json())
            .then(data => {
                // console.log("Journal added:", data.doi);
                data.sort((a, b) => b.year - a.year);
                const journalBlock = document.createElement('div');
                journalBlock.classList.add('academic-block', 'mb-4');
                journalBlock.innerHTML = `
                    <div class="h4">${data.year}</div>
                        <div>
                            <strong>${data.description}</strong>
                        </div>
                        <div class="mb-4">
                            <strong>DOI: </strong>
                            <a class="read fw-bold" href="${data.doi}" target="_blank">${data.doi}</a>
                        </div>
                    `;
                    editorialbody.style.borderLeft = '0';
                    editorialbody.style.paddingLeft = '0px';
                    editorialbody.appendChild(journalBlock);
                    addEditorialsForm.reset();
                
                let yearHeader = Array.from(editorialbody.querySelectorAll('.h4'))
            .find(header => header.textContent === data.year.toString());
        
            if (!yearHeader) {
                yearHeader = document.createElement('div');
                yearHeader.classList.add('h4');
                yearHeader.textContent = data.year;
                editorialbody.insertBefore(yearHeader, editorialbody.firstChild);
            }
                    
                })
            .catch(error => console.error('Error:', error));
        });
    }
    // console.log("Patent element found",patent);
    if(patent){
       
        fetch('https://taimoor-khan-zxmp.onrender.com/api/patents/read')
        .then(response => {
            console.log("Response received:", response);
            return response.json()
        })
        .then(data => {
            console.log(data);
            data.forEach(talk => {
                const row = document.createElement('div');
                row.innerHTML = `<div>
                <div>${talk.description}</div>
                ${talk.doiLink ? `
                    <div class="mb-4">
                        <strong>DOI: </strong>
                        <a class="read fw-bold" href="${talk.doiLink}" target="_blank">${talk.doiLink}</a>
                    </div>` : ''}
            </div>`;
                patent.insertBefore(row, patent.firstChild); // Add the new talk at the top
                console.log("patent",row);
                // row.style.backgroundColor = 'white';
                row.style.color = 'black';
            });
        })
        .catch(error => console.error('Error fetching patent:', error));
    }


// Handle form submission
if (addPatent) {
    addPatent.addEventListener('submit', (event) => {
        event.preventDefault();

        const newPatent = {
            // year: parseInt(talksForm.year.value, 10),
            description: addPatent.description.value,
            doiLink: addPatent.doiLink.value
        };
        console.log("data",newPatent);
        window.location.href = 'index.html'
        fetch('https://taimoor-khan-zxmp.onrender.com/api/patents/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPatent)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Talk added:", data);
            const row = document.createElement('li');
            row.innerHTML = `
            <div>
                <p>${data.description}</p>
                ${data.doiLink ? `
                    <div class="mb-4">
                        <strong>DOI: </strong>
                        <a class="read fw-bold" href="${data.doiLink}" target="_blank">${data.doiLink}</a>
                    </div>` : ''}
            </div>
            `
            
            row.innerHTML = `<td>${data.description}</td>`;
            patent.insertBefore(row, patent.firstChild); // Add the new talk at the top
            addPatent.reset();
        })
        .catch(error => console.error('Error submitting talk:', error));
    });
}
if(bookChBody){
    const booksList = bookChBody.querySelector('ul');
    fetch('https://taimoor-khan-zxmp.onrender.com/api/bookChapters/read')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // console.log("response",response);
        return response.json();
    })
    .then(data => {
        
        console.log('bookch Data fetched:', data);
        data.forEach(book => {
            const newBook = document.createElement('li');
            // newBook.classList.add('academic-block','mb-4')

            newBook.innerHTML =`
                <div>
                    <strong>taimoor Khan</strong> ${book.author}, <strong>“${book.description}” ${book.name}</strong>, ${book.place} ${book.isbn ? `ISBN:${book.isbn} ${book.date}`:''} ${book.subdescription ? `<p class="text-danger">(${book.subdescription})</p>` : ''}
                    ${book.doiLink ? `
                    <div class="mb-4">
                        <strong>DOI: </strong>
                        <a class="read fw-bold" href="${book.doiLink}" target="_blank">${book.doiLink}</a>
                    </div>` : ''}
                </div>
            `;
            booksList.insertBefore(newBook,booksList.firstChild);
        });
        
    })
    .catch(error => console.error('Error fetching projects:', error));
}
if(addBookChapForm){
    addBookChapForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newBook = {
            author:addBookChapForm.author.value,
            description: addBookChapForm.description.value,
            subdescription: addBookChapForm.subdescription.value,
            doiLink: addBookChapForm.doiLink.value,
            name:addBookChapForm.name.value,
            place:addBookChapForm.place.value,
            date:addBookChapForm.date.value,
            isbn:addBookChapForm.isbn.value,
        };
        // console.log('newbook',newBook);
        window.location.href = 'index.html';
        fetch('https://taimoor-khan-zxmp.onrender.com/api/bookChapters/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // console.log("Bookchepter added:", data);
            const newBookElement = document.createElement('li');
            newBookElement.innerHTML = `
                <div>
                    <strong>${data.author}</strong>, <strong>“${data.description}” ${data.name}</strong>  ${data.isbn ? `ISBN:${data.isbn} ${data.date}`:''}, ${data.place} <p class="text-danger">(${data.subDescription})</p>
                    ${data.doiLink ? `
                    <div class="mb-4">
                        <strong>DOI: </strong>
                        <a class="read fw-bold" href="${data.doiLink}" target="_blank">${data.doiLink}</a>
                    </div>` : ''}
                </div>
            `;
            bookChBody.insertBefore(newBookElement, bookChBody.firstChild);
            addBookChapForm.reset();
        })
        .catch(error => console.error('Error submitting book:', error));
    });
} 


    
    
});
            
        
        

    
