import { assert } from 'chai';
import supertest from 'supertest';
import app from '@/app';
import { faker } from '@faker-js/faker';
import { documentation } from '../setup';
import { DroneModel } from '@/database/enum';

const server = supertest.agent(app);

describe('Dispatcher Test E2E', () => {
  let droneId: string;
  let medications: Record<string, any>[];

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

  describe('Get Available Drone', () => {
    it('should get available drones', async () => {
      const res = await server.get(`/api/drones/available`);

      if (res.error) console.log(res.error);

      assert.equal(res.statusCode, 200);

      droneId = faker.helpers.arrayElement<any>(res.body.drones)?.id;
      documentation.addEndpoint(res, {
        tags: ['Drone'],
      });
    });
  });

  describe('Get Drone Battery Capacity', () => {
    it('should get available drones', async () => {
      const res = await server.get(`/api/drones/${droneId}/battery-level`);

      if (res.error) console.log(res.error);

      assert.equal(res.statusCode, 200);
      documentation.addEndpoint(res, {
        tags: ['Drone'],
      });
    });
  });

  describe('Get Medications', () => {
    it('should get medications', async () => {
      const res = await server.get(`/api/medications`);

      if (res.error) console.log(res.error);

      assert.equal(res.statusCode, 200);
      medications = res.body.medications;
      documentation.addEndpoint(res, {
        tags: ['Medications'],
      });
    });
  });

  describe('Load Medications', () => {
    it('should load medications to drone', async () => {
      const res = await server.post(`/api/drones/${droneId}/load`).send({
        medicationItems: faker.helpers.arrayElements(
          medications.filter((m) => m.weight < 260).map(m => m.id),
          3
        )
      });

      if (res.error) console.log(res.error);

      assert.equal(res.statusCode, 200);
      documentation.addEndpoint(res, {
        tags: ['Medications'],
      });
    });

    it('should get medications loaded to drone', async () => {
      const res = await server.get(`/api/drones/${droneId}/medications`)

      if (res.error) console.log(res.error);
      console.log(res.body);
      
      assert.equal(res.statusCode, 200);
      documentation.addEndpoint(res, {
        tags: ['Medications'],
      });
    });
  });
});
