var recSearch = document.querySelector('#query');

//Food recipe search API
var recipeURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recSearch.value}`

//Book Search API key npg4qc8fzyzb793s57jf4v2w -
var bookURL = `https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${recSearch.value}+cookbooks&api_key=npg4qc8fzyzb793s57jf4v2w`

function saveRecipe(evt) {
    linkID = (evt.target.parentElement.children[0].id);
    recipeName = (evt.target.parentElement.children[1].innerHTML);
    console.log(recipeName)
    recipeURL = (document.getElementById(linkID).getAttribute('href'))
    console.log("Recipe URL:", recipeURL);
    // Retrieve existing saved recipes from localStorage
    var savedRecipesArray = localStorage.getItem('saved');

 feature-fixmodal
    // Use logical OR to default to an empty array if savedRecipesRaw is falsy
    var savedRecipes = JSON.parse(savedRecipesArray) || [];

    // Ensure savedRecipes is an array
    if (!Array.isArray(savedRecipes)) {
        savedRecipes = [];

        //Check if the recipe is not in the array, add it
    if (existingRecipeIndex === -1) {
        // Create a new recipe object
        var recipeToSave = { 'RecipeName': recipeName, 'RecipeLink': recipeURL };

        // Push the new recipe to the array
        savedRecipes.push(recipeToSave);

        // Store the updated array back in localStorage
        localStorage.setItem('saved', JSON.stringify(savedRecipes));
    } else {
        console.log("Recipe already saved!");
    }
    }

    // Check if the recipe is already in the array
    var existingRecipeIndex = savedRecipes.findIndex(r => r.RecipeName === recipeName);

    // If the recipe is not in the array, add it
    if (existingRecipeIndex === -1) {
        // Create a new recipe object
        var recipeToSave = { 'RecipeName': recipeName, 'RecipeLink': recipeURL };

        // Push the new recipe to the array
        savedRecipes.push(recipeToSave);

        // Store the updated array back in localStorage
        localStorage.setItem('saved', JSON.stringify(savedRecipes));
    } else {
        console.log("Recipe already saved!");
    }
}

function displayRecipes() {
    var savedRecipesRaw = localStorage.getItem('saved');
    var savedRecipes = JSON.parse(savedRecipesRaw) || [];
    var favoriteStorage = document.getElementById('favorite-storage');

    favoriteStorage.innerHTML = '';

    savedRecipes.forEach(function (recipe, index) {
        console.log("Recipe:", recipe); // Log the entire recipe object
        var favoritesButton = document.createElement('button');
        favoritesButton.textContent = recipe.RecipeName;
        favoritesButton.addEventListener("click", function () {
            console.log("Button clicked for recipe:", recipe.RecipeName);

            // Log the URL before navigating
            console.log("Recipe URL:", recipe.RecipeLink);

            // Check if the URL is present and not undefined
            if (recipe.RecipeLink) {
                // Navigate to the recipe URL in the same tab
                window.open(recipe.RecipeLink, '_blank');
            } else {
                console.error("Recipe URL is undefined or not present for recipe:", recipe.RecipeName);
                // Optionally, you can open a new tab or handle this situation differently
            }
        });
        favoriteStorage.appendChild(favoritesButton);
    });
}

// Call the displayRecipes function to initially populate the buttons
displayRecipes();

// Fetch function to pull recipes from API
function searchbtn(event) {
    event.preventDefault();

    if (recSearch.value.trim() === '') {
        console.log("Please enter a search query");
        return;
    }

    closeModal();

    for (let i = 0; i < 5; i++) {
        // document.querySelector('#recPic-' + i).setAttribute('src', '');
        // document.querySelector('#recWebsite-' + i).setAttribute('href', '');
        // document.querySelector('#recName-' + i).textContent = '';
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recSearch.value}`)
        .then(res => res.json())
        .then(recList => {
            console.log(recList)
            console.log(recSearch.value)

            var totalResults = recList.meals.length;
            var maxResults = 20;
            var moreRecipes = document.querySelector('#modal span');

            if (totalResults <= 5) {
                closeModal();
            }

            if (totalResults > maxResults) {
                var searchLink = 2;
                moreRecipes.innerHTML = " ";
                moreRecipes.setAttribute("data-href", `https://www.themealdb.com/api/json/v1/1/search.php?s=${recSearch.value}&page=${searchLink}`);
            } else {
                moreRecipes.innerHTML = "";
                moreRecipes.removeAttribute("data-href");
            }

            if (totalResults > maxResults) {
                openModal();
            }

            var modalContent = document.querySelector('.modal-contact p span');
            modalContent.innerHTML = "";

            for (let i = 6; i < Math.min(totalResults, maxResults); i++) {
                var linkElement = document.createElement("a");
                linkElement.href = recList.meals[i].strSource;
                linkElement.textContent = recList.meals[i].strMeal;

                modalContent.appendChild(linkElement);
                modalContent.appendChild(document.createElement("br"));
            }

            var recipeSection = document.getElementById('recipes')
            recipeSection.innerHTML = ""

            // for loop for recipe data
            for (let i = 0; i < 5; i++) {
                if (recList.meals[i].strSource.trim() !== '') {

                    recipeDiv = document.createElement('div')
                    recipeLink = document.createElement('a')
                    recipeName = document.createElement('p')
                    recipeFave = document.createElement('button')
                    recipeImg = document.createElement('img')

                    recipeFave.addEventListener('click', saveRecipe)
                    recipeFave.textContent = "Add to Favorites"
                    recipeName.setAttribute('id', `recName-${i}`)
                    recipeImg.setAttribute('id', `recpic-${i}`)
                    recipeLink.setAttribute('id', `recWebsite-${i}`)

                    recipeName.textContent = recList.meals[i].strMeal;
                    recipeImg.setAttribute('src', recList.meals[i].strMealThumb);
                    recipeLink.setAttribute('href', recList.meals[i].strSource);

                    recipeLink.appendChild(recipeImg)
                    recipeDiv.appendChild(recipeLink)
                    recipeDiv.appendChild(recipeName)
                    recipeDiv.appendChild(recipeFave)
                    recipeSection.appendChild(recipeDiv)


                    // document.querySelector('#recName-' + i).textContent = recList.meals[i].strMeal;
                    // document.querySelector('#recPic-' + i).setAttribute('src', recList.meals[i].strMealThumb);
                    // document.querySelector('#recWebsite-' + i).setAttribute('href', recList.meals[i].strSource);
                }

            }

        })
}


