var recSearch = document.querySelector('#query');

//Food recipe search API
var recipeURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recSearch.value}`

//Book Search API key npg4qc8fzyzb793s57jf4v2w -
var bookURL = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${recSearch.value}&api_key=npg4qc8fzyzb793s57jf4v2w
`

// Fetch function to pull recipes from API
function searchbtn(event) {
    event.preventDefault();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recSearch.value}`)
        .then(res => res.json())
        .then(recList => {
            console.log(recList)
            console.log(recSearch.value)
        })
}

// Fetch Funtion to pull books from API
function bookSearch(event) {
    event.preventDefault();
    fetch(`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${recSearch.value}&api_key=npg4qc8fzyzb793s57jf4v2w
    `)
    
        .then(res => res.json())
        .then(bookList => {
            console.log(bookList)
            console.log(recSearch.value)
        })
}
var searchButton = document.querySelector("#fetch-button");

searchButton.addEventListener("click", bookSearch);
searchButton.addEventListener("click", searchbtn);