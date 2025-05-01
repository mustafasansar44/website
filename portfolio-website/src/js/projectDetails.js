// projectDetails.js

// Function to display project details in a modal
function showProjectDetails(project) {
    const modal = document.getElementById('projectModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalImage = modal.querySelector('.modal-image');

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalImage.src = project.image;

    modal.style.display = 'block';
}

// Function to close the project details modal
function closeProjectDetails() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
}

// Event listener for project boxes
document.querySelectorAll('.project-box').forEach(box => {
    box.addEventListener('click', () => {
        const project = {
            title: box.dataset.title,
            description: box.dataset.description,
            image: box.dataset.image
        };
        showProjectDetails(project);
    });
});

// Event listener for closing the modal
document.getElementById('closeModal').addEventListener('click', closeProjectDetails);