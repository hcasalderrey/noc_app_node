import { PrismaClient, SeverityLevel } from "@prisma/client"
import { LogDataSource } from "../../domain/datasources/log.datasources"
import { LogEntity, LogServertyLevel } from "../../domain/entities/log.entity"

const prisma = new PrismaClient()

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostresLogDatasource implements LogDataSource {

   
    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level]

        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: level,
            }
        }) 
    }

    async getLogs(severityLevel: LogServertyLevel): Promise<LogEntity[]> {  
        const level = severityEnum[severityLevel]
        const logs = await prisma.logModel.findMany({
            where: {
                level: level
            }
        })
        return logs.map( Postres => LogEntity.fromObjetct(Postres))
    }

}