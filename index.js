let addBook = false;

document.addEventListener("DOMContentLoaded", () => {
    let bookFormContainer = document.querySelector(".container");
    let addBtn = document.querySelector("#add-book-button");
    addBtn.addEventListener("click", (event) => {
        event.preventDefault();
        addBook = !addBook;
        if (addBook) {
            bookFormContainer.style.display = "block";
        } else {
            bookFormContainer.style.display = "none";
        }

        let value = document.getElementById('search').value;

        if (value && value.trim().length > 0){
            value = value.trim().toLowerCase()
        } else {

        }

        fetchBooks(value);
    })
});






function fetchBooks(value) {
    return fetch(`https://openlibrary.org/search.json?q=${value}`)
        .then(resp => resp.json())
        .then(data => renderBooks(data))
};

function renderBooks(books) {
    console.log(books)
    let collection = document.getElementById("book-collection")
    
    let divBook = document.createElement('div');
    divBook.classList.add("card");

    let bookName = document.createElement('h2');
    bookName.innterText = books[0].title;
    divBook.appendChild(bookName);

    let bookAuthor = document.createElement('h3');
    bookAuthor.innerText = books[0].author;
    divBook.appendChild(bookAuthor)

    collection.appendChild(divBook);
    
}