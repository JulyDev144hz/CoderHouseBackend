const mongoose = require("mongoose");
const supertest = require("supertest");
const chai = require("chai");
const connection = mongoose.connect(
  `mongodb+srv://admin:admin@cluster0.ni5ti26.mongodb.net/ecommerce?retryWrites=true&w=majority`
);
const serverApp = supertest("http://localhost:3001");

const expect = chai.expect;

describe("Usuarios", () => {
  let idDelete = "";
  it("Get usuario si existe", async function () {
    const { statusCode, ok, _body } = await serverApp.get(
      '/api/user?query={"email":"coderhouse@gmail.com"}'
    );
    try {
      idDelete = _body.payload[0]._id;
      console.log(idDelete);
    } catch (error) {}
    expect(ok).to.equal(true);
  });
  it("Remover usuario si existe", async function () {
    const { statusCode, ok, _body } = await serverApp.delete(
      `/api/user/${idDelete}`
    );
    expect(ok).to.equal(true);
  });

  describe("Crud de usuarios", () => {
    let id = "";

    it("GET /api/user", async function () {
      const { statusCode, ok, _body } = await serverApp.get("/api/user");
      expect(ok).to.equal(true);
    });
    it("POST /api/user", async function () {
      let user = {
        nombre: "coder",
        apellido: "house",
        email: "coderhouse@gmail.com",
        password: "secret123",
      };

      const { statusCode, ok, _body } = await serverApp
        .post("/api/user")
        .send(user);
      id = _body._id;
      expect(_body.role).to.equal("operation");
    });

    describe("Carts", () => {
      describe("Crud de Carts", () => {
        let cartId = "";

        it("GET /api/cart", async function () {
          const { statusCode, ok, _body } = await serverApp.get("/api/cart");
          expect(ok).to.equal(true);
        });
        it("POST /api/cart", async function () {
          let cart = {
            user: id,
          };

          const { statusCode, ok, _body } = await serverApp
            .post("/api/cart")
            .send(cart);
          cartId = _body._id;
          expect(ok).to.equal(true);
        });

        // producto ya creado
        it(`ADD PRODUCT /api/cart/CartID/addProduct/ProductID`, async function () {
          const { statusCode, ok, _body } = await serverApp.get(
            `/api/cart/${cartId}/addproduct/64b72e204c8972976f27c05d`
          );
          expect(ok).to.equal(true);
        });
        it(`DELETE /api/cart/${cartId}`, async function () {
          const { statusCode, ok, _body } = await serverApp.delete(
            `/api/cart/${cartId}`
          );
          expect(ok).to.equal(true);
        });
      });
    });

    it(`UPDATE /api/user/${id}`, async function () {
      let user = {
        nombre: "Coder Actualizado",
      };
      const { statusCode, ok, _body } = await serverApp
        .put(`/api/user/${id}`)
        .send(user);

      expect(_body.nombre).to.equal(user.nombre);
    });
    it(`DELETE /api/user/${id}`, async function () {
      const { statusCode, ok, _body } = await serverApp.delete(
        `/api/user/${id}`
      );
      expect(ok).to.equal(true);
    });
  });
});

describe("Sesiones", () => {
  let user = {
    nombre: "coder",
    apellido: "house",
    email: "coderhouse@gmail.com",
    password: "secret123",
    role: "operation",
  };
  it("REGISTER /auth/register", async function () {
    const { statusCode, ok, _body } = await serverApp
      .post(`/auth/register`)
      .send(user);

    expect(statusCode).to.equal(302);
  });
  it("LOGIN /auth/register", async function () {
    let login = {
      email: user.email,
      password: user.password,
    };

    const { statusCode, ok, _body } = await serverApp
      .post(`/auth/login`)
      .send(login);

    expect(statusCode).to.equal(302);
  });

  it("SESSION /api/sessions/current", async function () {
    const { statusCode, ok, _body } = await serverApp.get(
      `/api/sessions/current`
    );
    //   console.log(_body)
    expect(statusCode).to.equal(200);
  });

  it("LOGOUT /auth/logout", async function () {
    const { statusCode, ok, _body } = await serverApp.get(`/auth/logout`);
    expect(statusCode).to.equal(302);
  });
});
