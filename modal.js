//modal
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function closeModal() {
  root.removeChild(document.querySelector(".modal"));
  document.body.classList.remove("no-scroll");
}

function showCardModal(e) {
  let fishName = e.currentTarget.querySelector(".card-text").innerHTML;
  let fishInfo = fish.filter((fish) => {
    return fish.name === fishName;
  })[0];
  let root = document.querySelector("#root");
  let modal = `
  <div class="modal">
  <div class="overlay"></div>
  <div class="modal_content">
    <div class="modal-header">
      <h2 class="modal-fish-name">${fishInfo.name}</h2>
      <img class="modal-fish-image" src="${fishInfo.critterpediaImage}"></div>
      ${isSafari ? "" : '<div class="wave-top"></div>'}
      <div class="modal-description">
        <p>${fishInfo.description[0]}</p>
        <div class="modal-sell-container">
          <img
            class="sell-info-image"
            src="https://acnhcdn.com/latest/MenuIcon/MoneyBag069.png"
            alt="Image of a Bell Bag"
          />
          <p class="sell-text">${fishInfo.sell}</p>
        </div>
        <div class="availability-container">
          <div class="flex-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm-2 2H9v2H7V5H4v4h16V5h-3v2h-2V5zm5 6H4v8h16v-8z" />
            </svg>
            <p>
              Months Available: ${fishInfo.hemispheres[activeHemisphere].months[0]}
            </p>
          </div>
          <div class="flex-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z" />
            </svg>
            <p>
              Times Available: ${fishInfo.hemispheres[activeHemisphere].time[0]}
            </p>
          </div>
        </div>
        <div class="flex-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M6.17 18a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2v-2h4.17zm6-7a3.001 3.001 0 0 1 5.66 0H22v2h-4.17a3.001 3.001 0 0 1-5.66 0H2v-2h10.17zm-6-7a3.001 3.001 0 0 1 5.66 0H22v2H11.83a3.001 3.001 0 0 1-5.66 0H2V4h4.17zM9 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
          <p class="catch-difficulty">
            Catch Difficulty: ${fishInfo.catchDifficulty}
          </p>
        </div>
      </div>
      <button aria-label="Close Modal" class="close_modal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" />
        </svg>
      </button>
    </div>
  </div>
</div>`;

  root.insertAdjacentHTML("afterbegin", modal);
  document.querySelector(".close_modal").focus();
  document.body.classList.add("no-scroll");

  document.querySelector(".overlay").addEventListener("click", closeModal);
  document.querySelector(".close_modal").addEventListener("click", closeModal);
}

document.addEventListener("keydown", (e) => {
  let modalNode = document.querySelector(".modal");
  //remove modal when the user presses Escape
  if (e.key === "Escape" && modalNode) {
    root.removeChild(modalNode);
  }

  //trap tab focus in modal until closed.
  if (e.key === "Tab") {
    if (document.activeElement.classList.contains("close_modal")) {
      e.preventDefault();
    }
  }
});
