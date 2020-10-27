document.addEventListener('DOMContentLoaded', function () {
  function filterByLocation(location) {
    return fish.filter(function (fish) {
      return fish.whereHow === location
    })
  }

  const tags = document.querySelectorAll('.tag')
  for (let i = 0; i < tags.length; i++) {
    tags[i].addEventListener('click', function (e) {
      let tagTitle = e.target.innerHTML
      switch (tagTitle) {
        case 'Sea':
          renderCards(filterByLocation('Sea'))
          break
        case 'River':
          renderCards(filterByLocation('River'))
          break
        case 'Pond':
          renderCards(filterByLocation('Pond'))
          break
      }
    })
  }

  function renderCards(fishArr) {
    let cardContainer = document.querySelector('.card-container')
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild)
    }

    let cards = []
    fishArr.forEach(function (fish) {
      cards.push(
        `<div role="button" class="card">
          <img class="image-fish" src=${fish.iconImage}>
          <p class="card-text">${fish.name}</p>
        </div>`,
      )
    })
    cardContainer.insertAdjacentHTML('afterBegin', cards.join(''))
  }

  renderCards(fish)
})
