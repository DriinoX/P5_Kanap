id = window.location.href.split('id=')[1]
let color = document.querySelector("#colors");
let quantity = document.querySelector("#quantity");


fetch("http://localhost:3000/api/products/" + id)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    // ajout des informations produit avec l'API
    let item_img = document.querySelector(".item__img");
    let img = document.createElement("img");
    let title = document.querySelector("#title");
    let price = document.querySelector("#price");
    let description = document.querySelector("#description");
    item_img.appendChild(img);
    img.setAttribute('src',value.imageUrl);
    img.setAttribute('alt', value.altTxt);
    title.innerText = value.name;
    price.innerText = value.price;
    description.innerText = value.description;
    for (let i = 0; i < value.colors.length; i++) {
    	let option = document.createElement("option");
    	option.setAttribute('value', value.colors[i]);
    	option.innerText = value.colors[i];
	    color.appendChild(option);
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });

// Ajout du produit dans le panier ou création du panier si inexistant
let btn_add = document.querySelector("#addToCart")
btn_add.addEventListener("click", createProduct);
function createProduct() {
  let title = document.querySelector("#title").innerText
  let description = document.querySelector("#description").innerText
  let color = document.querySelector("#colors").value
  let quantity = document.querySelector("#quantity").value
  let product = {id: id, title: title, description: description, color: color, quantity: parseInt(quantity)}
  let cart = localStorage.getItem("products");
  if (product.color != "" && product.quantity > 0) {
    if (cart == null) {
      saveCart([product])
    } else {
      addToCart(product)
    }
  }
  location.href = window.location.href.split("product")[0] + "cart.html"
}

// Enregistrement du panier dans le LocalStorage
function saveCart(cart) {
  localStorage.setItem("products", JSON.stringify(cart));
}

// Récuperation du panier via le LocaleStorage
function getCart() {
  let cart = localStorage.getItem("products");
  if (cart == null || cart == 'undefined') {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

// Ajout d'un produit ou augmentation de la quantité si le produit est deja présent dans le panier
function addToCart(product) {
  let cart = getCart();
  let foundProduct = cart.find(p => p.id == product.id && p.color == product.color);
  if (foundProduct != undefined) {
    // le produit est deja dans le panier
    let newQuantity = parseInt(foundProduct.quantity) + product.quantity;
    foundProduct.quantity = newQuantity;
  } else {
    // le produit est pas encore dans le panier
    cart.push(product)
  }
  saveCart(cart);
}




