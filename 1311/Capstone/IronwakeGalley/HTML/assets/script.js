// MENU DATA AND FETCH

let menuItems = [];
let filteredItems = [];
let currentIndex = 0;

const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

const menuImage = document.getElementById("menu-image");

if (menuImage) {
    fetch("assets/menu.json")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Unable to load menu.");
        })
        .then(data => {
            console.log("Menu items:", data);
            menuItems = data;
            filteredItems = menuItems;
            displayMenuItem();
            displayMenuTable();
        })
        .catch(error => {
            console.error("Menu error:", error);
            window.location.href = "error.html";
        });


    // MENU CAROUSEL

    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");


    // PREVIOUS ITEM
    const prevImage = () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = filteredItems.length - 1;
        }
        displayMenuItem();
    }


    // NEXT ITEM

    const nextImage = () => {
        currentIndex++;
        if (currentIndex >= filteredItems.length) {
            currentIndex = 0;
        }
        displayMenuItem();
    }


    // DISPLAY MENU ITEM IN CAROUSEL

    const displayMenuItem= ()=> {
        const item = filteredItems[currentIndex];
        const menuName = document.getElementById("menu-name");
        const menuDescription = document.getElementById("menu-description");
        const menuCategory = document.getElementById("menu-category");
        const menuPrice = document.getElementById("menu-price");
        const menuNote = document.getElementById("menu-note");
        const menuPosition = document.getElementById("menu-position");

        menuImage.src = item.img;
        menuImage.alt = item.name;

        menuName.textContent = item.name;
        menuDescription.textContent = item.description;
        menuCategory.textContent = item.category;
        menuPrice.textContent = money.format(item.price);
        menuNote.textContent = item.note;

        menuPosition.textContent =
            `Item ${currentIndex + 1} of ${filteredItems.length}`;
    }


    prevButton.addEventListener("click", prevImage);
    nextButton.addEventListener("click", nextImage);


    // MENU FILTER AND TABLE

    const menuFilter = document.getElementById("menu-filter");
    const menuBody = document.getElementById("menu-body");
    const menuCarousel = document.getElementById("menu-carousel");


    // BUILD MENU TABLE

    const displayMenuTable= ()=> {
        menuBody.innerHTML = "";
        filteredItems.forEach((item, index) => {
            const row = document.createElement("tr");
            const nameCell = document.createElement("th");
            nameCell.scope = "row";
            const mealButton = document.createElement("button");
            mealButton.type = "button";
            mealButton.className = "menu-item-link";
            mealButton.textContent = item.name;
            mealButton.addEventListener("click", () => {
                currentIndex = index;
                displayMenuItem();
                menuCarousel.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });

            nameCell.appendChild(mealButton);
            const descriptionCell = document.createElement("td");
            descriptionCell.textContent = item.description;

            const priceCell = document.createElement("td");
            priceCell.classList.add("price");
            priceCell.textContent = money.format(item.price);

            const noteCell = document.createElement("td");
            noteCell.textContent = item.note;

            row.appendChild(nameCell);
            row.appendChild(descriptionCell);
            row.appendChild(priceCell);
            row.appendChild(noteCell);

            menuBody.appendChild(row);
        });
    }


    // FILTER MENU BY CATEGORY

    menuFilter.addEventListener("change", () => {
        const selectedCategory = menuFilter.value;

        if (selectedCategory === "All") {
            filteredItems = menuItems;
        } else {
            filteredItems = menuItems.filter(item => {
                return item.category === selectedCategory;
            });
        }
        currentIndex = 0;
        displayMenuItem();
        displayMenuTable();
    });

}





// RESERVATION FORM

