// const {MongoClient} = require('mongodb');
// const request = require('supertest') 
// const app = require('./server') 
// const User = require('./models/UserModel')

// THIS CODE CHANGES THE ACTUAL DATABASE - BAD

// describe('POST /signup', () => {
//   let connection;
//   // let db;

//   const clearDatabase = async () => {
//     const collections = connection.collections;
//     for (const key in collections) {
//        const collection = collections[key];
//        await collection.deleteMany({});
//     }
//  }

//   beforeAll(async () => {
//     connection = await MongoClient.connect(globalThis.__MONGO_URI__);
//     // db = await connection.db(globalThis.__MONGO_DB_NAME__);
//   });

//   afterAll(async () => {
//     await connection.close();
    
//   });

//   it('valid email and password', async () => {

//     const mockUser = {email: 'inserttaweesawefaaat1@gmail.com', password: 'pass12341'};
//     const response = await request(app).post("/auth/signup").send(mockUser);


//     expect(response.headers['set-cookie'][0]).toMatch(/jwt/); 
//     expect(response.status).toBe(201)
//     expect(response.body.user).toBeDefined(); 
    
    

//     const addedUser = await User.findOne({email: mockUser.email});
//     await expect(addedUser.email).toEqual(mockUser.email);

//     await User.deleteOne({email: mockUser.email})
//   });


//   it('duplicate email', async () => {

//     const mockUser = {email: 'inserttaweesawefaaat1@gmail.com', password: 'pass12341'};
//     const response = await request(app).post("/auth/signup").send(mockUser);
//     const duplicateResponse = await request(app).post("/auth/signup").send(mockUser);

//     expect(duplicateResponse.status).toBe(400)

//     // expect(response.headers['set-cookie'][0]).toMatch(/jwt/); 
//     // expect(response.status).toBe(201)
//     // expect(response.body.user).toBeDefined(); 
    
    

//     // const addedUser = await User.findOne({email: mockUser.email});
//     // await expect(addedUser.email).toEqual(mockUser.email);

//     await User.deleteOne({email: mockUser.email})
//   });

  
// });