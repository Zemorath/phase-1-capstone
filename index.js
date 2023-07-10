let addBook = false;

document.addEventListener("DOMContentLoaded", () => {
    let bookFormContainer = document.querySelector(".container");
    let addBtn = document.querySelector("#add-book-button");
    addBtn.addEventListener("click", () => {
        addBook = !addBook;
        if (addBook) {
            bookFormContainer.style.display = "block";
        } else {
            bookFormContainer.style.display = "none";
        }
    });

    fetchBooks();
});

function fetchBooks() {
    return fetch('')
        .then(resp => resp.json())
        .then(data => renderBooks(data))
};

function renderBooks(books) {
    let collection = document.getElementById("book-collection")
    books.forEach(book => {
        let divBook = document.createElement('book');
        divBook.classList.add("card");

        let bookName = document.createElement('h2');
        // bookName.innterText = insert title reference here
        divBook.appendChild(bookName);


        let bookImg = new Image();
        // bookImg.src = insert cover reference here
        bookImg.classList.add("book-cover")
        divBook.appendChild(bookImg);

        collection.appendChild(divBook);
    })
}