import { Router } from "express";

const router = Router();

// Register a new drone
router.post('/drones', (req, res) => {
  
});

// Load medication items into a drone
router.post('/drones/:drone_id/load', (req, res) => {
  
});

// Retrieve loaded medication items for a given drone
router.get('/drones/:drone_id/loaded-medications', (req, res) => {
  
});

// Get a list of available drones for loading
router.get('/drones/available-for-loading', (req, res) => {
  
});

// Get the battery level for a given drone
router.get('/drones/:drone_id/battery-level', (req, res) => {
  
});