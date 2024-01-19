const darkMode = document.querySelector(".dark_mood");
const categoryMb = document.querySelector(".category__container");
const categoryAdd = document.querySelector(".category__add");
const categoryDesBtn = document.querySelector(".category_des__btn");
const categoryDesktopNames = document.querySelector(
  ".category_for__desktop_names"
);
const mainCard = document.querySelector(".main_card");
const mainCardsItem = document.querySelector(".category_card__items");
const categoryContainer = document.querySelector(".category__container");
const categoryCards = document.querySelector(".category_cards");
const darkModeMb = document.querySelector(".dark_mood_mb");
const mbHeaderBagNum = document.querySelector(".header_mb__bag_num");
const headerBagNum = document.querySelector(".header_main__bag_num");
const mainBag = document.querySelector(".header_main__bag");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal_close__btn_item");
const modalCard = document.querySelector(".modal_card");

const getUrl = "http://localhost:3000";

const getData = "http://localhost:3000/desktopCategoryName";

let bagData = [];
console.log(bagData);

//// render Category:
const renderCategory = async (url) => {
  const res = await fetch(`${getUrl}/${url}`);
  const data = await res.json();

  categoryMb.innerHTML = data
    .map(
      (item) => `
         
      <div class="category_main">
        <button class="category_mb" data-ids="${item.id}">
          <img class="category_icon" src="${item.icon}" alt="icon">
        </button>
         <p class="category_title">${item.title}</p>
      </div>
   
   `
    )
    .join("");
};
renderCategory("categoryMb");

//// render Add Category:
const renderCategoryAdd = async (url) => {
  const res = await fetch(`${getUrl}/${url}`);
  const data = await res.json();

  categoryAdd.innerHTML = data
    .map(
      (item) => `
         
      <div class="category_main">
        <a href="#" data-ids="${item.id}">
          <img class="category_icon" src="${item.icon}" alt="icon">
        </a>
         <p class="category_title">${item.title}</p>
      </div>
   
   `
    )
    .join("");
};

renderCategoryAdd("categoryAdd");

//// Make More Category Btn Logic:
const addCategory = () => {
  if (categoryAdd.style.display === "none") {
    categoryAdd.style.display = "flex";
  } else {
    categoryAdd.style.display = "none";
  }
};

//// Render Category for Desctop -- category names:
const renderDesktopCategoryName = async (url) => {
  const res = await fetch(`${getUrl}/${url}`);
  const data = await res.json();

  categoryDesktopNames.innerHTML = data
    .map(
      (item) => `
        <button class="category_desktop__name_btn" data-id="${item.id}">${item.names}</button>
  `
    )
    .join("");
};

renderDesktopCategoryName("desktopCategoryName");

//// Render Main Cards
const renderMainCard = async (url) => {
  try {
    const res = await fetch(`${getUrl}/${url}`);
    const data = await res.json("");

    mainCard.innerHTML = data
      .map(
        (item) => `
     <div class="main_card__item">
       <h2 class="card_main__name">${item.name}</h2>
       <img class="main_card__img" src="${item.img}" alt="img">
       <div class="main_card__price">
         <p class="main_card__price_sale">${item.salePrice}</p>
         <p class="main_card__price_real">${item.price}</p>
       </div>
     </div>
  `
      )
      .join("");
  } catch (error) {
    console.log(error);
  }
};

renderMainCard("mainCard");

//// Render cards for Desktop:
const renderCards = async (url) => {
  const res = await fetch(`${getUrl}/${url}`);
  const data = await res.json();

  categoryDesktopNames.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    let cardId = data.find((item) => item.id == id);

    if (id == cardId.id) {
      mainCardsItem.innerHTML = cardId.products
        .map(
          (item) => `
         
      <div class="cards_item">
         <a href="info.html">
          <img class="cards_item__img" src="${item.img}" alt="">    
          <p class="cards_item__title">${item.name}</p>
           <div class="cards_item__price">
             <p class="cards_item__price_now">${item.price}</p>
             <p class="cards_item__price_off">${item.salePrice}</p>
          </div>  
         </a>
         <div class="cards_item__main_btn">
           <button class="cards_item__btn" data-add="${item.id}">Add Bag</button>
         </div>
      </div>
       
      `
        )
        .join("");
    }
  });
};

renderCards("desktopCategoryName");

//// Render cards for Mobile:

const renderMbCards = async (url) => {
  const res = await fetch(`${getUrl}/${url}`);
  const data = await res.json();

  categoryContainer.addEventListener("click", (e) => {
    const ids = e.target.dataset.ids;
    let cardIds = data.find((item) => item.id == Number(ids));

    if (ids == cardIds.id) {
      categoryCards.innerHTML = cardIds.products
        .map(
          (item) => `
           <div class="category_cards__item">
             <a href="info.html">
               <img class="category_cards__item_img" src="${item.img}" alt="img">
               <p class="category_cards__item_name">${item.name}</p>
               <div class="category_cards__price">
                  <p class="category_cards__price_off">${item.salePrice}</p>
                  <p class="category_cards__price_now">${item.price}</p>
               </div>
              </a>
              
                <button class="category_cards__item_btn" data-addMb="${item.id}">Add</button>
              
          </div>
      
      `
        )
        .join("");
    }
  });
};

