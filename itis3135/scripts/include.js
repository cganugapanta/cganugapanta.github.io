// Load HTML components into the page
async function loadIncludes() {
    const includes = document.querySelectorAll("include[src]");

    for (const element of includes) {
        const file = element.getAttribute("src");

        try {
            const response = await fetch(file);

            if (!response.ok) {
                throw new Error("Could not load " + file);
            }

            const html = await response.text();

            element.outerHTML = html;
        } catch (error) {
            console.error(error);
            element.innerHTML = "Component could not be loaded.";
        }
    }
}

// Run the include function after the HTML loads
document.addEventListener("DOMContentLoaded", loadIncludes);