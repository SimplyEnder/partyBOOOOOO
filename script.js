document.addEventListener('DOMContentLoaded', () => {
    const partyForm = document.getElementById('party-form');
    const rsvpForm = document.getElementById('rsvp-form');
    const inviteSection = document.getElementById('invite-section');
    const displayMessage = document.getElementById('display-message');
    const guestList = document.getElementById('guests');
    const createPartyBtn = document.getElementById('create-party-btn');
    const joinPartyBtn = document.getElementById('join-party-btn');
    const partySettingsSection = document.getElementById('party-settings');

    let partyDetails = {};
    let guests = [];

    createPartyBtn.addEventListener('click', () => {
        partySettingsSection.classList.remove('hidden');
        inviteSection.classList.add('hidden');
    });

    joinPartyBtn.addEventListener('click', () => {
        if (partyDetails.message) {
            displayMessage.innerHTML = `<strong>${partyDetails.message}</strong><br>Date: ${partyDetails.date}<br>${partyDetails.description}`;
            inviteSection.classList.remove('hidden');
            partySettingsSection.classList.add('hidden');
        } else {
            alert('No party has been created yet.');
        }
    });

    partyForm.addEventListener('submit', (e) => {
        e.preventDefault();

        partyDetails.date = document.getElementById('party-date').value;
        partyDetails.description = document.getElementById('party-description').value;
        partyDetails.message = document.getElementById('invite-message').value;

        displayMessage.innerHTML = `<strong>${partyDetails.message}</strong><br>Date: ${partyDetails.date}<br>${partyDetails.description}`;

        inviteSection.classList.remove('hidden');
        partySettingsSection.classList.add('hidden');
    });

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();

        if (name && surname) {
            const alreadyJoined = guests.some(g => g.name.toLowerCase() === name.toLowerCase() && g.surname.toLowerCase() === surname.toLowerCase());
            if (alreadyJoined) {
                alert("You've already joined the party!");
                return;
            }
            guests.push({ name, surname });
            renderGuestList();
            rsvpForm.reset();
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
