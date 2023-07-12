

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

        addBooks(value);
    })

    //fetchBooks();
});





//Adding books to the interface
function addBooks(value) {
    return fetch(`https://openlibrary.org/search.json?q=${value}`)
        .then(resp => resp.json())
        .then(data => searchBooks(data))
};

function searchBooks(books) {
    
    return fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },

        body: JSON.stringify({
            title: books.docs[0].title,
            author: books.docs[0].author_name[0],
            url: ""
        }),
    }).then(res => {
        return res.json()
    })
    .then(data => {
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
        picButton.setAttribute("id", data.id)
        picButton.addEventListener('click', () => {
            let url = prompt("Please enter URL")
            if (url !== null){
                let bookCover = new Image();
                bookCover.src = url
                bookCover.classList.add("book-cover")
                divBook.appendChild(bookCover)
                picButton.style.display = "none"

                return fetch(`http://localhost:3000/books/${data.id}`, {
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
        removeButton.setAttribute('class', 'remove')
        removeButton.innerText = "Remove"
        removeButton.addEventListener('click', () => {
            divBook.remove();
            fetch (`http://localhost:3000/books/${data.id}`, {
                method: "DELETE",
            })
        })
        divBook.appendChild(removeButton);

        collection.appendChild(divBook);
    });
}