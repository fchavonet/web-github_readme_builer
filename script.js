/*******************************
* MARKDOWN RENDENRING BEHAVIOR *
*******************************/

const markdown = document.getElementById("markdown");
const preview = document.getElementById("preview");

// Save the initial content of the markdown textarea.
const initialMarkdown = markdown.value;

// Render the markdown preview.
function renderMarkdown() {
	// Get raw markdown from textarea.
	const raw = markdown.value;
	// Convert markdown to sanitized HTML.
	const html = DOMPurify.sanitize(marked.parse(raw));
	// Update the preview container with the HTML.
	preview.innerHTML = html;
}

// Initial render.
renderMarkdown();
// Update preview on every input change.
markdown.addEventListener("input", renderMarkdown);


/***********************
* COPY BUTTON BEHAVIOR *
***********************/

const copyBtn = document.getElementById("copy-btn");

// Copy markdown content to clipboard.
copyBtn.addEventListener("click", function () {
	if (markdown.value.trim() !== "") {
		navigator.clipboard.writeText(markdown.value).then(function () {
			showToast("Copied to clipboard!", "green");
		}).catch(function (error) {
			console.error("Copy failed:", error);
			showToast("Error copying to clipboard.", "red");
		});
	} else {
		showToast("Nothing to copy!", "goldenrod");
	}
});

/************************
* RESET BUTTON BEHAVIOR *
************************/

const resetBtn = document.getElementById("reset-btn");

// Reset markdown to its initial state.
resetBtn.addEventListener("click", function () {
	markdown.value = initialMarkdown;
	renderMarkdown();
});


/***************************
* DOWNLOAD BUTTON BEHAVIOR *
***************************/

const downloadBtn = document.getElementById("download-btn");

downloadBtn.addEventListener("click", function () {
	const content = markdown.value;
	const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
	const url = URL.createObjectURL(blob);

	// Create a temporary <a> element.
	const a = document.createElement("a");

	// Set download attributes and trigger click.
	a.href = url;
	a.download = "README.md";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);

	// Free up memory by releasing the temporary object URL.
	URL.revokeObjectURL(url);
});


/******************************
* MODE TOGGLE BUTTON BEHAVIOR *
******************************/

const LIGHT_CSS = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css";
const DARK_CSS = "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css";

const ghMdCss = document.getElementById("gh-md-css");
const modeToggleBtn = document.getElementById("mode-toggle-btn");

// Toggle theme on click.
modeToggleBtn.addEventListener("click", function () {
	const currentHref = ghMdCss.getAttribute("href");

	const body = document.body;
	const header = document.querySelector("header");
	const buttons = document.querySelectorAll("button");
	const aside = document.querySelector("aside");
	const hrs = document.querySelectorAll("hr");
	const labels = document.querySelectorAll("label");
	const inputs = document.querySelectorAll("input");
	const select = document.querySelector("select");
	const textarea = document.querySelector("textarea");
	const previewSection = document.getElementById("preview-section");
	const footer = document.querySelector("footer");
	const modalContents = document.querySelectorAll(".modal-content");
	const codes = document.querySelectorAll(".modal-body code");

	const icon = document.createElement("i");

	if (currentHref === LIGHT_CSS) {
		ghMdCss.setAttribute("href", DARK_CSS);

		icon.classList.add("bi", "bi-sun");

		body.classList.remove("light-mode");
		body.classList.add("dark-mode");

		header.classList.remove("light-mode");
		header.classList.add("dark-mode");

		buttons.forEach(function (buttons) {
			buttons.classList.remove("light-mode")
			buttons.classList.add("dark-mode")
		});

		aside.classList.remove("light-mode");
		aside.classList.add("dark-mode");

		hrs.forEach(function (hr) {
			hr.classList.remove("light-mode")
			hr.classList.add("dark-mode")
		});

		labels.forEach(function (label) {
			label.classList.remove("light-mode")
			label.classList.add("dark-mode")
		});

		inputs.forEach(function (input) {
			input.classList.remove("light-mode")
			input.classList.add("dark-mode")
		});

		select.classList.remove("light-mode");
		select.classList.add("dark-mode");

		textarea.classList.remove("light-mode");
		textarea.classList.add("dark-mode");

		previewSection.classList.remove("light-mode");
		previewSection.classList.add("dark-mode");

		footer.classList.remove("light-mode");
		footer.classList.add("dark-mode");

		modalContents.forEach(function (modalContent) {
			modalContent.classList.remove("light-mode");
			modalContent.classList.add("dark-mode");
		});

		codes.forEach(function (code) {
			code.classList.remove("light-mode");
			code.classList.add("dark-mode");
		});
	} else {
		ghMdCss.setAttribute("href", LIGHT_CSS);

		icon.classList.add("bi", "bi-moon-stars");

		body.classList.remove("dark-mode");
		body.classList.add("light-mode");

		header.classList.remove("dark-mode");
		header.classList.add("light-mode");

		buttons.forEach(function (buttons) {
			buttons.classList.remove("dark-mode")
			buttons.classList.add("light-mode")
		});

		aside.classList.remove("dark-mode");
		aside.classList.add("light-mode");

		hrs.forEach(function (hr) {
			hr.classList.remove("dark-mode")
			hr.classList.add("light-mode")
		});

		labels.forEach(function (label) {
			label.classList.remove("dark-mode")
			label.classList.add("light-mode")
		});

		inputs.forEach(function (input) {
			input.classList.remove("dark-mode")
			input.classList.add("light-mode")
		});

		select.classList.remove("dark-mode");
		select.classList.add("light-mode");

		textarea.classList.remove("dark-mode");
		textarea.classList.add("light-mode");

		previewSection.classList.remove("dark-mode");
		previewSection.classList.add("light-mode");

		footer.classList.remove("dark-mode");
		footer.classList.add("light-mode");

		modalContents.forEach(function (modalContent) {
			modalContent.classList.remove("dark-mode");
			modalContent.classList.add("light-mode");
		});

		codes.forEach(function (code) {
			code.classList.remove("dark-mode");
			code.classList.add("light-mode");
		});
	}

	// Replace existing icon safely.
	modeToggleBtn.innerHTML = "";
	modeToggleBtn.appendChild(icon);
});


