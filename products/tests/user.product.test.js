const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const helpers = require("../services/user.service")

// Connect to DB
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log("Connection to Mongo from Jest established")},
        err => {console.log("Failed to connect to Mongo from Jest"),err}
    )
})

// Disconnect from DB
afterEach(async () => {
    await mongoose.connection.close();
})

describe("Test for /api/user-product/users/products", () => {
    it("Get /api/user-product/users/products", async() =>{
        const res = await request(app)
        .get("/api/user-product/users/products")

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    })
})


describe("Test for /api/user-product/{username}/products", () => {
    it("Get /api/user-product/{username}/products", async() =>{
        const res = await request(app)
        .get("/api/user-product/user4/products")

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe('user4');
        expect(res.body.data.products.length).toBeGreaterThan(0);
    })

    it("Post /api/user-product/{username}/products", async() =>{
        const result = await helpers.findLastInsertedUser()
        const username = result.username
        const res = await request(app)
        .post("/api/user-product/" + username + "/products")
        .send({
            username: username,
            products:[{
                product: "tsixles",
                quantity: 20,
                cost: 10
            }]
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeTruthy();
    })
})

describe("Test for /api/user-product/{username}/products/{id}", () =>{

    it("Patch /api/user-product/{username}/products/{id}", async() =>{
        const result = await helpers.findLastInsertedUser()
        const username = result.username;
        // const result = await helpers.findUsersProducts('user4', '66f6a669fc13a33cdf812bab')
        const product = await helpers.findUsersProducts(username)
        // username = result.username;
        // id = result.products[0]._id;
        id = product.products[0]._id;
        console.log(username,id);
        const res = await request(app)
        .patch("/api/user-product/" + username + "/products/" + id)
        .send(
            {
                quantity:83
            }
        )

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    })
})