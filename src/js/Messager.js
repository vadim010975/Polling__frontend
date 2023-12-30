import { catchError, of, interval, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";

export default class Messeger {
  constructor(url, container) {
    this.url = url;
    this.container = container;
    this.interval = 3000;
  }

  start() {
    this.stream$ = interval(this.interval).pipe(
      switchMap(() =>
        ajax.getJSON(this.url).pipe(
          catchError((err) => {
            console.log(err);
            return of({
              status: "ok",
              messages: [],
            });
          })
        )
      )
    );

    this.stream$.subscribe((response) => {
      this.render(response);
    });
  }

  render(data) {
    if (data.status === "ok" && data.messages.length > 0) {
      data.messages.forEach((message) => {
        const element = document.createElement("li");
        element.classList.add("list-item");
        const nameEl = document.createElement("div");
        nameEl.classList.add("list-item__name");
        nameEl.textContent = message.from;
        const messageEl = document.createElement("div");
        messageEl.classList.add("list-item__message");
        let correctedMessage;
        if (message.subject.length > 25) {
          correctedMessage = message.subject.substring(0, 22) + "...";
        } else {
          correctedMessage = message.subject;
        }
        messageEl.textContent = correctedMessage;
        const date =
          new Date(message.received).toLocaleTimeString().slice(0, -3) +
          " " +
          new Date(message.received).toLocaleDateString();
        const dateEl = document.createElement("div");
        dateEl.classList.add("list-item__date");
        dateEl.textContent = date;
        element.appendChild(nameEl);
        element.appendChild(messageEl);
        element.appendChild(dateEl);
        this.container.insertAdjacentElement("afterbegin", element);
      });
    }
  }
}
