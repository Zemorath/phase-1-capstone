# Personal Library Database
---

## Introduction

Having worked at a bookstore, one of the things I hear a lot is how difficult it is to find a good app or program to keep track of books you have read, are reading, or will read.
Most of the ones available today require you to pay a small fee to add an amount of books past a set limit. My idea with this was to create an open source program to help you keep
track of them without making you pay. 

## Features

* Add your favorite cover!
* Currently able to use either book title or ISBN
* Add any number of books
* Choose which edition to add

![Image](https://i.imgur.com/zEKhcQN.png)

Using openlibrary's web API, I was able to grab most of the information I needed. Unfortunately, I was unable to locate any pictures in their data but this led to a slight positive
which is that you get to select your own! There are a lot of really cool editions out there with unique covers and if you aren't too worried about knowing whether or not you have
that specific edition, you can just add your favorite cover!

I am going to list the general roadmap down below but I want to clarify that the next feature I want to add is the read status of each book with the ability to sort your books using
that info. The rest of it will come after but I find this to be the most pressing.


## Roadmap

* Add a flip feature so each card default shows just the cover and hovering over flips it to show book information
* Format information on card better
* Refine and remove duplicate search results
* Add drag and drop to reorder books
* Add sorting capabilities
* Add web page display to look like a bookshelf

# Credits

* Credit to OpenLibrary for providing public API to use found [here](https://openlibrary.org/developers)
* Inpiration and card formatting taken from Toy Tale project found [here](https://github.com/Zemorath/phase-1-practice-toy-tale)
