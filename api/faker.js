const faker = require("faker");
const fs = require("fs");
const DESTINATION_FILE = "db.json";

let products = [];

const makeVersions = function (i) {
  let result = [];
  for (let j = 0; j < 6; j++) {
    faker.seed(j);
    result.push({
      id: `${j}`,
      product_id: `${i}`,
      color: faker.random.arrayElement([
        "white",
        "black",
        "red",
        "yellow",
        "blue",
        "green",
      ]),
      price: {
        currency: "eur",
        originalAmount: `${Math.floor(faker.commerce.price(99, 179, 2, ""))}`,
        get offeredAmount() {
          let int = parseInt(this.originalAmount);
          let num = Math.floor(int / (Math.random() * (4 - 1) + 1));
          return num.toString();
        },
        get discount() {
          return this.offeredAmount < this.originalAmount ? "false" : "true";
        },
      },
      imageUrl: {
        small:
          "https://imgplaceholder.com/57x50/e5e298/000000?font-size=12&font-family=arial",
        medium:
          "https://imgplaceholder.com/230x230/f4f1a3/000000?text=230+x+230&font-family=arial",
      },
    });
  }
  return result;
};

// Generate Product
for (let i = 0; i < 339; i++) {
  faker.seed(i);
  products.push({
    id: `${i}`,
    name: faker.name.firstName(),
    get productTitle() {
      return `${this.brand} ${this.look} ${this.category} ${this.name}`;
    },
    section: faker.random.arrayElement(["men", "women"]),
    campaigns: faker.random.arrayElement(["sale", "essentials", "new", ""]),
    category: faker.random.arrayElement(["clothing", "shoes"]),
    look: faker.random.arrayElement(["tennis", "basketball", "soccer"]),
    brand: faker.random.arrayElement(["nike", "adidas", "rebook", "puma"]),
    versions: makeVersions(i),
  });
}

let jsonProducts = JSON.stringify(products);

fs.writeFile(DESTINATION_FILE, jsonProducts, function (err) {
  if (err) throw err;
  console.log(`Saved ${jsonProducts} fake data to ${DESTINATION_FILE}`);
});
