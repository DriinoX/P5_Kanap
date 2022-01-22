id = window.location.href.split('id=')[1]
console.log(id);

fetch("http://localhost:3000/api/products/" + id)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    var item_img = document.querySelector(".item__img");
    var img = document.createElement("img");
    var title = document.querySelector("#title");
    var price = document.querySelector("#price");
    var description = document.querySelector("#description");
    var color = document.querySelector("#colors");
    item_img.appendChild(img);
    img.setAttribute('src',value.imageUrl);
    img.setAttribute('alt', value.altTxt);
    title.innerText = value.name;
    price.innerText = value.price;
    description.innerText = value.description;
    for (let i = 0; i < value.colors.length; i++) {
    	var option = document.createElement("option");
    	option.setAttribute('value', value.colors[i]);
    	option.innerText = value.colors[i];
	    color.appendChild(option);
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
