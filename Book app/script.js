const tableBody = document.querySelector("#table-body");
const addBtn = document.querySelector("#add-btn");
const saveBtn = document.querySelector("#save-btn");
const alertBox = document.querySelector(".alert");

window.addEventListener('DOMContentLoaded', (event) => {
    loadTableData();
    showhideTable();
});

 // Add Book Record
addBtn.addEventListener("click", () => {
    const bookForm = document.querySelector("#save-book-form");
    let bookName = bookForm.elements["book-name"].value;
    let bookAuthor = bookForm.elements["book-author"].value;
    let bookEdition = bookForm.elements["book-edition"].value;

    if (bookName == "" || bookAuthor == "" || bookEdition == "") {
        showAlert("All Fields are required", false);
    }
    else {
        addBook(bookName, bookAuthor, bookEdition);
        showAlert("Book Added", true);
        loadTableData();
        bookForm.reset();
    }
});

// Save Edit Record
saveBtn.addEventListener("click",()=>{
    document.querySelector(".overlay").classList.toggle("show");

    const bookForm = document.querySelector("#edit-book-form");
    let bName = bookForm.elements["book-name"].value;
    let bAuthor = bookForm.elements["book-author"].value;
    let bEdition = bookForm.elements["book-edition"].value;

    let bookObj = {
        bookName: bName,
        bookAuthor: bAuthor,
        bookEdition: bEdition,
    };

    let jsonObj = JSON.stringify(bookObj);

    let keyToEdit = saveBtn.getAttribute("data-bid");
    console.log(keyToEdit);
    localStorage.setItem(keyToEdit,jsonObj);

    loadTableData();
});


// FUNCTIONS
function addBook(bName, bAuthor, bEdition) {
    let bookObj = {
        bookName: bName,
        bookAuthor: bAuthor,
        bookEdition: bEdition,
    };
    let jsonObj = JSON.stringify(bookObj);

    let max = 1;
    Object.keys(localStorage).forEach((val)=>{
        if(val > max) max = val;
    });

    let key = +max + 1;

    localStorage.setItem(key, jsonObj);  //Storing into local storage
}

function loadTableData() {
    tableBody.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        let jsonObj = localStorage.getItem(localStorage.key(i));
        let bookObj = JSON.parse(jsonObj);

        let row = document.createElement("tr");
        row.innerHTML =
       `<td>${bookObj.bookName}</td>
        <td>${bookObj.bookAuthor}</td>
        <td>${bookObj.bookEdition}</td>
        <td>
            <button id="edit-btn" class="icon-btn" data-bid="${localStorage.key(i)}" onclick="editBook(this)">&#9998;</button>
            <button id="delete-btn" class="icon-btn" data-bid="${localStorage.key(i)}" onclick="removeBook(this)">&times;</button>    
        </td>`;

        tableBody.appendChild(row);
    }

}

function showhideTable() {
    tableBody.closest('.table-wrapper').style.display =
        (tableBody.innerHTML.trim() == "") ? "none" : "block";
}

//  Remove Book
function removeBook(e) {
    let keyRemove = e.getAttribute("data-bid");
    localStorage.removeItem(keyRemove);

    e.parentElement.parentElement.remove();
    showAlert("Book Removed", true);
    showhideTable();
}

// Alert
function showAlert(msg, status) {
    alertBox.innerHTML = msg;

    if (status === true) {
        alertBox.classList.add("alert-success");
        alertBox.style.display = "block";

        setTimeout(() => {
            alertBox.classList.remove("alert-success");
            alertBox.style.display = "none";
        }, 3000);

    } else if (status === false) {
        alertBox.classList.add("alert-danger");
        alertBox.style.display = "block";

        setTimeout(() => {
            alertBox.classList.remove("alert-danger");
            alertBox.style.display = "none";
        }, 3000);
    }
}

document.querySelector("#close-btn").addEventListener("click",()=>{
    document.querySelector(".overlay").classList.toggle("show");
});

function editBook(e){
    document.querySelector(".overlay").classList.toggle("show");

    let keyRemove = e.getAttribute("data-bid");
    let jsonObj = localStorage.getItem(keyRemove);
    
    let bookObj = JSON.parse(jsonObj);

    const bookForm = document.querySelector("#edit-book-form");

    bookForm.elements["book-name"].value = bookObj.bookName;
    bookForm.elements["book-author"].value = bookObj.bookAuthor;
    bookForm.elements["book-edition"].value = bookObj.bookEdition;

    saveBtn.setAttribute("data-bid",keyRemove);
}

