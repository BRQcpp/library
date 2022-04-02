let addButton = document.querySelector('.book-add');
let addButtonSecondary = document.querySelector('.plus-little-img');
let addBookForm = document.querySelector('.book-add-menu');
let bookAddContainer = document.querySelector('.book-add-container');
let myLibrary = [];

bookAddContainer.addEventListener('click', () =>
{
    let inputs = [addBookForm.title, addBookForm.author, addBookForm.pages];
    for(let input of inputs)
    {
        if(input.style.getPropertyValue('border') != '')
        {
            input.style.removeProperty('border');
            input.removeAttribute('placeholder');
        }
    }
});

addButton.addEventListener('click', () => 
{
    addButton.style.setProperty('display', 'none');
    bookAddContainer.style.setProperty('display', 'block');
});

addButtonSecondary.addEventListener('click', (event) => {
    let emptyInput = getEmpty();
    if(emptyInput == false)
    {
        addBookToLibrary(addBookForm.title.value, addBookForm.author.value, addBookForm.pages.value, addBookForm.readStatus.value);
        bookAddContainer.style.setProperty('display', 'none');
        addButton.style.removeProperty('top', '0');
        addButton.style.removeProperty('display');
    }
    else 
    {
        for(let input of emptyInput)
        {
            input.style.setProperty('border', '1px solid red');
            input.setAttribute('placeholder', 'FIll the input');
        }
    }
    event.stopImmediatePropagation()
});

function getEmpty() 
{
    let inputs = [addBookForm.title, addBookForm.author, addBookForm.pages];
    let emptyInputs = [];
    for(let input of inputs)
    {
        if(input.value == '')
            emptyInputs.push(input);
    }
    if(emptyInputs.length == 0)
        return false;
    return emptyInputs;
}

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status))
}