import request from "supertest";
import { describe, it, expect } from "vitest";

import app from "../src/app.js";
import { email } from "zod";

describe("GET /", () => {
  it("should return API message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "API works" });
  });
});

describe("POST /auth/register", () => {
  it("should register user", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "TestRegister",
        email: `test-${Date.now()}@gmail.com`,
        password: "123456",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});

describe("POST /auth/login", () => {
  it("should login user", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "test@test.com",
      password: "123456",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});

describe("GET /auth/me", () => {
  it("should return current user with valid token", async () => {
    const loginResponse = await request(app).post("/auth/login").send({
      email: "test@test.com",
      password: "123456",
    });

    const token = loginResponse.body.token;

    const response = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe("test@test.com");
  });
});
