import { setSeederFactory } from 'typeorm-extension';
import { Drone } from '../entities/Drone.entity';
import { DroneModel } from '../enum';

export default setSeederFactory(Drone, (faker) => {
  const drone = new Drone();
  drone.model =faker.helpers.enumValue(DroneModel);
  drone.serialNumber = faker.airline.flightNumber({ length: 100 });
  return drone;
});
