import { CronJob } from 'cron';
import { AppDataSource } from './database/connection';
import { Drone } from './database/entities/Drone.entity';
import { DroneAuditLog } from './database/entities/DroneAuditLog.entity';

const createAuditLog = async (drone: Drone) => {
  const auditLogRepo = AppDataSource.getRepository(DroneAuditLog);
  const log = auditLogRepo.create({
    batteryLevel: drone.batteryCapacity,
    drone,
  })
  await auditLogRepo.save(log);
}

const periodicBatteryCheck = async () => {
  const droneRepo = AppDataSource.getRepository(Drone);
  const drones = await droneRepo.find({})

  for (const drone of drones) {
    await createAuditLog(drone)
  }
}

export const cron = new CronJob('* * * * *', async () => {
  try {
    console.log("- Checking battery level...")
    await periodicBatteryCheck();
  } catch (err: any) {
    console.error(err);
  }
});