/*****************
* TOAST BEHAVIOR *
*****************/

function showToast(message, backgroundColor) {
	const toastContainer = document.getElementById("toast-container");

	const toast = document.createElement("div");

	toast.classList.add("toast");
	toast.textContent = message;

	if (backgroundColor !== undefined && backgroundColor !== null && backgroundColor.trim() !== "") {
		toast.style.backgroundColor = backgroundColor;
	}

	toastContainer.appendChild(toast);

	toast.offsetWidth;

	toast.classList.add("show");

	setTimeout(function () {
		toast.classList.remove("show");
		toast.addEventListener("transitionend", function () {
			if (toast.parentNode) {
				toast.parentNode.removeChild(toast);
			}
		});
	}, 3000);
}


/*****************
* MODAL BEHAVIOR *
*****************/

const badgeModalInfo = document.getElementById("badge-modal-info");
const closeBtn = badgeModalInfo.querySelector(".close-btn");

// Open the modal.
function openBadgeModalInfo() {
	badgeModalInfo.classList.remove("hidden");
}

// Close the modal when clicking the close button.
closeBtn.addEventListener("click", function () {
	badgeModalInfo.classList.add("hidden");
});

// Close the modal when clicking outside the content.
badgeModalInfo.addEventListener("click", function (event) {
	if (event.target === badgeModalInfo) {
		badgeModalInfo.classList.add("hidden");
	}
});


/*****************************
* MODULES INSERTION BEHAVIOR *
*****************************/

function insertMarkdownAtCursor(markdown, insertText) {
	// Focus the textarea.
	markdown.focus();

	// Get current selection.
	const startPosition = markdown.selectionStart;
	const endPosition = markdown.selectionEnd;

	const before = markdown.value.substring(0, startPosition);
	const after = markdown.value.substring(endPosition);

	// Insert text.
	markdown.value = before + insertText + after;

	// Move cursor after inserted text.
	const newCursorPosition = startPosition + insertText.length;
	markdown.setSelectionRange(newCursorPosition, newCursorPosition);

	// Render updated preview.
	renderMarkdown();
}

