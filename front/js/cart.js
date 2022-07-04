let cart__items = document.querySelector("#cart__items")
let totalQuantity = document.querySelector("#totalQuantity");
let totalPrice = document.querySelector("#totalPrice");

products = getCart()
sumQuantity = 0;
sumPrice = 0;
products.forEach((product) => {

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

		// addeventlistener sur les select quantité
		const itemQuantitys = document.querySelectorAll('.itemQuantity');
		itemQuantitys.forEach(itemQuantity => {
		  itemQuantity.addEventListener('change', event => {
		    actualisationValues()
		  });
		});

		// addeventlistener sur les btn delete
		const deleteItems = document.querySelectorAll('.deleteItem');
		deleteItems.forEach(deleteItem => {
		  deleteItem.addEventListener('click', event => {
		    deleteProduct(deleteItem)
		  });
		});
    });
    sumQuantity = sumQuantity + product.quantity
});
totalQuantity.innerText = sumQuantity;

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


// addeventlistener sur le btn order
let btn_order = document.querySelector("#order")
btn_order.addEventListener('click', event => {
  verificationValues()
  // actualisationLocalStorage()
});

// Actualisation du localStorage
function actualisationLocalStorage() {
  let cart = getCart();

  cart = cart.filter(p => p.id != product.id && p.color != product.color);
  saveCart(cart);
}

// verification des champs du contact
function verificationValues() {
	console.log('test')
	let firstName = document.querySelector("#firstName")
	let lastName = document.querySelector("#lastName")
	let address = document.querySelector("#address")
	let city = document.querySelector("#city")
	let email = document.querySelector("#email")

	// /[a-zA-Z\-a-zA-Z]+/gm
	let regex1 = new RegExp('/[a-zA-Z]+/gm')
	// verif email /\w*[@]\w*\.com/gm
	let regex2 = new RegExp('/\w*[@]\w*\.com/gm')
	let verif1 = false
	let verif2 = false
	let verif3 = false

	if (regex1.test(firstName.value) && regex1.test(lastName.value) && regex1.test(city.value)) {
		verif1 = true
	}

	if (regex2.test(email.value)) {
		verif2 = true
	}

	if (address.value != "") {
		verif3 = true
	}

	if (verif1 && verif2 && verif3) {
		console.log('verification OK!')
	}

	// si toutes les verif sont passées alors appeler la fonction order
}

// envoi des infos(contact + commande) a l'API + redirection vers confirmation page avec l'id commande récuperer via la method post
function order() {

}
