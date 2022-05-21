const books = [
  {
    id: '1',
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей,
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники.
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: '2',
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы,
    оставаясь в безопасности.
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве,
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина -
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: '3',
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой.
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера,
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером,
    какими инструментами ему нужно пользоваться.`,
  },
];
const KEY = 'books';

if (!localStorage.getItem(KEY)) {
  localStorage.setItem(KEY, JSON.stringify(books));
}

const divRef = document.querySelector('#root');

const newDiv1 = document.createElement('div');
const newDiv2 = document.createElement('div');

newDiv1.classList.add('leftDiv');
newDiv2.classList.add('rightDiv');

divRef.append(newDiv1, newDiv2);

const heading = document.createElement('h1');
const newList = document.createElement('ul');
const buttonAdd = document.createElement('button');

heading.textContent = 'Library';
buttonAdd.textContent = 'ADD';

heading.classList.add('title');
newList.classList.add('list');
buttonAdd.classList.add('btn-add');

newDiv1.append(heading, newList, buttonAdd);

function renderList() {
  const books = JSON.parse(localStorage.getItem(KEY));
  const markup = books
    .map(({ id, title }) => {
      return `
    <li id=${id} class = "list_item">
      <p class="booktitle">${title}</p>
      <button class="btn btnedit" type="button">Edit</button>
      <button class="btn btndel" type="button">Delete</button>
     </li>
    `;
    })
    .join('');
  newList.insertAdjacentHTML('beforeend', markup);

  const pRef = document.querySelectorAll('.booktitle');

  pRef.forEach((item) => {
    item.addEventListener('click', onClickTitle);
  });

  const btnDelEl = document.querySelectorAll('.btndel');
  const btnEditEl = document.querySelectorAll('.btnedit');

  btnDelEl.forEach((item) => {
    item.addEventListener('click', deleteBook);
  });
  btnEditEl.forEach((item) => {
    item.addEventListener('click', editBook);
  });
}

renderList();

function onClickTitle(event) {
  //  console.log(event.target.textContent);
  const books = JSON.parse(localStorage.getItem(KEY));
  const book = books.find((book) => book.title === event.target.textContent);
  const markup = createPreviewMarkup(book);
  console.log(markup);
  newDiv2.innerHTML = '';
  newDiv2.insertAdjacentHTML('afterbegin', markup);
}

function createPreviewMarkup({ title, author, img, plot }) {
  return `<h2 class="heading">${title}</h2> <p class="text">${author}</p> <img class="img" src="${img}" alt="picture"> <p class="text">${plot}</p>`;
}

function deleteBook(e) {
  const books = JSON.parse(localStorage.getItem(KEY));
  const id = e.target.parentNode.id;
  const filteredBooks = books.filter((book) => book.id !== id);

  localStorage.setItem(KEY, JSON.stringify(filteredBooks));

  newList.innerHTML = '';

  // const title = newDiv2.children.item

  const titleToRemove = newDiv2?.firstChild?.textContent;
  const titleToCheck = books.find((book) => book.id === id).title;
  if (titleToCheck === titleToRemove) {
    newDiv2.innerHTML = '';
  }

  renderList();
}

function editBook(e) {
  newDiv2.innerHTML = '';

  const id = e.target.parentNode.id;
  const books = JSON.parse(localStorage.getItem(KEY));
  const book = books.find((b) => b.id === id);

  newDiv2.insertAdjacentHTML('afterbegin', createFormMarkup(book));

  formBookObj(book);

  const btnSaveEl = document.querySelector('.btn-save');

  btnSaveEl.addEventListener('click', onBtnSave);

  function onBtnSave() {
    const indexOfBook = books.indexOf(book);

    books.splice(indexOfBook, 1, book);

    localStorage.setItem(KEY, JSON.stringify(books));

    newList.innerHTML = '';

    renderList();

    newDiv2.innerHTML = '';

    newDiv2.insertAdjacentHTML('afterbegin', createPreviewMarkup(book));

    setTimeout(() => alert('Book added successful'), 2000);
  }
}

buttonAdd.addEventListener('click', onBtnAdd);

function onBtnAdd() {
  newDiv2.innerHTML = '';

  const newBook = {
    id: Date.now().toString(),
    author: '',
    title: '',
    img: '',
    plot: '',
  };

  newDiv2.insertAdjacentHTML('afterbegin', createFormMarkup(newBook));

  formBookObj(newBook);

  const btnSave = document.querySelector('.btn-save');

  btnSave.addEventListener('click', onBtnSave);

  function onBtnSave() {
    const values = Object.values(newBook);
    const isEmptyField = values.some((v) => v === '');
    if (isEmptyField) {
      alert('All fields must be filled');
    } else {
      const oldBookData = JSON.parse(localStorage.getItem(KEY));
      oldBookData.push(newBook);
      const booksToSave = JSON.stringify(oldBookData);
      localStorage.setItem(KEY, booksToSave);

      newList.innerHTML = '';

      renderList();

      newDiv2.innerHTML = '';

      newDiv2.insertAdjacentHTML('afterbegin', createPreviewMarkup(newBook));
    }
  }
}

function formBookObj(book) {
  // const formEl = document.querySelector('.book-form');
  const inputsEl = document.querySelectorAll('input');

  inputsEl.forEach((item) => item.addEventListener('change', onInputChange));

  function onInputChange(e) {
    book[e.target.name] = e.target.value;
    console.log(book);
  }
}

function createFormMarkup(book) {
  return `
    <form class="book-form" action="">
      <label>
        Author
        <input type="text" name="author" value="${book.author}"/>
      </label>
      <label>
        Title
        <input type="text" name="title" value="${book.title}"/>
      </label>
      <label>
        img url
        <input type="text" name="img" value="${book.img}"/>
      </label>
      <label>
        Plot
        <input type="text" name="plot" value="${book.plot}"/>
      </label>
      <button class="btn btn-save" type="button">Save</button>
    </form>
  `;
}
