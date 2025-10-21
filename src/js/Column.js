import NewCardForm from "./NewCardForm";

export default class Column {
  constructor(title, parentElement) {
    this.title = title;
    this.parentElement = parentElement;

    this.column = document.createElement("div");
    this.column.classList.add("column");
    this.column.innerHTML = `
        <p class="title">${this.title}</p>
        <div class="cards-container"></div>
        <button class="btn">+ Add another card</button>
      `;
    this.parentElement.append(this.column);

    this.cardsContainer = this.column.querySelector(".cards-container");
    this.button = this.column.querySelector(".btn");

    this.addAnotherCard = this.addAnotherCard.bind(this);
  }

  addAnotherCard() {
    this.button.addEventListener("click", () => {
      const newCardForm = new NewCardForm(this.column);
      newCardForm.open();
    });
  }
}
