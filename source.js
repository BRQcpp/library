class Book
{
    constructor(title, author, pages, score, status, dateSReading, dateRead)
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.score = score;
        this.status = status;
        this.readDate = dateRead;
        this.dateSReading = dateSReading;
    }
}


let addButton = document.querySelector('.book-add');
let addButtonSecondary = document.querySelector('.plus-little-img');
let addBookForm = document.querySelector('.book-add-menu');
let addBookInputs = document.querySelectorAll('#book-ad-input');
let bookAddContainer = document.querySelector('.book-add-container');
let expandMenuButton = document.querySelector('.expand-button');
let menu = document.querySelector('.menu');
let sortMenuButtons = document.querySelector('.sort-menu').querySelectorAll('.menu-option');
let removeButton = Array.from(document.querySelectorAll('.minus-img')); 
let sortFromButtons = document.querySelectorAll('.s-arrow-img');
let sortBy;
let bookIndex = 0;
let books = []; 
let sortFrom = 'up';


addBookToLibrary('Fire and blood', 'George R.R. Martin', '632', '8','read', '2001-08-18', '2007-07-21'); 
addBookToLibrary('Hunger Games', 'Suzanne Collins', '342', '9','on hold', '2002-03-12', '2006-02-03');
addBookToLibrary('The world of Ice and Fire', 'George R.R. Martin', '432', '2','reading', '2003-08-18', '2005-07-21');
addBookToLibrary('Anne of Green Gables', 'Lucy Maud Montgomery', '232', '10','dropped', '2004-08-18', '2004-07-21');
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '132', '6','read', '2005-08-18', '2003-07-21');
addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien', '832', '7','on hold', '2006-08-18', '2002-07-21');
addBookToLibrary('Pale Blue Dot', 'Carl Sagan', '432', '10','reading', '2007-08-18', '2001-07-21');


addBookForm.addEventListener('keydown', e =>
{
    if(e.key == 'Enter')
        e.preventDefault();
});

sortFromButtons.forEach( (button) =>
{
    button.addEventListener('click', () =>
    {
        sortFromButtons.forEach( button =>
        {
            button.classList.remove('s-arrow-img-checked');
        });
        if(sortBy != '' && !button.classList.contains('s-arrow-img-checked'))
        {
            button.classList.add('s-arrow-img-checked');

            if(button.getAttribute('id') == 'sort-up')
                sortFrom = 'up';
            else
                sortFrom = 'down';

            sortBooks(sortBy);
        }
    });
});

sortMenuButtons.forEach( (button) =>
{
    button.addEventListener('mousedown', () =>
    {
        sortMenuButtons.forEach( (buttonA) =>
        {
            if(buttonA.classList.contains('menu-option-checked') && buttonA != button)
                buttonA.classList.remove('menu-option-checked');
        });

        button.classList.add('button-click-effect');

        sortBy = button.getAttribute('data-value');
        sortBooks(sortBy);
    });

    button.addEventListener('mouseup', () =>
    {
        if(!button.classList.contains('menu-option-checked'))
            button.classList.add('menu-option-checked');
    });

    button.addEventListener('transitionend', () =>
    {
        if(button.classList.contains('button-click-effect'))
            button.classList.remove('button-click-effect');
    });
});

expandMenuButton.addEventListener('click', () => 
{
    let topMenu = document.querySelector('.top-menu');
    let expandMenuButtonImg = document.querySelector('.img-arrow');
    topMenu.classList.toggle('roll-up');
    document.querySelector('.main-content').classList.toggle('roll-up');
    if(topMenu.classList.contains('roll-up'))
    {
        expandMenuButtonImg.setAttribute('src', 'graphics/arrow-down.png'); 
        expandMenuButtonImg.setAttribute('alt', 'image of arrow pointing down');    
    }
    else 
    {
        document.querySelector('.img-arrow').setAttribute('src', 'graphics/arrow-up.png');
        expandMenuButtonImg.setAttribute('alt', 'image of arrow pointing up');
        expandMenuButton.style.setProperty('top', '-1px');         //not perfect solution     
    }
});

addBookInputs.forEach( input =>
{
    input.addEventListener('click', () =>
    {
        setInputValidationBorders(input);
    });
    input.addEventListener('input', () =>
    {
        setInputValidationBorders(input);
    });
});

addButton.addEventListener('click', () => 
{
    addButton.classList.add('book-add-am');
    bookAddContainer.style.setProperty('display', 'block');
    Array.from(addBookInputs).slice(0, 3).forEach( (input) => //147 comment
    {
        input.setAttribute('required', '');
    });
});

addBookForm.addEventListener('submit', (e)=>
{
    e.preventDefault();
    return false;
}, false);