const reservationForm = document.getElementById("reservation-form");
if (reservationForm) {
    const formMessage = document.getElementById("form-message");
    const dateInput = document.getElementById("visit-date");
    const timeSelect = document.getElementById("visit-time");
    const dietaryNotesInput = document.getElementById("dietary-notes");
    const dietaryCounter = document.getElementById("dietary-counter");


    // FORMAT RESERVATION TIME

    const formatTime= (hour, minute)=> {
        return (String(hour).padStart(2, "0") + ":" + String(minute).padStart(2, "0"));
    }


    // GET TODAY'S DATE

    const getTodayString= ()=> {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    // CREATE RESERVATION TIME OPTIONS

    const createTimeOptions=(selectedDate)=> {
        timeSelect.innerHTML = "";
        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.textContent = "Select a time";
        timeSelect.appendChild(placeholder);
        const timeRanges = [
            {start: 7, end: 12},
            {start: 16, end: 21}
        ];

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        timeRanges.forEach(range => {
            const group = document.createElement("optgroup");

            group.label = range.start === 7
                ? "Breakfast & Lunch"
                : "Dinner";

            const startMinutes = range.start * 60;
            const endMinutes = range.end * 60;

            for (
                let totalMinutes = startMinutes;
                totalMinutes <= endMinutes;
                totalMinutes += 15
            ) {
                const hour = Math.floor(totalMinutes / 60);
                const minute = totalMinutes % 60;
                const timeValue = formatTime(hour, minute);

                if (
                    selectedDate === getTodayString() &&
                    totalMinutes <= currentMinutes
                ) {
                    continue;
                }

                const displayHour = hour % 12 || 12;
                const displayMinute = String(minute).padStart(2, "0");
                const period = hour < 12 ? "AM" : "PM";

                const option = document.createElement("option");
                option.value = timeValue;
                option.textContent =
                    `${displayHour}:${displayMinute} ${period}`;

                group.appendChild(option);
            }

            if (group.children.length > 0) {
                timeSelect.appendChild(group);
            }
        });
    }

    createTimeOptions(dateInput.value);
    dateInput.addEventListener("change", () => {
        createTimeOptions(dateInput.value);
    });


    // CHECK AND SUBMIT RESERVATION FORM

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const errors = [];
        const name = document.getElementById("guest-name").value.trim();
        const email = document.getElementById("guest-email").value.trim();
        const partySize = document.getElementById("party-size").value;

        const date = dateInput.value;
        const time = timeSelect.value;
        const seating = document.querySelector(
            'input[name="seating"]:checked'
        );
        const dietaryNotes = dietaryNotesInput.value.trim();
        const newsletter = document.getElementById("newsletter").checked;


        if (name === "") {
            errors.push("Please enter your name.");
        } else if (name.length > 20) {
            errors.push("Name must be 20 characters or fewer.");
        }

        if (email === "") {
            errors.push("Please enter your email.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        if (
            partySize === "" ||
            !Number.isInteger(Number(partySize)) ||
            Number(partySize) < 1 ||
            Number(partySize) > 8
        ) {
            errors.push("Please select a party size between 1 and 8.");
        }

        if (date === "") {
            errors.push("Please select a date.");
        } else if (date < getTodayString()) {
            errors.push("Reservation date cannot be in the past.");
        }

        if (time === "") {
            errors.push("Please select a time.");
        } else {
            const [hour, minute] = time.split(":").map(Number);
            const totalMinutes = hour * 60 + minute;

            const morningValid =
                totalMinutes >= 420 &&
                totalMinutes <= 720;

            const dinnerValid =
                totalMinutes >= 960 &&
                totalMinutes <= 1260;

            const validIncrement =
                Number.isInteger(totalMinutes) &&
                totalMinutes % 15 === 0;

            if (
                !validIncrement ||
                (!morningValid && !dinnerValid)
            ) {
                errors.push(
                    "Please select an available reservation time."
                );
            }

            if (date === getTodayString()) {
                const now = new Date();

                const currentMinutes =
                    now.getHours() * 60 +
                    now.getMinutes();

                if (totalMinutes <= currentMinutes) {
                    errors.push(
                        "Please select a future reservation time."
                    );
                }
            }
        }

        if (!seating) {
            errors.push("Please select a seating preference.");
        }

        if (dietaryNotes.length > 30) {
            errors.push(
                "Dietary notes must be 30 characters or fewer."
            );
        }

        formMessage.innerHTML = "";

        if (errors.length > 0) {
            const alert = document.createElement("div");
            alert.className = "alert alert-danger";
            alert.setAttribute("role", "alert");

            const errorList = document.createElement("ul");

            errors.forEach(error => {
                const listItem = document.createElement("li");
                listItem.textContent = error;
                errorList.appendChild(listItem);
            });

            alert.appendChild(errorList);
            formMessage.appendChild(alert);

            return;
        }

        const reservation = {
            name: name,
            email: email,
            partySize: Number(partySize),
            date: date,
            time: time,
            seating: seating.value,
            dietaryNotes: dietaryNotes,
            newsletter: newsletter
        };

        const reservationJSON = JSON.stringify(reservation, null, 2);
        console.log("Reservation request:", reservationJSON);



        const successAlert = document.createElement("div");
        successAlert.className = "alert alert-success";
        successAlert.setAttribute("role", "status");

        successAlert.textContent =
            "Reservation request submitted successfully. " +
            "Your table is not confirmed until we contact you.";

        formMessage.appendChild(successAlert);
    });


    // RESET RESERVATION FORM

    reservationForm.addEventListener("reset", () => {
        formMessage.innerHTML = "";
        createTimeOptions("");
        dietaryCounter.textContent = "0 / 30 characters";
    });


    // LIMIT DIETARY NOTES TO 30 CHARACTERS

    dietaryNotesInput.addEventListener("input", () => {
        if (dietaryNotesInput.value.length > 30) {
            dietaryNotesInput.value =
                dietaryNotesInput.value.slice(0, 30);
        }
        const count = dietaryNotesInput.value.length;

        dietaryCounter.textContent =
            `${count} / 30 characters`;
    });

}


