const listarPizzas = () => {
    pizzaJson.map( (pizzas, index) => {
        //CLona o HTML base para preenchimento
        let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)

        //Define as caracteristicas da pizza
        pizzaItem.querySelector('.pizza-item--img img').src = pizzas.img;
        pizzaItem.querySelector('.pizza-item--price').innerHTML = 'R$ '+pizzas.price.toFixed(2);
        pizzaItem.querySelector('.pizza-item--name').innerHTML = pizzas.name;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizzas.description;

        //Bloqueia a pagina de atualizar ao clicar na pizza e abre o Modal da pizza com suavidade
        pizzaItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault()


            document.querySelector('.pizzaWindowArea').style.opacity = '0';
            document.querySelector('.pizzaWindowArea').style.display = 'flex'
            //suaviza a abertura do Modal
           setTimeout(() => {
               document.querySelector('.pizzaWindowArea').style.opacity = '1';
           }, 150)


        })
        document.querySelector('.pizza-area').append(pizzaItem)
    } )
}
listarPizzas();

//Fecha o modal de pizzas
document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', (e) => {
    document.querySelector('.pizzaWindowArea').style.display = 'none'

})
