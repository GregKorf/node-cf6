const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const helpers = require("../services/user.service")

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log("Connection to Mongo from Jest established")},
        err => {console.log("Failed to connect to Mongo from Jest")}
    )
})

afterEach(async () =>{
    await mongoose.connection.close();
})

describe("For /api/user requests", () => {
    it("GET /api/user", async() => {
        const res = await request(app).get("/api/user")

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    },10000); // 10000 is milliseconds until timeout
    
    it("POST /api/user request", async() => {
        const res = await request(app).post("/api/user")
        .send({
            username:"test10",
            password: "12345",
            name: "test 4 name",
            surname: "test 4 surname",
            email: "test10@email.com",
            address: {
                area: "area65",
                road: "road66"
            }
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBeTruthy();
    }) // 10000 is milliseconds until timeout

    it("POST /api/user request check for existed user", async() => {
        const res = await request(app).post("/api/user")
        .send({
            username:"test10",
            password: "12345",
            name: "test 4 name",
            surname: "test 4 surname",
            email: "test10@email.com",
            address: {
                area: "area65",
                road: "road66"
            }
        })

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeFalsy();
    })
})

describe("For /api/user/{username} requests", () => {
    it("GET /api/user/{username}", async() => {
        const result = await helpers.findLastInsertedUser();
        const res = await request(app)
        .get("/api/user/" + result.username);
        

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe(result.username);
        expect(res.body.data.email).toBe(result.email);
    }); 
    
    it("PATCH /api/user/{username} update a user", async () => {
        // Find the last inserted user
        const result = await helpers.findLastInsertedUser();
        console.log("Last inserted user:", result);
    
        // Send the PATCH request to update the user
        const res = await request(app)
            .patch("/api/user/" + result.username)
            .send({
                name: "test50",
                surname: "test50 surname",
                email: "test50@email.com",
                address: {
                    area: "area5",
                    road: "road6"
                }
            });
    
        // Log the full response to debug
        console.log("Response body:", res.body);
    
        // Expectations to ensure the response returns the updated document
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.name).toBe("test50");
        expect(res.body.data.surname).toBe("test50 surname");
        expect(res.body.data.email).toBe("test50@email.com");
        expect(res.body.data.address.area).toBe("area5");
        expect(res.body.data.address.road).toBe("road6");
    });
    it("DELETE /api/user/{username}", async() => {
        const result = await helpers.findLastInsertedUser();
        console.log(result.username);
        const res = await request(app).delete("/api/user/" + result.username);

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    }); 
})