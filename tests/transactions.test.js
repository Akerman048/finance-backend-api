import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";

import app from "../src/app.js";

let token;
let createdTransactionId;

describe("Transactions routes", () => {
  beforeAll(async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "test@test.com",
      password: "123456",
    });

    token = loginResponse.body.token;
  });

  it("should create transaction", async () => {
    const response = await request(app)
      .post("/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test transaction",
        amount: 100,
        type: "expense",
        category: "Food",
        date: "2026-05-25",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test transaction");

    createdTransactionId = response.body.id;
  });

  it("should get all transactions", async () => {
    const response = await request(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get transaction by id", async () => {
    const response = await request(app)
      .get(`/transactions/${createdTransactionId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdTransactionId);
  });

  it("should update transaction", async () => {
    const response = await request(app)
      .patch(`/transactions/${createdTransactionId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 150,
      });

    expect(response.status).toBe(200);
    expect(Number(response.body.amount)).toBe(150);
  });

  it("should delete transaction", async () => {
    const response = await request(app)
      .delete(`/transactions/${createdTransactionId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Transaction deleted");
  });
});