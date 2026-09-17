// North Star Bakery Favorites

// List of bakery products available to favorite.
const products = [
    "Sourdough Bread",
    "Whole Wheat Bread",
    "Cinnamon Rolls",
    "Blueberry Muffins",
    "Chocolate Chip Cookies"
];

// List of the user's current favorite products.
let favorites = JSON.parse(localStorage.getItem("bakeryFavorites")) || [];

// Find the buttons and message on the page.
const favoriteButtons = document.querySelectorAll(".favorite-button");
const favoriteMessage = document.getElementById("favorite-message");

// Save the current favorites to browser storage.
function saveFavorites() {
    localStorage.setItem("bakeryFavorites", JSON.stringify(favorites));
}

// Update the button text based on the user's favorites.
function updateButtons() {
    favoriteButtons.forEach(function(button) {
        const product = button.dataset.product;

        if (favorites.includes(product)) {
            button.textContent = "Remove from Favorites";
        } else {
            button.textContent = "Add to Favorites";
        }
    });
}

// Show a message to the user after a favorite is changed.
function showFavoriteMessage(product, added) {
    if (added) {
        favoriteMessage.textContent = product + " was added to your favorites.";
    } else {
        favoriteMessage.textContent = product + " was removed from your favorites.";
    }
}

// Add or remove a product from the favorites list.
function toggleFavorite(product) {
    const favoriteIndex = favorites.indexOf(product);

    if (favoriteIndex === -1) {
        favorites.push(product);
        showFavoriteMessage(product, true);
    } else {
        favorites.splice(favoriteIndex, 1);
        showFavoriteMessage(product, false);
    }

    saveFavorites();
    updateButtons();
}

// Respond when the user clicks a favorite button.
favoriteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        toggleFavorite(button.dataset.product);
    });
});

// Load saved favorites when the page opens.
updateButtons();
// Contact form validation

const contactForm = document.querySelector("form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const itemDetails = document.getElementById("item-details");

        // Remove previous error messages.
        document.querySelectorAll(".form-error").forEach(function(error) {
            error.remove();
        });

        let formIsValid = true;

        // Check that the name has at least 2 characters.
        if (name.value.trim().length < 2) {
            showFormError(name, "Please enter your name.");
            formIsValid = false;
        }

        // Check that the email contains a valid email format.
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {
            showFormError(email, "Please enter a valid email address.");
            formIsValid = false;
        }

        // Check that the item details are not empty.
        if (itemDetails.value.trim().length < 5) {
            showFormError(
                itemDetails,
                "Please enter at least 5 characters for the item details."
            );
            formIsValid = false;
        }

        // Prevent submission if the form contains invalid information.
        if (!formIsValid) {
            event.preventDefault();
        }
    });
}

// Display an error message below the related field.
function showFormError(field, message) {
    const error = document.createElement("p");
    error.className = "form-error";
    error.textContent = message;
    error.setAttribute("role", "alert");

    field.insertAdjacentElement("afterend", error);
}
// Remember the user's request type.
const requestType = document.getElementById("request-type");

if (requestType) {
    const savedRequestType = localStorage.getItem("bakeryRequestType");

    if (savedRequestType) {
        requestType.value = savedRequestType;
    }

    requestType.addEventListener("change", function() {
        localStorage.setItem("bakeryRequestType", requestType.value);
    });
}
