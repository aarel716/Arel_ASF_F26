
const MENU_ITEMS = [
    // Breakfast
    {
        id: 1,
        name: "Brasshaven Breakfast Plate",
        description: "Eggs, potatoes, toast, and smoked sausage",
        price: 14,
        category: "Breakfast",
        note: "Made to order"
    },
    {
        id: 2,
        name: "Copper Kettle Tea",
        description: "Warm apple tea with cinnamon and a lemon slice",
        price: 5,
        category: "Breakfast",
        note: "Caffeine-free"
    },

    // Lunch
    {
        id: 3,
        name: "Skygarden Bowl",
        description: "Roasted squash, chickpeas, rice, and lemon dressing",
        price: 16,
        category: "Lunch",
        note: "Vegan"
    },
    {
        id: 4,
        name: "Little Aviator Plate",
        description: "Grilled chicken, rice, and steamed carrots",
        price: 11,
        category: "Lunch",
        note: "Smaller portion"
    },
    {
        id: 5,
        name: "Engineer's Sandwich",
        description: "Roast chicken, cheese, greens, and mustard",
        price: 15,
        category: "Lunch",
        note: "Crew favorite"
    },
    {
        id: 6,
        name: "Piston Ginger Fizz",
        description: "House ginger soda over ice with fresh lime",
        price: 6,
        category: "Lunch",
        note: "Non-alcoholic"
    },

    // Dinner
    {
        id: 7,
        name: "Ironwake Short Rib",
        description: "Braised beef, roast potatoes, and glazed carrots",
        price: 24,
        category: "Dinner",
        note: "Captain's favorite"
    },
    {
        id: 8,
        name: "Boilerhouse Bento",
        description: "Ginger chicken, steamed rice, and pickled vegetables",
        price: 18,
        category: "Dinner",
        note: "Chef favorite"
    },
    {
        id: 9,
        name: "Foxfire Noodles",
        description: "Chili tofu, noodles, mushrooms, and sesame greens",
        price: 17,
        category: "Dinner",
        note: "Vegan / Spicy"
    },

    {
        id: 10,
        name: "Dockworker's Pie",
        description: "Mushroom and lentil pie with mashed potato topping",
        price: 19,
        category: "Dinner",
        note: "Vegetarian"
    },
    {
        id: 11,
        name: "Captain's Chocolate Cake",
        description: "Warm chocolate cake with vanilla cream",
        price: 8,
        category: "Dinner",
        note: "House dessert"
    }
];

//U.S. currency format.
const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});


// table creation
const menuBody = document.getElementById("menu-body");

if (menuBody) {

    MENU_ITEMS.forEach((item) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("th");
        nameCell.scope = "row";
        nameCell.textContent = item.name;

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
// The featured meal price

    const featurePrice =
        document.getElementById("feature-price");

    const featuredItem =
        MENU_ITEMS.find((item) =>{
            return item.name === "Ironwake Short Rib";
        });
    if (featurePrice && featuredItem) {
        featurePrice.textContent =
            money.format(featuredItem.price);
    }



// Reservation form

const reservationForm =
    document.getElementById("reservation-form");

if (reservationForm) {

    const formMessage =
        document.getElementById("form-message");

    reservationForm.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            const errors = [];

            const name =
                document
                    .getElementById("guest-name")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("guest-email")
                    .value
                    .trim();

            const partySize =
                document
                    .getElementById("party-size")
                    .value;

            const date =
                document
                    .getElementById("visit-date")
                    .value;

            const time =
                document
                    .getElementById("visit-time")
                    .value;

            const seating =
                document.querySelector(
                    'input[name="seating"]:checked'
                );

            const dietaryNotes =
                document
                    .getElementById("dietary-notes")
                    .value
                    .trim();

            const newsletter =
                document
                    .getElementById("newsletter")
                    .checked;

            //validation
            if (name === "") {
                errors.push(
                    "Please enter your name."
                );
            }
            else if (name.length > 20) {
                errors.push(
                    "Name must be 20 characters or fewer."
                );
            }

            if (email === "") {
                errors.push(
                    "Please enter your email."
                );
            }
            else if (
                !email.includes("@") ||
                !email.includes(".")
            ) {
                errors.push(
                    "Please enter a valid email address."
                );
            }

            if (partySize === "") {
                errors.push(
                    "Please select a party size."
                );
            }

            if (date === "") {
                errors.push(
                    "Please select a date."
                );
            }

            if (time === "") {
                errors.push(
                    "Please select a time."
                );
            }
            else if (time < "16:00" || time > "21:00") {
                errors.push(
                    "Reservation time must be between 4 and 9 p.m."
                );
            }

            if (!seating) {
                errors.push(
                    "Please select a seating preference."
                );
            }

            if (dietaryNotes.length > 30) {
                errors.push(
                    "Dietary notes must be 30 characters or fewer."
                );
            }


            // Error message

            formMessage.innerHTML = "";

            if (errors.length > 0) {
                const alert =
                    document.createElement("div");

                alert.className =
                    "alert alert-danger";

                const errorList =
                    document.createElement("ul");

                errors.forEach((error) => {
                    const listItem =
                        document.createElement("li");

                    listItem.textContent =
                        error;

                    errorList.appendChild(
                        listItem
                    );
                });
                alert.appendChild(
                    errorList
                );

                formMessage.appendChild(
                    alert
                );

                return;

            }

            // create reservation object

            const reservation = {
                name: name,
                email: email,
                partySize: partySize,
                date: date,
                time: time,
                seating: seating.value,
                dietaryNotes: dietaryNotes,
                newsletter: newsletter
            };

            console.log(reservation);

            // Success message
            const successAlert =
                document.createElement("div");
            successAlert.className =
                "alert alert-success";
            successAlert.textContent =
                "Reservation request submitted successfully.";
            formMessage.appendChild(
                successAlert
            );

        }
    );


    reservationForm.addEventListener(
        "reset",
         () => {
            formMessage.innerHTML = "";
        }
    );
}