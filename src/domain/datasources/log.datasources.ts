import { LogEntity, LogServertyLevel } from "../entities/log.entity";


export abstract class LogDataSource {
    abstract saveLog (log: LogEntity): Promise<void>
    abstract getLogs (severityLevel: LogServertyLevel): Promise<LogEntity[]>

}