// SEATING IMAGE PREVIEW

const seatingOptions = document.querySelectorAll(
    'input[name="seating"]'
);
const seatingPreviewImage = document.getElementById(
    "seating-preview-image"
);
const seatingPreviewTitle = document.getElementById(
    "seating-preview-title"
);
const seatingPreviewDescription = document.getElementById(
    "seating-preview-description"
);
if (seatingPreviewImage && seatingOptions.length > 0) {
    const seatingDetails = {
        "porthole": {
            image: "assets/images/seating/port_seating.png",
            title: "Porthole Table",
            description: "Enjoy a view of Brasshaven from your table.",
            alt: "Dining table beside a brass porthole window overlooking Brasshaven"
        },
        "crew-booth": {
            image: "assets/images/seating/crew_seating.png",
            title: "Crew Booth",
            description: "Relax in a cozy booth near the galley.",
            alt: "Comfortable booth seating inside the Ironwake Galley"
        },
        "galley-floor": {
            image: "assets/images/seating/galley_seating.png",
            title: "Galley Floor",
            description: "Dine in the heart of the restaurant.",
            alt: "Tables and chairs in the Ironwake Galley's main dining room"
        }
    };


    // DISPLAY SELECTED SEATING IMAGE

    const updateSeatingPreview = (selectedSeating) => {
        const details = seatingDetails[selectedSeating];
        if (!details) {
            return;
        }
        seatingPreviewImage.src = details.image;
        seatingPreviewImage.alt = details.alt;
        seatingPreviewImage.hidden = false;
        seatingPreviewTitle.textContent = details.title;
        seatingPreviewDescription.textContent = details.description;
    }

    seatingOptions.forEach(function (option) {
        option.addEventListener("change", function () {
            if (option.checked) {
                updateSeatingPreview(option.value);
            }
        });
    });


    // RESET SEATING PREVIEW

    const seatingReservationForm = document.getElementById(
        "reservation-form"
    );
    if (seatingReservationForm) {
        seatingReservationForm.addEventListener("reset", function () {
            seatingPreviewImage.hidden = true;
            seatingPreviewImage.removeAttribute("src");
            seatingPreviewImage.alt = "";
            seatingPreviewTitle.textContent =
                "Select a seating option";
            seatingPreviewDescription.textContent =
                "A preview will appear here.";
        });
    }

}