// Insert title.
document.getElementById("insert-title-btn").addEventListener("click", function () {
	const insertText = `# Title

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert table of contents.
document.getElementById("insert-toc-btn").addEventListener("click", function () {
	const insertText = `## 🔖 Table of contents

<details>
  <summary>
    CLICK TO ENLARGE 😇
  </summary>
  📄 <a href="#description">Description</a>
  <br>
  🎓 <a href="#objectives">Objectives</a>
  <br>
  🔨 <a href="#tech-stack">Tech stack</a>
  <br>
  📂 <a href="#files-description">Files description</a>
  <br>
  💻 <a href="#installation">Installation</a>
  <br>
  🔧 <a href="#whats-next">What's next?</a>
  <br>
  ♥️ <a href="#thanks">Thanks</a>
  <br>
  👷 <a href="#authors">Authors</a>
  </details>

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert description.
document.getElementById("insert-description-btn").addEventListener("click", function () {
	const insertText = `## 📄 <span id="description">Description</span>

The project description.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert objectives.
document.getElementById("insert-objectives-btn").addEventListener("click", function () {
	const insertText = `## 🎓 <span id="objectives">Objectives</span>

- Objectives list.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert tech stack.
document.getElementById("insert-techstack-btn").addEventListener("click", function () {
	const insertText = `## 🔨 <span id="tech-stack">Tech stack</span>

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white&style=for-the-badge" alt="HTML5 badge">
  <img src="https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white&style=for-the-badge" alt="CSS3 badge">
  <img src="https://img.shields.io/badge/JAVASCRIPT-f7df1e?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript badge">
</p>

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert files description.
document.getElementById("insert-files-btn").addEventListener("click", function () {
	const insertText = `## 📂 <span id="files-description">File description</span>

| **FILE**            | **DESCRIPTION**                                   |
| :-----------------: | ------------------------------------------------- |
| \`file_name\`       | Description of the file.                          |
| \`folder_name\`     | Description of the folder.                        |
| \`.gitignore\`      | Specifies files and folders to be ignored by Git. |
| \`README.md\`       | The README file you are currently reading 😉.     |

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert installation.
document.getElementById("insert-installation-btn").addEventListener("click", function () {
	const insertText = `## 💻 <span id="installation">Installation</span>

1. Clone this repository:
  - Open your preferred Terminal.
  - Navigate to the directory where you want to clone the repository.
  - Run the following command:

\`\`\`bash
git clone <link_to_the_repository>
\`\`\`

2. Open the repository you've just cloned.

3. Remaining installation instructions.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert what's next.
document.getElementById("insert-next-btn").addEventListener("click", function () {
	const insertText = `## 🔧 <span id="whats-next">What's next?</span>

- List of next steps for the project.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert Thanks.
document.getElementById("insert-thanks-btn").addEventListener("click", function () {
	const insertText = `## ♥️ <span id="thanks">Thanks</span>

- Your message of thanks here. 

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert authors.
document.getElementById("insert-authors-btn").addEventListener("click", function () {
	const insertText = `## 👷 <span id="authors">Authors</span>

**Fabien CHAVONET**
- GitHub: [@fchavonet](https://github.com/fchavonet)
- LinkedIn: [@fchavonet](https://www.linkedin.com/in/fchavonet)

`;
	insertMarkdownAtCursor(markdown, insertText);
});

////////////////////////////////////////////////////////////////////////////////

// Insert blockquote.
document.getElementById("insert-blockquote-btn").addEventListener("click", function () {
	const insertText = `> Your blockquotes here.

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert break.
document.getElementById("insert-break-btn").addEventListener("click", function () {
	const insertText = `---

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert code.
document.getElementById("insert-code-btn").addEventListener("click", function () {
	const insertText = `\`\`\`
Your code here.
\`\`\`

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert image.
document.getElementById("insert-image-btn").addEventListener("click", function () {
	const insertText = `![Image](./assets/images/logo-markdown.webp)

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert link.
document.getElementById("insert-link-btn").addEventListener("click", function () {
	const insertText = `[GitHub](https://github.com/)

`;
	insertMarkdownAtCursor(markdown, insertText);
});

// Insert table.
document.getElementById("insert-table-btn").addEventListener("click", function () {
	const insertText = `| **Column 1** | **Column 2** | **Column 3** |
| ------------ | ------------ | ------------ |
| Row 1        | Row 1        | Row 1        |
| Row 2        | Row 2        | Row 2        |
| Row 3        | Row 3        | Row 3        |

`;
	insertMarkdownAtCursor(markdown, insertText);
});

////////////////////////////////////////////////////////////////////////////////

// Insert badge.
document.getElementById("insert-badge-btn").addEventListener("click", function () {
	const name = document.getElementById("name");
	const backgroundColor = document.getElementById("background-color");
	const logo = document.getElementById("logo");
	const logoColor = document.getElementById("logo-color");

	const nameValue = name.value.trim().toUpperCase();;
	const backgroundColorValue = backgroundColor.value.trim();
	const logoValue = logo.value.trim().toLowerCase();;
	const logoColorValue = logoColor.value;

	if (nameValue === "" || backgroundColorValue === "" || logoValue === "") {
		showToast("Please enter a name, background color, and logo.", "goldenrod");
		return;
	}

	const nameEscaped = encodeURIComponent(nameValue);
	const colorEscaped = encodeURIComponent(backgroundColorValue);
	const logoEscaped = encodeURIComponent(logoValue);
	const logoColorEscaped = encodeURIComponent(logoColorValue);

	const badgeUrl = "https://img.shields.io/badge/" + nameEscaped + "-" + colorEscaped + "?logo=" + logoEscaped + "&logoColor=" + logoColorEscaped + "&style=for-the-badge";

	const altText = nameValue + " badge";
	const imgTag = `<img src="${badgeUrl}" alt="${altText}">

`;

	insertMarkdownAtCursor(markdown, imgTag);
});
