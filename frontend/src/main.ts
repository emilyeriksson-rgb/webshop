import "./style.css";

type Product = {
  id: number;
  name: string;
  price: number;
};

const app = document.querySelector<HTMLDivElement>("#app");

async function getProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  const products: Product[] = await response.json();

  renderProducts(products);
}

function renderProducts(products: Product[]) {
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
  `;
}

getProducts();