async function loadResumeData() {
    try {
        const response = await fetch('./resume-data.json');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (err) {
        console.error('Error loading resume data:', err);
        document.getElementById('main-content').innerHTML =
            '<p class="error">Error loading resume data.</p>';
    }
}

function renderPersonalInfo(basics) {
    const personalInfo = document.getElementById('personal-info');
    const addr = basics.personalInfo.address;
    personalInfo.innerHTML = `
        <p><strong>Date of Birth:</strong> ${basics.personalInfo.dateOfBirth}</p>
        <p><strong>Place of Birth:</strong> ${basics.personalInfo.placeOfBirth}</p>
        <p><strong>Nationality:</strong> ${basics.personalInfo.nationality}</p>
        <p><strong>Family Status:</strong> ${basics.personalInfo.familyStatus}</p>
        <p><strong>Address:</strong><br>
            ${addr.street}<br>
            ${addr.zip} ${addr.city}<br>
            ${addr.state ? addr.state + '<br>' : ''}
            ${addr.country}
        </p>
    `;

    const profileImage = document.getElementById('profile-image');
    profileImage.style.backgroundImage = `url('${basics.photo}')`;
}

function renderContact(basics) {
    const contact = document.getElementById('contact-info');
    contact.innerHTML = `
        <p><i class="fas fa-envelope"></i> ${basics.email}</p>
        <p><i class="fas fa-phone"></i> ${basics.phone}</p>
        ${basics.portfolio ? `<p><i class="fas fa-link"></i> <a href="${basics.portfolio}" target="_blank">${basics.portfolio}</a></p>` : ''}
    `;
}

function renderSocial(socialMedia) {
    const container = document.getElementById('social-links');
    container.innerHTML = `
        ${socialMedia.linkedin ? `<a href="${socialMedia.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
        ${socialMedia.github ? `<a href="${socialMedia.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
    `;
}

function renderWorkExperience(experience) {
    const container = document.getElementById('experience-list');
    container.innerHTML = experience.map(exp => `
        <div class="experience-item">
            <h3>${exp.title}</h3>
            <p>${exp.company} | ${exp.location}</p>
            <p>${exp.period}</p>
            <h4>Responsibilities:</h4>
            <ul>${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
            <h4>Achievements:</h4>
            <ul>${exp.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
    `).join('');
}

function renderEducation(education) {
    const container = document.getElementById('education-list');
    container.innerHTML = education.map(edu => `
        <div class="education-item">
            <h3>${edu.type}</h3>
            <h4>${edu.degree}</h4>
            <p>${edu.institution}, ${edu.location}</p>
            <p>${edu.period}</p>
            ${edu.grade ? `<p><strong>Grade:</strong> ${edu.grade}</p>` : ''}
        </div>
    `).join('');
}

function renderSkills(skills) {
    const container = document.getElementById('skills-list');
    container.innerHTML = `
        <h4>Technical</h4>
        <div>${skills.technical.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
        <h4>Software</h4>
        <div>${skills.software.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
        <h4>Languages</h4>
        <div>${skills.languages.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
    `;
}

function renderProjects(projects) {
    const container = document.getElementById('projects-list');
    container.innerHTML = projects.map(p => `
        <div class="project-item">
            <h3>${p.name}</h3>
            <p>${p.period}</p>
            <p>${p.description}</p>
            <div>Technologies: ${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
            <ul>${p.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
    `).join('');
}

function renderCertifications(certs) {
    const container = document.getElementById('certifications-list');
    container.innerHTML = certs.map(c => `
        <div class="cert-item">
            <h3>${c.name}</h3>
            <p>${c.issuer} | ${c.date}</p>
            ${c.link ? `<a href="${c.link}" target="_blank">View Certificate</a>` : ''}
        </div>
    `).join('');
}

function renderAdditional(additional) {
    const container = document.getElementById('additional-info');
    container.innerHTML = `
        <p><strong>Highest chess rating:</strong> ${additional['Highest chess rating'] || ''}</p>
        <h4>Volunteer Experience:</h4>
        <ul>
            ${additional.volunteerExperience.map(v => `
                <li>
                    <strong>${v.organization}</strong><br>
                    ${v.role} (${v.period})<br>
                    ${v.description || ''}
                </li>
            `).join('')}
        </ul>
    `;
}

function renderSignature(signature) {
    document.getElementById('signature-info').textContent =
        `${signature.place}, ${signature.date}`;
}

function initDarkMode() {
    const toggle = document.getElementById('theme-toggle');
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.body.classList.add('dark-mode');

    toggle.checked = saved === 'dark';

    toggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
}

function initPDFDownload() {
    document.getElementById('download-pdf').addEventListener('click', () => window.print());
}

async function initResume() {
    const data = await loadResumeData();
    if (!data) return;

    document.getElementById('name').textContent = data.basics.name;
    document.getElementById('title').textContent = data.basics.title;
    document.getElementById('summary').textContent = data.basics.summary;

    renderPersonalInfo(data.basics);
    renderContact(data.basics);
    renderSocial(data.socialMedia);
    renderWorkExperience(data.workExperience || []);
    renderEducation(data.education || []);
    renderSkills(data.skills);
    renderProjects(data.projects || []);
    renderCertifications(data.certifications || []);
    renderAdditional(data.additionalQualifications);
    renderSignature(data.signature);

    document.getElementById('last-updated').textContent = new Date().toLocaleDateString('en-GB');

    document.getElementById('loading').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';

    initDarkMode();
    initPDFDownload();
}

document.addEventListener('DOMContentLoaded', initResume);
