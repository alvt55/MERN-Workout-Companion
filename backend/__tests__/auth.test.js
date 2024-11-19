const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const mongoose = require("mongoose");


const User = require('../models/UserModel'); 




describe('POST /auth/login', () => {
  let mongoServer;

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

    await User.create(testUser)
  });


  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });



  describe("given the correct email and password are provided", () => {

    beforeEach(async () => {
      response = await request(app).post('/auth/login').send(testUser);
    });


    it('should send a jwt cookie', async () => {
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies.some((cookie) => cookie.includes('jwt'))).toBe(true);
    })

    it('should return 200 and send the user id back', async () => {
      expect(response.statusCode).toBe(200)
      expect(response.body.user).toBeDefined();
      const user = await User.findOne({ email: testUser.email });
      expect(response.body.user).toEqual(user._id.toString());
    })

  })


  describe("invalid fields", () => {
    const unregistered = {
      email: 'notregistered@gmail.com',
      password: 'securepassword',
    };

    const emailErrorMsg = {
      "email": "That email is not registered",
      "password": ""
    }

    const passErrorMsg = {
      "email": "",
      "password": "That password is incorrect"
    }

    test('testing unregistered email', async () => {
 
      response = await request(app).post('/auth/login').send(unregistered);

    
      expect(response.statusCode).toBe(400)
      expect(response.body.errors).toEqual(emailErrorMsg)

     
      const cookies = response.headers['set-cookie'];
      expect(cookies).not.toBeDefined();
    })

    test('testing incorrect password', async () => {


      response = await request(app).post('/auth/login').send({email: testUser.email, password: "incorrectpassword"});

     
      expect(response.statusCode).toBe(400)
      expect(response.body.errors).toEqual(passErrorMsg)

 
      const cookies = response.headers['set-cookie'];
      expect(cookies).not.toBeDefined();
    })


  })

});



describe('POST /auth/signup', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await User.deleteMany(); 
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });



  describe("given a valid email and password are provided", () => {
    const validUserData = {
      email: 'testuser@example.com',
      password: 'securepassword',
    };


    beforeEach(async () => {
      response = await request(app).post('/auth/signup').send(validUserData);
    });


    it('should create new user in db', async () => {
      const user = await User.findOne({ email: validUserData.email });
      expect(user).not.toBeNull();
    })

    it('should send a jwt cookie', async () => {
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies.some((cookie) => cookie.includes('jwt'))).toBe(true);
    })

    it('should return 201 and send the user id back', async () => {
      expect(response.statusCode).toBe(201)
      const user = await User.findOne({ email: validUserData.email });
      expect(user).not.toBeNull();
      expect(response.body.user).toBeDefined();
      expect(response.body.user).toEqual(user._id.toString());
    })

  })


  describe("duplicate email", () => {
    const validUserData = {
      email: 'duplicate@gmail.com',
      password: 'securepassword',
    };

    const errorMsg = {
      "email": "that email is already registered",
      "password": ""
    }

    test('testing duplicate email', async () => {


      await User.create(validUserData)
      response = await request(app).post('/auth/signup').send(validUserData);

  
      const user = await User.find({ email: validUserData.email });
      expect(user.length).toBe(1)

     
      expect(response.statusCode).toBe(409)
      expect(response.body.errors).toEqual(errorMsg)


      const cookies = response.headers['set-cookie'];
      expect(cookies).not.toBeDefined();
    })


  })

});


describe('GET /auth/logout', () => {


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

    await User.create(testUser)

  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test("login, then logout", async () => {
    login = await request(app).post('/auth/login').send(testUser);

    logout = await request(app).get('/auth/logout')


    const cookies = logout.headers['set-cookie'];
    expect(cookies).toBeDefined();

 
    expect(logout.statusCode).toBe(200)
    expect(logout.body).toEqual({ message: 'logout successful' })
  })


  test("signup, then logout", async () => {

    const newUser = {
      email: "newUser@gmail.com",
      password: "securepass"
    }

    signup = await request(app).post('/auth/login').send(newUser);

    logout = await request(app).get('/auth/logout')

   
    const cookies = logout.headers['set-cookie'];
    expect(cookies).toBeDefined();

  
    expect(logout.statusCode).toBe(200)
    expect(logout.body).toEqual({ message: 'logout successful' })
  })

  test("logout", async () => {

    logout = await request(app).get('/auth/logout')


    const cookies = logout.headers['set-cookie'];
    expect(cookies).toBeDefined();


    expect(logout.statusCode).toBe(200)
    
  })



})











