let cart__items = document.querySelector("#cart__items")
let totalQuantity = document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("#totalPrice");

products = getCart()
sumQuantity = 0;
sumPrice = 0;

// find avec tout les produit avec les present dans le panier pour les ajouter
// products.forEach((product) => {

//   fetch("http://localhost:3000/api/products/" + product.id)
//     .then(function(res) {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     .then(function(value) {
//     	imageUrl = value.imageUrl
// 		let cart__item = document.createElement("article");
// 		cart__item.setAttribute('data-id',product.id);
// 		cart__item.setAttribute('data-color',product.color);
// 		cart__item.setAttribute('class','cart__item');
// 		cart__item.innerHTML = `
// 		<div class='cart__item__img'>
// 		  <img src='${value.imageUrl}' alt='Photographie d'un canapé'>
// 		</div>
// 		<div class='cart__item__content'>
// 		  <div class='cart__item__content__description'>
// 		    <h2>${product.title}</h2>
// 		    <p>${product.color}</p>
// 		    <p>${value.price} €</p>
// 		  </div>
// 		  <div class='cart__item__content__settings'>
// 		    <div class='cart__item__content__settings__quantity'>
// 		      <p>Qté : </p>
// 		      <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value='${product.quantity}'>
// 		    </div>
// 		    <div class='cart__item__content__settings__delete'>
// 		      <p class='deleteItem'>Supprimer</p>
// 		    </div>
// 		  </div>
// 		</div>`
// 		// ajout de l'article dans la div cart__items
// 		cart__items.appendChild(cart__item)
// 		displayTotalPrice(value.price, product.quantity)

// 		// addeventlistener sur les select quantité
// 		const itemQuantitys = document.querySelectorAll('.itemQuantity');
// 		itemQuantitys.forEach(itemQuantity => {
// 		  itemQuantity.addEventListener('change', event => {
// 		    actualisationValues()
// 		  });
// 		});

// 		// addeventlistener sur les btn delete
// 		let deleteItems = document.querySelectorAll('.deleteItem');
// 		for (var i = 0; i < deleteItems.length; i++) {
// 			// deleteItems = document.querySelectorAll('.deleteItem');
// 			deleteItems[i].addEventListener('click', event => {
// 		    	deleteProduct(deleteItems[i])
// 		  });
// 		}
//     });
//     sumQuantity = sumQuantity + product.quantity
// });
// totalQuantity.innerText = sumQuantity;

fetch("http://localhost:3000/api/products")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(values) {
	products = getCart()
	let id_array = []
	values.forEach((value) => {
		id_array += value._id
	});
	products.forEach((product, index) => {
		if (id_array.includes(product.id)) {
			fetch("http://localhost:3000/api/products/" + product.id)
			    .then(function(res) {
			      if (res.ok) {
			        return res.json();
			      }
			    })
			    .then(function(value) {
			    	imageUrl = value.imageUrl
					let cart__item = document.createElement("article");
					cart__item.setAttribute('data-id',product.id);
					cart__item.setAttribute('data-color',product.color);
					cart__item.setAttribute('class','cart__item');
					cart__item.innerHTML = `
					<div class='cart__item__img'>
					  <img src='${value.imageUrl}' alt='Photographie d'un canapé'>
					</div>
					<div class='cart__item__content'>
					  <div class='cart__item__content__description'>
					    <h2>${product.title}</h2>
					    <p>${product.color}</p>
					    <p>${value.price} €</p>
					  </div>
					  <div class='cart__item__content__settings'>
					    <div class='cart__item__content__settings__quantity'>
					      <p>Qté : </p>
					      <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value='${product.quantity}'>
					    </div>
					    <div class='cart__item__content__settings__delete'>
					      <p class='deleteItem'>Supprimer</p>
					    </div>
					  </div>
					</div>`
					// ajout de l'article dans la div cart__items
					cart__items.appendChild(cart__item)
					displayTotalPrice(value.price, product.quantity)

					const itemQuantitys = document.querySelectorAll('.itemQuantity');
					itemQuantitys[index].addEventListener('change', event => {
					    actualisationValues()
					});

					// addeventlistener sur les btn delete
					let deleteItems = document.querySelectorAll('.deleteItem');
					deleteItems[index].addEventListener('click', event => {
				    	deleteProduct(deleteItems[index])
				  	});
			    })
		}
	});
});


function displayTotalPrice(valuePrice, productQuantity) {
    sumPrice = sumPrice + valuePrice * productQuantity
	totalPrice.innerText = sumPrice;
    return sumPrice;
}

