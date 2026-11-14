document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector("#classmateGallery");
    const status = document.querySelector("#fetchStatus");

    async function loadIntroductions() {
        status.textContent = "Loading class introductions...";

        try {
            const response = await fetch("https://intro-form.tommyhost.ing/");

            if (!response.ok) {
                throw new Error("Unable to retrieve introductions.");
            }

            const allIntroductions = await response.json();

            const usernames = Object.keys(allIntroductions);

            usernames.sort((first, second) => {
                const firstTime = allIntroductions[first].lastUpdated || "";
                const secondTime = allIntroductions[second].lastUpdated || "";

                return secondTime.localeCompare(firstTime);
            });

            usernames.forEach((username) => {
                const record = allIntroductions[username];
                const data = record.introductionData;

                const card = document.createElement("article");
                card.className = "classmate-card";

                // Student picture
                if (data.img) {
                    const picture = document.createElement("img");
                    picture.src = data.img;
                    picture.alt = `${username}'s introduction picture`;
                    picture.loading = "lazy";

                    card.appendChild(picture);
                }

                // Student name
                const name = document.createElement("h2");

                name.textContent = [
                    data.firstName,
                    data.middleInitial,
                    data.lastName
                ].filter(Boolean).join(" ");

                card.appendChild(name);

                // Student mascot
                const mascot = document.createElement("p");

                mascot.textContent =
                    `Mascot: ${data.adjectives || ""} ${data.animal || ""}`;

                card.appendChild(mascot);

                // Favorite quote
                if (data.quote) {
                    const quote = document.createElement("blockquote");

                    quote.textContent = `"${data.quote}"`;

                    card.appendChild(quote);
                }

                // Courses
                if (Array.isArray(data.courses)) {
                    const courseHeading = document.createElement("h3");
                    courseHeading.textContent = "Courses";

                    card.appendChild(courseHeading);

                    const courseList = document.createElement("ul");

                    data.courses.forEach((course) => {
                        const item = document.createElement("li");

                        if (typeof course === "string") {
                            item.textContent = course;
                        } else if (course && typeof course === "object") {
                            item.textContent =
                                course.course || course.name || "Course";
                        }

                        courseList.appendChild(item);
                    });

                    card.appendChild(courseList);
                }

                // Username
                const submittedBy = document.createElement("p");

                submittedBy.textContent = `Username: ${username}`;

                card.appendChild(submittedBy);

                gallery.appendChild(card);
            });

            status.textContent =
                `Showing ${usernames.length} classmate introductions.`;

        } catch (error) {
            status.textContent =
                "Unable to load class introductions. Please try again later.";

            console.error("Introduction fetch error:", error);
        }
    }

    loadIntroductions();
});
