const request = require("supertest");
const app = require("./app.js");

describe("GET /zombies", () => {
  describe("get zombies", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/zombies").send();
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /zombies/{zombieId}", () => {
  describe("get zombies", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/zombies/6231dbe5b44b11d13fb77be4").send();
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("GET /items", () => {
  describe("get items", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/items").send();
      expect(response.statusCode).toBe(200);
    });
  });
});
let id;
describe("POST /zombies", () => {
  describe("post zombie", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/zombies").send({
        name: "name"
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
