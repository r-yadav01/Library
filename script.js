const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  // do stuff here
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function readArray(myLibrary) {
    myLibrary.forEach((book) => {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("bookCard");

        let firstP = document.createElement("p");
        let secondP = document.createElement("p");
        let thirdP = document.createElement("p");
        let firstButt = document.createElement("button");
        let secondButt = document.createElement("button");

        firstP.classList.add("title");
        secondP.classList.add("author");
        thirdP.classList.add("pages");
        firstButt.classList.add("readStatus");
        secondButt.classList.add("removeBook");

        firstP.textContent = book.title;
        secondP.textContent = book.author;
        thirdP.textContent = book.pages;
        firstButt.textContent = book.read;
        secondButt.textContent = "Remove Book";

        cardDiv.append(firstP, secondP, thirdP, firstButt, secondButt);

        const mainDiv = document.querySelector('main');
        mainDiv.appendChild(cardDiv);
    });
}

let form = document.querySelector('form');
let dialog = document.querySelector('#addDialog');

let addBook = document.querySelector('#addBookBtn');
addBook.addEventListener('click', () => {
  dialog.showModal();
})

dialog.addEventListener('close', () => {  
  const formData = new FormData(form);
  let title = formData.get('title');
  let author = formData.get('author');
  let pages = formData.get('pages');
  let read = formData.get('read');

  if (!read) {
    read = 'Not Read';
  }

  if (title && author &&  pages) {
    addBookToLibrary(title, author, pages, read);
    let cards = document.querySelectorAll('.bookCard');
    cards.forEach((card) => {
      card.remove();
    })
    readArray(myLibrary);
  }
  form.reset();
})

let cancelBtn = document.querySelector('#cancelBtn');
cancelBtn.addEventListener('click', (event) => {
  event.preventDefault();
  form.reset();
  dialog.close();
})


// readArray(myLibrary);
