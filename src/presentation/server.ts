import { CheckService } from "../domain/use-cases/checks/check-services"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource(),)
const emailService = new  EmailService()

export class Server {
    public static start () {
        console.log('Server started')

        // Mandar email 

        //new SendEmailLogs(
        //    emailService, 
        //    fileSystemLogRepository,
        //).execute(
        //    ['hjcasalderrey@gmail.com','hjcasalderrey@outlook.com.ar']
        //)
  

        //CronService.createJob(
        // '*/5 * * * * *',
        // () =>{
        //    const url = 'https://localhost:3000'
        //     new CheckService(
        //        fileSystemLogRepository,
        //        () => console.log(`${url} is ok`),
        //        (error) => console.log(error)
        //     ).execute(url)
        //    // new CheckService().execute('http://localhost:3000/')

        // }
        //) 
    }
}