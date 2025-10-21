import Column from "./Column";
import Card, { draggedCard } from "./Card";

const container = document.querySelector(".container");

const todoColumn = new Column("todo", container);
const progressColumn = new Column("progress", container);
const doneColumn = new Column("done", container);

todoColumn.addAnotherCard();
progressColumn.addAnotherCard();
doneColumn.addAnotherCard();

const columnEls = document.querySelectorAll(".column");

function updateLocalStorage() {
  const cards = [];

  columnEls.forEach((column) => {
    const columnTitle = column.querySelector(".title").textContent;
    column.querySelectorAll(".card").forEach((card) => {
      cards.push({
        column: columnTitle,
        text: card.querySelector(".card-text").textContent,
      });
    });
  });

  localStorage.setItem("cards", JSON.stringify(cards));
}

window.addEventListener("load", () => {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];

  cards.forEach(({ column, text }) => {
    let columnElement;

    if (column === "todo") columnElement = todoColumn.column;
    if (column === "progress") columnElement = progressColumn.column;
    if (column === "done") columnElement = doneColumn.column;

    const card = new Card(
      text,
      columnElement.querySelector(".cards-container")
    );
    card.bindToDOM();
  });
});

/////////////////////////////////////
const cardsContainers = document.querySelectorAll(".cards-container");
const placeholder = document.createElement("div");
placeholder.classList.add("placeholder");

cardsContainers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!draggedCard) return;

    const cards = [...container.querySelectorAll(".card:not(.dragged)")];
    let afterElement = null;

    for (const card of cards) {
      const cardRect = card.getBoundingClientRect();
      const distanceFromTop = e.clientY - cardRect.top - cardRect.height / 2;
      if (distanceFromTop < 0) {
        afterElement = card;
        break;
      }
    }

    const cardRect = draggedCard.getBoundingClientRect();
    placeholder.style.height = `${cardRect.height}px`;

    if (afterElement == null) {
      container.append(placeholder);
    } else {
      container.insertBefore(placeholder, afterElement);
    }
  });

  container.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!draggedCard) return;

    container.insertBefore(draggedCard, placeholder);
    placeholder.remove();
    updateLocalStorage();
  });
});
