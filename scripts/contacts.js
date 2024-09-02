let contacts = [];


async function init() {
    await getContacts();
    render();
    renderContacts();
}


async function getContacts() {
    let BASE_URL = `https://join-a2f86-default-rtdb.europe-west1.firebasedatabase.app/contacts`;
    let response = await fetch(BASE_URL + ".json");
    let responseAsJson = await response.json();

    try {
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
        }
        contacts = responseAsJson;
        contacts.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.log(error);
    }
}


function render() {
    document.getElementById("contacts-site").innerHTML = "";
    document.getElementById("contacts-site").innerHTML += /*html*/ `
        <div id="contacts-div" class="contacts-container"></div>
    `;
    document.getElementById("contacts-div").innerHTML = "";
    document.getElementById("contacts-div").innerHTML += /*html*/ `
        <div class="contacts-overview-bar"></div>
        <div class="contacts-new-contact-div">
            <button class="contacts-new-contact-btn">
                Add new contact <img src="./assets/img/contacts_new_contact.svg">
            </button>
        </div>
        <div id="contacts-overview" class="contacts-overview"></div>
    `;
    document.getElementById("contacts-site").innerHTML += /*html*/ `
        <div class="contacts-headline">
            <h1>Contacts</h1>
            <div class="contacts-seperator-vertikal"></div>
            <h2>Better with a team</h2>
        </div>
    `;
}


function renderContacts() {
    document.getElementById('contacts-overview').innerHTML = '';
    document.getElementById('contacts-overview').innerHTML += /*html*/`
        <div class="contacts-overview-space"></div>
    `;
    for (let c = 0; c < contacts.length; c++) {
        document.getElementById('contacts-overview').innerHTML += /*html*/`
            <div class="contacts-overview-category">${contacts[c]['name'].charAt(0)}</div>
            <div class="contacts-seperatore-horizontal"></div>
            <div class="contacts-overview-contact">
                <div class="contacts-initials">
                    ${getInitials(contacts[c]['name'])}
                </div>
                <div class="contacts-name-email">
                    ${contacts[c]['name']}<br>
                    ${contacts[c]['email']}
                </div>
            </div>
        `;
    }
}


function getInitials(name) {
    return name.split(' ')
        .map(word => word.charAt(0))
        .join('');
}