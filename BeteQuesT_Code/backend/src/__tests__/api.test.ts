import request from 'supertest';
import { Express } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { createServer } from '../server';
import { User } from '../models/User';
import { Country } from '../models/Country';
import { UserProfile } from '../models/UserProfile';

let app: Express;
let mongoServer: MongoMemoryServer;
let adminToken: string;
let userToken: string;
let countryId: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  app = createServer();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear the database before each test
  await User.deleteMany({});
  await Country.deleteMany({});
  await UserProfile.deleteMany({});

  // Create an admin user
  const adminUser = new User({
    username: 'admin',
    email: 'admin@example.com',
    password: 'adminpassword',
    role: 'admin'
  });
  await adminUser.save();

  // Create a regular user
  const regularUser = new User({
    username: 'user',
    email: 'user@example.com',
    password: 'userpassword',
    role: 'user'
  });
  await regularUser.save();

  // Login as admin and get token
  const adminLoginRes = await request(app)
    .post('/api/users/login')
    .send({
      email: 'admin@example.com',
      password: 'adminpassword'
    });
  adminToken = adminLoginRes.body.token;

  // Login as regular user and get token
  const userLoginRes = await request(app)
    .post('/api/users/login')
    .send({
      email: 'user@example.com',
      password: 'userpassword'
    });
  userToken = userLoginRes.body.token;

  // Create a test country
  const countryRes = await request(app)
    .post('/api/countries')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      name: 'Test Country',
      capital: 'Test Capital',
      population: 2000000,
      languages: ['Test Language'],
      currency: 'Test Currency',
      landmarks: [{ name: 'Test Landmark', description: 'A test landmark', location: 'Test Location' }]
    });
  
  countryId = countryRes.body._id;
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'newpassword123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        username: 'testuser2',
        email: 'user@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'user@example.com',
        password: 'userpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'user@example.com',
        password: 'wrongpassword'
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});

