export let draggedCard = null;

export default class Card {
  constructor(task, parentElement) {
    this.task = task;
    this.parentElement = parentElement;

    this.card = null;
    this.deleteBtn = null;

    this.displayDeleteBtn = this.displayDeleteBtn.bind(this);
    this.hideDeleteBtn = this.hideDeleteBtn.bind(this);
    this.delete = this.delete.bind(this);
  }

  bindToDOM() {
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.draggable = true;
    this.card.innerHTML = `
    <p class="card-text">${this.task}</p>
    <button class="delete-btn">&#x2716</button>
    `;
    this.parentElement.append(this.card);

    this.deleteBtn = this.card.querySelector(".delete-btn");
    this.card.addEventListener("mouseover", this.displayDeleteBtn);
    this.card.addEventListener("mouseout", this.hideDeleteBtn);
    this.deleteBtn.addEventListener("click", this.delete);

    this.card.addEventListener("dragstart", () => {
      this.card.classList.add("dragged");
      console.log("dragstart");
      draggedCard = this.card;
    });

    this.card.addEventListener("dragend", () => {
      if (!draggedCard) return;
      console.log("dragend");
      this.card.classList.remove("dragged");
      draggedCard = null;
    });
  }

  displayDeleteBtn() {
    this.deleteBtn.classList.add("active");
  }

  hideDeleteBtn() {
    this.deleteBtn.classList.remove("active");
  }

  delete() {
    const text = this.card.querySelector(".card-text").textContent;
    const columnEl = this.parentElement.closest(".column");
    const column = columnEl.querySelector(".title").textContent;

    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards = cards.filter(
      (card) => !(card.text === text && card.column === column)
    );
    localStorage.setItem("cards", JSON.stringify(cards));

    this.card.remove();
  }
}
