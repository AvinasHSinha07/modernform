document.addEventListener("DOMContentLoaded", function () {
    const dropArea = document.getElementById("dropArea");
    const fileInput = document.getElementById("file");
    const fileList = document.getElementById("fileList");

    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ["dragenter", "dragover"].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add("dragover"), false);
    });

    ["dragleave", "drop"].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove("dragover"), false);
    });

    // Handle dropped files
    dropArea.addEventListener("drop", handleDrop, false);

    // Handle file input change
    fileInput.addEventListener("change", handleFiles, false);

    // Simulate a click on the file input when the drop area is clicked
    dropArea.addEventListener("click", () => fileInput.click());

    // Prevent default drag behaviors
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Handle files
    function handleFiles(e) {
        const files = e.target.files || e.dataTransfer.files;
        displayFileNames(files);
    }

    // Handle drop
    function handleDrop(e) {
        const files = e.dataTransfer.files;
        fileInput.files = files;
        displayFileNames(files);
    }

    // Display file names
    function displayFileNames(files) {
        fileList.innerHTML = "";
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const p = document.createElement("p");
                p.textContent = file.name;
                fileList.appendChild(p);
            }
        } else {
            fileList.textContent = "No file chosen";
        }
    }
});
