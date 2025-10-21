import Card from "./Card";

export default class NewCardForm {
  constructor(parentElement) {
    this.parentElement = parentElement;

    this.formElement = document.createElement("form");
    this.formElement.classList.add("new-card-form");
    this.formElement.innerHTML = `
    <textarea name="task" class="input" placeholder="Enter a title for this card..."></textarea>
    <div class="buttons">
      <button type="submit" class="add-btn">Add Card</button>
      <button class="close-btn">&#x2716</button>
    </div>
    `;

    this.parentElement.append(this.formElement);

    this.form = this.parentElement.querySelector(".new-card-form");
    this.openBtn = this.parentElement.querySelector(".btn");
    this.closeBtn = this.form.querySelector(".close-btn");

    this.addCard = this.addCard.bind(this);
    this.close = this.close.bind(this);

    this.closeBtn.addEventListener("click", this.close);
    this.form.addEventListener("submit", this.addCard);
  }

  open() {
    this.formElement.classList.add("active");
    this.openBtn.classList.add("overlapped");
  }

  close() {
    this.formElement.classList.remove("active");
    this.form.reset();
    this.form.remove();
    this.openBtn.classList.remove("overlapped");
  }

  addCard(event) {
    event.preventDefault();
    this.input = document.querySelector(".input");

    const text = this.input.value.trim();

    if (this.text !== "") {
      if (this.input.classList.contains("invalid")) {
        this.input.classList.remove("invalid");
      }
      const card = new Card(
        text,
        this.parentElement.querySelector(".cards-container")
      );
      card.bindToDOM();

      let cards = JSON.parse(localStorage.getItem("cards")) || [];
      cards.push({
        column: this.parentElement.querySelector(".title").textContent,
        text: text,
      });
      localStorage.setItem("cards", JSON.stringify(cards));

      this.close();
    } else {
      this.input.classList.add("invalid");
      this.input.placeholder = "Enter your message...";
      return;
    }
  }
}
