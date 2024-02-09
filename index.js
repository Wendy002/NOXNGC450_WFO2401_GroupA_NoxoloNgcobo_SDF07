// import from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// create database object
const appSettings = {
    databaseURL: "https://playground-225e6-default-rtdb.europe-west1.firebasedatabase.app/"
}

// initialize app and database from firebase

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInCart = ref(database, "cart") // creates reference

//grab elements from the html document by their ids
const inputSelectEl = document.getElementById("items")
const addButtonEl = document.getElementById("add-button")
const ulEl = document.getElementById("cart-list")


// This event listener waits for the button to be clicked 
// and adds the item entered in the text field and displays 
addButtonEl.addEventListener("click", function() {
    let inputValue = inputSelectEl.value
    push(itemsInCart,inputValue)
    //clearField() :replaced by form
})

//update database using onValue(databse, grabs snapshot/database elements)
onValue(itemsInCart, function(snapshot){
    if (snapshot.exists()){
        let itemsValues = Object.entries(snapshot.val())
    
        clearCartList() //clears items in list
        for (let i =0; i< itemsValues.length; i++){
            let currentItem = itemsValues[i]  
            let currentItemID = currentItem[0]   //grabs the item ID
            let currentItemValue = currentItem[1] // grabs the actual element
        
            appendItemToShoppingListEl(currentItem)
            }

    }else{
        ulEl.innerHTML = "Ooops!... no items yet"
    }
    
})
// clears cart everytime you start the program
function clearCartList(){
    ulEl.innerHTML = ""
}
// clears filedtext after entering item
//function clearField(){
//inputFormEl.value = ""
//}

function appendItemToShoppingListEl(item){
    // Replace innerHTML with createElement
   //ulEl.innerHTML += `<li>${itemValue}</li>` 
   let itemID = item[0]
   let itemValue = item[1]
   
   let newEl = document.createElement("li")
   newEl.textContent = itemValue
   
   // add event listener
   newEl.addEventListener("click", function(){
       let exactLocationOfItemInDB = ref(database, `cart/${itemID}`)
       newEl.remove(exactLocationOfItemInDB)
   })
   
   ulEl.append(newEl)
}




