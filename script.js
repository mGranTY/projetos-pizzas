const listarPizzas = () => {
    pizzaJson.map( (pizzas, index) => {
        let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
        //console.log(pizzaItem)
        // console.log(pizzas, index)
        pizzaItem.querySelector('.pizza-item--img img').src = pizzas.img;
        pizzaItem.querySelector('.pizza-item--price').innerHTML = 'R$ '+pizzas.price.toFixed(2);
        pizzaItem.querySelector('.pizza-item--name').innerHTML = pizzas.name;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizzas.description;
        document.querySelector('.pizza-area').append(pizzaItem)
    } )
}
listarPizzas();
