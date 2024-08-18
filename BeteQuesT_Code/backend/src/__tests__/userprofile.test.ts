import request from 'supertest';
import { Express } from 'express';
import mongoose from 'mongoose';
import { createServer } from '../server';
import { User } from '../models/User';
import { Country } from '../models/Country';
import { UserProfile } from '../models/UserProfile';

let app: Express;
let userToken: string;
let countryId: string;

beforeAll(async () => {
  app = createServer();
  await mongoose.connect(process.env.MONGODB_URI as string);
});

afterAll(async () => {
  await mongoose.disconnect();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Country.deleteMany({});
  await UserProfile.deleteMany({});

  // Create a test user
  const user = new User({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'testpassword'
  });
  await user.save();

  // Login and get token
  const loginRes = await request(app)
    .post('/api/users/login')
    .send({
      email: 'testuser@example.com',
      password: 'testpassword'
    });
  userToken = loginRes.body.token;

  // Create a test country
  const country = new Country({
    name: 'Test Country',
    capital: 'Test Capital',
    population: 1000000,
    languages: ['Test Language'],
    currency: 'Test Currency'
  });
  await country.save();
  countryId = country._id.toString();
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
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('fullName', 'Test User');
    expect(res.body).toHaveProperty('bio', 'A test bio');
    expect(res.body.interests).toContain('Travel');
    expect(res.body.interests).toContain('Culture');
  });

  it('should get user profile', async () => {
    // Create a profile first
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
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('fullName', 'Test User');
    expect(res.body).toHaveProperty('bio', 'A test bio');
    expect(res.body.interests).toContain('Travel');
    expect(res.body.interests).toContain('Culture');
  });

  it('should update user profile', async () => {
    // Create a profile first
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
        bio: 'An updated bio',
        interests: ['Travel', 'Culture', 'Food']
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('bio', 'An updated bio');
    expect(res.body.interests).toContain('Food');
  });

  it('should add a country to wishlist', async () => {
    const res = await request(app)
      .post('/api/users/profile/wishlist')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ countryId });
    console.log('Add to wishlist response:', JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body.wishlist).toContain(countryId);
  });

  it('should remove a country from wishlist', async () => {
    // Add to wishlist first
    await request(app)
      .post('/api/users/profile/wishlist')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ countryId });

    const res = await request(app)
      .delete(`/api/users/profile/wishlist/${countryId}`)
      .set('Authorization', `Bearer ${userToken}`);
    console.log('Remove from wishlist response:', JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body.wishlist).not.toContain(countryId);
  });

  it('should add a country to visited countries', async () => {
    const res = await request(app)
      .post('/api/users/profile/visited')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ countryId });
    console.log('Add to visited countries response:', JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body.visitedCountries).toContain(countryId);
  });

  it('should remove a country from visited countries', async () => {
    // Add to visited countries first
    await request(app)
      .post('/api/users/profile/visited')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ countryId });

    const res = await request(app)
      .delete(`/api/users/profile/visited/${countryId}`)
      .set('Authorization', `Bearer ${userToken}`);
    console.log('Remove from visited countries response:', JSON.stringify(res.body, null, 2));
    expect(res.status).toBe(200);
    expect(res.body.visitedCountries).not.toContain(countryId);
  });

  it('should add a comment to a country', async () => {
    const res = await request(app)
      .post('/api/users/profile/comments')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ countryId, text: 'Great country to visit!' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('text', 'Great country to visit!');
    expect(res.body.countryId.toString()).toBe(countryId);
  });

  it('should get user comments', async () => {
    // Add a comment first
    await request(app)
      .post('/api/users/profile/comments')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ countryId, text: 'Another great comment!' });

    const res = await request(app)
      .get('/api/users/profile/comments')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('text');
    expect(res.body[0].countryId.toString()).toBe(countryId);
  });


});