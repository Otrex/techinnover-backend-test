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

const cron = new CronJob('0 */1 * * *', async () => {
  try {
    await periodicBatteryCheck();
  } catch (err: any) {
    console.error(err);
  }
});

const run = () => {
  if (require.main === module) {
    try {
      cron.start();
      return cron;
    } catch (e) {
      console.error(e);
    } finally {
      process.exit(0);
    }
  }
};

export default run();