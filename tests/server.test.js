// tests/server.test.js

const request = require("supertest");
const app = require("../server"); // Path to your Express server file

// Test GET /search/autocomplete
describe("GET /search/autocomplete", () => {
  it("responds with JSON containing a list of all music related data (artist/album/song)", async () => {
    const response = await request(app).get("/search/autocomplete?keyword=Tay");
    expect(response.status).toBe(200);
    expect(response.body?.data?.length).toBe(1);
  });

  it("responds with 500 if keyword is missing", async () => {
    const response = await request(app).get("/search/autocomplete");
    expect(response.status).toBe(500);
    expect(response.body?.message).toBe("Error occured. Please try again");
  });
});

// Test GET search/result
describe("GET search/result", () => {
  it("responds with JSON containing a searched data", async () => {
    const response = await request(app).get(
      "/search/result?keyword=Taylor%20Swift&type=artist"
    );
    expect(response.status).toBe(200);
  });

  it("responds with 500 if keyword and type is missing", async () => {
    const response = await request(app).get("/search/result");
    expect(response.status).toBe(500);
    expect(response.body?.message).toBe("Error occured. Please try again");
  });
});
