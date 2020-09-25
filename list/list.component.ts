import { Component, HostListener, Input, OnInit } from "@angular/core";
import { ListSchema } from "../ListSchema";
import { CardStore } from "../CardStore";
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  @Input() list: ListSchema;
  @Input() cardStore: CardStore;
  displayAddCard = false;
  constructor() {}
  toggleDisplayAddCard() {
    this.displayAddCard = !this.displayAddCard;
  }
  ngOnInit(): void {}
  allowDrop($event) {
console.log(" allowDrop($event)",$event);
    $event.preventDefault();
  }
  drop($event) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData("text");
console.log("drop ,data",data);
    let target = $event.target;
console.log("drop target",target);
    const targetClassName = target.className;
console.log("drop targetClassName",targetClassName);
    while (target.className !== "list") {
      target = target.parentNode;
console.log("drop !list target",target);
    }
    target = target.querySelector(".cards");
console.log("drop query selector target",target);
    if (targetClassName === "card") {
      $event.target.parentNode.insertBefore(
        document.getElementById(data),
        $event.target
      );
    } else if (targetClassName === "list__title") {
console.log("droptarget.children.length",target.children.length); 
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      } else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }
  }
  onEnter(value: string) {
    const cardId = this.cardStore.newCard(value);
    this.list.cards.push(cardId);
  }
}
