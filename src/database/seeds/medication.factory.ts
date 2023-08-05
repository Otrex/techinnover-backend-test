import { setSeederFactory } from 'typeorm-extension';
import { Medication } from '../entities/Medication.entity';

export default setSeederFactory(Medication, (faker) => {
    const medication = new Medication();
    medication.image = faker.image.avatar();
    medication.name = faker.commerce.productName();
    medication.code = faker.commerce.productName().toUpperCase() + Math.ceil(Math.random() * Math.pow(10, 10));
    medication.weight = faker.number.float({ min: 1, max: 300 })

    return medication;
})