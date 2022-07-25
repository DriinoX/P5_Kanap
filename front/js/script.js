fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    // creation des cartes de canapé en fonction de l'API 
    for (let i = 0; i < value.length; i++) {
      let items = document.querySelector("#items");
      let a = document.createElement("a");
      let article = document.createElement("article");
      let img = document.createElement("img");
      let h3 = document.createElement("h3");
      let p = document.createElement("p");
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
    }
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
