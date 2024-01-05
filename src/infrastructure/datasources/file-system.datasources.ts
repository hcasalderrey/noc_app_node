import fs from 'fs'

import { LogDataSource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogServertyLevel } from "../../domain/entities/log.entity";


export class FileSystemDatasource implements LogDataSource {

    private readonly logPath = 'logs/'
    private readonly allLogsPath    = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath   = 'logs/logs-high.log'

    constructor () {
        this.createLogsFiles()
    }

    private createLogsFiles = () =>{
        if(!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path=>{
            if(fs.existsSync(path)) return 

            fs.writeFileSync(path,'')
        })
        
    }


    async saveLog(newlog: LogEntity): Promise<void> {
        
        const logAsJson = `${JSON.stringify(newlog)}\n`
        
        fs.appendFileSync(this.allLogsPath ,logAsJson)

        if(newlog.level === LogServertyLevel.low) return

        if(newlog.level === LogServertyLevel.medium)
        {
            fs.appendFileSync(this.mediumLogsPath ,logAsJson)
        }
        else
        {
            fs.appendFileSync(this.highLogsPath ,logAsJson)
        }

    }

    private getLogsFromFile  = (path: string):LogEntity[] =>{
        const content  = fs.readFileSync(path, 'utf-8')
        const logs:LogEntity[]  = content.split('\n').map(log =>LogEntity.fromJson(log))

        return logs
    }

    async getLogs(severityLevel: LogServertyLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogServertyLevel.low:
                return this.getLogsFromFile(this.allLogsPath)
             
            case LogServertyLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath)
            
            case LogServertyLevel.high:
                return this.getLogsFromFile(this.highLogsPath)
             

            default:
                throw new Error (`${severityLevel} not implemented`)
                break;
        }
    }

}