describe('Country Endpoints', () => {
  // it('should create a new country', async () => {
  //   const res = await request(app)
  //     .post('/api/countries')
  //     .set('Authorization', `Bearer ${adminToken}`)
  //     .send({
  //       name: 'New Test Country',
  //       capital: 'New Test Capital',
  //       population: 1000000,
  //       languages: ['New Test Language'],
  //       currency: 'New Test Currency',
  //       landmarks: [{ name: 'New Test Landmark', description: 'A new test landmark', location: 'New Test Location' }]
  //     });
  //   expect(res.statusCode).toEqual(201);
  //   expect(res.body).toHaveProperty('name', 'New Test Country');
  // });
  
  
  it('should create a country with cultural info and update it partially', async () => {
    const res = await request(app)
      .post('/api/countries')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Cultural Test Country',
        capital: 'Cultural Capital',
        population: 1000000,
        languages: ['Cultural Language'],
        currency: 'Cultural Currency',
        culturalInfo: {
          greetings: 'Cultural Hello',
          customs: 'Cultural Customs',
          etiquette: 'Cultural Etiquette',
          religion: {
            mainReligions: ['Religion 1', 'Religion 2'],
            practices: 'Religious Practices'
          },
          family: {
            dynamics: 'Family Dynamics',
            genderRoles: 'Gender Roles',
            marriageCustoms: 'Marriage Customs'
          },
          naming: {
            conventions: 'Naming Conventions',
            addressingOthers: 'Addressing Others'
          },
          datesOfSignificance: {
            national: ['National Day 1', 'National Day 2'],
            religious: ['Religious Day 1', 'Religious Day 2']
          },
          communication: {
            verbalPatterns: 'Verbal Patterns',
            nonVerbalCustoms: 'Non-verbal Customs'
          }
        }
      });
  
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('culturalInfo');
    expect(res.body.culturalInfo).toHaveProperty('greetings', 'Cultural Hello');
    expect(res.body.culturalInfo.religion.mainReligions).toContain('Religion 1');
    
    const culturalCountryId = res.body._id;
  
    // Test retrieving the country
    const getRes = await request(app)
      .get(`/api/countries/${culturalCountryId}`);
    
    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body.culturalInfo).toHaveProperty('customs', 'Cultural Customs');
    expect(getRes.body.culturalInfo.family).toHaveProperty('dynamics', 'Family Dynamics');
  
    // Test updating cultural info
    const updateRes = await request(app)
      .put(`/api/countries/${culturalCountryId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        culturalInfo: {
          greetings: 'Updated Cultural Hello',
          customs: 'Updated Cultural Customs'
        }
      });
  
    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body.culturalInfo).toHaveProperty('greetings', 'Updated Cultural Hello');
    expect(updateRes.body.culturalInfo).toHaveProperty('customs', 'Updated Cultural Customs');
    
    // Verify all fields with another GET request
    const finalGetRes = await request(app)
      .get(`/api/countries/${culturalCountryId}`);
    
    expect(finalGetRes.statusCode).toEqual(200);
    expect(finalGetRes.body.culturalInfo).toHaveProperty('greetings', 'Updated Cultural Hello');
    expect(finalGetRes.body.culturalInfo).toHaveProperty('customs', 'Updated Cultural Customs');
    // Check that other fields remain unchanged
    expect(finalGetRes.body.culturalInfo).toHaveProperty('etiquette', 'Cultural Etiquette');
    expect(finalGetRes.body.culturalInfo.religion.mainReligions).toContain('Religion 1');
    expect(finalGetRes.body.culturalInfo.family).toHaveProperty('dynamics', 'Family Dynamics');
  });

  it('should get all countries', async () => {
    const res = await request(app)
      .get('/api/countries');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a specific country', async () => {
    const res = await request(app)
      .get(`/api/countries/${countryId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test Country');
  });

  it('should update a country', async () => {
    const res = await request(app)
      .put(`/api/countries/${countryId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Updated Test Country',
        population: 2500000
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Test Country');
    expect(res.body).toHaveProperty('population', 2500000);
  });

  it('should search countries by language', async () => {
    const res = await request(app)
      .get('/api/countries/search')
      .query({ language: 'Test Language' });
    
    if (res.statusCode !== 200) {
      console.error('Search by language failed:', res.body);
    }
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('languages');
    expect(res.body[0].languages).toContain('Test Language');
  });


  it('should search countries by population range', async () => {
    const res = await request(app)
      .get('/api/countries/search')
      .query({ minPopulation: 1000000, maxPopulation: 3000000 });
    
    if (res.statusCode !== 200) {
      console.error('Search by population range failed:', res.body);
    }
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('population');
    expect(res.body[0].population).toBeGreaterThanOrEqual(1000000);
    expect(res.body[0].population).toBeLessThanOrEqual(3000000);
  });

  it('should get a country by landmark', async () => {
    const res = await request(app)
      .get('/api/countries/landmark/Test Landmark');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test Country');
    expect(res.body.landmarks).toContainEqual(expect.objectContaining({
      name: 'Test Landmark'
    }));
  });


  it('should delete a country', async () => {
    const res = await request(app)
      .delete(`/api/countries/${countryId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Country deleted successfully');
  });
});

describe('User Profile Endpoints', () => {
  it('should create a user profile', async () => {
    const res = await request(app)
      .post('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        fullName: 'Test User',
        bio: 'A test bio',
        interests: ['Travel', 'Culture']
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('fullName', 'Test User');
  });

  it('should get user profile', async () => {
    await request(app)
      .post('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        fullName: 'Test User',
        bio: 'A test bio',
        interests: ['Travel', 'Culture']
      });

    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('fullName', 'Test User');
  });

  it('should update user profile', async () => {
    await request(app)
      .post('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        fullName: 'Test User',
        bio: 'A test bio',
        interests: ['Travel', 'Culture']
      });

    const res = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        bio: 'An updated bio'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('bio', 'An updated bio');
  });
});

describe('Chatbot Endpoint', () => {
  it('should respond to a chatbot query', async () => {
    const res = await request(app)
      .post('/api/countries/chatbot')
      .send({
        query: 'What is the population of Test Country?'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('response');
    expect(res.body.response).toContain('The population of Test Country is 2,000,000');
  });
});

describe('Protected Route', () => {
  it('should access protected route with valid token', async () => {
    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'This is a protected route');
    expect(res.body).toHaveProperty('user');
  });

  it('should not access protected route without token', async () => {
    const res = await request(app)
      .get('/api/protected');
    expect(res.statusCode).toEqual(401);
  });

  it('should not access protected route with invalid token', async () => {
    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.statusCode).toEqual(403);
  });


});