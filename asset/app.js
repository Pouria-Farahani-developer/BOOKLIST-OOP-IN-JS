// book class : represen book

class book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// ui class : handle ui task
class ui {
    static displaybook() {
        const books = store.getbooks();

        books.forEach((book) => ui.addbooktolist(book))
    }

    static addbooktolist(book) {
        const list = document.querySelector('#book-list')
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
        `

        list.appendChild(row)
    }


    static deletebook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showalert(message,classname){
        const div = document.createElement('div')
        div.className=`alert alert-${classname}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div,form)
        setTimeout(()=> document.querySelector('.alert').remove(),3000)
    }

    static clearFields() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }
}


// store class : handle Storage
class store{
    static getbooks(){
        let books ; 
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books

    }

    static addbooks(book){
        const books = store.getbooks();

        console.log(books);

        books.push(book)


        localStorage.setItem('books',JSON.stringify(books))
    }

    static removebook(isbn){
        const books = store.getbooks();
        books.forEach((book,index)=>{ 
            if(book.isbn === isbn ){
                books.splice(index,1)
            }
        })

        localStorage.setItem('books',JSON.stringify(books))
    }
}

// event : display books
document.addEventListener('DOMContentLoaded', ui.displaybook)

// event : add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    e.preventDefault()

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate
    if (title === '' || author === '' || isbn === '') {
        ui.showalert('please fill in all fields','danger')
    } else {
        const new_book = new book(title, author, isbn)

        // add book to ui

        ui.addbooktolist(new_book)

        store.addbooks(new_book)

        ui.showalert('Book Added','success')

        ui.clearFields()    
    }



})

// event : remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    ui.deletebook(e.target);
    store.removebook(e.target.parentElement.previousElementSibling.textContent)
    ui.showalert('Book Removed','success')
})