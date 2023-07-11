

document.addEventListener("DOMContentLoaded", () => {
    let bookFormContainer = document.querySelector(".container");
    let addBtn = document.querySelector("#add-book-button");
    addBtn.addEventListener("click", (event) => {
        event.preventDefault()
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
    console.log(books.docs[0].author_name[0])
    let collection = document.getElementById("book-collection")
    
    let divBook = document.createElement('div');
    divBook.classList.add("card");

    let bookName = document.createElement('h2');
    bookName.innerText = books.docs[0].title;
    divBook.appendChild(bookName);

    let bookAuthor = document.createElement('h3');
    bookAuthor.innerText = books.docs[0].author_name[0];
    divBook.appendChild(bookAuthor)

    let picButton = document.createElement('button');
    picButton.setAttribute('class', 'cover')
    picButton.innerText = "Add cover photo"
    picButton.addEventListener('click', () => {
        let url = prompt("Please enter URL")
        if (url !== null){
            let bookCover = new Image();
            bookCover.src = url
            bookCover.classList.add("book-cover")
            divBook.appendChild(bookCover)
            picButton.style.display = "none"
        } else {

        }

    })
    divBook.appendChild(picButton)

    collection.appendChild(divBook);

    
    
}