// ===== Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light' : 'Dark';
});

// ===== Motion Toggle =====
const motionToggle = document.getElementById('motion-toggle');
motionToggle.addEventListener('click', () => {
  document.body.classList.toggle('reduce-motion');
  motionToggle.textContent = document.body.classList.contains('reduce-motion') ? 'Motion On' : 'Motion';
});

// ===== Navbar Scroll Buttons =====
document.querySelectorAll('[data-section]').forEach(button => {
  button.addEventListener('click', () => {
    const sectionId = button.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === Set the date of the event (e.g., May 21, 2025 at 9:00 AM) ===
  const eventDate = new Date("May 21, 2025 09:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  const countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      clearInterval(countdown);
      countdownEl.textContent = "🚀 The hackathon has started!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownEl.textContent = `⏳ Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);

// ===== RSVP Form Logic =====
const form = document.getElementById('registration-form');
const participantsList = document.getElementById('participants');
const participantCount = document.getElementById('participant-count');
const modal = document.getElementById('success-modal');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.querySelector('.close-modal');

let participants = [];

// Load participants from localStorage
window.addEventListener('load', () => {
  const saved = localStorage.getItem('participants');
  if (saved) {
    participants = JSON.parse(saved);
    updateParticipants();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const role = form.role.value;

  if (!name || !email || !role) return;

  // Prevent duplicate RSVPs by email
  if (participants.some(p => p.email === email)) {
    showModal("You've already RSVPed with this email.");
    return;
  }

  participants.push({ name, email, role });
  localStorage.setItem('participants', JSON.stringify(participants));
  updateParticipants();
  showModal(`${name}, you’ve successfully RSVPed!`);
  form.reset();
});

function updateParticipants() {
  participantsList.innerHTML = '';
  participants.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name} (${p.role})`;
    participantsList.appendChild(li);
  });
  participantCount.textContent = participants.length;
}

// ===== Modal Controls =====
function showModal(message) {
  modalMessage.textContent = message;
  modal.classList.add('active');

  // ✅ Auto-close modal after 5 seconds
  setTimeout(() => {
    modal.classList.remove('active');
  }, 5000);
}

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-item h4').forEach((question) => {
  question.style.cursor = 'pointer';
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    const isVisible = answer.style.display === 'block';

    // Hide all answers first
    document.querySelectorAll('.faq-item p').forEach(p => p.style.display = 'none');

    // Toggle current
    answer.style.display = isVisible ? 'none' : 'block';
  });
});
