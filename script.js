document.addEventListener('DOMContentLoaded', () => {
    const partyForm = document.getElementById('party-form');
    const rsvpForm = document.getElementById('rsvp-form');
    const inviteSection = document.getElementById('invite-section');
    const displayMessage = document.getElementById('display-message');
    const guestList = document.getElementById('guests');

    let partyDetails = {};
    let guests = [];

    partyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        partyDetails.date = document.getElementById('party-date').value;
        partyDetails.description = document.getElementById('party-description').value;
        partyDetails.message = document.getElementById('invite-message').value;

        displayMessage.innerHTML = `<strong>${partyDetails.message}</strong><br>Date: ${partyDetails.date}<br>${partyDetails.description}`;

        inviteSection.classList.remove('hidden');
    });

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();

        if (name && surname) {
            guests.push({ name, surname });
            renderGuestList();
            rsvpForm.reset();
        }
    });

    function renderGuestList() {
        guestList.innerHTML = '';
        guests.forEach((guest, index) => {
            const li = document.createElement('li');
            li.textContent = `${guest.name} ${guest.surname}`;
            guestList.appendChild(li);
        });
    }
});