addButtonSecondary.addEventListener('click', (event) => {
    let emptyInput = getEmpty();
    let isInvalid  = getInvalidInput();
    if(emptyInput == false && isInvalid == false)
    {
        addBookToLibrary(addBookForm.title.value, addBookForm.author.value, addBookForm.pages.value, addBookForm.score.value,addBookForm.status.value, addBookForm.dateSReading.value, addBookForm.dateRead.value);
        addButton.classList.remove('book-add-am');
        addButton.style.removeProperty('display');
        bookAddContainer.style.setProperty('display', 'none');
        addBookForm.author.value = '';
        addBookForm.title.value = '';
        addBookForm.pages.value = '';
        addBookForm.score.value = '';
        addBookForm.status.value = 'read'
        addBookForm.dateSReading.value = '';
        addBookForm.dateRead.value = '';

        Array.from(addBookInputs).slice(0, 3).forEach( (input) => //It is done for google chrome support of console errors caused by hiding required inputs 
        {
            input.removeAttribute('required');
        });
    }
    else
    {
        if(invalidInputs != 0)
        {
            for(let input of invalidInputs)
                input.style.setProperty('border', '1px solid orange');
        }
        if(emptyInput != 0)
        for(let input of emptyInput)
        {
            input.style.setProperty('border', '1px solid red');
            input.setAttribute('placeholder', 'FIll the input');
        }

    }

    
    event.stopImmediatePropagation()
});

function setInputValidationBorders(input)
{
    if(input.style.getPropertyValue('border') != '')
    {
       input.style.removeProperty('border');
        if(input != addBookForm.score)
                input.removeAttribute('placeholder');
    }
}

function sortBooks(sortBy)
{
    if(sortBy == 'status')
        sortByStatus();

    else if(sortBy == 'score' || sortBy == 'pages' || sortBy == 'title')
        sortStandardUp(sortBy);

    else if(sortBy == 'read-date' || sortBy == 'date-sreading')
        sortByDate(sortBy);
        
    else if(sortBy = 'author')
        sortByAuthor();


    loadBooks();
}

function sortByDate(sortBy)
{
        let sortable = [];
        for(book of books)
            sortable.push([book, book.querySelector(`#${sortBy}`).value]);
    
        sortable.sort( (a, b) =>
        {
            a[1] = new Date(a[1]);
            b[1] = new Date(b[1]);

            if(sortFrom == 'up')
            {
                if (a[1] < b[1])
                   return 1;
                if (a[1] > b[1])
                   return -1;
                return 0;
            }
            else 
            {
                if (a[1] > b[1])
                    return 1;
                if (a[1] < b[1])
                    return -1;
            }
        });
    
        for(let i = 0; i < books.length; i++)
            books[i] = sortable[i][0];
}

function sortByStatus()
{
    let read = books.filter(book => book.querySelector('.read-status-input').value == 'read');
    let reading = books.filter(book => book.querySelector('.read-status-input').value == 'reading');
    let onhold = books.filter(book => book.querySelector('.read-status-input').value == 'onhold');
    let dropped = books.filter(book => book.querySelector('.read-status-input').value == 'dropped');
    if(sortFrom == 'up')
        books = read.concat(reading).concat(onhold).concat(dropped);
    else 
        books = dropped.concat(onhold).concat(reading).concat(read);
}

function sortByAuthor()
{
    let authors = [];
    let name;
    for(book of books)
    {
        name = book.querySelector('#author').textContent;
        if(authors.indexOf(name) == -1)
            authors.push(name);
    }

    let booksSorted = [];
    for(let i = 0; i < authors.length; i++)
    {
        booksSorted[i] = books.filter(book => book.querySelector('#author').textContent == authors[i]);
    }

    books = [];

    for(let i = 0; i < authors.length; i++)
    {
        books = books.concat(booksSorted[i]);
    }
}

function sortStandardUp(sortBy)
{
    let sortable = [];
    for(book of books)
        sortable.push([book, book.querySelector(`#${sortBy}`).textContent]);

    sortable.sort( (a, b) =>
    {
        if(sortFrom == 'up')
        {

            if(!(sortBy == 'title'))
            {
                if (+a[1] < +b[1])
                    return 1;
                if (+a[1] > +b[1])
                    return -1;
                return 0;
            }
            else 
            {
                if (a[1] > b[1])
                    return 1;
                if (a[1] < b[1])
                    return -1;
                return 0;
            }
        }
        else 
        {
            if(!(sortBy == 'title'))
            {
                if (+a[1] > +b[1])
                    return 1;
                if (+a[1] < +b[1])
                    return -1;
                return 0;
            }
            else 
            {
                if (a[1] < b[1])
                    return 1;
                if (a[1] > b[1])
                    return -1;
                return 0;
            }
        }
    });


    for(let i = 0; i < books.length; i++)
    books[i] = sortable[i][0];
}

function loadBooks()
{
    let parent = document.querySelector('.book-list');

    let children = Array.from(parent.querySelectorAll('.book')).slice(2);
    for(let i = 0; i < children.length; i++)
    {
        parent.removeChild(children[i]);    
    }

    for(let i = 0; i < children.length; i++)
    {
        parent.appendChild(books[i]);    
    }

}

function addEventRemoveBook(button)
{
    button.addEventListener('click', () =>
    {
        let id = +button.getAttribute('data-id');
        removeBook(id); 
    });

    button.addEventListener('transitionend', (event) =>
    {   
        event.stopPropagation();
    });
}

