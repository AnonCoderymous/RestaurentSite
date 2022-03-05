//hover effects on the clear Cart button
$(document).ready(function(){
  $("#clearbtn").hover(function(){
    $(this).css("text-decoration", "underline");
    }, function(){
    $(this).css("text-decoration", "none");
  });
});

//Clears the Cart (localStorage Items)
$(document).ready(function(){
	$("#clearbtn").click(function(){
		if(localStorage.length == 0 ){
			toastr.info("Cart is empty!", "")
			return false
		}
		localStorage.clear()
		window.reload()
	})
})

//Total items
const Items = [
		{tag : "crispyburger",name : "Crispy Chicken Burger",prize : 85,inCart : 0},
		{tag : "vegburger",name : "Veg Burger",prize : 60,inCart : 0},
		{tag : "cheeseburger",name : "Cheese Burger",prize : 75,inCart : 0},
		{tag : "cheeseshawarma",name : "Chicken Shawarma",prize : 50,inCart : 0},
		{tag : "cheeseshawarma",name : "Cheese Shawarma",prize : 70,inCart : 0},
		{tag : "paneershawarma",name : "Panner Shawarma",prize : 60,inCart : 0},
		{tag : "chickencheesepizza",name : "Chicken Cheese Pizza",prize : 130,inCart : 0},
		{tag : "chickenroyalpizza",name : "Chicken Royal Pizza",prize : 150,inCart : 0},
		{tag : "paneerpizza",name : "Panner Pizza",prize : 130,inCart : 0},
		{tag : "vegpizza",name : "Veg Pizza",prize : 110,inCart : 0},
		{tag : "frenchfries",name : "French Fries Pizza",prize : 50,inCart : 0},
		{tag : "periperifries",name : "Peri Peri Fries",prize : 70,inCart : 0},
		{tag : "mayofries",name : "Mayo Fries",prize : 60,inCart : 0},
		{tag : "cheesefries",name : "Cheese Fries",prize : 70,inCart : 0},
		{tag : "chickenuggets",name : "Chicken Nuggets",prize : 150,inCart : 0},
		{tag : "chickenstrips",name : "Chicken Strips",prize : 170,inCart : 0},
		{tag : "chickendrum",name : "Chicken Drum",prize : 250,inCart : 0},
		{tag : "chickenbucket",name : "Chicken Bucket",prize : 380,inCart : 0},
		{tag : "chickenbiryani",name : "Chicken Biryani",prize : 100,inCart : 0},
		{tag : "chickenseekh",name : "Chicken Seekh",prize : 70,inCart : 0},
		{tag : "chickenbhuna",name : "Chicken Bhuna",prize : 80,inCart : 0},
		{tag : "paratha",name : "Paratha",prize : 10,inCart : 0},
		{tag : "coldrinks",name : "Cold Drinks",prize : 20,inCart : 0},
		{tag : "water",name : "Water",prize : 20,inCart : 0},
	]

//scroll to top function
document.querySelector(".totop").addEventListener("click", e => {
	e.preventDefault()
	if(document.documentElement.scrollTop != 0 || document.body.scrollTop != 0)
		document.documentElement.scrollTop = 0
	else
		console.log("Already at the top !")
})

//add to cart button Event Listeners
let btNs = document.querySelectorAll("button")
for(let i=0; i<btNs.length; i++ ){
	btNs[i].addEventListener("click", e => {
		e.preventDefault()
		if(totalCartItems() == true){
			toastr.success('Item added to cart', null);
			setItems(Items[i])
			totalCost(Items[i])
		}
	})
}

//add to cart function
function setItems(product){
	let cartItems = localStorage.getItem("Basket")
	cartItems = JSON.parse(cartItems)
	if(cartItems != null){
		if(cartItems[product.tag] == undefined){
			cartItems = {
				...cartItems,
				[product.tag] : product
			}
		}
		cartItems[product.tag].inCart += 1
	} else {
		product.inCart = 1
		cartItems = {
			[product.tag] : product
		}
	}
	localStorage.setItem("Basket", JSON.stringify(cartItems))
}

//Calculate the totalCost
function totalCost(product){
	let totalCost = localStorage.getItem("totalCost")
	if(totalCost != null){
		totalCost = parseInt(totalCost)
		localStorage.setItem("totalCost", parseInt(product.prize) + totalCost)
	} else {
		localStorage.setItem("totalCost", parseInt(product.prize))
	}
}

//Total Items in cart
function totalCartItems(){
	let totalItems = localStorage.getItem("totalItems")
	if(totalItems == undefined){
		totalItems = parseInt(totalItems)
		localStorage.setItem("totalItems", 1)
	} else {
		totalItems = parseInt(totalItems)
		if(totalItems > 6){
			toastr.warning("Can't add more items to cart!", "Oops!");
			return false
		}
		localStorage.setItem("totalItems", totalItems + 1)
	}
	return true
}