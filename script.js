let myLibrary = [];

function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
    this.index;
}

function addBookToTheLibrary(book) {
    myLibrary.push(book);
    book.index = myLibrary.length - 1;
}

function render() {

}