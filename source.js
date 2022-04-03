let addButton = document.querySelector('.book-add');
let addButtonSecondary = document.querySelector('.plus-little-img');
let addBookForm = document.querySelector('.book-add-menu');
let bookAddContainer = document.querySelector('.book-add-container');
let removeButton = Array.from(document.querySelectorAll('.minus-img')); 
let books = []; 
let myLibrary = [];

addBookToLibrary('Fire and blood', 'George R.R. Martin', '632', '8','read'); 
addBookToLibrary('Hunger Games', 'Suzanne Collins', '342', '9','on hold');
addBookToLibrary('Pale Blue Dot', 'Carl Sagan', '432', '10','dropped');

function addEventRemoveBook(button)
{
    button.addEventListener('click', () =>
    {
        let index = +button.getAttribute('data-id');
        let ArSlice1 = myLibrary.slice(0, index);
        let ArSlice2 = myLibrary.slice(index+1, myLibrary.length);
        myLibrary = ArSlice1.concat(ArSlice2);

        ArSlice1 = books.slice(0, index);
        ArSlice2 = books.slice(index+1, books.length);
        books = ArSlice1.concat(ArSlice2);

        for(let i = index; i < myLibrary.length; i++)
        {
            books[i].setAttribute('data-id', i);
            books[i].querySelector('.minus-img').setAttribute('data-id', i);
            books[i].querySelector('.read-status-input').setAttribute('data-id', i);
        }
        removeBook(index);
    });
}

function setEventStatusChange(input)
{
    input.addEventListener('click', () =>
    {
        myLibrary[input.getAttribute('data-id')].status = input.value;
    });
}

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
        addBookToLibrary(addBookForm.title.value, addBookForm.author.value, addBookForm.pages.value, addBookForm.scoreInput.value,addBookForm.readStatus.value);
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

function Book(title, author, pages, score, status) 
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.score = score;
    this.status = status;
}

function addBookToLibrary(title, author, pages, score, status) 
{
    myLibrary.push(new Book(title, author, pages, score, status))
    addBookToDOM();
}

function addBookToDOM()
{
    let index = myLibrary.length-1;
  
    let book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute('data-id', index  );
    
    let bookCaptionTitle = document.createElement('div');
    bookCaptionTitle.classList.add('book-caption');

    let captionLabelTitle = document.createElement('span');
    captionLabelTitle.classList.add('caption-label');
    captionLabelTitle.textContent = 'Title';

    let captionTitle = document.createElement('span');
    captionTitle.classList.add('caption');
    captionTitle.setAttribute('id', 'title')
    captionTitle.textContent = myLibrary[index].title;

    bookCaptionTitle.appendChild(captionLabelTitle);
    bookCaptionTitle.appendChild(captionTitle);
    book.appendChild(bookCaptionTitle);


    let bookCaptionAuthor = document.createElement('div');
    bookCaptionAuthor.classList.add('book-caption');

    let captionLabelAuthor = document.createElement('span');
    captionLabelAuthor.classList.add('caption-label');
    captionLabelAuthor.textContent = 'Author';

    let captionAuthor = document.createElement('span');
    captionAuthor.classList.add('caption');
    captionAuthor.setAttribute('id', 'author')
    captionAuthor.textContent = myLibrary[index].author;

    bookCaptionAuthor.appendChild(captionLabelAuthor);
    bookCaptionAuthor.appendChild(captionAuthor);
    book.appendChild(bookCaptionAuthor);
    
    let bookCaptionPages = document.createElement('div');
    bookCaptionPages.classList.add('book-caption');

    let captionLabelPages = document.createElement('span');
    captionLabelPages.classList.add('caption-label');
    captionLabelPages.textContent = 'Pages';

    let captionPages = document.createElement('span');
    captionPages.classList.add('caption');
    captionPages.setAttribute('id', 'pages')
    captionPages.textContent = myLibrary[index].pages;

    bookCaptionPages.appendChild(captionLabelPages);
    bookCaptionPages.appendChild(captionPages);
    book.appendChild(bookCaptionPages);


    let bookCaptionScore = document.createElement('div');
    bookCaptionScore.classList.add('book-caption');

    let captionLabelScore = document.createElement('span');
    captionLabelScore.classList.add('caption-label');
    captionLabelScore.textContent = 'Score';

    let captionScore = document.createElement('span');
    captionScore.classList.add('caption', 'score-caption');
    captionScore.setAttribute('id', 'score')

    if(myLibrary[index].score != '')
        captionScore.textContent = myLibrary[index].score;
    else
    captionScore.textContent = '-';

    bookCaptionScore.appendChild(captionLabelScore);
    bookCaptionScore.appendChild(captionScore);
    book.appendChild(bookCaptionScore);


    let bookCaptionStatus = document.createElement('div');
    bookCaptionStatus.classList.add('book-caption');

    let captionLabelStatus = document.createElement('span');
    captionLabelStatus.classList.add('caption-labels');
    captionLabelStatus.textContent = 'Status';

    let selectInput = document.createElement('select');
    selectInput.classList.add('read-status-input');
    let option1 = document.createElement('option');
    option1.value = 'read';
    option1.textContent = 'read';
    let option2 = document.createElement('option');;
    option2.value = 'notread';
    option2.textContent = 'not read';
    let option3 = document.createElement('option');;
    option3.value = 'onhold';
    option3.textContent = 'on hold';
    let option4 = document.createElement('option');;
    option4.value = 'dropped';
    option4.textContent = 'dropped';

    let status = myLibrary[index].status;
    if(status == 'read')
        option1.setAttribute('selected', '')
    else if(status == 'not read')
        option2.setAttribute('selected', '')
    else if(status == 'on hold')
        option3.setAttribute('selected', '')
    else
        option4.setAttribute('selected', '')

    selectInput.appendChild(option1);
    selectInput.appendChild(option2);
    selectInput.appendChild(option3);
    selectInput.appendChild(option4);
    selectInput.setAttribute('data-id', index);    
    setEventStatusChange(selectInput);

    bookCaptionStatus.appendChild(captionLabelStatus);
    bookCaptionStatus.appendChild(selectInput);
    book.appendChild(bookCaptionStatus);


    let remove = document.createElement('div');
    remove.classList.add('remove');

    let img = document.createElement('img')
    img.classList.add('minus-img');
    img.setAttribute('src', 'graphics/minus.png')
    img.setAttribute('alt', 'image of minus')
    img.setAttribute('data-id', index);

    remove.appendChild(img);
    book.appendChild(remove);
    removeButton.push(img);
    addEventRemoveBook(img);

    document.querySelector('.book-list').appendChild(book);
    books.push(book);
}

function removeBook(index)
{
    const parent = document.querySelector('.book-list');
    parent.removeChild(parent.querySelector(`[data-id="${index}"]`));
}