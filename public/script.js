const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

// Fetch contacts
async function fetchContacts() {
    const res = await fetch("/contacts");
    const contacts = await res.json();
    contactList.innerHTML = "";
    contacts.forEach(contact => {
        const li = document.createElement("li");
        li.innerHTML = `${contact.name} - ${contact.phone} - ${contact.email}
        <button onclick="deleteContact(${contact.id})">Delete</button>`;
        contactList.appendChild(li);
    });
}

// Add contact
contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    const res = await fetch("/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email })
    });

    if (res.ok) {
        contactForm.reset();
        fetchContacts();
    }
});

// Delete contact
async function deleteContact(id) {
    await fetch(`/contacts/${id}`, { method: "DELETE" });
    fetchContacts();
}

// Load contacts on page load
fetchContacts();
