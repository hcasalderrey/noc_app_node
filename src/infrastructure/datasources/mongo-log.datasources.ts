import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogServertyLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDataSource {


    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log)
    }

    async getLogs(severityLevel: LogServertyLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        })
        return logs.map( mongoLog => LogEntity.fromObjetct(mongoLog))
    }

}