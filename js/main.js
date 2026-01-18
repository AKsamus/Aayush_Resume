document.addEventListener("DOMContentLoaded", () => {
    loadResume();
});

async function loadResume() {
    try {
        const res = await fetch("data/resume-data.json");
        const data = await res.json();

        console.log("Resume data loaded:", data);

        if (data.basics) loadHeader(data.basics);
        if (data.workExperience) loadWorkExperience(data.workExperience);
        if (data.education) loadEducation(data.education);
        if (data.skills) loadSummaryAndSkills(data.skills, data.basics.summary);
        if (data.languages) loadLanguages(data.languages);
        if (data.projects) loadProjects(data.projects);
        if (data.certifications) loadCertifications(data.certifications);
        if (data.hobbies) loadHobbies(data.hobbies);
        // Signature removed intentionally
    } catch (err) {
        console.error("Error loading resume:", err);
    }
}
/*---------------- SVGs ---------------- */
const githubSVG = `
<svg height="24" width="24" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82a7.65 7.65 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
</svg>
`;
const LinkedInSVG = `
<svg height="24" width="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.74-2.6 5.07 0 6 3.34 6 7.68V24h-5v-7.2c0-1.72-.03-3.94-2.4-3.94-2.4 0-2.77 1.88-2.77 3.82V24h-5V8z"/>
</svg>
`;
const GlobeSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <!-- First (smallest) circle -->
  <circle cx="12" cy="12" r="4" stroke="black" fill="none" stroke-width="2"/>
  
  <!-- Second (middle) circle -->
  <circle cx="12" cy="12" r="8" stroke="black" fill="none" stroke-width="2"/>
  
  <!-- Third (largest) circle -->
  <circle cx="12" cy="12" r="12" stroke="black" fill="none" stroke-width="2"/>
</svg>
`;
const LocationSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
  <!-- Outer pin shape -->
  <path d="M12 21s-6-8.5-6-12a6 6 0 1112 0c0 3.5-6 12-6 12z"/>
  <!-- Center circle / location dot -->
  <circle cx="12" cy="9" r="2"/>
</svg>
`;
const PhoneSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
  <!-- Phone handset shape -->
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2c-9.05-.5-16.36-7.81-16.86-16.86A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.2 1.27.6 2.5 1.18 3.65a2 2 0 0 1-.45 2.41l-1.27 1.27a16.05 16.05 0 0 0 6.6 6.6l1.27-1.27a2 2 0 0 1 2.41-.45c1.15.58 2.38.98 3.65 1.18a2 2 0 0 1 1.72 2z"/>
</svg>
`;
const EmailSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
  <!-- Envelope rectangle -->
  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
  <!-- Envelope flap / lines -->
  <path d="M2 4l10 8 10-8"/>
</svg>
`;
/* ---------------- HEADER ---------------- */
function loadHeader(basics) {
    const header = document.getElementById("header");
    if (!header) return;

    header.innerHTML = `
        <div class="header-left">
            <img src="${basics.photo || './assets/profile_pic.jpg'}" alt="Profile Photo">
        </div>
        <div class="header-left-center">
            <h1>${basics.name || "Your Name"}</h1>
            <p>${basics.title || "Your Title"}</p>
        </div>
        <div class="header-right-center">
                <p><span class="icon">${EmailSVG}</span> <a href="mailto:${basics.email || ''}">${basics.email || "email@example.com"}</a></p>
                <p><span class="icon">${PhoneSVG}</span> <a href="tel:${basics.phone || ''}">${basics.phone || "+1234567890"}</a></p>
                <p><span class="icon">${LocationSVG}</span>  <a target="_blank">${basics.personalInfo.address.city}, ${basics.personalInfo.address.country}</p>
        </div>
        <div class="header-right">
                <p><span class="icon">${LinkedInSVG}</span> <a href="${basics.socialMedia?.linkedin.link || "#"}" target="_blank">${basics.socialMedia?.linkedin.name || "#"}</a></p>
                <p><span class="icon">${githubSVG}</span> <a href="${basics.socialMedia?.github.link || "#"}" target="_blank">${basics.socialMedia?.github.name || "#"}</a></p>
                <p><span class="icon">${GlobeSVG}</span> <a href="${basics.portfolio.link || "#"}" target="_blank">${basics.portfolio.name || "#"}</a></p>
        </div>
        
    `;
}

/* ---------------- SUMMARY AND SKILLS ---------------- */
function loadSummaryAndSkills(skills, summary) {
    const container = document.getElementById("skills");
    if (!container) return;

    container.innerHTML = `
        <div class="header-left">
            <h2>Summary</h2>
            <p>${summary || "A brief summary about yourself."}</p> 
        </div>
        <div class="header-right">
            <h2>Skills</h2>
            <p><b>Tech:</b> ${skills.technical.join(", ")}</p>
            <p><b>Soft:</b> ${skills.soft.join(", ")}</p>
        </div>
    `;
}

/* ---------------- EDUCATION ---------------- */
function loadEducation(education) {
    const container = document.getElementById("education");
    if (!container) return;

    let html = `<h2>Education</h2>`;
    education.forEach(ed => {
        html += `
            <p><b>${ed.degree}</b> | ${ed.institution}</p>
            <p>${ed.location} | ${ed.period} | Grade: ${ed.grade}</p>
            <p>${ed.special.join(" | ")}</p>
        `;
    });
    container.innerHTML = html;
}

/* ---------------- WORK EXPERIENCE ---------------- */
function loadWorkExperience(jobs) {
    const container = document.getElementById("workExperience");
    if (!container) return;

    let html = `<h2>Work Experience</h2>`;
    jobs.forEach(job => {
        html += `
            <p><b>${job.title}@${job.company}</b> | ${job.location} | ${job.period}</p>
            <p><u>Responsibilities</u>:</p>
            <ul>${job.responsibilities.map(r => `<li>${r}</li>`).join("")}</ul>
            <p><u>Achievements</u>:</p>
            <ul>${job.achievements.map(a => `<li>${a}</li>`).join("")}</ul>
        `;
    });
    container.innerHTML = html;
} 

/* ---------------- LANGUAGES ---------------- */
function loadLanguages(languages) {
    const container = document.getElementById("languages");
    if (!container) return;

    container.innerHTML = `
        <h2>Languages</h2>
        <p>${languages.languages.join(", ")}</p>
    `;
}

/* ---------------- PROJECTS ---------------- */
function loadProjects(projects) {
    const container = document.getElementById("projects");
    if (!container) return;

    let html = `<h2>Projects</h2>`;
    projects.forEach(p => {
        html += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                <p><b>${p.name}</b> | ${p.period}</p>
            </div>
            <p>${p.description} using ${p.technologies.join(", ")}</p>
            <ul>${p.achievements.map(a => `<li>${a}</li>`).join("")}</ul>
        `;
    });
    container.innerHTML = html;
}

/* ---------------- CERTIFICATIONS ---------------- */
function loadCertifications(certs) {
    const container = document.getElementById("certifications");
    if (!container) return;

    let html = `<h2>Certifications</h2>`;
    certs.forEach(c => {
        html += `
            <p>${c.date} | ${c.name} (${c.issuer})</p>
        `;
    });
    container.innerHTML = html;
}

/* ---------------- ADDITIONAL QUALIFICATIONS ---------------- */
function loadHobbies(hobby) {
    const container = document.getElementById("hobbies");
    if (!container) return;

    let html = `<h2>Hobbies</h2>`;
    html += `<p>${hobby.join(", ")}</p>`;
    container.innerHTML = html;
}
