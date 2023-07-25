

document.addEventListener("DOMContentLoaded", () => {
    // let bookFormContainer = document.querySelector(".container");
    let addBtn = document.querySelector("#add-book-button");
    addBtn.addEventListener("click", (event) => {
        event.preventDefault()
        let input = document.getElementById('search').value;

        if (input && input.trim().length > 0){
            input = input.trim().toLowerCase()
        } else {

        }
        
        addBooks(input);
        input = ""
        
    })

    fetchBooks();
});

// Removes currently searched books
function removeSearch() {
    let remove = document.getElementById("cancel-search");
    let searchField = document.getElementsByClassName("search")
    remove.addEventListener("click", (event) => {
        event.preventDefault();
        if (searchField) {
            searchField.remove()
        } else {

        }
    })
}



//Adding books to the interface
function addBooks(input) {
    return fetch(`https://openlibrary.org/search.json?q=${input}`)
        .then(resp => resp.json())
        .then(data => searchBooks(data))
};

// Searches for books
function searchBooks(books) {

    let searchField = document.createElement('div');
    searchField.setAttribute("class", 'search');
    let collection = document.getElementById("search-collection");

    collection.appendChild(searchField)
    books.docs.forEach(book => {
        
        let divBook = document.createElement('div');
        divBook.classList.add("card");

        let bookName = document.createElement('h2');
        bookName.innerText = book.title;

        let bookAuthor = document.createElement('h3');
        if (book.author_name !== undefined) {
            bookAuthor.innerText = book.author_name[0];
            divBook.appendChild(bookAuthor)
        } else {

        }

        let chooseBook = document.createElement('button')
            chooseBook.innerText = "Choose"
            chooseBook.setAttribute("id", book.id)
            chooseBook.addEventListener("click", () => {
                fetch("http://localhost:3000/books", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },

                    body: JSON.stringify({
                        title: book.title,
                        author: book.author_name[0],
                        url: ""
                    })   
                })
                .then(resp => resp.json())
                .then(book => selectBook(book))

                // selectBook(book);
                searchField.remove();
                
            })
        
        divBook.append(bookName, chooseBook)

        searchField.appendChild(divBook);
    });
}



function selectBook(book) {
    
    let collection = document.getElementById("book-collection");
    let divBook = document.createElement('div');
    divBook.classList.add("card");

    divBook.addEventListener("mouseover", () => {
        divBook.classList.remove("card");
        divBook.classList.add("card-two");
    })

    divBook.addEventListener("mouseout", () => {
        divBook.classList.remove("card-two");
        divBook.classList.add("card")
    })
    


    let bookName = document.createElement('h2');
    bookName.innerText = book.title;

    let author = document.createElement('h3');
    author.innerText = book.author


    divBook.append(bookName, author);

    let picButton = document.createElement('button');
        picButton.setAttribute('class', 'cover')
        picButton.innerText = "Add cover photo"
        picButton.setAttribute("id", book.id)
        picButton.addEventListener('click', () => {
            let url = prompt("Please enter URL")
            if (url !== null){
                let bookCover = new Image();
                bookCover.src = url
                bookCover.classList.add("book-cover")
                divBook.appendChild(bookCover)
                picButton.setAttribute('class', 'none')
                picButton.style.display = "none"

                return fetch(`http://localhost:3000/books/${book.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        "url": `${bookCover.src}`,
                    })
                }).then(resp => resp.json())
            } else {

            }

        })
    divBook.appendChild(picButton)

    let removeButton = document.createElement('button');
    removeButton.setAttribute('class', 'close-button')
    removeButton.innerHTML = "&times;"
    removeButton.addEventListener('click', () => {
        divBook.remove();
        fetch (`http://localhost:3000/books/${book.id}`, {
            method: "DELETE",
        })
    })

    divBook.append(removeButton)
    

    collection.appendChild(divBook);
    
    
}



function fetchBooks() {
    return fetch("http://localhost:3000/books")
        .then(resp => resp.json())
        .then(data => renderBooks(data))
};

function renderBooks(books) {
    let collection = document.getElementById("book-collection")

    books.forEach(book => {
        
        let divBook = document.createElement('div');
        divBook.classList.add("card");
        divBook.setAttribute("id", "item")

        divBook.addEventListener("mouseover", () => {
            divBook.classList.remove("card");
            divBook.classList.add("card-two")
        })
    
        divBook.addEventListener("mouseout", () => {
            divBook.classList.remove("card-two");
            divBook.classList.add("card")
        })
        
        let bookName = document.createElement('h2');
        bookName.innerText = book.title;
        divBook.appendChild(bookName);

        let bookAuthor = document.createElement('h3');
        bookAuthor.innerText = book.author;
        divBook.appendChild(bookAuthor)

        let picture = book.url
        if (picture == "") {
            let picButton = document.createElement('button');
            picButton.setAttribute('class', 'cover')
            picButton.innerText = "Add cover photo"
            picButton.setAttribute("id", book.id)
            picButton.addEventListener('click', () => {
                let url = prompt("Please enter URL")
                if (url !== null){
                    let bookCover = new Image();
                    bookCover.src = url
                    bookCover.classList.add("book-cover")
                    divBook.appendChild(bookCover)
                    picButton.style.display = "none"

                    return fetch(`http://localhost:3000/books/${book.id}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        },
                        body: JSON.stringify({
                            "url": `${bookCover.src}`,
                        })
                    }).then(resp => resp.json())
                } else {

                }

            })
            divBook.appendChild(picButton)
        } else {
            let bookCover = new Image();
            bookCover.src = book.url;
            bookCover.classList.add("book-cover")
            divBook.appendChild(bookCover)

        }

        let removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'close-button')
        removeButton.innerHTML = "&times;"
        removeButton.addEventListener('click', () => {
            divBook.remove();
            fetch (`http://localhost:3000/books/${book.id}`, {
                method: "DELETE",
            })
        })
        divBook.appendChild(removeButton);

        collection.appendChild(divBook);
    })
};
