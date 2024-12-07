const restaurants = {
  restaurant1: {
    name: "Restaurant 1",
    menu: ["Pizza", "Burger", "Pasta"],
  },
  restaurant2: {
    name: "Restaurant 2",
    menu: ["Sushi", "Ramen", "Tempura"],
  },
  restaurant3: {
    name: "Restaurant 3",
    menu: ["Burrito", "Tacos", "Nachos"],
  },
};

function showMenu(restaurantId) {
  const restaurant = restaurants[restaurantId];
  document.getElementById("restaurant-name").textContent = restaurant.name;
  const foodItems = document.getElementById("food-items");
  foodItems.innerHTML = "";
  restaurant.menu.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `<button onclick="addToOrder('${item}')">${item}</button>`;
    foodItems.appendChild(li);
  });
  document.getElementById("restaurant-list").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}

function addToOrder(item) {
  const orderList = document.getElementById("order-list");
  const li = document.createElement("li");
  li.textContent = item;
  orderList.appendChild(li);
  document.getElementById("order-summary").classList.remove("hidden");
}

function goBack() {
  document.getElementById("restaurant-list").classList.remove("hidden");
  document.getElementById("menu").classList.add("hidden");
}

function checkout() {
  alert("Your order has been placed!");
  document.getElementById("order-list").innerHTML = "";
  document.getElementById("order-summary").classList.add("hidden");
  document.getElementById("restaurant-list").classList.remove("hidden");
}
