fetch("http://localhost:3000/ramens")
  .then((resp) => resp.json())
  .then((data) => {
    renderMenu(data);
    showDetails(data[0]);
    addNewRamen();
    editRamen();
    deleteRamen();
  });

let currentRamen;
let menu = document.querySelector("#ramen-menu");

function renderMenu(menuObj) {
  menuObj.forEach((ramen) => {
    let img = document.createElement("img");
    img.id= `new-Ramen-${ramen.id}`
    img.src = ramen.image;
    menu.appendChild(img);
    img.addEventListener("click", function (e) {
      e.preventDefault();
      currentRamen = ramen;
      console.log(img.id)
      console.log(ramen)
      showDetails(currentRamen);
    });

  });
}

let fillImg = document.querySelector(".detail-image");
let fillName = document.querySelector(".name");
let fillRest = document.querySelector(".restaurant");
let fillRating = document.querySelector("#rating-display");
let fillComment = document.querySelector("#comment-display");

function showDetails(ramen) {
  currentRamen = ramen;

  fillImg.src = ramen.image;
  fillName.textContent = ramen.name;
  fillRest.textContent = ramen.restaurant;

 
  fillRating.textContent = ramen.rating;
  fillComment.textContent = ramen.comment;
}

function addNewRamen() {
  let form = document.querySelector("#new-ramen");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.querySelector("#new-name").value;
    let restaurant = document.querySelector("#new-restaurant").value;
    let image = document.querySelector("#new-image").value;
    let rating = document.querySelector("#new-rating").value;
    let comment = document.querySelector("#new-comment").value;

    let newRamen = {
      name: name,
      restaurant: restaurant,
      image: image,
      rating: rating,
      comment: comment,
    };
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRamen),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));

    fetch("http://localhost:3000/ramens")
      .then((resp) => resp.json())
      .then((data) => {
        renderMenu(data);
      });
  });
}

let updateForm = document.querySelector("#edit-ramen");

function editRamen() {
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("current ramen id" +currentRamen.id);
    let rating = document.querySelector("#new-rating-form").value;
    console.log("sending new rating" + rating);
    let comment = document.querySelector("#new-comment-form").value;
    console.log("sending new comment" + comment);

    let updatedRamen = {
      rating: rating,
      comment: comment,
    };

    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRamen),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("the data from fetch is" + data);

        console.log("trying to reload info")
        console.log("current ramen we're calling showDetail() on" + currentRamen)

      });
    e.target.reset();
    
    fetch("http://localhost:3000/ramens")
      .then((resp) => resp.json())
      .then((data) => {
        renderMenu(data);
        showDetails(currentRamen)
    })
    //location.reload()
  });
}

let updateDiv = document.querySelector("#ramen-detail")
let deleteCount =0

function deleteRamen() {
//   let deleteBtn = document.createElement("button");
//   deleteBtn.textContent = "DELETE THE FEATURED RAMEN";
//   updateDiv.appendChild(deleteBtn);
    let deleteBtn = document.querySelector("#delete-btn")
    console.log(deleteBtn)

  deleteBtn.addEventListener("click", () => {
    deleteCount++
    console.log(deleteCount)
    console.log("delete" + currentRamen.id)
    let nextRamen = document.querySelector(`#new-Ramen-${currentRamen.id+1}`)
    console.log(`show next ramen" + ${currentRamen.id+1}`)
    console.log(nextRamen)

    document.getElementById(`new-Ramen-${currentRamen.id}`).remove()
    fillImg.src=nextRamen.src
    // fillName.textContent=nextRamen.image
    // fillRest.textContent=nextRamen.image
    // fillRating.textContent=nextRamen.image
    // fillComment.textContent=nextRamen.image
    fetch(`http://localhost:3000/ramens/${currentRamen.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("didnt work");
        }
        console.log("data deleted success");
      })
      .catch((error) => {
        console.error("data not successfully deleted", error);
      });
    //location.reload()
  });
}

// function findRamenById (data,id) {
//     return data.find(item => item.id === id)
// }