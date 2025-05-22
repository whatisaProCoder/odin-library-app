const toggleButton = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
} else {
    htmlElement.setAttribute('data-theme', prefersDarkScheme ? 'dark' : 'light');
}

toggleButton.addEventListener('click', () => {
    console.log("Toggle Theme Button Clicked!");

    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

const profileImage = document.querySelector(".profile-image");
const profileName = document.querySelector(".profile-name");
const profileDialogBox = document.querySelector(".profile-dialog-box");

profileImage.addEventListener("click", () => {
    profileDialogBox.showModal();
});

profileName.addEventListener("click", () => {
    profileDialogBox.showModal();
});

const profileDialogBoxCloseButton = document.querySelector("#close-profile-dialog-box-button");

profileDialogBoxCloseButton.addEventListener("click", () => {
    profileDialogBox.close();
});

const myLibrary = [];

const bookGrid = document.querySelector(".book-grid");

function updateBookGrid() {
    bookGrid.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
            <div class="title">${book.title}</div>
            <div class="author-and-pages">
                <div class="author">By ${book.author}</div>
                <div class="num-pages">${book.numPages} PAGES</div>
            </div>
            <div class="description">${book.description}</div>
            <div class="action-group">
                <div class="read-group">
                    <label for="checkbox-${book.id}">READ</label>
                    <input class="checkbox" id="checkbox-${book.id}" type="checkbox">
                </div>
                <div  class="delete-button" id="delete-button-${book.id}">Delete</div>
            </div>
        `;

        bookGrid.appendChild(card);

        const checkbox = document.querySelector(`#checkbox-${book.id}`);
        checkbox.checked = book.readStatus;
        checkbox.addEventListener("change", () => {
            book.readStatus = checkbox.checked;
        });

        const deleteButton = document.querySelector(`#delete-button-${book.id}`);
        deleteButton.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            updateBookGrid();
        });
    });
}

function Book(title, author, numPages, description, readStatus) {
    if (!new.target) {
        console.log("Must use new operator to call constructor!");
    } else {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.description = description;
        this.readStatus = readStatus;
    }
}

function addBookToLibrary(title, author, numPages, description, readStatus) {
    // take params, create a book then store it in the array
    const book = new Book(title, author, numPages, description, readStatus);
    myLibrary.push(book);
    updateBookGrid();
}

const newBookDialogBox = document.querySelector(".new-book-dialog-box");
const newButton = document.querySelector(".new-button");

newButton.addEventListener("click", () => {
    newBookDialogBox.showModal();
});

const newBookDialogBoxCloseButton = document.querySelector("#close-new-book-dialog-box-button");
newBookDialogBoxCloseButton.addEventListener("click", () => {
    newBookDialogBox.close();
});

const newBookForm = document.querySelector("#new-book-form");

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(newBookForm);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const description = formData.get("description");
    const read = formData.get("read");


    addBookToLibrary(title, author, pages, description, read);
    newBookDialogBox.close();
});

addBookToLibrary("Alice's Adventures in Wonderland", "Lewis Carrol", 200, "The story is about a girl named Alice who falls into a magical world filled with strange creatures and curious adventures.", false);


