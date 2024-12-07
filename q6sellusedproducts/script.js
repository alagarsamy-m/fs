// Get elements
const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const productList = document.getElementById("productList");

const sellBtn = document.getElementById("sellBtn");
const buyBtn = document.getElementById("buyBtn");

const sellFormSection = document.getElementById("sellForm");
const buySection = document.getElementById("buySection");

// Load products from local storage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Display products
function displayProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p class="status">${
        product.sold ? '<span class="sold">Sold</span>' : ""
      }</p>
      ${
        !product.sold
          ? `<button class="buy-btn" onclick="buyProduct(${index})">Buy</button>`
          : ""
      }
      <button onclick="removeProduct(${index})">Remove</button>
    `;
    productList.appendChild(productDiv);
  });
}

// Add new product (sell)
productForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newProduct = {
    name: productName.value,
    description: productDescription.value,
    price: productPrice.value,
    sold: false, // By default, a product is not sold
  };

  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  // Clear input fields
  productName.value = "";
  productDescription.value = "";
  productPrice.value = "";

  displayProducts();
});

// Remove product (delete a product)
function removeProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

// Buy product
function buyProduct(index) {
  const product = products[index];
  const amount = prompt(
    `Enter the amount you want to pay for ${product.name} (current price: $${product.price}):`
  );

  if (amount && !isNaN(amount)) {
    if (parseFloat(amount) >= parseFloat(product.price)) {
      products[index].sold = true;
      localStorage.setItem("products", JSON.stringify(products));
      alert(`You have successfully bought the ${product.name} for $${amount}.`);
      displayProducts();
    } else {
      alert("The amount you entered is too low.");
    }
  } else {
    alert("Please enter a valid amount.");
  }
}

// Toggle between Buy and Sell sections
sellBtn.addEventListener("click", () => {
  sellFormSection.style.display = "block";
  buySection.style.display = "none";
});

buyBtn.addEventListener("click", () => {
  sellFormSection.style.display = "none";
  buySection.style.display = "block";
  displayProducts();
});

// Initial load
displayProducts();
