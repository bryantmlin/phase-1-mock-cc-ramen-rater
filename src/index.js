// write your code here
document.addEventListener("DOMContentLoaded",function() {
    fetch("http://localhost:3000/ramens")
    .then(resp => resp.json())
    .then(data => {
        renderMenu(data)
        showDetails(data[0])
        addNewRamen()
    })
})

let currentRamen;
let menu = document.querySelector("#ramen-menu")

function renderMenu(menuObj) {
    console.log(menu)
    menuObj.forEach(ramen => {
        let img = document.createElement("img")
        img.src = ramen.image
        menu.appendChild(img)
        img.addEventListener("click",function(e) {
            e.preventDefault()
            currentRamen=ramen
            showDetails(currentRamen)

        })
        // "id": 1,
    //   "name": "Shoyu Ramen",
    //   "restaurant": "Nonono",
    //   "image": "./assets/ramen/shoyu.jpg",
    //   "rating": 7,
    //   "comment": "Delish.
    })
}

function showDetails(ramen) {
    let fillImg = document.querySelector(".detail-image")
    let fillName = document.querySelector(".name")
    let fillRest = document.querySelector(".restaurant")
    fillImg.src=ramen.image
    fillName.textContent = ramen.name 
    fillRest.textContent = ramen.restaurant

    let fillRating = document.querySelector("#rating-display")
    let fillComment = document.querySelector("#comment-display")
    fillRating.textContent = ramen.rating 
    fillComment.textContent = ramen.comment 
}

function addNewRamen() {
    let form = document.querySelector("#new-ramen")
    form.addEventListener("submit",(e) => {
        e.preventDefault()
        let name = document.querySelector("#new-name").value 
        let restaurant = document.querySelector("#new-restaurant").value
        let image = document.querySelector("#new-image").value
        let rating = document.querySelector("#new-rating").value
        let comment = document.querySelector("#new-comment").value

        let updatedRamen = {
            "name": name,
            "restaurant": restaurant,
            "image": image,
            "rating": rating,
            "comment": comment
        }
        fetch("http://localhost:3000/ramens", {
            method: "POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(updatedRamen)
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

        fetch("http://localhost:3000/ramens")
        .then(resp => resp.json())
        .then(data => {
            renderMenu(data)
        })
    })
    
}