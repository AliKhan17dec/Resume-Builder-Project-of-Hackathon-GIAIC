function addEducation() {
    // Add a new education entry
    const educationSection = document.getElementById('education-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry');
    newEntry.innerHTML = `
        <label>Institution:</label>
        <input type="text" class="institution" required>
        <label>Degree:</label>
        <input type="text" class="degree" required>
        <label>Start Date:</label>
        <input type="date" class="start-date" placeholder="DD/MM/YYYY" required>
        <label>End Date:</label>
        <input type="date" class="end-date" placeholder="DD/MM/YYYY" required>
    `;
    educationSection.appendChild(newEntry);
}

function generateResume() {
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;

    // Get education details
    const educationEntries = document.querySelectorAll('.education-entry');
    let educationContent = '';
    educationEntries.forEach((entry, index) => {
        const institution = entry.querySelector('.institution').value;
        const degree = entry.querySelector('.degree').value;
        const startDate = entry.querySelector('.start-date').value;
        const endDate = entry.querySelector('.end-date').value;
        educationContent += `
            <h3 class="heading">Education ${index + 1}</h3>
            <p><strong>Institution:</strong> ${institution}</p>
            <p><strong>Degree:</strong> ${degree}</p>
            <p><strong>Duration:</strong> ${startDate} - ${endDate}</p>
        `;
    });

    // Create resume content
    const resumeContent = `
        <h3 class="heading">Name</h3>
        <p>${name}</p>
        <h3 class="heading">Email</h3>
        <p>${email}</p>
        <h3 class="heading">Phone Number</h3>
        <p>${phone}</p>
        <h3 class="heading">Experience</h3>
        <p>${experience}</p>
        <h3 class="heading">Skills</h3>
        <p>${skills}</p>
        <h3 class="heading">LinkedIn Profile</h3>
        <p>${linkedin}</p>
        <h3 class="heading">GitHub Profile</h3>
        <p>${github}</p>
        ${educationContent}
    `;
    
    // Inject content into resume div
    const resumeDiv = document.getElementById('resume');
    resumeDiv.innerHTML = resumeContent;
    
    // Show the download button
    document.getElementById('downloadBtn').style.display = 'block';
}

function downloadResume() {
    // Get the resume element
    const element = document.getElementById('resume');

    // Ensure the content is fully rendered
    setTimeout(() => {
        // PDF options
        const options = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        // Generate and download the PDF
        html2pdf().from(element).set(options).save().then(() => {
            console.log('PDF downloaded successfully.');
        }).catch((error) => {
            console.error('Error generating PDF:', error);
        });
    }, 500);
}
