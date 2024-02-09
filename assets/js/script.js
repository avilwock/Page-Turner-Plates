var recSearch = document.querySelector('#query');

//Food recipe search API
var recipeURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recSearch.value}`

//Book Search API key npg4qc8fzyzb793s57jf4v2w -
var bookURL = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${recSearch.value}+cookbooks&api_key=npg4qc8fzyzb793s57jf4v2w
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
    fetch(`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${recSearch.value}+cookbooks&api_key=npg4qc8fzyzb793s57jf4v2w
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

//LOCAL STORAGE
function storedHistory() {
    var searchHistory;
    var searchQuery = document.getElementById()
}



// Function to display random recipe images in the footer
function RandomImages() {
    var footerImages = document.querySelector("#footer-images");

    footerImages.innerHTML = "";
    
    var displayedImages=[];

    var numberOfRecipes = 12; // can be changed later with sizing fixed. It seems fairly large now
    
    var requests = Array.from({ length: numberOfRecipes }, () =>
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(response => response.json())
    );

    Promise.all(requests)
        .then(dataArray => {
            dataArray.forEach(data => {
                var randomMeal = data.meals || [];

                var meal = randomMeal[0];
                var recipeImage = meal.strMealThumb;
                
                //added so that images aren't repeated in the footer
                if (!displayedImages.includes(recipeImage)) {
                    displayedImages.push(recipeImage);
                }

                // Create an image element
                var imgElement = document.createElement("img");
                imgElement.src = recipeImage;
                imgElement.alt = "Random Recipe Image";

                // Append the image to the footerImages container
                footerImages.appendChild(imgElement);
            });
        })
        .catch(error => console.error("Error fetching random recipes:", error));
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", RandomImages);
