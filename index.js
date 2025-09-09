const treeCategories = document.getElementById("tree-categories");
const cardContainer = document.getElementById("card-container");
const allPlants = document.getElementById("plants");
const modalContainer = document.getElementById("my_modal_1");
const addCardContainer = document.getElementById("add-card-container");
const navCart = document.getElementById("nav-cart");
let cartData = [];

const dataFetch = async (url) => {
  const root = `https://openapi.programming-hero.com/api${url}`;
  const data = await fetch(root);
  const result = data.json();
  return result;
};

async function getCategories() {
  const data = await dataFetch("/categories");
  let categoriesName = "";
  data.categories.forEach((category) => {
    categoriesName += `<li onclick="getData(this)" id="${category.id}" class="mb-2"><a>${category.category_name}</a></li>`;
  });
  treeCategories.insertAdjacentHTML("beforeend", categoriesName);
}

async function getData(e) {
  const categoryStyleRemove = document.querySelectorAll("#tree-categories li");
  categoryStyleRemove.forEach((li) =>
    li.classList.remove("active-bg-green-selection")
  );
  e.classList.add("active-bg-green-selection");
  const elementId = e.id;
  let plantsCardData = [];
  if (e.id === "plants") {
    plantsCardData = await dataFetch(`/${elementId}`);
  } else {
    plantsCardData = await dataFetch(`/category/${elementId}`);
  }

  let cards = "";
  plantsCardData.plants.forEach((card) => {
    cards += cardTemplate(card);
  });
  cardContainer.innerHTML = cards;
}

function cardTemplate({ id, image, name, description, category, price }) {
  return `
    <div id="${id}" class="card bg-base-100 shadow-sm space-y-3 p-4 duration-300 ease-in">
              <div class="card" onclick="showModal(this)">
                <figure class="flex m-0">
                  <img
                    src="${image}"
                    alt="${name}"
                    class="h-50 w-full object-cover cursor-pointer transition duration-500 hover:scale-110"
                  />
                </figure>
                <div class="card-body m-0 px-0 py-3">
                  <h2 class="card-title">${name}</h2>
                  <p class="line-clamp-2">
                  ${description}
                  </p>
                  <div class="card-actions justify-between">
                    <div
                      class="badge rounded-full bg-[#CFF0DC] text-[#15803D] py-1 px-3 font-medium"
                    >
                    ${category}
                    </div>
                    <div class="badge font-semibold text-[#15803D]">৳<span class="price">${price}</span></div>
                  </div>
                </div>
              </div>
              <div class="">
                <button
                  onclick="addToCart(this)"
                  class="btn border-none rounded-full w-full bg-[#15803D] hover:bg-[#28a556] font-medium text-[#ffffff] duration-300 ease-in"
                >
                  Add to Cart
                </button>
              </div>
            </div>`;
}

function modalTemplate({ id, name, image, description, category, price }) {
  return `
  <div id="${id}" class="modal-box space-y-5">
            <h3 class="text-lg font-bold">${name}</h3>
            <figure class="overflow-hidden rounded-2xl w-full h-70">
              <img
                src="${image}"
                alt=""
                class="h-80 w-full object-cover cursor-pointer transition duration-500 hover:scale-110"
              />
            </figure>
            <div class="space-y-2"
              <p class=""><span class="font-semibold text-[#1F2937]">Category :</span> ${category}</p>
              <p class=""><span class="font-semibold text-[#1F2937]">Price :</span> ৳${price}</p>
              <p class=""><span class="font-semibold text-[#1F2937]">Description :</span> ${description}</p>
            </div>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn border-none  w-full bg-[#15803D] hover:bg-[#28a556] font-medium text-[#ffffff] duration-300 ease-in">Close</button>
              </form>
            </div>
          </div>
  `;
}

async function showModal(e) {
  const elementId = e.parentElement.id;
  const data = await dataFetch(`/plant/${elementId}`);
  const plantInfo = data.plants;
  const element = modalTemplate(plantInfo);
  modalContainer.innerHTML = element;
  modalContainer.showModal();
}

function addToCart(e) {
  const card = e.closest(".card");
  const plantId = card.id;
  const name = card.querySelector(".card-title").innerText;
  const price = parseInt(card.querySelector(".price").innerText);
  const existingItem = cartData.find((item) => item.id === plantId);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cartData.push({ id: plantId, name, price, qty: 1 });
  }
  renderCart();
  setCartItem();
}

function removeFromCart(name) {
  const existingItem = cartData.find((item) => item.id === name);

  if (existingItem && existingItem.qty > 1) {
    existingItem.qty--;
  } else {
    cartData = cartData.filter((item) => item.id !== name);
  }

  renderCart();
  setCartItem();
}

function renderCart() {
  const totalPriceEl = document.getElementById("total-price");

  addCardContainer.innerHTML = " ";
  let total = 0;

  cartData.forEach((item) => {
    total += item.price * item.qty;

    const li = document.createElement("li");
    li.className =
      "bg-[#F0FDF4] p-2 rounded flex justify-between items-center shadow my-2";

    li.innerHTML = `
      <span><span class="font-semibold">${item.name}</span> <br> ৳${item.price} × ${item.qty}</span>
      <button onclick="removeFromCart('${item.id}')" class="text-red-500 font-bold">✕</button>
    `;
    addCardContainer.appendChild(li);
  });
  totalPriceEl.textContent = "৳" + total;
}

function setCartItem() {
  const items = cartData.length;
  const navCartItems = navCart.getElementsByClassName("cart-items-count");
  const totalCartPrice = navCart.getElementsByClassName("total-items-price");
  navCartItems[0].innerText = items;
  navCartItems[1].innerText = items == 1 ? "1 item" : `${items} items`;
  let total = 0;

  cartData.forEach((item) => {
    total += item.price * item.qty;
  });
  totalCartPrice[0].innerText = total;
}

getCategories();
plants.click();
