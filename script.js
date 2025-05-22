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
                    <input class="checkbox" id="checkbox-${book.id}" type="checkbox">
                    <label for="checkbox-${book.id}">Read</label>
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

addBookToLibrary("Title 1", "Author 1", "100", "Description 1", true);
addBookToLibrary("Title 2", "Author 2", "200", "Description 2", false);

const newBookDialogBox = document.querySelector(".new-book-dialog-box");
const newButton = document.querySelector(".new-button");

newButton.addEventListener("click", () => {
    newBookDialogBox.showModal();
});

const newBookDialogBoxCloseButton = document.querySelector("#close-new-book-dialog-box-button");
newBookDialogBoxCloseButton.addEventListener("click", () => {
    newBookDialogBox.close();
})


