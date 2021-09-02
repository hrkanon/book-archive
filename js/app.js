const resultQuantity = document.getElementById("result-quantity");
const searchedDisplay = document.getElementById("searched-display");
const resultContainer = document.getElementById("result-container");
const errorMessage = document.getElementById("error-message");
errorMessage.style.display = "none";
const spinner = document.getElementById("spinner");
spinner.style.display = "none";
const searchField = document.getElementById("search-field");

const searchItem = () => {
  // const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   clear searchField
  searchField.value = "";
  resultQuantity.textContent = "";
  searchedDisplay.textContent = "";
  // errorMessage.textContent = "";
  spinner.style.display = "block";
  console.log(searchText);
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBooks(data));
};
const displayBooks = (books) => {
  // console.log(books);
  spinner.style.display = "none";
  searchedDisplay.textContent = "";
  if (books.q === "") {
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    console.log(books.docs);
    if (books.docs.length === 0) {
      resultQuantity.innerText = `No result found`;
    } else {
      resultQuantity.innerText = `Items found - ${books.docs.length} of ${books.numFound} for ${searchField.value} `;
    }

    const sortedBooks = books.docs.slice(0, 24);
    sortedBooks.forEach((book) => {
      // resultQuantity.innerText = ``;

      // console.log(book);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
         <div class="card h-100">
               <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
               <h5 class="card-title">Book Name: ${book.title}</h5>
               <p class="card-text">Author: ${book.author_name}</p>
              <p class="card-text fw-bold">Published by - ${book.publisher}</p>
              <p class="card-text fw-bold">First Published Year: ${book.first_publish_year}</p>
            </div>
          </div>
    `;
      searchedDisplay.appendChild(div);
    });
  }
};
