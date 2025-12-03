async function loadResume() {
    const res = await fetch("data/resume-data.json");
    const data = await res.json();

    loadHeader(data.basics);
    loadWorkExperience(data.workExperience);
    loadEducation(data.education);
    loadSkills(data.skills);
    loadProjects(data.projects);
    loadCertifications(data.certifications);
    loadAdditionalQualifications(data.additionalQualifications);
    //loadSignature(data.signature);
}

/* ---------------- HEADER WITH CONTACT & SOCIAL ---------------- */
function loadHeader(basics) {
    document.getElementById("header").innerHTML = `
        <div class="header-left">
            <h1>${basics.name || "Your Name"}</h1>
            <h2>${basics.title || "Your Title"}</h2>
            
            <div class="header-top-row">
                <div class="contact-icons">
                    <p><span class="icon">📧</span> <a href="mailto:${basics.email}">${basics.email || "email@example.com"}</a></p>
                    <p><span class="icon">📞</span> <a href="tel:${basics.phone}">${basics.phone || "+1234567890"}</a></p>
                    <p><span class="icon">🌐</span> <a href="${basics.portfolio || "#"}" target="_blank" style="color:#1a73e8;">${basics.portfolio || "#"}</a></p>
                    <p><span class="icon">💼</span> <a href="${basics.socialMedia?.linkedin || "#"}" target="_blank" style="color:#1a73e8;">${basics.socialMedia?.linkedin || "#"}</a></p>
                    <p><span class="icon">🐱</span> <a href="${basics.socialMedia?.github || "#"}" target="_blank" style="color:#1a73e8;">${basics.socialMedia?.github || "#"}</a></p>
                </div>

                <div class="header-right">
                    <img src="${basics.photo || './assets/profile_pic.jpg'}" alt="Profile Photo">
                </div>
            </div>
        </div>
    `;
}

/* ---------------- OTHER SECTIONS ---------------- */
function loadWorkExperience(jobs) {
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
    document.getElementById("workExperience").innerHTML = html;
}

function loadEducation(education) {
    let html = `<h2>Education</h2>`;
    education.forEach(ed => {
        html += `
            <h3>${ed.degree} – ${ed.institution}</h3>
            <p>${ed.location} | ${ed.period}</p>
            <p>Grade: ${ed.grade}</p>
        `;
    });
    document.getElementById("education").innerHTML = html;
}

function loadSkills(skills) {
    let html = `
        <h2>Skills</h2>
        <p><strong>Technical:</strong> ${skills.technical.join(", ")}</p>
        <p><strong>Software:</strong> ${skills.software.join(", ")}</p>
        <p><strong>Languages:</strong> ${skills.languages.join(", ")}</p>
    `;
    document.getElementById("skills").innerHTML = html;
}

function loadProjects(projects) {
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
    document.getElementById("projects").innerHTML = html;
}

function loadCertifications(certs) {
    let html = `<h2>Certifications</h2>`;
    certs.forEach(c => {
        html += `
            <h3>${c.name}</h3>
            <p>${c.issuer} | ${c.date}</p>
            <p><a href="${c.link}" target="_blank">${c.link}</a></p>
        `;
    });
    document.getElementById("certifications").innerHTML = html;
}

function loadAdditionalQualifications(extra) {
    let html = `<h2>Additional Qualifications</h2>`;
    html += `<p><strong>Highest Chess Rating:</strong> ${extra["Highest chess rating"]}</p>`;
    html += `<h3>Volunteer Experience</h3>`;
    extra.volunteerExperience.forEach(v => {
        html += `
            <p><strong>${v.organization}</strong> – ${v.role}</p>
            <p>${v.description}</p>
            <p>${v.period}</p>
        `;
    });
    document.getElementById("additionalQualifications").innerHTML = html;
}

function loadSignature(sig) {
    document.getElementById("signature").innerHTML = `
        <h2>Signature</h2>
        <p>Place: ${sig.place}</p>
        <p>Date: ${sig.date}</p>
    `;
}

loadResume();
