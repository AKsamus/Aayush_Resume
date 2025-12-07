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
        if (data.skills) loadSkills(data.skills);
        if (data.projects) loadProjects(data.projects);
        if (data.certifications) loadCertifications(data.certifications);
        if (data.additionalQualifications) loadAdditionalQualifications(data.additionalQualifications);
        // Signature removed intentionally
    } catch (err) {
        console.error("Error loading resume:", err);
    }
}

/* ---------------- HEADER ---------------- */
function loadHeader(basics) {
    const header = document.getElementById("header");
    if (!header) return;

    header.innerHTML = `
        <div class="header-left">
            <h1>${basics.name || "Your Name"}</h1>
            <h2>${basics.title || "Your Title"} | ${basics.personalInfo.familyStatus} | ${basics.personalInfo.dateOfBirth}</h2>
            <p>${basics.summary || "A brief summary about yourself."}</p> 
            <div class="header-top-row">
                <div class="contact-icons">
                    <p><span class="icon">📧</span> <a href="mailto:${basics.email || ''}">${basics.email || "email@example.com"}</a></p>
                    <p><span class="icon">📞</span> <a href="tel:${basics.phone || ''}">${basics.phone || "+1234567890"}</a></p>
                    <p><span class="icon">📫</span>  <a target="_blank" style="color:#1a73e8;">${basics.personalInfo.address.street}, ${basics.personalInfo.address.city}, ${basics.personalInfo.address.zip}</p>
                    <p><span class="icon">🌐</span> <a href="${basics.portfolio || "#"}" target="_blank" style="color:#1a73e8;">Website: ${basics.portfolio || "#"}</a></p>
                    <p><span class="icon">💼</span> <a href="${basics.socialMedia?.linkedin || "#"}" target="_blank" style="color:#1a73e8;">LinkedIn: ${basics.socialMedia?.linkedin || "#"}</a></p>
                    <p><span class="icon">🐱</span> <a href="${basics.socialMedia?.github || "#"}" target="_blank" style="color:#1a73e8;">GitHub: ${basics.socialMedia?.github || "#"}</a></p>
                </div>

                <div class="header-right">
                    <img src="${basics.photo || './assets/profile_pic.jpg'}" alt="Profile Photo">
                </div>
            </div>
        </div>
    `;
}

/* ---------------- WORK EXPERIENCE ---------------- */
function loadWorkExperience(jobs) {
    const container = document.getElementById("workExperience");
    if (!container) return;

    let html = `<h2>Work Experience</h2>`;
    jobs.forEach(job => {
        html += `
            <h3>${job.title} – ${job.company}</h3>
            <p>${job.location} | ${job.period}</p>
            <p><strong>Responsibilities:</strong></p>
            <ul>${job.responsibilities.map(r => `<li>${r}</li>`).join("")}</ul>
            <p><strong>Achievements:</strong></p>
            <ul>${job.achievements.map(a => `<li>${a}</li>`).join("")}</ul>
        `;
    });
    container.innerHTML = html;
}

/* ---------------- EDUCATION ---------------- */
function loadEducation(education) {
    const container = document.getElementById("education");
    if (!container) return;

    let html = `<h2>Education</h2>`;
    education.forEach(ed => {
        html += `
            <h3>${ed.degree} – ${ed.institution}</h3>
            <p>${ed.location} | ${ed.period} | Grade: ${ed.grade}</p>
        `;
    });
    container.innerHTML = html;
}

/* ---------------- SKILLS ---------------- */
function loadSkills(skills) {
    const container = document.getElementById("skills");
    if (!container) return;

    container.innerHTML = `
        <h2>Skills</h2>
        <p><strong>Technical:</strong> ${skills.technical.join(", ")}</p>
        <p><strong>Languages:</strong> ${skills.languages.join(", ")}</p>
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
                <h3 style="margin:0; font-weight:bold;">${p.name}</h3>
                <span style="font-style:italic; color:#555; font-size:0.9rem;">${p.period}</span>
            </div>
            <p>${p.description}</p>
            <p><strong>Technologies:</strong> ${p.technologies.join(", ")}</p>
            <p><strong>Achievements:</strong></p>
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
            <h3>${c.name}</h3>
            <p>${c.issuer} | ${c.date}</p>
            <p><a href="${c.link}" target="_blank">${c.link}</a></p>
        `;
    });
    container.innerHTML = html;
}

/* ---------------- ADDITIONAL QUALIFICATIONS ---------------- */
function loadAdditionalQualifications(extra) {
    const container = document.getElementById("additionalQualifications");
    if (!container) return;

    let html = `<h2>Additional Qualifications</h2>`;
    html += `<p><strong>Highest Chess Rating♘:</strong> ${extra["Highest chess rating"]}</p>`;
    html += `<h3>Volunteer Experience</h3>`;
    extra.volunteerExperience.forEach(v => {
        html += `
            <p><strong>${v.organization}</strong> – ${v.role}</p>
            <p>${v.description}</p>
            <p>${v.period}</p>
        `;
    });
    container.innerHTML = html;
}
