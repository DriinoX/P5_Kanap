fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    for (let i = 0; i < value.length; i++) {
    var items = document.querySelector("#items");
    var a = document.createElement("a");
    var article = document.createElement("article");
    var img = document.createElement("img");
    var h3 = document.createElement("h3");
    var p = document.createElement("p");
    a.appendChild(article);
    a.setAttribute('href', './product.html?id=' + value[i]._id);
    article.appendChild(img);
    img.setAttribute('src',value[i].imageUrl);
    img.setAttribute('alt', value[i].altTxt);
    article.appendChild(h3);
    h3.setAttribute('class','productName');
    h3.innerText = value[i].name;
    article.appendChild(p);
    p.setAttribute('class', 'productDescription');
    p.innerText = value[i].description;
    items.appendChild(a);
    var productName = document.querySelector(".productName");
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
