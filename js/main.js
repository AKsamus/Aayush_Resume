// main.js — Resume Renderer (English)

async function loadResumeData() {
    try {
        const response = await fetch('./data/resume-data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading resume data:', error);
        document.getElementById('main-content').innerHTML =
            '<p class="error">Error loading resume data. Please try again later.</p>';
    }
}

// Populate the resume
async function updateResume() {
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('main-content');

    try {
        const data = await loadResumeData();
        if (!data) return;

        // Header
        document.getElementById('name').textContent = data.basics.name;
        document.getElementById('title').textContent = data.basics.title;

        // Personal Info
        const personalInfo = document.getElementById('personal-info');
        personalInfo.innerHTML = `
            <p><strong>Date of Birth:</strong> ${data.basics.personalInfo.dateOfBirth}</p>
            <p><strong>Place of Birth:</strong> ${data.basics.personalInfo.placeOfBirth}</p>
            <p><strong>Nationality:</strong> ${data.basics.personalInfo.nationality}</p>
            <p><strong>Marital Status:</strong> ${data.basics.personalInfo.familyStatus}</p>
            <p><strong>Address:</strong><br>
                ${data.basics.personalInfo.address.street}<br>
                ${data.basics.personalInfo.address.zip} ${data.basics.personalInfo.address.city}<br>
                ${data.basics.personalInfo.address.country}</p>
        `;

        // Profile Image
        const profileImage = document.getElementById('profile-image');
        profileImage.style.backgroundImage = 'url("./assets/profile_pic.jpg")';
        const img = new Image();
        img.onerror = () => {
            console.error('Profile image failed to load, using fallback.');
            profileImage.style.backgroundImage = 'url("https://i.pravatar.cc/300")';
        };
        img.src = './assets/profile_pic.jpg';

        // Contact Info
        const contactInfo = document.getElementById('contact-info');
        contactInfo.innerHTML = `
            <p><i class="fas fa-envelope"></i> ${data.basics.email}</p>
            <p><i class="fas fa-phone"></i> ${data.basics.phone}</p>
        `;

        // Social Links
        const socialLinks = document.getElementById('social-links');
        socialLinks.innerHTML = `
            ${data.sozialeMedien.xing ? `<a href="${data.sozialeMedien.xing}" target="_blank"><i class="fab fa-xing"></i></a>` : ''}
            ${data.sozialeMedien.linkedin ? `<a href="${data.sozialeMedien.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
            ${data.sozialeMedien.github ? `<a href="${data.sozialeMedien.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
        `;

        // Summary
        document.getElementById('summary').textContent = data.basics.summary;

        // Experience
        const experienceList = document.getElementById('experience-list');
        experienceList.innerHTML = data.berufserfahrung.map(exp => `
            <div class="experience-item">
                <h3>${exp.title}</h3>
                <p class="company">${exp.company} | ${exp.location}</p>
                <p class="period">${exp.period}</p>
                <div class="responsibilities">
                    <h4>Responsibilities:</h4>
                    <ul>${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
                </div>
                <div class="achievements">
                    <h4>Achievements:</h4>
                    <ul>${exp.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
                </div>
            </div>
        `).join('');

        // Education
        const educationInfo = document.getElementById('education-info');
        educationInfo.innerHTML = data.ausbildung.map(edu => `
            <div class="education-item">
                <h3>${edu.type}</h3>
                <h4>${edu.degree}</h4>
                <p>${edu.institution}, ${edu.location}</p>
                <p class="period">${edu.period}</p>
                ${edu.thesis ? `<p><strong>Thesis:</strong> ${edu.thesis}</p>` : ''}
                ${edu.grade ? `<p><strong>Grade:</strong> ${edu.grade}</p>` : ''}
            </div>
        `).join('');

        // Skills
        const skillsContainer = document.getElementById('skills-container');
        skillsContainer.innerHTML = `
            <div class="skills-category">
                <h3>Professional Skills</h3>
                <div class="skills-list">
                    ${data.kenntnisse.fachlich.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="skills-category">
                <h3>Software Skills</h3>
                <div class="skills-list">
                    ${data.kenntnisse.software.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;

        // Languages
        const languagesContainer = document.getElementById('languages-container');
        languagesContainer.innerHTML = `
            <div class="languages-list">
                ${data.kenntnisse.sprachen.map(lang => `<div class="language-item">${lang}</div>`).join('')}
            </div>
        `;

        // Projects
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = data.projekte.map(project => `
            <div class="project-item">
                <h3>${project.name}</h3>
                <p class="period">${project.period}</p>
                <p class="description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-achievements">
                    <h4>Achievements:</h4>
                    <ul>${project.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
                </div>
            </div>
        `).join('');

        // Certifications
        const certificationsList = document.getElementById('certifications-list');
        certificationsList.innerHTML = data.weiterbildung.map(cert => `
            <div class="certification-item">
                <h3>${cert.name}</h3>
                <p>${cert.issuer} | ${cert.date}</p>
                ${cert.link ? `<a href="${cert.link}" target="_blank">View Certificate</a>` : ''}
            </div>
        `).join('');

        // Additional Qualifications
        const additionalInfo = document.getElementById('additional-info');
        additionalInfo.innerHTML = `
            <div class="drivers-license">
                <p><strong>Driver's License:</strong> ${data.zusatzqualifikationen.führerschein}</p>
            </div>
            <div class="volunteer-work">
                <h4>Volunteer Work:</h4>
                <ul>
                    ${data.zusatzqualifikationen.ehrenamt.map(vol => `
                        <li>
                            <strong>${vol.organization}</strong><br>
                            ${vol.role} (${vol.period})
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        // Signature
        const signatureInfo = document.getElementById('signature-info');
        signatureInfo.innerHTML = `<p>${data.unterschrift.ort}, ${data.unterschrift.datum}</p>`;

        // Last Updated
        document.getElementById('last-updated').textContent = new Date().toLocaleDateString('en-GB');

        // Show content
        loading.style.display = 'none';
        mainContent.style.display = 'block';
    } catch (error) {
        console.error('Error rendering resume:', error);
        loading.style.display = 'none';
        mainContent.innerHTML =
            '<p class="error">Error loading resume data. Please try again later.</p>';
    }
}

// Dark Mode Toggle
function initDarkMode() {
    const toggle = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') toggle.checked = true;
    }
    toggle.addEventListener('change', e => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// PDF Download
function initPDFDownload() {
    const btn = document.getElementById('download-pdf');
    btn.addEventListener('click', () => window.print());
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateResume();
    initDarkMode();
    initPDFDownload();
});
