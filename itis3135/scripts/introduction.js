"use strict";

// ============================================
// INTRODUCTION FORM JAVASCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("form");
    const clearButton = document.getElementById("clear");
    const addCourseButton = document.getElementById("addCourse");
    const coursesContainer = document.getElementById("coursesContainer");
    const introductionOutput = document.getElementById("introductionOutput");
    const pictureInput = document.getElementById("img");
    const picturePreview = document.getElementById("picturePreview");

    // Store the original picture
    const originalPicture = picturePreview.src;

    // ============================================
    // CLEAR BUTTON
    // ============================================

    clearButton.addEventListener("click", function () {

        form.querySelectorAll("input, textarea").forEach(function (field) {
            if (field.type !== "file") {
                field.value = "";
            } else {
                field.value = "";
            }
        });

        picturePreview.src = originalPicture;

        introductionOutput.innerHTML = "";

    });

    // ============================================
    // ADD COURSE BUTTON
    // ============================================

    addCourseButton.addEventListener("click", function () {

        const courseCount = coursesContainer.querySelectorAll(".course").length + 1;

        const course = document.createElement("div");
        course.classList.add("course");

        course.innerHTML = `
            <h4>Course ${courseCount}</h4>

            <label>Department:</label>
            <input type="text" name="department"
                placeholder="Department" required>

            <label>Course Number:</label>
            <input type="text" name="courseNumber"
                placeholder="Course number" required>

            <label>Course Name:</label>
            <input type="text" name="courseTitle"
                placeholder="Course name" required>

            <label>Reason for Taking:</label>
            <textarea name="reasonForTaking"
                placeholder="Why are you taking this course?"
                required></textarea>

            <button type="button" class="deleteCourse">
                Delete Course
            </button>

            <hr>
        `;

        coursesContainer.appendChild(course);

    });

    // ============================================
    // DELETE COURSE BUTTON
    // ============================================

    coursesContainer.addEventListener("click", function (event) {

        if (event.target.classList.contains("deleteCourse")) {

            const course = event.target.closest(".course");

            course.remove();

            // Renumber courses
            const courses = coursesContainer.querySelectorAll(".course");

            courses.forEach(function (course, index) {
                course.querySelector("h4").textContent =
                    "Course " + (index + 1);
            });

        }

    });

    // ============================================
    // IMAGE UPLOAD / PREVIEW
    // ============================================

    pictureInput.addEventListener("change", function () {

        const file = pictureInput.files[0];

        if (file && file.type.startsWith("image/")) {

            const reader = new FileReader();

            reader.onload = function (event) {
                picturePreview.src = event.target.result;
            };

            reader.readAsDataURL(file);

        }

    });

    // ============================================
    // SUBMIT FORM
    // ============================================

    form.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get form values
        const firstName = document.getElementById("firstName").value;
        const middleName = document.getElementById("middleName").value;
        const nickname = document.getElementById("nickname").value;
        const lastName = document.getElementById("lastName").value;

        const acknowledgment =
            document.getElementById("acknowledgment").value;

        const acknowledgmentDate =
            document.getElementById("acknowledgmentDate").value;

        const adjectives = document.getElementById("adjectives").value;
        const animal = document.getElementById("animal").value;

        const divider =
            document.getElementById("prettyNameDivider").value;

        const pictureAlt =
            document.getElementById("pictureAlt").value;

        const caption = document.getElementById("caption").value;

        const statement = document.getElementById("statement").value;

        const personalBackground =
            document.getElementById("personalBackground").value;

        const professionalBackground =
            document.getElementById("professionalBackground").value;

        const academicBackground =
            document.getElementById("academicBackground").value;

        const backupComputer =
            document.getElementById("backupComputer").value;

        const primaryComputer =
            document.getElementById("primaryComputer").value;

        const primaryWorkLocation =
            document.getElementById("primaryWorkLocation").value;

        const additionalInformation =
            document.getElementById("additionalInformation").value;

        const quote = document.getElementById("quote").value;

        const quoteAuthor =
            document.getElementById("quoteAuthor").value;

        const funnyItem = document.getElementById("funnyItem").value;

        const somethingToShare =
            document.getElementById("somethingToShare").value;

        // ============================================
        // GET COURSES
        // ============================================

        const courses = [];

        coursesContainer.querySelectorAll(".course").forEach(function (course) {

            const department =
                course.querySelector('[name="department"]').value;

            const courseNumber =
                course.querySelector('[name="courseNumber"]').value;

            const courseTitle =
                course.querySelector('[name="courseTitle"]').value;

            const reason =
                course.querySelector('[name="reasonForTaking"]').value;

            courses.push({
                department: department,
                courseNumber: courseNumber,
                courseTitle: courseTitle,
                reason: reason
            });

        });

        // ============================================
        // GET FOOTER LINKS
        // ============================================

        const links = [];

        for (let i = 1; i <= 5; i++) {

            const label =
                document.getElementById("link" + i + "Label").value;

            const url =
                document.getElementById("link" + i + "URL").value;

            links.push({
                label: label,
                url: url
            });

        }

        // ============================================
        // GENERATE INTRODUCTION
        // ============================================

        form.style.display = "none";

        const fullName = [
            firstName,
            middleName,
            nickname,
            lastName
        ].filter(Boolean).join(" ");

        introductionOutput.innerHTML = "";

        const introduction = document.createElement("div");

        introduction.innerHTML = `
            <h2>Introduction</h2>

            <h3>
                ${fullName}
                ${divider}
                ${adjectives}
                ${animal}
            </h3>

            <p><strong>Acknowledgment:</strong>
                ${acknowledgment}</p>

            <p><strong>Date:</strong>
                ${acknowledgmentDate}</p>

            <figure>
                <img src="${picturePreview.src}"
                    alt="${pictureAlt}"
                    width="300">
                <figcaption>${caption}</figcaption>
            </figure>

            <h3>Personal Statement</h3>
            <p>${statement}</p>

            <h3>Personal Background</h3>
            <ul>
                <li>Personal Background: ${personalBackground}</li>
                <li>Professional Background: ${professionalBackground}</li>
                <li>Academic Background: ${academicBackground}</li>
                <li>Background in Subject: ${subjectBackground}</li>
                <li>Primary Computer: ${primaryComputer}</li>
                <li>Primary Work Location: ${primaryWorkLocation}</li>
                <li>Additional Information: ${additionalInformation}</li>
            </ul>

            <h3>Courses</h3>
            <ul>
                ${courses.map(function (course) {
                    return `
                        <li>
                            ${course.department}
                            ${course.courseNumber}
                            - ${course.courseTitle}
                            <ul>
                                <li>${course.reason}</li>
                            </ul>
                        </li>
                    `;
                }).join("")}
            </ul>

            <h3>Favorite Quote</h3>
            <blockquote>${quote}</blockquote>
            <p>-${quoteAuthor}</p>

            ${funnyItem ? `
                <h3>Funny Thing</h3>
                <p>${funnyItem}</p>
            ` : ""}

            ${somethingToShare ? `
                <h3>Something I Would Like to Share</h3>
                <p>${somethingToShare}</p>
            ` : ""}

            <h3>Links</h3>
            <ul>
                ${links.map(function (link) {
                    return `
                        <li>
                            <a href="${link.url}">
                                ${link.label}
                            </a>
                        </li>
                    `;
                }).join("")}
            </ul>

            <button type="button" id="resetProgress">
                Reset Introduction Form
            </button>
        `;

        introductionOutput.appendChild(introduction);

        // RESET PROGRESS BUTTON

        document.getElementById("resetProgress").addEventListener(
            "click",
            function () {

                form.reset();

                form.style.display = "block";

                introductionOutput.innerHTML = "";

                picturePreview.src = originalPicture;

            }
        );

    });

});