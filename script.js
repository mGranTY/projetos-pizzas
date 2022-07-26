let cart = []
let pizzaAtual = []
let quantidadePizza = 1
let somaPrecos = 0


const listPizzas = () => {
    pizzaJson.map((pizzas, index) => {
        //CLona o HTML base para preenchimento
        let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

        //Define as caracteristicas da pizza
        pizzaItem.querySelector('.pizza-item--img img').src = pizzas.img;
        pizzaItem.querySelector('.pizza-item--price').innerHTML = 'R$ ' + pizzas.price.toFixed(2);
        pizzaItem.querySelector('.pizza-item--name').innerHTML = pizzas.name;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = pizzas.description;
        pizzaItem.querySelector('.pizza-item--id').innerHTML = pizzas.id;
        //Bloqueia a pagina de atualizar ao clicar na pizza e abre o Modal da pizza com suavidade
        pizzaItem.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            //Limpa variavel da pizza atual
            pizzaAtual.length = 0
            //Define a variavel da pizza atualmente aberta
            pizzaAtual.push(pizzas.id)

            document.querySelector('.pizzaInfo--qt').innerHTML = `${quantidadePizza}`
            //seta tamanho pequeno
            document.querySelector('.pizzaInfo--size[data-key="0"]').innerHTML = pizzas.sizes[0];
            //seta tamanho medio
            document.querySelector('.pizzaInfo--size[data-key="1"]').innerHTML = pizzas.sizes[1];
            //seta tamanho grande
            document.querySelector('.pizzaInfo--size[data-key="2"]').innerHTML = pizzas.sizes[2];
            //seta nome da pizza
            document.querySelector('.pizzaInfo h1').innerHTML = pizzas.name;
            //seta o preço
            document.querySelector('.pizzaInfo--actualPrice').innerHTML = 'R$ ' + pizzas.price.toFixed(2);
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
    })
}
listPizzas();

//adiciona item no carrinho
document.querySelector('.pizzaInfo--addButton').addEventListener('click', (e) => {
    document.querySelector('.pizzaWindowArea').removeAttribute('style');
    let pizzaAtualObj = pizzaJson.filter(id => id.id === pizzaAtual[0])
    let size = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
    let pObj = pizzaAtualObj[0]
    let idP = pObj.id + '@' + parseInt(size)


    let checkCart = cart.findIndex((item) => item.idp === idP)

    if (checkCart > -1) {
        cart[checkCart].qt += quantidadePizza++
    } else {
        cart.push({
            idp: idP,
            id: pObj.id,
            size: parseInt(size),
            qt: quantidadePizza
        });
    }
    updateCart();


})
const calcularPreco = () => {

    if (cart.length > 0) {
        let precoNumber = 0
        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id === cart[i].id)
            precoNumber += cart[i].qt * pizzaItem.price
        }

        let desconto = precoNumber * 0.1
        //reseta a quantidade de pizzas
        quantidadePizza = 1;

        document.querySelector('.cart--totalitem').innerHTML = `<span>Subtotal</span> <span>R$ ${precoNumber.toFixed(2)}</span>`
        document.querySelector('.desconto').innerHTML = `<span>Desconto (-10%)</span> <span>R$ ${desconto.toFixed(2)}</span>`
        document.querySelector('.total').innerHTML = `<span>Total</span> <span>R$ ${(precoNumber - desconto).toFixed(2)}</span>`
    }

}

document.querySelector('.menu-openner span').addEventListener('click', (e) =>{
    if (cart.length >0){
        document.querySelector('aside').style.left = '0%';
    }
})
document.querySelector('.menu-closer').addEventListener('click', (e) =>{
    document.querySelector('aside').style.left = '100%';
})

const updateCart = () => {

    document.querySelector('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = ''
        for (let i in cart) {

            let pizzaItem = pizzaJson.find((item) => item.id === cart[i].id)

            let pizzaSize = cart[i].size === 0 ? 'P' : cart[i].size === 1 ? 'M' : cart[i].size === 2 ? 'G' : undefined;
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${pizzaSize}) `;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', (e) => {
                if (cart[i].qt > 1) {
                    cart[i].qt--
                    updateCart()
                } else {
                    cart.splice(cart[i], 1)
                    updateCart()
                }

            })

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', (e) => {
                cart[i].qt++
                updateCart()
            })

            document.querySelector('.cart').append(cartItem)
        }
        calcularPreco()

    } else {
        document.querySelector('aside').classList.remove('show');
        document.querySelector('aside').style.left = '100%'
    }


}


//Fecha o modal de piza
document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', (e) => {
    document.querySelector('.pizzaWindowArea').removeAttribute('style');
})
document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', (e) => {
    document.querySelector('.pizzaWindowArea').removeAttribute('style');
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
    document.querySelector('.pizzaBig img').style.height = '150px'

})
//Seleciona o tamanho da pizza media
document.querySelector('.pizzaInfo--size[data-key="1"]').addEventListener('click', (e) => {
    limparSelecionados();
    document.querySelector('.pizzaInfo--size[data-key="1"]').classList.add('selected')
    document.querySelector('.pizzaBig img').style.height = '200px'


})


//Seleciona o tamanho da pizza grande
document.querySelector('.pizzaInfo--size[data-key="2"]').addEventListener('click', (e) => {
    limparSelecionados();
    document.querySelector('.pizzaInfo--size[data-key="2"]').classList.add('selected')
    document.querySelector('.pizzaBig img').style.height = '300px'


})


//Determinador de quantidade de pizzas

//Aumentar quantidade de pizzas
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', (e) => {
    let quantidadePizza = document.querySelector('.pizzaInfo--qt').innerHTML
    let quantidadePizzaNumber = parseInt(quantidadePizza) + 1
    document.querySelector('.pizzaInfo--qt').innerHTML = `${quantidadePizzaNumber}`

    let pizzaAtualObj = pizzaJson.filter(id => id.id === pizzaAtual[0])
    let pizzaAtualPreco = pizzaAtualObj[0].price
    // console.log(pizzaAtualPreco * quantidadePizzaNumber)
    setarPreco(pizzaAtualPreco, quantidadePizzaNumber)
    // document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaAtualPreco.toFixed(2) * quantidadePizzaNumber}`

})
//Diminui quantidade de pizzas e previne ficar abaixo de 1
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', (e) => {

    let quantidadePizza = document.querySelector('.pizzaInfo--qt').innerHTML
    let quantidadePizzaNumber = parseInt(quantidadePizza) - 1
    if (quantidadePizzaNumber <= 1) {
        quantidadePizzaNumber = 1
    }
    document.querySelector('.pizzaInfo--qt').innerHTML = `${quantidadePizzaNumber}`
    // console.log(pizzaAtual)

    let pizzaAtualObj = pizzaJson.filter(id => id.id === pizzaAtual[0])
    let pizzaAtualPreco = pizzaAtualObj[0].price
    // console.log(pizzaAtualPreco * quantidadePizzaNumber)
    setarPreco(pizzaAtualPreco, quantidadePizzaNumber)
    // document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaAtualPreco.toFixed(2) * quantidadePizzaNumber}`


})

//Seta o preço da pizza baseado em quantas estão selecionadas
const setarPreco = (preco, quantidade) => {
    // console.log(preco)
    // console.log(quantidade)


    quantidadePizza = quantidade

    document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${(preco * quantidade).toFixed(2)}`
}
