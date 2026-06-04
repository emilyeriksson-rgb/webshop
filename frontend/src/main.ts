import "./style.css";

// Typ för produkter från API:t
type Product = {
  id: number;
  name: string;
  price: number;
};

// Typ för chattmeddelanden
type ChatMessage = {
  user: string;
  message: string;
};

// Hämtar #app från index.html
const app = document.querySelector<HTMLDivElement>("#app");

/*
  Hämtar alla produkter från backend
  GET http://localhost:3000/api/products
*/
async function getProducts() {
  const response = await fetch(
    "http://localhost:3000/api/products"
  );

  const products: Product[] = await response.json();

  renderPage(products);
}

/*
  Hämtar alla chattmeddelanden
  GET http://localhost:3000/api/chat
*/
async function getMessages() {
  const response = await fetch(
    "http://localhost:3000/api/chat"
  );

  const messages: ChatMessage[] =
    await response.json();

  renderMessages(messages);
}

/*
  Skickar ett nytt meddelande
  POST http://localhost:3000/api/chat
*/
async function sendMessage(
  user: string,
  message: string
) {
  await fetch("http://localhost:3000/api/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      user,
      message,
    }),
  });

  // Ladda om chatten direkt efter skickat meddelande
  getMessages();
}

/*
  Renderar hela sidan:
  - produkter
  - chattformulär
  - meddelandelista
*/
function renderPage(products: Product[]) {
  if (!app) return;

  app.innerHTML = `
    <h1>Produkter</h1>

    <div>
      ${products
        .map(
          (product) => `
            <article>
              <h2>${product.name}</h2>
              <p>Pris: ${product.price} kr</p>
            </article>
          `
        )
        .join("")}
    </div>

    <hr>

    <h2>Chat</h2>

    <form id="chat-form">
      <input
        id="user-input"
        placeholder="Ditt namn"
      />

      <input
        id="message-input"
        placeholder="Skriv ett meddelande"
      />

      <button type="submit">
        Skicka
      </button>
    </form>

    <div id="messages"></div>
  `;

  // Hämta formulärets element
  const form =
    document.querySelector<HTMLFormElement>(
      "#chat-form"
    );

  const userInput =
    document.querySelector<HTMLInputElement>(
      "#user-input"
    );

  const messageInput =
    document.querySelector<HTMLInputElement>(
      "#message-input"
    );

  // När formuläret skickas
  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!userInput || !messageInput) return;

    // Skicka meddelandet till backend
    sendMessage(
      userInput.value,
      messageInput.value
    );

    // Töm meddelanderutan
    messageInput.value = "";
  });
}

/*
  Visar alla meddelanden i chatten
*/
function renderMessages(
  messages: ChatMessage[]
) {
  const messagesDiv =
    document.querySelector<HTMLDivElement>(
      "#messages"
    );

  if (!messagesDiv) return;

  messagesDiv.innerHTML = messages
    .map(
      (message) => `
        <p>
          <strong>${message.user}:</strong>
          ${message.message}
        </p>
      `
    )
    .join("");
}

/*
  Ladda produkter direkt när sidan startar
*/
getProducts();

/*
  Ladda chatten direkt när sidan startar
*/
getMessages();

/*
  Uppdatera chatten var 30:e sekund
*/
setInterval(() => {
  getMessages();
}, 30000);