renderMbCards("desktopCategoryName");

//// Render Shopping Bag:

mainBag.addEventListener("click", () => {
  modal.style.display = "block";
});

//// Modal close btn:
modalCloseBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

//// MB cards add to bag:

const renderModalCard = () => {
  modalCard.innerHTML = bagData
    .map(
      (item) => `
      <div class="modal_card__item">
         <img class="modal_card_imgs" src="${item.img}" alt="img">
         <div class="modal_card__des">
            <p class="modal_card__des_name">${item.name}</p>
            <p class="modal_card__des_price">${item.salePrice} $</p>
            <span class="modal_des__calc">
              <button> + </button>
              <p>${item.userCount}</p>
              <button> - </button>
            </span>
         <div>
      </div>
  
  `
    )
    .join("");
};

mainCardsItem.addEventListener("click", async (e) => {
  const adds = e.target.dataset.add;

  const res = await fetch(`${getData}/${adds}`);
  const data = await res.json();

  if (adds) {
    const newEl = data?.products.find((item) => item.id == adds);
    const arrId = bagData?.find((item) => item.id == adds);
    if (!arrId) {
      bagData.push({ ...newEl, userCount: "1" });
      headerBagNum.textContent++;
    }
  }

  renderModalCard();
});

/// Dark mode :
darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark_theme");
});

darkModeMb.addEventListener("click", () => {
  document.body.classList.toggle("dark_theme");
});

/// Swiper Timer :
var upgradeTimeing = 1772801;
var seconds = upgradeTimeing;
function timer() {
  var days = Math.floor(seconds / 24 / 60 / 60);
  var hoursLeft = Math.floor(seconds - days * 86400);
  var hours = Math.floor(hoursLeft / 3600);
  var minutesLeft = Math.floor(hoursLeft - hours * 3600);
  var minutes = Math.floor(minutesLeft / 60);
  var remainingSeconds = seconds % 60;
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  document.getElementById("countdown").innerHTML = `
  
     <span class="timer_item">
        <p class="timer_item__nums">${pad(days)}</p>
        <p class="timer_item__text">D</p>
     </span>

     <span class="timer_item">
     <p class="timer_item__nums">${hours}</p>
     <p class="timer_item__text">H</p>
     </span>

     <p class="duble_dot">:</p>

     <span class="timer_item">
     <p class="timer_item__nums">${minutes}</p>
     <p class="timer_item__text">M</p>
     </span>

     <p class="duble_dot">:</p>
     
     <span class="timer_item">
     <p class="timer_item__nums">${remainingSeconds}</p>
     <p class="timer_item__text">S</p>
     </span>
  `;
  if (seconds == 0) {
    clearInterval(countdownTimerSecond);
    document.getElementById("countdown").innerHTML = "Completed";
  } else {
    seconds--;
  }
}
var countdownTimerSecond = setInterval("timer()", 1000);

/////////////////////////////////////////////////////////////////

var upgradeTimeing = 2772801;
// var seconds = upgradeTimeing;
function timering(timer) {
  var days = Math.floor(timer / 24 / 60 / 60);
  var hoursLeft = Math.floor(timer - days * 86400);
  var hours = Math.floor(hoursLeft / 3600);
  var minutesLeft = Math.floor(hoursLeft - hours * 3600);
  var minutes = Math.floor(minutesLeft / 60);
  var remainingSeconds = timer % 60;
  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  document.getElementById("countdown_second").innerHTML = `
  
     <span class="timer_item">
        <p class="timer_item__nums">${pad(days)}</p>
        <p class="timer_item__text">D</p>
     </span>

     <span class="timer_item">
     <p class="timer_item__nums">${hours}</p>
     <p class="timer_item__text">H</p>
     </span>

     <p class="duble_dot">:</p>

     <span class="timer_item">
     <p class="timer_item__nums">${minutes}</p>
     <p class="timer_item__text">M</p>
     </span>

     <p class="duble_dot">:</p>
     
     <span class="timer_item">
     <p class="timer_item__nums">${remainingSeconds}</p>
     <p class="timer_item__text">S</p>
     </span>
  `;
  if (timer == 0) {
    clearInterval(countdownTimerSecond);
    document.getElementById("countdown_second").innerHTML = "Completed";
  } else {
    timer--;
  }
}
var countdownTimerSecond = setInterval("timering(upgradeTimeing)", 1000);
