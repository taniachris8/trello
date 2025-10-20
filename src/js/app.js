import Column from "./Column";
import Card from "./Card";

console.log("app")


const container = document.querySelector(".container");

const todoColumn = new Column("todo", container);
const progressColumn = new Column("progress", container);
const doneColumn = new Column("done", container);

todoColumn.addAnotherCard();
progressColumn.addAnotherCard();
doneColumn.addAnotherCard();

window.addEventListener("load", () => {
  const cards = JSON.parse(localStorage.getItem("cards")) || [];

  cards.forEach(({ column, text }) => {
    let columnElement;

    if (column === "todo") columnElement = todoColumn.column;
    if (column === "progress") columnElement = progressColumn.column;
    if (column === "done") columnElement = doneColumn.column;

    const card = new Card(text, columnElement);
    card.bindToDOM();
  });

});





