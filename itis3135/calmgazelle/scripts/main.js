// Load shared website components
async function loadComponent(component, elementId) {
    try {
        const response = await fetch(component);

        if (!response.ok) {
            throw new Error("Unable to load " + component);
        }

        const html = await response.text();

        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

// Load header and footer when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("components/header.html", "header-container");
    loadComponent("components/footer.html", "footer-container");
});