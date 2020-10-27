document.addEventListener("DOMContentLoaded", function () {
  let activeHemisphere = 'north';
  let monthTagLastClicked = false;

  document.querySelector('input').addEventListener('click', function(e){
    let hemisphereText = document.querySelector('.hemisphere-text');
    if (e.target.checked) {
      activeHemisphere = 'south';
      hemisphereText.innerHTML = 'Southern Hemisphere'
    } else {
      activeHemisphere = 'north';
      hemisphereText.innerHTML = 'Northern Hemisphere';
    }
    //update available fish for this month on hemisphere change.
    if (monthTagLastClicked) {
      renderCards(filterByActiveMonth());
    }
  })
  /* Sort the fish in descending order from 
  the highest sell value to the lowest. */
  function sortByPrice(a, b) {
    if (a.sell < b.sell) return 1;
    if (a.sell > b.sell) return -1;
    return 0;
  }

  fish = fish.sort(sortByPrice);

  /* Sell info background color varies as a visual indicator of value */
  function setPriceColor(price) {
    let color;
    if (price >= 10000) {
      color = "#ffca1c";
    } else if (price < 10000 && price >= 3000) {
      color = "#ffde70";
    } else {
      color = "#ffe99e";
    }
    return color;
  }

  function renderCards(fishArr) {
    let cardContainer = document.querySelector(".card-container");
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }

    let cards = [];

    fishArr.forEach(function (fish) {
      let color = setPriceColor(fish.sell);
      cards.push(
        `<div role="button" class="card">
          <img class="image-fish" src=${fish.iconImage}>
          <p class="card-text">${fish.name}</p>
          <div class="sell-info-container" style="background:${color}">
            <img class="sell-info-image" src="https://acnhcdn.com/latest/MenuIcon/MoneyBag069.png" alt="Image of a Bell Bag"/>
            <p class="sell-text">${fish.sell}</p>
          </div>
        </div>`
      );
    });
    cardContainer.insertAdjacentHTML("afterBegin", cards.join(""));
  }

  function filterByLocation(location) {
    return fish.filter(function (fish) {
      return fish.whereHow === location;
    });
  }

  const tags = document.querySelectorAll(".tag");
  for (let i = 0; i < tags.length; i++) {
    tags[i].addEventListener("click", function (e) {
      let tagTitle = e.target.innerHTML;
      switch (tagTitle) {
        case "Sea":
          renderCards(filterByLocation("Sea"));
          monthTagLastClicked = false;
          break;
        case "River":
          renderCards(filterByLocation("River"));
          monthTagLastClicked = false;
          break;
        case "Pond":
          renderCards(filterByLocation("Pond"));
          monthTagLastClicked = false;
          break;
        case "Available This Month":
          renderCards(filterByActiveMonth());
          monthTagLastClicked = true;
          break;
      }
    });
  }

  function filterByActiveMonth() {
    let date = new Date();
    let currentMonth = date.getMonth();
    return fish.filter(function (fish) {
      return fish.hemispheres[activeHemisphere].monthsArray.includes(currentMonth);
    });
  }

  renderCards(fish);
});
