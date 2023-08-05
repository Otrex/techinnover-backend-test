import { AppDataSource } from './database/connection';
import { Drone } from './database/entities/Drone.entity';
import { DroneMedication } from './database/entities/DroneMedication.entity';
import { Medication } from './database/entities/Medication.entity';
import { DroneState } from './database/enum';
import AppError from './lib/errors';
import Validate from './lib/validator';
import { AddDroneRequest, GetDroneRequest, LoadDroneRequest } from './validators';

export default class Service {
  droneRepo = AppDataSource.getRepository(Drone);
  droneMedicationRepo = AppDataSource.getRepository(DroneMedication);
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

  @Validate(GetDroneRequest)
  async getDroneBatteryLevel(params: GetDroneRequest) {
    const drone = await this.droneRepo.findOne({
      where: {
        id: params.droneId,
      },
    });

    if (!drone) throw new AppError(`drone not found`, 404);

    return {
      batteryLevel: drone.batteryCapacity,
    };
  }

  async getAvailableDrones() {
    const drones = await this.droneRepo.find({
      where: {
        state: DroneState.IDLE,
      },
    });

    return { drones };
  }

  async getMedications() {
    const medications = await this.medicationRepo.find({});
    return { medications };
  }

  @Validate(GetDroneRequest)
  async getLoadedDrone(params: GetDroneRequest) {
    // const drone = await this.droneRepo.findOne({
    //   where: {
    //     id: params.droneId
    //   },
    //   relations: [
    //     "load"
    //   ]
    // })

    const drone = await this.droneRepo.createQueryBuilder('drone')
    .leftJoinAndSelect('drone.droneMedications', 'droneMedication')
    .leftJoinAndSelect('droneMedication.medication', 'medication')
    .where('drone.id = :droneId', { droneId: params.droneId })
    .getOne();

    if (!drone) throw new AppError(`drone not found`, 404);

    return { drone }
  }

  @Validate(LoadDroneRequest)
  async loadDrone(params: LoadDroneRequest) {
    //TODO Fetch and calculate the current weight on drone
    const drone = await this.droneRepo.findOne({
      where: {
        id: params.droneId,
      },
    });

    if (!drone) throw new AppError(`drone not found`);
    if (drone.state !== DroneState.IDLE) throw new AppError(`drone is busy`);

    const medicationItems = await Promise.all(
      params.medicationItems.map((id) =>
        this.medicationRepo.findOne({
          where: {
            id,
          },
        })
      )
    );

    const notFoundIndex = medicationItems.findIndex((m) => !m || m === null);
    if (notFoundIndex !== -1) throw new AppError(`medication ${notFoundIndex} not found`);

    // Check if the drone can be loaded with more weight
    const totalWeight = medicationItems.reduce((sum, medication) => sum + medication!.weight, 0);

    if (totalWeight > drone.weightLimit) {
      throw new AppError(`total weight exceeds drone weight limit`);
    }

    // Check if the drone battery level is sufficient for loading
    if (drone.batteryCapacity < 25) {
      throw new AppError(`drone battery level is too low for loading`);
    }

    await Promise.all(
      medicationItems.map((medication) =>
        this.droneMedicationRepo.save({
          drone: drone,
          medication: medication!,
        })
      )
    );

    await this.droneRepo.update(
      {
        id: drone.id,
      },
      {
        state: DroneState.LOADED,
      }
    );
  }
}
