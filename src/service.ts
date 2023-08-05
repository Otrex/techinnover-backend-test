import { AppDataSource } from './database/connection';
import { Drone } from './database/entities/Drone.entity';
import { LoadedDrone } from './database/entities/LoadedDrone.entity';
import { Medication } from './database/entities/Medication.entity';
import { DroneState } from './database/enum';
import AppError from './lib/errors';
import Validate from './lib/validator';
import { AddDroneRequest } from './validators';

export default class Service {
  droneRepo = AppDataSource.getRepository(Drone);
  loadedDroneRepo = AppDataSource.getRepository(LoadedDrone);
  medicationRepo = AppDataSource.getRepository(Medication);

  @Validate(AddDroneRequest)
  async addDrone(params: AddDroneRequest) {
    let drone = await this.droneRepo.findOne({
      where: { serialNumber: params.serialNumber },
    });

    if (drone) throw new AppError('drone already exists');

    drone = await this.droneRepo.save({
      ...params,
    });

    return { drone };
  }

  async getAvailableDrones() {
    const drones = await this.droneRepo.find({
      where: {
        state: DroneState.IDLE
      }
    })

    return { drones };
  }
}
