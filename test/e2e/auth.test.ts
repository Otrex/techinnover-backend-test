import { assert } from 'chai';
import supertest from 'supertest';
import app from '@/app';
import { faker } from '@faker-js/faker';
import { documentation } from '../setup';
import { DroneModel } from '@/database/enum';

const server = supertest.agent(app);

describe('Dispatcher Test E2E', () => {
  describe('Register Drone', () => {
    it('should register a drone', async () => {
      const res = await server.post(`/api/drones`).send({
        model: faker.helpers.enumValue(DroneModel),
        serialNumber: faker.airline.flightNumber({ length: 100 }),
      });

      if (res.error) console.log(res.error);

      assert.equal(res.statusCode, 201);
      documentation.addEndpoint(res, {
        tags: ['Drone'],
      });
    });
  });
});
