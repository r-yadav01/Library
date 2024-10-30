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
  const mainDiv = document.querySelector('main');
  mainDiv.innerHTML = '';

  let bookNum = 0;

    myLibrary.forEach((book) => {

      let cardDiv = document.createElement("div");
      cardDiv.classList.add("bookCard");
      // cardDiv.dataset.cardId = bookNum;

      let firstP = document.createElement("p");
      let secondP = document.createElement("p");
      let thirdP = document.createElement("p");
      let readButt = document.createElement("button");
      let removeButt = document.createElement("button");

      firstP.classList.add("title");
      secondP.classList.add("author");
      thirdP.classList.add("pages");
      readButt.classList.add("readStatus");
      removeButt.classList.add("removeBook");

      firstP.textContent = book.title;
      secondP.textContent = book.author;
      thirdP.textContent = book.pages;
      readButt.textContent = book.read;
      readButt.dataset.bookId = bookNum;
      removeButt.textContent = "Remove Book";
      removeButt.dataset.bookId = bookNum;
      bookNum++;

      cardDiv.append(firstP, secondP, thirdP, readButt, removeButt);

      mainDiv.appendChild(cardDiv);
    });


    let readButtons = document.querySelectorAll('.readStatus');
    readButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        let bookPosition = parseInt(event.target.dataset.bookId, 10);
        let bookObject = myLibrary[bookPosition];
        
        if (bookObject.read == "Not Read") {
          bookObject.read  = "Read";
        }
        else if (bookObject.read == "Read") {
          bookObject.read = "Not Read";
        }
        readArray(myLibrary);
      })
    })

    
    let removeButtons = document.querySelectorAll('.removeBook');
    removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      let bookPosition = parseInt(event.target.dataset.bookId, 10);
        myLibrary.splice(bookPosition, 1);
        readArray(myLibrary);
      })
    })
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



readArray(myLibrary);
// to add a remove button to each book card
// first while a book is being created associate a "data-bookNum" attribute which is equal to the length of the 'array+1'
// when a remove button is removed use its dataset object to access its bookNum data value, and use that value-1 as a position in array to remove.
// after an item is removed from an array, loop through the cards elements with a queryselectorall and update the data-bookNum attributes of the elements whose values are 

// function removeFromLib()
