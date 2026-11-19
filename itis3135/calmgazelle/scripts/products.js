// Product filtering and interactive product details
document.addEventListener("DOMContentLoaded", function () {

    // PRODUCT FILTERING
    const filterButtons = document.querySelectorAll(".filter-button");
    const productCards = document.querySelectorAll(".product-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedCategory = button.dataset.category;

            productCards.forEach(function (product) {

                const productCategory = product.dataset.category;

                if (
                    selectedCategory === "all" ||
                    productCategory === selectedCategory
                ) {
                    product.style.display = "";
                } else {
                    product.style.display = "none";
                }

            });

        });

    });

    // INTERACTIVE PRODUCT DETAILS
    const detailButtons = document.querySelectorAll(".details-button");

    detailButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const productCard = button.closest(".product-card");

            const details = productCard.querySelector(".product-details");

            if (details.hidden) {
                details.hidden = false;
                button.textContent = "Hide Details";
            } else {
                details.hidden = true;
                button.textContent = "View Details";
            }

        });

    });

});