import config from "@/config"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource(config.database)