console.log("hi");
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", () => {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    // JSON defines only two data structures: objects and arrays
    notesObj = JSON.parse(notes);
  }
  // JSON.parse()- converts string to object or array
  // JSON.stringify()- converts   object or array .to string
  //   notesObj is an array
  let myObj ={
    title : addTitle.value,
    text : addTxt.value
  }
  // Now notesObj is array of objects(myObj).
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  // console.log(addTxt.value);
  // console.log("It is notesObj : ", notesObj);
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});
// Function to show elements from localstorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title"> ${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button  id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
            </div>
        </div>

          `;
    // console.log("hello")
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `<h5>Nothing here..Write up a note</h5>`;
  }
}

// Fucntion to delete a note
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  showNotes();
  // console.log(`I am deleting ${Number(index) + 1}`);
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value;
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});
