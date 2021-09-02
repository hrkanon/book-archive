const resultQuantity = document.getElementById("result-quantity");
const searchedDisplay = document.getElementById("searched-display");
const resultContainer = document.getElementById("result-container");
const errorMessage = document.getElementById("error-message");
errorMessage.style.display = "none";
const spinner = document.getElementById("spinner");
spinner.style.display = "none";
const searchField = document.getElementById("search-field");

const searchItem = () => {
  const searchText = searchField.value;
  //   clear searchField and previous results
  searchField.value = "";
  resultQuantity.textContent = "";
  searchedDisplay.textContent = "";
  // Display Spineer
  spinner.style.display = "block";
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
  // Handle empty search request
  if (books.q === "") {
    errorMessage.style.display = "block";
  }
  // Handle if no result available
  else if (books.docs.length === 0) {
    errorMessage.style.display = "none";
    resultQuantity.innerText = `No result found`;
  }
  // Handle if results available
  else {
    // hide error message
    errorMessage.style.display = "none";
    // displaying total quantity of search
    resultQuantity.innerText = `Items found - ${books.docs.length}`;
    // getting 24 items of total quantity
    const sortedBooks = books.docs.slice(0, 24);
    sortedBooks.forEach((book) => {
      // console.log(book.publisher[0]);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
         <div class="card h-100">
               <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt=>
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
