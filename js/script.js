import { items } from "./items.js";
import { allFoodList } from "./allFoodList.js";
const textArea = document.getElementById("textArea");
const suggestBox = document.getElementById("suggest");
const ul = document.querySelector('.availableItems');
const addBtn = document.querySelector(".submit-btn__text");
const foodsListBtn = document.querySelector(".foodsList");
const foodSection = document.querySelector(".foodSection");
const foodsManagment = document.querySelector(".foodsManagment");
let myItem = []







//functions
//suggest
const itemFinder = () => {
    const words = textArea.value.split(/\s+/);
    const lastTwoWords = words.slice(-2).join(" ").trim().toLowerCase(); // ?
    const matches = items.filter(item =>
        item.toLowerCase().startsWith(lastTwoWords) // ?
    );
    if (textArea.value.length >= 2) {
        suggestBox.innerHTML = matches.map(item => `<div class="suggestDiv"><span class="itemDiv">${item}</span></div>`).join('');


        const suggestDiv = document.querySelectorAll(".suggestDiv")
        suggestDiv.forEach(div => {
            div.addEventListener("click", () => addToUl(div.textContent));
        })
    } else if (textArea.value.length <= 2) {
        suggestBox.innerHTML = "";
    }
}

const addToUl = (item) => {
    if (myItem.includes(item)) {
        textArea.value = "";
        suggestBox.innerHTML = "";
        alert("این مورد قبلا اضافه شده ");
        return
    }
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف🗑️";
    deleteBtn.className = "btn3"
    deleteBtn.addEventListener("click", deleteHandler)
    myItem.push(item)
    li.textContent = item;
    ul.appendChild(li);
    li.appendChild(deleteBtn)
    suggestBox.innerHTML = "";
    textArea.value = "";
}
//delete li
const deleteHandler = (event) => {
    const li = event.target.parentElement;
    const itemText = li.firstChild.textContent;


    li.remove();

    myItem = myItem.filter(item => item !== itemText);


}

//addBtn
const adder = () => {

    const itemInTextArea = textArea.value;
    if (itemInTextArea === "") {
        suggestBox.innerHTML = "";
        textArea.value = "";
        return
    } else if (myItem.includes(itemInTextArea)) {
        suggestBox.innerHTML = "";
        textArea.value = "";
        alert("این مورد قبلا اضافه شده ");

        return
    }

    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف🗑️";
    deleteBtn.className = "btn3"
    deleteBtn.addEventListener("click", deleteHandler)
    myItem.push(itemInTextArea)
    li.textContent = itemInTextArea;
    ul.appendChild(li);
    li.appendChild(deleteBtn)
    suggestBox.innerHTML = "";
    textArea.value = "";




}
//Show available food
const foodList = () => {
    const acceptedFood = allFoodList.filter(food => {

        const totalIngredients = food.ingredients.length;
        const availableIngredients = food.ingredients.filter(ingredient => myItem.includes(ingredient)).length//؟
        const percentage = availableIngredients / totalIngredients;
        return percentage >= 0.75;

    });

    foodSection.innerHTML =  acceptedFood.map(food => `<div class="boxInFoodSection"><h1 class="hInFoodSection">اسم غذا :  </h1> <span class="foodName">${food.name} </span><br/> <h2 class="h2InFoodSection">مواد مورد نیاز : </h2> <span class="ingredientsFoodName"> ${food.ingredients}</span></div>`).join('');
    foodSection.classList.remove("hidder");
}
// manage food
const mangeFood = () => {


    foodSection.innerHTML = allFoodList.map(food => `<div class="boxInFoodSection"><h1 class="hInFoodSection">اسم غذا :  </h1> <span class="foodName">${food.name} </span><br/> <h2 class="h2InFoodSection">مواد مورد نیاز : </h2> <span class="ingredientsFoodName"> ${food.ingredients}</span></div>`)

    foodSection.classList.remove("hidder");

}




// events
addBtn.addEventListener("click", adder);
textArea.addEventListener("input", itemFinder);
foodsListBtn.addEventListener("click", foodList);
foodsManagment.addEventListener("click", mangeFood)