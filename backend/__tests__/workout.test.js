const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const Workout = require('../models/WorkoutModel');
const User = require('../models/UserModel');
const httpMocks = require('node-mocks-http');




let mongoServer;
let user;
let testWorkout; 
let workout1; 
let workout2; 
let workout3; 

const testUser = {
    email: 'testuser@example.com',
    password: 'securepassword',
};

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    user = await User.create(testUser)

    testWorkout1 = {
        date: 'jan 25',
        day: 'push',
        exercises: ["list of", "exercises"],
        sessionuser: user._id
    };

    testWorkout2 = {
        ...testWorkout1,
        date: 'feb 2'
    };

    // not added to db just instantiated
    testWorkout3 = {
        date: 'apr 25',
        day: 'push',
        exercises: ["list of", "exercises"],
        sessionuser: user._id
    };

    workout1 = await Workout.create(testWorkout1)
    workout2 = await Workout.create(testWorkout2)
});


afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});




describe('GET /workouts/getWorkouts', () => {

    describe("given the correct email and password are provided", () => {

        it('200, should return list of workouts', async () => {
         
            const token = jwt.sign({ id: user._id }, process.env.JWTSECRET)
            response = await request(app).get('/workouts/getWorkouts').set("Cookie", [`jwt=${token}`]);
            

          
            expect(response.statusCode).toBe(200);
            
            expect(`${response.body[0]._id}`).toStrictEqual(`${workout2._id}`);

            expect(`${response.body[1]._id}`).toStrictEqual(`${workout1._id}`);
            expect(response.body[1].date).toEqual(workout1.date);
            expect(response.body[1].day).toEqual(workout1.day);
            expect(response.body[1].exercises).toEqual(workout1.exercises);

            
         
        })
    })

    // for auth middleware route
    describe("given authentication fails", () => {

        it('400, should return verify error', async () => {
         
            const token = jwt.sign({ id: user._id }, "incorrectsecret")
            response = await request(app).get('/workouts/getWorkouts').set("Cookie", [`jwt=${token}`]);
        
          
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({"authError": "jwt is not verified"})

        })

        
        it('400, should return missing jwt error', async () => {
         
            response = await request(app).get('/workouts/getWorkouts')
        
          
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({ authError: "jwt sent to server is null" });

        })
    })

})


describe('POST /workouts/createWorkout', () => {

    describe("given the correct email and password are provided", () => {

        it('200, should create a new workout', async () => {

         
            const token = jwt.sign({ id: user._id }, process.env.JWTSECRET)
            response = await request(app).post('/workouts/createWorkout')
            .set("Cookie", [`jwt=${token}`])
            .send(testWorkout3);
     
          
            expect(response.statusCode).toBe(201);
            let temp = await Workout.findOne({date: testWorkout3.date});

            expect(response.body._id).toEqual(temp._id.toString());
            
        })
    })

    // for auth middleware route
    describe("given authentication fails", () => {

        it('400, should return verify error', async () => {
         
            const token = jwt.sign({ id: user._id }, "incorrectsecret")
            response = await request(app).post('/workouts/createWorkout').set("Cookie", [`jwt=${token}`]).send(testWorkout3);
    
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({"authError": "jwt is not verified"})

        })


        it('400, should return missing jwt error', async () => {
         
            response = await request(app).post('/workouts/createWorkout')
        
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({ authError: "jwt sent to server is null" });

        })
    })

})




describe('DELETE /api/workouts/', () => {

    describe("given valid workout id and valid auth, ", () => {

        it('200, should create a new workout', async () => {

         
            const token = jwt.sign({ id: user._id }, process.env.JWTSECRET)
            response = await request(app).delete(`/workouts/${workout1._id.toString()}`)
            .set("Cookie", [`jwt=${token}`])
    
            expect(response.statusCode).toBe(200);
            expect(response.body._id).toEqual(workout1._id.toString());
            
        })
    })


    describe("given an invalid workout id", () => {

        it('400, should return error', async () => {

         
            const token = jwt.sign({ id: user._id }, process.env.JWTSECRET)
            response = await request(app).delete('/workouts/invalidid')
            .set("Cookie", [`jwt=${token}`])
     
          
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({error: "no such workout"});
            
        })
    })

    // for auth middleware route
    describe("given authentication fails", () => {

        it('400, should return verify error', async () => {
         
            const token = jwt.sign({ id: user._id }, "incorrectsecret");
            response = await request(app).delete('/workouts/idishere').set("Cookie", [`jwt=${token}`]);
    
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({"authError": "jwt is not verified"})

        })


        it('400, should return missing jwt error', async () => {
         
            response = await request(app).delete('/workouts/randid')
        
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({ authError: "jwt sent to server is null" });

        })
    })

})