// Fetch Funtion to pull books from API
function bookSearch(event) {
    event.preventDefault();
    fetch(`https://api.penguinrandomhouse.com/resources/v2/title/domains/PRH.US/search?q=${recSearch.value}+cookbooks&api_key=npg4qc8fzyzb793s57jf4v2w`)
        .then(res => res.json())
        .then(bookList => {
            console.log(bookList)
            console.log(recSearch.value)

            var bookSection = document.getElementById('books')
            bookSection.innerHTML = ""

            let results = bookList.data.results.filter((result) => result.author != null)

            for (let i = 0; i < 3; i++) {
                

                bookDiv = document.createElement('div')
                bookLink = document.createElement('a')
                bookName = document.createElement('p')
                bookImg = document.createElement('img')
                bookAuth = document.createElement('p')

                bookName.setAttribute('id', `bookName-${i}`)
                bookLink.setAttribute('id', `bookWebsite-${i}`)
                bookAuth.setAttribute('id', `bookAuthor-${i}`)

                bookName.textContent = results[i].name;
            let authorSubstring = results[i].author[0].split("|").slice(-1)
                bookAuth.textContent = authorSubstring
                bookLink.setAttribute('href', "https://www.penguinrandomhouse.com/" + results[i].url);

                bookLink.appendChild(bookName)
                bookDiv.appendChild(bookLink)
                bookDiv.appendChild(bookAuth)
                bookSection.appendChild(bookDiv)




                // document.querySelector('#bookName-' + i).textContent = bookList.data.results[i].name;
                // document.querySelector('#bookAuthor-' + i).textContent = bookList.data.results[i].author[0];
                // document.querySelector('#bookWebsite-' + i).setAttribute('href', "https://www.penguinrandomhouse.com/" + bookList.data.results[i].url);
            }
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

    var displayedImages = [];

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


var modal = document.getElementById("modal");
var openModalButton = document.getElementById("fetch-button");
var closeButton = document.getElementById("close")

function openModal() {

    document.querySelector('#modal span').addEventListener('click', function () {
        var pageLink = this.getAttribute('data-href');
        if (pageLink) {
            searchbtn(new Event('click'), parseInt(pageLink.match(/page=(\d+)/)[1]));
        }
    });
    var moreRecipes = document.getElementById("more-recipes");

    if (moreRecipes.innerHTML === '') {
        moreRecipes.style.display = "none";
    } else {
        moreRecipes.style.display = 'block';
    }

    var modalContent = document.querySelector('.modal-contact p span');
    modalContent.innerHTML = moreRecipes.innerHTML;

    if (moreRecipes.style.display !== "none") {
        modal.style.display = "block";


    } else {
        modal.style.display = "none";
    }
}

function closeModal() {
    modal.style.display = "none";
}

openModalButton.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal)


//Define Favorites button
//var favoritesButton = document.querySelector('#favorites')
//favoritesButton.addEventListener('click', saveRecipe)