function setEventStatusChange(input)
{
    input.addEventListener('click', () =>
    {
        myLibrary[input.getAttribute('data-id')].status = input.value;
    });
}

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

    if(emptyInputs.length == 0)
        return 0;
    return emptyInputs;
}

function getInvalidInput()
{
    invalidInputs = [];

    if(addBookForm.pages.value > 99999 || addBookForm.pages.value < 1)
        invalidInputs.push(addBookForm.pages);
    if(addBookForm.score.value > 10|| addBookForm.score.value < 0)
        invalidInputs.push(addBookForm.score);
    if(invalidInputs.length == 0)
        return 0;
    return invalidInputs;
}

function addBookToLibrary(title, author, pages, score, status, dateSReading, dateRead) 
{
    addBookToDOM(new Book(title, author, pages, score, status, dateSReading, dateRead));
}

function addBookToDOM(newBook)
{
    let id = bookIndex;
    bookIndex++;

    let book = document.createElement('div');
    book.classList.add('book');
    book.setAttribute('data-id', id);
    
    let bookCaptionTitle = document.createElement('div');
    bookCaptionTitle.classList.add('book-caption');

    let captionLabelTitle = document.createElement('span');
    captionLabelTitle.classList.add('caption-label');
    captionLabelTitle.textContent = 'Title';

    let captionTitle = document.createElement('span');
    captionTitle.classList.add('caption');
    captionTitle.setAttribute('id', 'title')
    captionTitle.textContent = newBook.title;

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
    captionAuthor.textContent = newBook.author;

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
    captionPages.textContent = newBook.pages;

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

    if(newBook.score != '')
        captionScore.textContent = newBook.score;
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
    option2.value = 'reading';
    option2.textContent = 'reading';
    let option3 = document.createElement('option');;
    option3.value = 'onhold';
    option3.textContent = 'on hold';
    let option4 = document.createElement('option');;
    option4.value = 'dropped';
    option4.textContent = 'dropped';

    let status = newBook.status;
    if(status == 'read')
        option1.setAttribute('selected', '')
    else if(status == 'reading')
        option2.setAttribute('selected', '')
    else if(status == 'on hold')
        option3.setAttribute('selected', '')
    else
        option4.setAttribute('selected', '')

    selectInput.appendChild(option1);
    selectInput.appendChild(option2);
    selectInput.appendChild(option3);
    selectInput.appendChild(option4);
    selectInput.setAttribute('data-id', id);    

    bookCaptionStatus.appendChild(captionLabelStatus);
    bookCaptionStatus.appendChild(selectInput);
    book.appendChild(bookCaptionStatus);


    let bookCaptionDateSReading = document.createElement('div');
    bookCaptionDateSReading .classList.add('book-caption');

    let captionLabelDateSReading  = document.createElement('span');
    captionLabelDateSReading .classList.add('caption-labels');
    captionLabelDateSReading .textContent = 'Started reading';

    let dateInput = document.createElement('input');
    dateInput.classList.add('book-date-input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('id', 'date-sreading');
    dateInput.setAttribute('name', 'dateSReading');
    dateInput.value = newBook.dateSReading;

    bookCaptionDateSReading.appendChild(captionLabelDateSReading);
    bookCaptionDateSReading.appendChild(dateInput);
    book.appendChild(bookCaptionDateSReading);


    let bookCaptionDateRead = document.createElement('div');
    bookCaptionDateRead.classList.add('book-caption');

    let captionLabelDateRead = document.createElement('span');
    captionLabelDateRead.classList.add('caption-labels');
    captionLabelDateRead.textContent = 'Date read';

    dateInput = document.createElement('input');
    dateInput.classList.add('book-date-input');
    dateInput.setAttribute('type', 'date');
    dateInput.setAttribute('id', 'read-date');
    dateInput.setAttribute('name', 'dateRead');
    dateInput.value = newBook.readDate;

    bookCaptionDateRead.appendChild(captionLabelDateRead);
    bookCaptionDateRead.appendChild(dateInput);
    book.appendChild(bookCaptionDateRead);


    let remove = document.createElement('div');
    remove.classList.add('remove');

    let img = document.createElement('img')
    img.classList.add('minus-img');
    img.setAttribute('src', 'graphics/minus.png')
    img.setAttribute('alt', 'image of minus')
    img.setAttribute('data-id', id);

    remove.appendChild(img);
    book.appendChild(remove);
    removeButton.push(img);
    addEventRemoveBook(img);

    document.querySelector('.book-list').appendChild(book);
    books.push(book);
}

function removeBook(id)
{
    const parent = document.querySelector('.book-list');
    let child = parent.querySelector(`[data-id="${id}"]`);
    child.classList.add('book-am');
    child.addEventListener('transitionend', () =>
    {
        let index = books.indexOf(child);
        books = books.splice(0, index).concat(books.splice(index+1, books.length));
        parent.removeChild(child);
    }, {once : true});
}
