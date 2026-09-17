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
