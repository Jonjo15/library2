let myLibrary = [];
const mainDiv = document.createElement("div");
mainDiv.classList.add("library");
const container = document.querySelector(".container");
container.appendChild(mainDiv);

function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
    this.index;
    this.info = function() {
        if (readStatus) {
          return title + " by " + author + ", " + pages +" pages"+ ", read."
        }
        else {
          return title + " by " + author + ", " + pages +" pages"+ ", not read yet."
        }
      }
}

function addBookToTheLibrary(book) {
    myLibrary.push(book);
    book.index = myLibrary.length - 1;
}

function render() {
    myLibrary.forEach((book) => {
        const buttons = createButtons(book.index);
        const bookDiv = document.createElement("div");
        bookDiv.dataset.id = book.index;
        bookDiv.classList.add("books");
        const para = document.createElement("p");
        para.textContent = book.info();
        bookDiv.appendChild(para);
        buttons.forEach((button) => {
            bookDiv.appendChild(button);
        })
        mainDiv.appendChild(bookDiv);
    });
}

function createButtons(id) {
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    readButton.dataset.id = id;
    readButton.textContent = "Read"; //ovo nije gotovo
    deleteButton.dataset.id = id;
    deleteButton.textContent = "Delete";
    return [readButton, deleteButton];
}

let book1 = new Book("a", "b", 3, true);
let book2 = new Book("s", "sa", 121, false);
addBookToTheLibrary(book1);
addBookToTheLibrary(book2);
render();