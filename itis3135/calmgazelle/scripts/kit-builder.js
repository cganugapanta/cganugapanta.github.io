// Custom kit builder functionality
document.addEventListener("DOMContentLoaded", function () {

    const kitForm = document.getElementById("kit-form");

    const kitSummary = document.getElementById("kit-summary");

    kitForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const selectedItems = document.querySelectorAll(
            'input[name="kit-item"]:checked'
        );

        kitSummary.innerHTML = "";

        const heading = document.createElement("h3");

        heading.textContent = "Your Custom Green Gazelle Kit";

        kitSummary.appendChild(heading);

        if (selectedItems.length === 0) {

            const message = document.createElement("p");

            message.textContent = "Please select at least one item.";

            kitSummary.appendChild(message);

            return;

        }

        const itemList = document.createElement("ul");

        selectedItems.forEach(function (item) {

            const listItem = document.createElement("li");

            listItem.textContent = item.value;

            itemList.appendChild(listItem);

        });

        kitSummary.appendChild(itemList);

        const confirmation = document.createElement("p");

        confirmation.textContent =
            "Your custom kit contains " +
            selectedItems.length +
            " selected essentials.";

        kitSummary.appendChild(confirmation);

    });

    kitForm.addEventListener("reset", function () {

        kitSummary.innerHTML = "";

    });

});