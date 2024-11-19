const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const app = require("../server");
const httpMocks = require('node-mocks-http');
const User = require('../models/UserModel');

const { requireAuth } = require("../middleware/authMiddleware")

describe('requireAuth Middleware', () => {
    let mongoServer;

    const testUser = {
        email: 'testuser@example.com',
        password: 'securepassword',
    };

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);

        await User.create(testUser)
    });


    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });



    describe("given jwt is valid", () => {
        it("should call next function", async () => {
            const user = await User.findOne({ email: testUser.email })


            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn()

            const validToken = jwt.sign({ id: user._id }, process.env.JWTSECRET)
            req.cookies.jwt = validToken;
            const response = requireAuth(req, res, next);

            expect(next).toHaveBeenCalled();
        })
    })


    describe("given jwt is invalid", () => {

        it("400, send auth error", async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn()

            const invalidToken = jwt.sign({ id: "invalid" }, "invalidsecret")
            req.cookies.jwt = invalidToken;

            await requireAuth(req, res, next);

            const data = res._getJSONData()
            expect(res.statusCode).toBe(400)
            expect(data.authError).toEqual('jwt is not verified')
            expect(next).not.toHaveBeenCalled();
        })
        
    })


    describe("given jwt is not provided", () => {

        it("400, send auth error", async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const next = jest.fn()


            await requireAuth(req, res, next);

            const data = res._getJSONData()
            expect(res.statusCode).toBe(400)
            expect(data.authError).toEqual('jwt sent to server is null')
            expect(next).not.toHaveBeenCalled();
        })

    })


})