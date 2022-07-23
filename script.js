const listarPizzas = () => {
    pizzaJson.map( (pizzas, index) => {
        //CLona o HTML base para preenchimento
        let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

        //Define as caracteristicas da pizza
        pizzaItem.querySelector('.pizza-item--img img').src = pizzas.img;
        pizzaItem.querySelector('.pizza-item--price').innerHTML = 'R$ '+pizzas.price.toFixed(2);
        pizzaItem.querySelector('.pizza-item--name').innerHTML = pizzas.name;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizzas.description;
        pizzaItem.querySelector('.pizza-item--id').innerHTML = pizzas.id;

        //Bloqueia a pagina de atualizar ao clicar na pizza e abre o Modal da pizza com suavidade
        pizzaItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();

            //seta tamanho pequeno
            document.querySelector('.pizzaInfo--size[data-key="0"]').innerHTML = pizzas.sizes[0];
            //seta tamanho medio
            document.querySelector('.pizzaInfo--size[data-key="1"]').innerHTML = pizzas.sizes[1];
            //seta tamanho grande
            document.querySelector('.pizzaInfo--size[data-key="2"]').innerHTML = pizzas.sizes[2];
            //seta nome da pizza
            document.querySelector('.pizzaInfo h1').innerHTML = pizzas.name;
            //seta o preço
            document.querySelector('.pizzaInfo--actualPrice').innerHTML = 'R$ '+pizzas.price.toFixed(2);
            //seta descrição da pizza
            document.querySelector('.pizzaInfo--desc').innerHTML = pizzas.description;
            //seta imagem da piza
            document.querySelector('.pizzaBig img').src = pizzas.img;

            document.querySelector('.pizzaWindowArea').style.opacity = '0';
            document.querySelector('.pizzaWindowArea').style.display = 'flex'
            //suaviza a abertura do Modal
           setTimeout(() => {
               document.querySelector('.pizzaWindowArea').style.opacity = '1';
           }, 150)


        })
        document.querySelector('.pizza-area').append(pizzaItem);
    } )
}
listarPizzas();

//Fecha o modal de pizzas
document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', (e) => {
    document.querySelector('.pizzaWindowArea').style.display = 'none';

})

//Limpar selecionados

const limparSelecionados = () => {
    document.querySelector('.pizzaInfo--size[data-key="0"]').classList.remove('selected');
    document.querySelector('.pizzaInfo--size[data-key="1"]').classList.remove('selected');
    document.querySelector('.pizzaInfo--size[data-key="2"]').classList.remove('selected');
}

//Seleciona o tamanho da pizza pequena
document.querySelector('.pizzaInfo--size[data-key="0"]').addEventListener('click', (e) => {
    limparSelecionados();
    document.querySelector('.pizzaInfo--size[data-key="0"]').classList.add('selected')
    document.querySelector('.pizzaBig img').style.height = '200px'

})
//Seleciona o tamanho da pizza media
document.querySelector('.pizzaInfo--size[data-key="1"]').addEventListener('click', (e) => {
    limparSelecionados();
    document.querySelector('.pizzaInfo--size[data-key="1"]').classList.add('selected')
    document.querySelector('.pizzaBig img').style.height = '300px'


})


//Seleciona o tamanho da pizza grande
document.querySelector('.pizzaInfo--size[data-key="2"]').addEventListener('click', (e) => {
    limparSelecionados();
    document.querySelector('.pizzaInfo--size[data-key="2"]').classList.add('selected')
    document.querySelector('.pizzaBig img').style.height = '400px'


})


//Determinador de quantidade de pizzas

//Aumentar quantidade de pizzas
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', (e) => {
    let quantidadePizza = document.querySelector('.pizzaInfo--qt').innerHTML
    let quantidadePizzaNumber = parseInt(quantidadePizza)
    document.querySelector('.pizzaInfo--qt').innerHTML = `${quantidadePizzaNumber + 1}`
})
//Diminui quantidade de pizzas e previne ficar abaixo de 1
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', (e) => {
    let quantidadePizza = document.querySelector('.pizzaInfo--qt').innerHTML
    let quantidadePizzaNumber = parseInt(quantidadePizza) - 1
    if (quantidadePizzaNumber <= 1){
        quantidadePizzaNumber = 1
    }
    document.querySelector('.pizzaInfo--qt').innerHTML = `${quantidadePizzaNumber}`
})
