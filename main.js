const searchBtn = document.getElementById('button-addon2');
const allMeals = document.getElementById('all-meals');
const details = document.getElementById('details');
const notAvailable = document.getElementById('not-available');

searchBtn.addEventListener('click', function () {
    console.log("object");
    const key = document.getElementById('search-text').value;
    loadData(key);
});
allMeals.addEventListener('click', function (e) {
    const singleMeal = e.target.parentNode;
    const mealClasses = singleMeal.className.split(" ");;
    const mealID = mealClasses[1];
    console.log(mealID);
    mealDetailsById(mealID);
});

const loadData = (key) => {
    allMeals.innerHTML = "";
    details.innerHTML = "";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.meals != null){
                ifNotAvailable('none');
                processAllData(data);
            }
            else{
                ifNotAvailable('block');
            }
        })
}

const processAllData = (data) => {
    const meals = data.meals;
    console.log(data);
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.className = `single-meal ${meal.idMeal}`;
        const innerHtml = `
                <img src="${meal.strMealThumb}" alt="" class="img-fluid">
                <h3 class="text-center">${meal.strMeal}</h3>
                `;
        div.innerHTML = innerHtml;
        allMeals.appendChild(div);
    });
}



const mealDetailsById = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            processSingleMealData(data);
        })
}

const processSingleMealData = (data) => {
    const mealDetails = data.meals[0];
    console.log(mealDetails);
    const { strMeal, strMealThumb } = mealDetails;
    console.log(strMeal, strMealThumb);
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const measure = `strMeasure${i}`;
        const item = `strIngredient${i}`;
        const str = mealDetails[measure];
        if (!str || !str.trim()) {
            break;
        };
        const element = `${mealDetails[measure]} ${mealDetails[item]}`;
        ingredients.push(element);
    }
    showDetails(ingredients, strMeal, strMealThumb);
}

const showDetails = (ingredients, name, imgUrl) => {
    details.innerHTML = "";
    const div = document.createElement('div');
    const html = `
    <img src="${imgUrl}" alt="" class="img-fluid">
    <h3>${name}</h3>
    <h4>Ingredients</h4>`;
    div.className = "center-align";
    div.innerHTML = html;
    const ul = document.createElement('ul');
    ingredients.forEach(element => {
        const li = document.createElement('li');
        li.innerText = element;
        ul.appendChild(li);
    });
    div.appendChild(ul);
    details.appendChild(div);
}

const ifNotAvailable = (type) => {
    notAvailable.style.display = type;
}