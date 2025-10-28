// Main JavaScript file for resume

// Load resume data
async function loadResumeData() {
    try {
        const response = await fetch('../data/resume-data.json');
        console.log('Attempting to load resume data...');
        const data = await response.json();
        console.log('Resume data loaded:', data);
        return data;
    } catch (error) {
        console.error('Error loading resume data:', error);
        document.getElementById('main-content').innerHTML = '<p class="error">Error loading resume data. Please try again later.</p>';
    }
}

// Update DOM with resume data
async function updateResume() {
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('main-content');
    
    try {
        const data = await loadResumeData();
        
        // Basic Information
        document.getElementById('name').textContent = data.basics.name;
        document.getElementById('title').textContent = data.basics.title;
        
        // Contact Information
        const contactInfo = document.getElementById('contact-info');
        contactInfo.innerHTML = `
            <p><i class="fas fa-envelope"></i> ${data.basics.email}</p>
            <p><i class="fas fa-phone"></i> ${data.basics.phone}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${data.basics.location}</p>
        `;

        // Social Links
        const socialLinks = document.getElementById('social-links');
        socialLinks.innerHTML = `
            ${data.socialLinks.github ? `<a href="${data.socialLinks.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
            ${data.socialLinks.linkedin ? `<a href="${data.socialLinks.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
            ${data.socialLinks.twitter ? `<a href="${data.socialLinks.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
        `;

        // Summary
        document.getElementById('summary').textContent = data.basics.summary;

        // Experience
        const experienceList = document.getElementById('experience-list');
        experienceList.innerHTML = data.experience.map(exp => `
            <div class="experience-item">
                <h3>${exp.title}</h3>
                <p class="company">${exp.company} | ${exp.location}</p>
                <p class="period">${exp.period}</p>
                <ul>
                    ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        // Education
        document.getElementById('education-info').innerHTML = `
            <h3>${data.education.degree}</h3>
            <p>${data.education.university}</p>
            <p>Graduated: ${data.education.graduationYear}</p>
        `;

        // Skills
        const skillsContainer = document.getElementById('skills-container');
        skillsContainer.innerHTML = `
            <div class="skills-category">
                <h3>Technical Skills</h3>
                <div class="skills-list">
                    ${data.skills.technical.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="skills-category">
                <h3>Software</h3>
                <div class="skills-list">
                    ${data.skills.software.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;

        // Projects
        const projectsGrid = document.getElementById('projects-grid');
        projectsGrid.innerHTML = data.projects.map(project => `
            <div class="project-card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
            </div>
        `).join('');

        // Certifications
        const certificationsList = document.getElementById('certifications-list');
        certificationsList.innerHTML = data.certifications.map(cert => `
            <div class="certification-item">
                <h3>${cert.name}</h3>
                <p>${cert.issuer} | ${cert.date}</p>
                ${cert.link ? `<a href="${cert.link}" target="_blank">View Certificate</a>` : ''}
            </div>
        `).join('');

        // Last Updated
        document.getElementById('last-updated').textContent = new Date().toLocaleDateString();

        // Show content
        loading.style.display = 'none';
        mainContent.style.display = 'block';

    } catch (error) {
        console.error('Error updating resume:', error);
        loading.style.display = 'none';
        mainContent.innerHTML = '<p class="error">Error loading resume data. Please try again later.</p>';
    }
}

// Dark mode toggle
function initDarkMode() {
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    toggleSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// PDF Download functionality
function initPDFDownload() {
    const downloadBtn = document.getElementById('download-pdf');
    downloadBtn.addEventListener('click', function() {
        window.print();
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    updateResume().catch(error => {
        console.error('Failed to update resume:', error);
    });
    initDarkMode();
    initPDFDownload();
    console.log('Initialization complete');
});