# Page-Turner-Plates

## Your Task

As a developer our job is to pull data from two APIs, the mealdb, and Penguin Random House to build a recipe repository that pulls information from both APIs and populates them on the page.

## User Story
```
AS people who enjoys food
WE WANT to see recipes for food that we are interested in making
SO THAT we can plan and cook a delicious meal

```

## Acceptance Criteria

```
GIVEN a recipe website with a search input form
WHEN we search for a specific main ingredient
THEN we are presented with recipes that contain that ingredient, and book recommendations that have recipes related to that ingredient
WHEN we find a recipe we like
THEN we can save it to a favorite section to find later
WHEN we have a search result with more than the five entries
THEN more are populated and displayed in a modal that appears on the screen.
WHEN we click on the picture for a recipe
THEN the page is opened to the website containing that recipe
WHEN we click the title of the book
THEN we are taken to the Penguin Random House website to purchase it
WHEN we click to add a recipe to favorites
THEN they are turned into buttons and saved as an array in local storage

```

## Description and Future Implementations

This project was created to pull recipe and book information from the mealdb API and the Penguin Random House api. 

A search box is presented on the left of the page where a search term can be entered. Data from that search term populates the corresponding recipe and cookbook sections of the page. The first five recipes are displayed more prominently than the rest, with pictures displaying the recipe.

Information within these sections is generated dynamically using Javascript to populate each section.

The bottom of the screen has a footer image that is used to display randomized images of some of the recipes found in the website.

Within the first five recipes generated, a favorites button can be clicked to store the selected recipes into local storage as buttons. When clicked, these buttons open to the website for the recipe.

This project has room for improvements, including:
* In the future, we will have a book cover pull in the cookbook section.
* We would also like the search results to populate on a separate page
* Currently, the favorites buttons are only applicable to recipes that populate within the main search box. In the future, adding a favorites button to the modal will be implemented.
* Before any search terms are run, the page is fairly plain. We will add placeholder images in the sections for the recipes and cookbooks

## Access

To access this site, please visit: https://avilwock.github.io/Page-Turner-Plates/

## Usage

To use this document, type the main recipe ingredient into the search box on the left and click the search button. Up to five recipes, and three cookbooks will populate within their sections.To save a recipe, click add to favorites, and it will be stored in an array within local storage and populated on the right side of the screen. If the favorite section contains too many recipes, a scroll bar will appear.

Image

## Credits

With thanks to:

https://www.w3schools.com/css/css3_shadows_box.asp

https://bulma.io/documentation/

https://www.w3schools.com/howto/howto_css_modals.asp

https://www.themealdb.com/api.php

https://www.penguinrandomhouse.biz/webservices/rest/

Xpert Learning Assistant

Logan Garland, Coding Bootcamp, University of Irvine California

## License

MIT License