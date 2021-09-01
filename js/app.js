const resultQuantity = document.getElementById("result-quantity");
const searchedDisplay = document.getElementById("searched-display");
const resultContainer = document.getElementById("result-container");
const errorMessage = document.getElementById("error-message");
errorMessage.style.display = "none";
const spinner = document.getElementById("spinner");
spinner.style.display = "none";

const searchItem = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   clear searchField
  searchField.value = "";
  resultQuantity.textContent = "";
  searchedDisplay.textContent = "";
  spinner.style.display = "block";
  console.log(searchText);
  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBooks(data));
};

const displayBooks = (books) => {
  console.log(books.docs);
  if (books.docs.length === 0) {
    errorMessage.style.display = "block";
  } else {
    resultQuantity.innerText = `Items found - ${books.docs.length}`;
  }
  const sortedBooks = books.docs.slice(0, 6);
  searchedDisplay.textContent = "";
  spinner.style.display = "none";
  sortedBooks.forEach((book) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="col border">
            <div class = "d-flex justify-content-between align-items-center">
          <div class="card h-100">
            <img src=" https://covers.openlibrary.org/b/id/${
              book.cover_i
            }-M.jpg" class="card-img-top img-fluid" alt="">
            </div>
            <div class="card-body ms-2px">
              <h5 class="card-title">Book Name: ${book.title}</h5>
              <p class="card-text">
                Author: ${book.author_name}
              </p>
              <p class="card-text">
                First Published Year: ${book.first_publish_year}
              </p>
              <p class="card-text">
                Published by - ${
                  book.publisher.length <= 5
                    ? book.publisher
                    : book.publisher.slice(0, 4)
                }
              </p>
            </div>
          </div>
          </div>
        </div>
    `;
    searchedDisplay.appendChild(div);
  });
  //   resultQuantity.innerText = `Items found - ${books.docs.length}`;
};

const displayError = () => {
  if (books.docs.length < 0) {
    errorMessage.innerText = "Please Enter a valid book";
    resultQuantity.innerText = `Items found - ${books.docs.length}`;
  }
};

// <div class="col">
//             <div class = "d-flex ">
//           <div class="card h-100">
//             <img src=" https://covers.openlibrary.org/b/id/${
//               book.cover_i
//             }-M.jpg" class="card-img-top w-25" alt="">
//             </div>
//             <div class="card-body">
//               <h5 class="card-title text-center">Book Name: ${book.title}</h5>
//               <p class="card-text">
//                 Author: ${book.author_name}
//               </p>
//               <p class="card-text">
//                 First Published Year: ${book.first_publish_year}
//               </p>
//               <p class="card-text">
//                 Published by - ${
//                   book.publisher.length <= 5
//                     ? book.publisher
//                     : book.publisher.slice(0, 4)
//                 }
//               </p>
//             </div>
//           </div>
//           </div>
//         </div>

//          div.innerHTML = `
//         <div class="col">
//           <div class="card h-100">
//             <img src=" https://covers.openlibrary.org/b/id/${
//               book.cover_i
//             }-M.jpg" class="card-img-top w-25" alt="">
//             <div class="card-body">
//               <h5 class="card-title text-center">Book Name: ${book.title}</h5>
//               <p class="card-text">
//                 Author: ${book.author_name}
//               </p>
//               <p class="card-text">
//                 First Published Year: ${book.first_publish_year}
//               </p>
//               <p class="card-text">
//                 Published by - ${
//                   book.publisher.length <= 5
//                     ? book.publisher
//                     : book.publisher.slice(0, 4)
//                 }
//               </p>
//             </div>
//           </div>
//         </div>
//     `;
