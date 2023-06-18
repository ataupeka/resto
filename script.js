const btnCart = document.querySelector('.btn-cart');

const cart = document.querySelector('.cart');

const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
}

function loadContent(){
    let btnRemove = document.querySelectorAll('.cart-remove');
    console.log(btnRemove);
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click', removeItem);
    });

let quantityElemnts = document.querySelectorAll('.cart-quantity');
quantityElemnts.forEach((input)=>{
    input.addEventListener('change', changeQty);
});

let cartBtns = document.querySelectorAll('.add-cart');
cartBtns.forEach((btn)=>{

    btn.addEventListener('click',addCart);
});
updateTotal();

}
function removeItem(){
    if(confirm('Are you sure to remove')){
    let title = this.parentElement.querySelector('.cart-food-title').innerHTML
    itemList = itemList.filter(el => el.title != title);
    this.parentElement.remove();
    loadContent();
    }

}

function changeQty(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;

    }
    loadContent();
}

let itemList = [];

function addCart(){
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = this.parentElement.querySelector('.food-img').src;
    let newProduct = {title,price,imgSrc}


    if(itemList.find((el) => el.title == newProduct.title)){
      alert("product is already added in cart");
      return;
    }
    else{
        itemList.push(newProduct);
    }

    let NewProductElement = createCartProduct(title,price,imgSrc);
    let element = document.createElement('div');
    element.innerHTML = NewProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();

}
function createCartProduct(title,price,imgSrc){
    return`
    <div class="cart-box">
        <img src="${imgSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-box">
                <div class="cart-food-title"> ${title}</div>
                <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amount"> </div>
                </div>
            </div>
                <input type="number" value="1" class="cart-quantity">
            </div>

            <i class="fa fa-trash cart-remove"> </i>
        </div>
`;
}
function updateTotal(){
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;
    cartItems.forEach(product=>{
        let priceElement = product.querySelector('.cart-price');
        let price = lalal(priceElement.innerHTML.replace("$",""));
        let quantity = product.querySelector('.cart-quantity').value;
        total += (price * quantity);
        product.querySelector('.cart-amount').innerText = "$" + (price * quantity);

    });
    totalValue.innerHTML = '$' + total;




const cartCount = document.querySelector('.cart-count');
let count = itemList.length;
cartCount.innerHTML = count;

if(count == 0){
cartCount.computedStyleMap.display = 'none';

}
else{
    cartCount.style.display = 'block'; 
}
}
