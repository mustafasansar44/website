// src/js/main.js

// Function to initialize the application
function init() {
    const projectBoxes = document.querySelectorAll('.project-box');
    projectBoxes.forEach(box => {
        box.addEventListener('click', () => {
            showProjectDetails(box.dataset.projectId);
        });
    });
}

// Function to show project details
function showProjectDetails(projectId) {
    const projectDetails = document.getElementById('project-details');
    // Fetch project details based on projectId
    // This is a placeholder for actual project data
    const projectData = {
        1: { title: "Project 1", description: "Description for project 1." },
        2: { title: "Project 2", description: "Description for project 2." },
        3: { title: "Project 3", description: "Description for project 3." },
        4: { title: "Project 4", description: "Description for project 4." }
    };

    const project = projectData[projectId];
    if (project) {
        projectDetails.innerHTML = `
            <h2>${project.title}</h2>
            <p>${project.description}</p>
        `;
        projectDetails.style.display = 'block';
    }
}

// Initialize the application on page load
document.addEventListener('DOMContentLoaded', init);