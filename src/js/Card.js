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

    this.card.addEventListener("dragstart", (e) => {
      console.log("dragstart");
      e.dataTransfer.setData("text/plain", this.task);
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
    const column = this.parentElement.querySelector(".title").textContent;

    let cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards = cards.filter(
      (card) => !(card.text === text && card.column === column)
    );
    localStorage.setItem("cards", JSON.stringify(cards));

    this.card.remove();
  }
}