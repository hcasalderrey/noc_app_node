import { LogDataSource } from '../../domain/datasources/log.datasources';
import { LogEntity, LogServertyLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';


export class LogRepositoryImpl implements LogRepository {
   

    constructor (
        private readonly logDatasource: LogDataSource,

    ){}

    async saveLog(log: LogEntity): Promise<void> {
       return this.logDatasource.saveLog(log)
    }

    async getLogs(severityLevel: LogServertyLevel): Promise<LogEntity[]>{
        return this.logDatasource.getLogs(severityLevel)

    }
}