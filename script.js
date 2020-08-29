let myLibrary = [];
const mainDiv = document.createElement("div");
mainDiv.classList.add("library");
const container = document.querySelector(".container");
container.appendChild(mainDiv);
const formDiv = document.querySelector(".form");
formDiv.style.display = "none";
const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const radioInputs = document.querySelectorAll("input[type='radio']");
const addBookButton = document.querySelector("#addBook");
const submitButton = document.querySelector("#submit");
addBookButton.addEventListener("click", (e) => {
    formDiv.style.display = "block";
    addBookButton.style.display = "none";
});
submitButton.addEventListener("click", (e) => {
    //create a book object
    let newBook = createBookObjectFromInputs();
    //values of inputs set to emptystring
    resetInputs();
    //add to library
    addBookToTheLibrary(newBook);
    //render
    render();
    formDiv.style.display = "none";
    addBookButton.style.display = "block";
});

function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
    this.index;
    this.rendered = false;
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
       if (!book.rendered) {
        book.rendered = true;
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
       }
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

function createBookObjectFromInputs() {
    let read;
    if (radioInputs[0].checked) {
        read = true;
    }
    else {
        read = false;
    }
    let book = new Book(titleInput.value,authorInput.value, pagesInput.value, read);
    return book;
}

function resetInputs() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
}
let book1 = new Book("a", "b", 3, true);
let book2 = new Book("s", "sa", 121, false);
addBookToTheLibrary(book1);
addBookToTheLibrary(book2);
render();