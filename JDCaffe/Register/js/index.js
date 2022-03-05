let inputs = document.querySelectorAll("input")
let button = document.querySelectorAll("input")[2]
let cartItems = localStorage.getItem("Basket")
let totalCost = localStorage.getItem("totalCost")
txtArea = document.querySelector("textarea").value
button.addEventListener("click", e => {
	e.preventDefault()
	txtArea = document.querySelector("textarea").value
	for(i=0; i<inputs.length-1; i++ ){
		if(inputs[i].value == "" || txtArea == ""){
			//window.alert("Empty Field!")
			toastr.warning("", "Please fill all the feilds !")
			return false
		}
	}

	//send request through XMLHttpRequest Method to the server
	const r = new XMLHttpRequest()
	r.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			if(this.responseText == "Success"){
				localStorage.clear()
				toastr.success("Your order has been placed Successfully !", "Thank you for visiting !")
				setTimeout(function(){
					window.location.href = "../../JDCaffe"
				},3000)
			} else {
				toastr.warning("", "An Error Occured. Please try again later..!")
				return false
			}
		}
	}
	r.open("POST", "php/index.php", async=true)
	r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
	r.send("name="+inputs[0].value+"&number="+inputs[1].value+"&address="+document.querySelector("textarea").value+"&btn=btn"+"&OrderItems="+JSON.stringify(cartItems)+"&totalCost="+parseInt(totalCost))
})