function actualisationValues() {
	// Calcul du total (récuperation de tout les prix)
	let totalQuantity = document.querySelector("#totalQuantity");
	let selectQuantitys = document.querySelectorAll(".itemQuantity")
	sumQuantity = 0;
	sumPrice = 0;
	selectQuantitys.forEach((selectQuantity) => {
		article = selectQuantity.parentNode.parentNode.parentNode.parentNode
		let id = article.dataset.id

		  fetch("http://localhost:3000/api/products/" + id)
		    .then(function(res) {
		      if (res.ok) {
		        return res.json();
		      }
		    })
		    .then(function(value) {
		    	displayTotalPrice(value.price, selectQuantity.value)
		    });

		sumQuantity = sumQuantity + parseInt(selectQuantity.value)
	})
	totalQuantity.innerText = sumQuantity
}

function deleteProduct(element) {
	article = element.parentNode.parentNode.parentNode.parentNode
	product = {id: article.dataset.id, color: article.dataset.color}
	removeToCart(product)
	location.href = window.location.href
}

function saveCart(cart) {
  localStorage.setItem("products", JSON.stringify(cart));
}

function getCart() {
  let cart = localStorage.getItem("products");
  if (cart == null || cart == 'undefined') {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function removeToCart(product) {
  let cart = getCart();
  cart = cart.filter(p => p.id != product.id && p.color != product.color);
  saveCart(cart);
}

// Actualisation du localStorage
function actualisationLocalStorage() {
  let cart = getCart();

  cart = cart.filter(p => p.id != product.id && p.color != product.color);
  saveCart(cart);
}

// verification des champs du contact
	// pas de chiffre dans ces champs
let firstName = document.querySelector('#firstName');
let lastName = document.querySelector('#lastName');
let city = document.querySelector('#city');
firstName.addEventListener('change', event => {
	verificationNoNumber(firstName)
});
lastName.addEventListener('change', event => {
	verificationNoNumber(lastName)
});
city.addEventListener('change', event => {
	verificationNoNumber(city)
});
	// pas de restriction sur l'addresse
let address = document.querySelector('#address');
address.addEventListener('change', event => {
	verificationAddress(address)
});
	// verification format de l'adresse mail
let email = document.querySelector('#email');
email.addEventListener('change', event => {
	verificationEmail(email)
});

function verificationNoNumber(element) {
	let regex1 = /\d+/
	let message = document.querySelector("#" + element.id + "ErrorMsg")
	if (element.value != "") {
		if (regex1.test(element.value)) {
			message.innerText = "Ce champs ne doit pas contenir de chiffre !"
		} else {
			message.innerText = ""
		}
	} else {
		message.innerText = "Ce champs ne doit pas etre vide !"
	}
}

function verificationAddress(element) {
	let message = document.querySelector("#" + element.id + "ErrorMsg")
	if (element.value != "") {
		message.innerText = ""
	} else {
		message.innerText = "Ce champs ne doit pas etre vide !"
	}
}

function verificationEmail(element) {
	let regex1 = /\w*[@]\w*\.com/
	let message = document.querySelector("#" + element.id + "ErrorMsg")
	if (element.value != "") {
		if (!regex1.test(element.value)) {
			message.innerText = "Ce champs doit avoir le format d'une adresse mail !"
		} else {
			message.innerText = ""
		}
	} else {
		message.innerText = "Ce champs ne doit pas etre vide !"
	}
}

// addeventlistener sur le btn order
let btn_order = document.querySelector("#order")
btn_order.addEventListener('click', event => {
    let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg")
  	let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg")
  	let cityErrorMsg = document.querySelector("#cityErrorMsg")
  	let addressErrorMsg = document.querySelector("#addressErrorMsg")
  	let emailErrorMsg = document.querySelector("#emailErrorMsg")
  	if (firstNameErrorMsg.innerText == "" && lastNameErrorMsg.innerText == "" && cityErrorMsg.innerText == "" && addressErrorMsg.innerText == "" && emailErrorMsg.innerText == "" && emailErrorMsg.innerText == "") {
  		// post la commande puis redirection avec le numero de commande du resultat
  		order()
  	} else {
  		console.log("not order")
  		// location.href = window.location.href
  	}
});

// envoi des infos(contact + commande) a l'API + redirection vers confirmation page avec l'id commande récuperer via la method post
function order() {
	let firstName = document.querySelector("#firstName")
	let lastName = document.querySelector("#lastName")
	let city = document.querySelector("#city")
	let address = document.querySelector("#address")
	let email = document.querySelector("#email")

	contact = {firstName: firstName.value, lastName: lastName.value, address: address.value, city: city.value, email: email.value}
	console.log(contact)
	products = getCart()
	jsonBody = [contact, products]
	fetch("http://localhost:3000/api/products/order", {
		method: "POST",
		headers: { 
	'Accept': 'application/json', 
	'Content-Type': 'application/json' 
	},
		body: JSON.stringify(jsonBody)
	});
}
