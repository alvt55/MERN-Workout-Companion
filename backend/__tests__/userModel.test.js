const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const User = require('../models/UserModel');


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



describe('saving a valid user and testing password hashing', () => {

  test('should save with hashed password', async () => {
    const salt = await bcrypt.genSalt();
    const expectedHash = await bcrypt.hash(testUser.password, salt)

    const savedUser = await User.findOne({ email: 'testuser@example.com' })
    expect(bcrypt.compare(savedUser.password, testUser.password)).toBeDefined()
  })


})

describe('saving a user without a valid email', () => {

  const invalidEmailUser = {
    email: 'testuserexample.com',
    password: 'securepassword',
  };

  test('should not save to db, return error', async () => {
    
    let error 

    try {
      await User.create(invalidEmailUser)
    } catch (err) {
      error = err
    }
    
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.message).toEqual("user validation failed: email: Please enter a valid email")

  })

})

describe('saving a user with less than 6 character password', () => {

  const invalidPasswordLength = {
    email: 'testuser@example.com',
    password: 'six',
  };

  test('should not save to db, return error', async () => {
    
    let error 

    try {
      await User.create(invalidPasswordLength)
    } catch (err) {
      error = err
    }
    
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.message).toEqual("user validation failed: password: Minimum password length is 6 characters")

  })

})


describe('login', () => {


  describe('valid login,', () => {
    
    it("should return the user", async () => {

      const response = await User.login(testUser.email, testUser.password)
      const user = await User.findOne({email: testUser.email})
      expect(response).toEqual(user)

    })

  })

  describe('incorrect email login,', () => {
    
    it("should return password error", async () => {

      let error; 

      try {
        await User.login('unregistered@gmail.com', testUser.password)

      } catch (err) {
        error = err
      }
    
      
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('unregistered email')

    })

  })

  describe('incorrect password login,', () => {
    
    it("should return password error", async () => {

      let error; 

      try {
        await User.login(testUser.email, "incorrect password")

      } catch (err) {
        error = err
      }
    
      
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('incorrect password')

    })

  })

})



