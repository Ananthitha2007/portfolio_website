// script.js: Personal Portfolio Website
import { db } from './firebase.js';
import { collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Debug logging function
const log = (message, data) => {
    console.log(`%c[Firebase Debug]%c ${message}`, 'color: #4e54c8; font-weight: bold;', 'color: inherit;', data || "");
};

document.addEventListener('DOMContentLoaded', function () {
    log('Application initialized.');

    // Contact form handling: store data in Firestore
    const form = document.getElementById('contact-form');
    if (form) {
        const submitBtn = form.querySelector('.submit-btn');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = form.elements['name'].value;
            const email = form.elements['email'].value;
            const message = form.elements['message'].value;

            try {
                await addDoc(collection(db, "contacts"), {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: serverTimestamp()
                });
                alert("Message sent successfully!");
                form.reset();
            } catch (error) {
                console.error(error);
                alert("Error sending message");
            }
        });
    }

    // Dynamic Projects Loading: Load from "projects" collection
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        log('Fetching projects from Firestore...');
        getDocs(collection(db, 'projects')).then((querySnapshot) => {
            if (querySnapshot.empty) {
                log('No projects found in your Firestore collection "projects".');
                return;
            }

            // If projects are found, clear any placeholders
            projectGrid.innerHTML = '';

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                log(`✓ Loaded project: ${data.title}`);

                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${data.title}</h3>
                    <p>${data.description || 'No description provided.'}</p>
                    <a href="${data.link || '#'}" class="project-link" target="_blank">View Project</a>
                `;
                projectGrid.appendChild(card);
            });
        }).catch((error) => {
            log('✗ Error fetching projects:', error);
        });
    }
});

// Typing Effect
const text = "Cyber Security Student | Web Developer";
let i = 0;

function typeEffect() {
    const typingElement = document.getElementById("typing");
    if (typingElement && i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 50);
    }
}

typeEffect();
