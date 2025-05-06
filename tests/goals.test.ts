import request from "supertest";
import { app } from "../src/app";

describe("Goal endpoints", () => {
  const testUser = { email: "goaltest@example.com", password: "Test1234" };
  let token: string;

  beforeEach(async () => {
    await request(app).post("/auth/register").send(testUser);
    const res = await request(app).post("/auth/login").send(testUser);
    token = res.body.token;
  });

  it("should create a goal", async () => {
    const res = await request(app)
      .post("/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Be fit", description: "In 30 days" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("title", "Be fit");
    expect(res.body).toHaveProperty("_id");
  });

  it("should retrieve user goals", async () => {
    await request(app)
      .post("/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Goal", description: "Test description" });

    const res = await request(app)
      .get("/goals")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a goal", async () => {
    const createRes = await request(app)
      .post("/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "To updated", description: "Desc" })

    const id = createRes.body._id;

    const updateRes = await request(app)
      .put(`/goals/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated goal", completed: true });

    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty("title", "Updated goal");
    expect(updateRes.body).toHaveProperty("completed", true);
  });

  it("should delete a goal", async () => {
    const createRes = await request(app)
      .post("/goals")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "New goal", description: "Desc" });

    const id = createRes.body._id;

    const deleteRes = await request(app)
      .delete(`/goals/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty("message", "Goal deleted");
  });

  it("should return 404 when trying to update non-existing goal", async () => {
    const res = await request(app)
      .put("/goals/64f2f0c1cddf8849ba5d0000")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Will not work" });

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error", "Goal not found");
  });
});
