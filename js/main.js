// main.js — Dynamic Resume Loader (English)

async function loadResumeData() {
    try {
        const response = await fetch('./data/resume-data.json');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error loading resume data:', err);
        document.getElementById('main-content').innerHTML =
            '<p class="error">Error loading resume data. Please try again later.</p>';
    }
}

function createElement(tag, className, content) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content) el.innerHTML = content;
    return el;
}

function appendSkills(container, skills, title) {
    if (!skills || skills.length === 0) return;
    const section = createElement('div', 'skills-category');
    if (title) section.innerHTML = `<h3>${title}</h3>`;
    const div = createElement('div', 'skills-list');
    skills.forEach(skill => {
        const span = createElement('span', 'skill-tag', skill);
        div.appendChild(span);
    });
    section.appendChild(div);
    container.appendChild(section);
}

function appendLanguages(container, languages) {
    if (!languages || languages.length === 0) return;
    const section = createElement('div', 'languages-category');
    section.innerHTML = '<h3>Languages</h3>';
    const div = createElement('div', 'languages-list');
    languages.forEach(lang => {
        const p = createElement('p', 'language-item', lang);
        div.appendChild(p);
    });
    section.appendChild(div);
    container.appendChild(section);
}

function appendSocial(container, social) {
    for (const [platform, link] of Object.entries(social)) {
        if (link) {
            const a = createElement('a');
            a.href = link;
            a.target = '_blank';
            a.innerHTML = `<i class="fab fa-${platform.toLowerCase()}"></i>`;
            container.appendChild(a);
        }
    }
}

async function renderResume() {
    const loading = document.getElementById('loading');
    const main = document.getElementById('main-content');

    const data = await loadResumeData();
    if (!data) return;

    main.innerHTML = '';

    // Header
    const header = createElement('header', 'header-section');
    header.innerHTML = `<h1>${data.basics.name}</h1><p>${data.basics.title}</p>`;
    main.appendChild(header);

    // Two-column layout
    const layout = createElement('div', 'two-column');

    // LEFT COLUMN
    const left = createElement('aside', 'left-column');

    // Profile Image
    const profileSection = createElement('section', 'profile-section');
    const img = createElement('img');
    img.src = './assets/profile_pic.jpg';
    img.alt = 'Profile Picture';
    img.onerror = () => img.src = 'https://i.pravatar.cc/300';
    profileSection.appendChild(img);

    // Personal info
    const personal = createElement('div', 'personal-info');
    personal.innerHTML = `
        <p><strong>Date of Birth:</strong> ${data.basics.personalInfo.dateOfBirth}</p>
        <p><strong>Place of Birth:</strong> ${data.basics.personalInfo.placeOfBirth}</p>
        <p><strong>Nationality:</strong> ${data.basics.personalInfo.nationality}</p>
        <p><strong>Marital Status:</strong> ${data.basics.personalInfo.familyStatus}</p>
        <p><strong>Address:</strong><br>
            ${data.basics.personalInfo.address.street}<br>
            ${data.basics.personalInfo.address.zip} ${data.basics.personalInfo.address.city}<br>
            ${data.basics.personalInfo.address.country}</p>
    `;
    profileSection.appendChild(personal);
    left.appendChild(profileSection);

    // Contact
    const contactSection = createElement('section');
    contactSection.innerHTML = '<h2>Contact</h2>';
    const contactInfo = createElement('div', 'contact-info');
    contactInfo.innerHTML = `
        <p><i class="fas fa-envelope"></i> ${data.basics.email}</p>
        <p><i class="fas fa-phone"></i> ${data.basics.phone}</p>
    `;
    contactSection.appendChild(contactInfo);
    left.appendChild(contactSection);

    // Skills
    appendSkills(left, data.kenntnisse.fachlich, 'Professional Skills');
    appendSkills(left, data.kenntnisse.software, 'Software Skills');

    // Languages
    appendLanguages(left, data.kenntnisse.sprachen);

    // Social
    const socialSection = createElement('section');
    socialSection.innerHTML = '<h2>Profiles</h2>';
    appendSocial(socialSection, data.sozialeMedien);
    left.appendChild(socialSection);

    // RIGHT COLUMN
    const right = createElement('section', 'right-column');

    // Summary
    const summarySection = createElement('section');
    summarySection.innerHTML = `<h2>Profile</h2><p>${data.basics.summary}</p>`;
    right.appendChild(summarySection);

    // Experience
    const expSection = createElement('section');
    expSection.innerHTML = '<h2>Work Experience</h2>';
    data.berufserfahrung.forEach(exp => {
        const item = createElement('div', 'experience-item');
        item.innerHTML = `
            <h3>${exp.title}</h3>
            <p class="company">${exp.company} | ${exp.location}</p>
            <p class="period">${exp.period}</p>
            <h4>Responsibilities:</h4>
            <ul>${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
            <h4>Achievements:</h4>
            <ul>${exp.achievements.map(a => `<li>${a}</li>`).join('')}</ul>
        `;
        expSection.appendChild(item);
    });
    right.appendChild(expSection);

    // Education
    const eduSection = createElement('section');
    eduSection.innerHTML = '<h2>Education</h2>';
    data.ausbildung.forEach(edu => {
        const item = createElement('div', 'education-item');
        item.innerHTML = `
            <h3>${edu.type}</h3>
            <h4>${edu.degree}</h4>
            <p>${edu.institution}, ${edu.location}</p>
            <p class="period">${edu.period}</p>
        `;
        eduSection.appendChild(item);
    });
    right.appendChild(eduSection);

    // Append columns
    layout.appendChild(left);
    layout.appendChild(right);
    main.appendChild(layout);

    // Last updated
    document.getElementById('last-updated').textContent = new Date().toLocaleDateString('en-GB');

    loading.style.display = 'none';
    main.style.display = 'block';
}

// Dark mode
function initDarkMode() {
    const toggle = document.getElementById('checkbox');
    const current = localStorage.getItem('theme');
    if (current) {
        document.documentElement.setAttribute('data-theme', current);
        toggle.checked = current === 'dark';
    }
    toggle.addEventListener('change', e => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// PDF download
function initPDFDownload() {
    document.getElementById('download-pdf').addEventListener('click', () => {
        window.print();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderResume();
    initDarkMode();
    initPDFDownload();
});
