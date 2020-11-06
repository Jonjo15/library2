// const firebaseConfig = {
//   apiKey: "AIzaSyD47yUvdrqtMcSmKlHARHaLEO54QBlpe7Y",
//   authDomain: "library2-15125.firebaseapp.com",
//   databaseURL: "https://library2-15125.firebaseio.com",
//   projectId: "library2-15125",
//   storageBucket: "library2-15125.appspot.com",
//   messagingSenderId: "709033153782",
//   appId: "1:709033153782:web:fee61d1bb4682ff909c8d7"
// };
// firebase.initializeApp(firebaseConfig);

// // Get a reference to the database service
const test = document.getElementById("test")
var libraryRef = firebase.database().ref().child("library");
var lengthRef = firebase.database().ref().child("library/length")
let length = 0;
lengthRef.on('value', function(snapshot) {
    length = snapshot.val()
});
console.log(libraryRef)
libraryRef.on("child_added", snap => console.log("hey"))
// const ref = database.ref("library")
// ref.push("asas")
// console.log(firebase.database().ref())
class Book {
  constructor(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
    this.index;
    this.rendered = false;
  }
  info() {
    if (this.readStatus) {
      return this.title + " by " + this.author + ", " + this.pages + " pages";
    } else {
      return this.title + " by " + this.author + ", " + this.pages + " pages";
    }
  }
}

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
const form = document.querySelector("#myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form has been submitted");
  let newBook = createBookObjectFromInputs();
  //values of inputs set to emptystring
  resetInputs();
  //add to library
  addBookToTheLibrary(newBook);
  //render
  render();
  formDiv.style.display = "none";
  addBookButton.style.display = "inline-block";
});
submitButton.textContent = "Submit";
const cancelButton = document.querySelector("#cancel");

addBookButton.addEventListener("click", (e) => {
  formDiv.style.display = "block";
  addBookButton.style.display = "none";
});
submitButton.addEventListener("submit", (e) => {
  //create a book object
  console.log("blbllbl");
  let newBook = createBookObjectFromInputs();
  //values of inputs set to emptystring
  resetInputs();
  //add to library
  addBookToTheLibrary(newBook);
  //render
  render();
  formDiv.style.display = "none";
  addBookButton.style.display = "inline-block";
});

cancelButton.addEventListener("click", (e) => {
  formDiv.style.display = "none";
  addBookButton.style.display = "inline-block";
  resetInputs();
});

/* function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
    this.index;
    this.rendered = false;
    this.info = function() {
        if (this.readStatus) {
          return title + " by " + author + ", " + pages +" pages";
        }
        else {
          return title + " by " + author + ", " + pages +" pages";
        }
      }
} */

function addBookToTheLibrary(book) {
  myLibrary.push(book);
  // lengthRef.set(lengthRef.val() +1)
  length += 1;
  lengthRef.set(length);
  book.index = myLibrary.length - 1;
  writeUserData(book.index,book.title,book.author,book.readStatus, book.pages, book.rendered)
}
function writeUserData(index, title, author, readStatus, pages, rendered) {
    firebase.database().ref('library/' + index).set({
      author: author,
      title: title,
      pages : pages,
      readStatus: readStatus,
      rendered: rendered
    });
  }
function render() {
  myLibrary.forEach((book) => {
    if (!book.rendered) {
      book.rendered = true;
      firebase.database().ref('library/' + book.index + "/rendered").set(true)
      const bookDiv = document.createElement("div");
      const buttons = createButtons(book.index, bookDiv, book);
      bookDiv.dataset.id = book.index;
      bookDiv.classList.add("books");
      const para = document.createElement("p");
      para.textContent = book.info();
      bookDiv.appendChild(para);
      buttons.forEach((button) => {
        bookDiv.appendChild(button);
      });
      mainDiv.appendChild(bookDiv);
    }
  });
}

function createButtons(id, div, book) {
  const readButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  readButton.dataset.id = id;
  if (book.readStatus) {
    readButton.textContent = "Read";
  } else {
    readButton.textContent = "Not Read";
  }
  //ovo nije gotovo
  deleteButton.dataset.id = id;
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (e) => {
    div.remove();
    //remove from myLibrary
    myLibrary.splice(id, 1);
    firebase.database().ref().child('library/' + book.index).set(null)
    length -= 1;
    lengthRef.set(length)
    //update data-ids---mozda ipak ne
    updateIndices();
  });
  readButton.addEventListener("click", (e) => {
    if (e.target.textContent === "Read") {
      readButton.textContent = "Not Read";
      book.readStatus = false;
      firebase.database().ref('library/' + book.index + "/readStatus").set(false)
    } else {
      readButton.textContent = "Read";
      book.readStatus = true;
      firebase.database().ref('library/' + book.index + "/readStatus").set(true)
    }
  });
  return [readButton, deleteButton];
}

function createBookObjectFromInputs() {
  let read;
  if (radioInputs[0].checked) {
    read = true;
  } else {
    read = false;
  }
  let book = new Book(
    authorInput.value,
    titleInput.value,
    pagesInput.value,
    read
  );
  return book;
}
function updateIndices() {
  myLibrary.forEach((book, index) => {
    firebase.database().ref().child("library/" + book.index).set(null)
    // document.querySelectorAll(".books")
    book.index = index;
    // function writeUserData(index, title, author, readStatus, pages, rendered) {
    //   firebase.database().ref('library/' + index).set({
    //     author: author,
    //     title: title,
    //     pages : pages,
    //     readStatus: readStatus,
    //     rendered: rendered
    //   });
    // }
    writeUserData(index, book.title, book.author, book.readStatus, book.pages, book.rendered)
  });
}
function resetInputs() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
}
// function renderDb() {
//   libraryRef.ch
// }
let book1 = new Book("a", "b", 3, true);
let book2 = new Book("s", "sa", 121, false);
addBookToTheLibrary(book1);
addBookToTheLibrary(book2);
render();
