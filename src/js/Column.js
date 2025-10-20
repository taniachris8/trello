import NewCardForm from "./NewCardForm";

export default class Column {
  constructor(title, parentElement) {
    this.title = title;
    this.parentElement = parentElement;

    this.column = document.createElement("div");
    this.column.classList.add("column");
    this.column.innerHTML = `
        <p class="title">${this.title}</p>
        <button class="btn">+ Add another card</button>
      `;
    this.parentElement.append(this.column);
    this.cardsContainer = this.column.querySelector(".cards-container");

    this.button = this.column.querySelector(".btn");

    this.addAnotherCard = this.addAnotherCard.bind(this);


    this.column.addEventListener("dragover", (e) => {
      console.log("dragover");
      e.preventDefault(); 
    });

    this.column.addEventListener("drop", (e) => {
       e.preventDefault();
       const text = e.dataTransfer.getData("text/plain");

       const cardElement = [...document.querySelectorAll(".card")].find(
         (el) => el.querySelector(".card-text").textContent === text
       );

       if (cardElement) {
         this.column.append(cardElement);

         let cards = JSON.parse(localStorage.getItem("cards")) || [];
         const oldCard = cards.find((c) => c.text === text);
         if (oldCard) {
           oldCard.column = this.title; 
         }
         localStorage.setItem("cards", JSON.stringify(cards));
       }
    });
  }

  addAnotherCard() {
    this.button.addEventListener("click", () => {
      const newCardForm = new NewCardForm(this.column);
      newCardForm.open();
    });
  }

}
