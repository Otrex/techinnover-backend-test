import { Router } from 'express';
import Service from './service';

const service = new Service();
const router = Router();

// Register a new drone
router.post('/drones', async (req, res, next) => {
  try {
    const data = await service.addDrone({
      ...req.body,
    });
    return res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

// Load medication items into a drone
router.post('/drones/:drone_id/load', (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// Retrieve loaded medication items for a given drone
router.get('/drones/:drone_id/loaded-medications', (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

// Get a list of available drones for loading
router.get('/drones/available', async (req, res, next) => {
  try {
    const data = await service.getAvailableDrones();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

// Get the battery level for a given drone
router.get('/drones/:drone_id/battery-level', (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
