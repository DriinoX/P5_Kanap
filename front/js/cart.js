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
		      <input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value='${product.quantity}' onchange='actualisationValues()'>
		    </div>
		    <div class='cart__item__content__settings__delete'>
		      <p class='deleteItem' onclick='deleteProduct(this)'>Supprimer</p>
		    </div>
		  </div>
		</div>`
		// ajout de l'article dans la div cart__items
		cart__items.appendChild(cart__item)
		displayTotalPrice(value.price, product.quantity)
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
	let totalPrice = document.querySelector("#totalPrice");
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
	console.log(article)
	product = {id: article.dataset.id, color: article.dataset.color}
	removeToCart(product)
	// location.href = window.location.href
}

function saveCart(cart) {
  localStorage.setItem("products", JSON.stringify(cart));
}

function getCart() {
  let cart = localStorage.getItem("products");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function removeToCart(product) {
  let cart = getCart();
  cart = cart.filter(p => p.id != product.id && p.color != product.color);
  saveCart();
}



// comment faire un addeventlistener sur tout les select et tout les btn delete ?
// les div ne sont pas visible par la js

