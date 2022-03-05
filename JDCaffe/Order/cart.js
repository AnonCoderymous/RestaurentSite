let cartItems = localStorage.getItem("Basket")
let productContainer = document.querySelector(".products")
let total = document.querySelector("span")
if(cartItems != undefined && productContainer){
	cartItems = JSON.parse(cartItems)
	Object.values(cartItems).map(item => {
		productContainer.innerHTML += `
			<div class='product'>
				<img src='../image/${item.tag}.jpg' alt='' />
				<span>${item.name}</span>
			</div>
			<div class='price'>${item.prize}</div>
			<div class='quant'>${item.inCart}</div>
		`
	})
	total.innerHTML = localStorage.totalCost
} else {
	productContainer.innerHTML = "<h1>Your Cart is Empty!</h1>"
}

document.querySelector("button").addEventListener("click", e => {
	e.preventDefault()
	if(cartItems == undefined){
		toastr.warning("Your cart is empty !", "Oops! Looks like you've missed something..")
		setTimeout(function(){
			window.location.href = "../../JDCaffe"
		},3000)
		return false
	}
	if(localStorage.isRegister == undefined){
		toastr.info("", "Please register to site, to place your order!")
		setTimeout(e => {
			window.location.href = "../Register"
		}, 3000)
		return false
	}
	const request = new XMLHttpRequest()
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200 && this.responseText != ""){
			if(this.responseText == "Success"){
				setTimeout(function(){
					toastr.success("Your order is placed Successfully. You will be redirected to the site shortly !", "Thank you for shopping with Us !")
				}, 2000)
			}
		} else if(this.responseText == "Failed")
			toastr.warning("Failed to place the order !", "Error Occured !")
	}
	request.open("POST", "order.php", async=true)
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
	request.send("OrderItems="+JSON.stringify(cartItems))
	localStorage.clear()
	setTimeout(function(){
		window.location.href = "../../JDCaffe"
	},5000)
})
document.querySelector(".totop").addEventListener("click", e => {
	e.preventDefault()
	if(document.documentElement.scrollTop != 0 || document.body.scrollTop != 0)
		document.documentElement.scrollTop = 0
	else
		console.log("Already at the top !")
})