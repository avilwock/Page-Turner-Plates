var recSearch = document.querySelector('#query');
// API food Key = dfc30cdf3a8c48e292b7870da115a1ce
var recipeURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=dfc30cdf3a8c48e292b7870da115a1ce&query=${recSearch.value}`

//book API key npg4qc8fzyzb793s57jf4v2w - Key not active yet. 
var bookURL = `https://reststop.randomhouse.com/resources/titles?start=0&max=4&expandLevel=0&onsaleStart=MM/dd/yyyy&onsaleEnd=MM/dd/yyyy&authorid=0&workid=0&keyword=Grisham%20Christmas`


function searchbtn(event) {
    event.preventDefault();
    fetch(recipeURL)
    .then(res => res.json())
    .then(recList => {
        console.log(recList)
        console.log(recSearch.value)
    })
}

var searchButton = document.querySelector("#fetch-button");

searchButton.addEventListener("click", searchbtn);