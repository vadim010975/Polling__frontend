import Messager from "./Messager";

const url = "https://polling-backend-rzmw.onrender.com/messages/unread";

const container = document.querySelector(".list-items");

const messager = new Messager(url, container);

messager.start();
