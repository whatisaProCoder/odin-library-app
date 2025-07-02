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

class Book {
    constructor(title, author, numPages, description, readStatus) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.description = description;
        this.readStatus = readStatus;
    }
}

class Library {
    constructor(bookGridElementReference) {
        this.books = [];
        this.bookGridElement = document.querySelector(bookGridElementReference);
    }
    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
            this.render();
        } else {
            console.log("Book object invalid...");
        }
    }
    removeBook(id) {
        this.books.forEach((book, index) => {
            if (book.id == id) {
                this.books.splice(index, 1);
                this.render();
            }
            else {
                console.log(`{Book with id : ${id} does not exist...}`);
            }
        });
    }
    render() {
        this.bookGridElement.innerHTML = "";
        this.books.forEach(book => {
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
                    <label for="checkbox-id-${book.id}">DONE READING?</label>
                    <input class="checkbox" id="checkbox-id-${book.id}" type="checkbox">
                </div>
                <div  class="delete-button" id="delete-button-id-${book.id}">Delete</div>
            </div>
        `;
            this.bookGridElement.appendChild(card);

            const checkbox = document.querySelector(`#checkbox-id-${book.id}`);
            checkbox.checked = book.readStatus;
            checkbox.addEventListener("change", () => {
                book.readStatus = checkbox.checked;
            });

            const deleteButton = document.querySelector(`#delete-button-id-${book.id}`);
            deleteButton.addEventListener("click", () => {
                this.removeBook(book.id);
            });
        });
    }
}

const myLibrary = new Library(".book-grid");

const newBookDialogBox = document.querySelector(".new-book-dialog-box");
const newButton = document.querySelector(".new-button");

newButton.addEventListener("click", () => {
    newBookDialogBox.showModal();
});

const newBookDialogBoxCloseButton = document.querySelector("#close-new-book-dialog-box-button");
newBookDialogBoxCloseButton.addEventListener("click", () => {
    newBookDialogBox.close();
    newBookForm.reset();
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


    myLibrary.addBook(new Book(title, author, pages, description, read));

    newBookDialogBox.close();
    newBookForm.reset();
});

myLibrary.addBook(new Book("Alice's Adventures in Wonderland", "Lewis Carrol", 200, "The story is about a girl named Alice who falls into a magical world filled with strange creatures and curious adventures.", false));
myLibrary.addBook(new Book("Harry Potter and the Deathly Hallows", "J.K. Rowling", 607, "Harry Potter and the Deathly Hallows follows Harry, Ron, and Hermione as they hunt down Voldemort’s Horcruxes to destroy him. It's a final battle of good vs evil, with epic sacrifices, secrets revealed, and the fate of the wizarding world at stake.", true));


