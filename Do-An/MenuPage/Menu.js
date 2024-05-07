// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//open cart
cartIcon.onclick = () => {
  cart.classList.add("active");
};

//close cart
closeCart.onclick = () => {
  cart.classList.remove("active");
};

//Cart Working JS
if (document.readyState == "loadding")
{
  document.addEventListener("DOMcontentLoaded", ready);
}
 else
{
  ready();
}

//Making Function
function ready() {
  // Remove Items From Cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //Quantity Changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //Buy Button Work
  document
  .getElementsByClassName("btn-buy")[0]
  .addEventListener("click",buyButtonClicked);
}

// Buy Button Clicked
function buyButtonClicked() {
  alert("Your Order is accepted !");
  var cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
}
// Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Function Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

//Fucnction Add To Cart
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var Title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var Price = shopProducts.getElementsByClassName("price")[0].innerText;
  var ProductImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(Title, Price, ProductImg);
  updateTotal();
}

function addProductToCart(Title, Price, ProductImg)
{
  var cartShopBox = document.createElement('div');
  cartShopBox.classList.add("cart-box")
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++)
    {
     if(cartItemsNames[i].innerText == Title)
       {
        alert("You have already add this Drink in orders");
         return;
        }
    }

  var cartBoxContent = `
                        <img src="${ProductImg}" alt="" class="cart-img" />
                        <div class="detail-box">
                          <div class="cart-product-title">${Title}</div>
                          <div class="cart-price">${Price}</div>
                          <input type="number" value="1" class="cart-quantity" />
                        </div>
                        <!-- Remove Cart-->
                        <i class='bx bxs-trash-alt cart-remove'></i>
                      `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

//Fucnction Update Money
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$",""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }
  document.getElementsByClassName("total-price")[0].innerText = total + " VNĐ";
}


