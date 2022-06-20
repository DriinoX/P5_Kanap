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
	    sumPrice = sumPrice + (parseInt(value.price) * product.quantity)
    });
    sumQuantity = sumQuantity + product.quantity
    // mettre value.price pas product.price
    console.log(product.price)
    // getTotal()
});
totalQuantity.innerText = sumQuantity;
totalPrice.innerText = sumPrice;

function getCart() {
  let cart = localStorage.getItem("products");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

function getTotal() {
	// Calcul du total (récuperation de tout les prix et multiplication par leur quantité)
	let totalQuantity = document.querySelector("#totalQuantity");
	let totalPrice = document.querySelector("#totalPrice");

}







