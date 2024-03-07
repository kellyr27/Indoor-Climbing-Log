const request = require('supertest');
const app = require('../server.js');
const Ascent = require('../models/Ascent');
const Route = require('../models/Route');


jest.mock('../models/Route');
jest.mock('../models/Ascent');

describe('POST /ascents', () => {

    it('should create a new ascent and return 201 status code', async () => {

        const newAscent = {
            Date: '2021-01-01T00:00:00.000Z',
            TickType: 'Flash',
            RouteName: 'Test Route Name',
            RouteGrade: 21,
            RouteColour: 'red',
            Notes: 'Test notes'
        }

        Ascent.create.mockResolvedValue(newAscent);

        const response = await request(app)
            .post('/ascents')
            .send(newAscent);

        expect(response.statusCode).toBe(201);
        // expect(response.body).toEqual(newAscent);
    })

})