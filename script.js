document.addEventListener('DOMContentLoaded', () => {
  const partyForm = document.getElementById('party-form');
  const rsvpForm = document.getElementById('rsvp-form');
  const inviteSection = document.getElementById('invite-section');
  const displayMessage = document.getElementById('display-message');
  const guestList = document.getElementById('guests');
  const feedback = document.getElementById('form-feedback');
  const messageInput = document.getElementById('invite-message');
  const messageCount = document.getElementById('message-count');

  let partyDetails = {};
  let guests = [];

  // Live character count
  messageInput.addEventListener('input', () => {
    messageCount.textContent = `${messageInput.value.length}/200`;
  });

  partyForm.addEventListener('submit', (e) => {
    e.preventDefault();

    partyDetails = {
      date: document.getElementById('party-date').value,
      description: document.getElementById('party-description').value,
      message: messageInput.value,
    };

    displayMessage.innerHTML = `<strong>${partyDetails.message}</strong><br>Date: ${partyDetails.date}<br>${partyDetails.description}`;
    inviteSection.classList.remove('hidden');
  });

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.textContent = '';

    const name = document.getElementById('name').value.trim();
    const surname = document.getElementById('surname').value.trim();

    if (!name || !surname) {
      feedback.textContent = "Please fill in both name and surname.";
      return;
    }

    const exists = guests.some(
      (guest) =>
        guest.name.toLowerCase() === name.toLowerCase() &&
        guest.surname.toLowerCase() === surname.toLowerCase()
    );

    if (exists) {
      feedback.textContent = "You’ve already joined this party!";
      feedback.style.color = "#ff6f91";
    } else {
      guests.push({ name, surname });
      renderGuestList();
      rsvpForm.reset();
      feedback.textContent = "Thanks for joining!";
      feedback.style.color = "#90ee90";
    }
  });

  function renderGuestList() {
    guestList.innerHTML = '';
    guests.forEach((guest) => {
      const li = document.createElement('li');
      li.textContent = `${guest.name} ${guest.surname}`;
      guestList.appendChild(li);
    });
  }
});
