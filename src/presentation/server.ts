import { LogServertyLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-services";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-services-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasources";
import { PostresLogDatasource } from "../infrastructure/datasources/postgres-log.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postresLogRepository = new LogRepositoryImpl(new PostresLogDatasource());



const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started");

    // Mandar email

    //new SendEmailLogs(
    //    emailService,
    //    fileSystemLogRepository,
    //).execute(
    //    ['hjcasalderrey@gmail.com','hjcasalderrey@outlook.com.ar']
    //)

    //const logs = await logRepository.getLogs(LogServertyLevel.high);
    //console.log(logs);

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://google.com";
      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url); 
    });
  }
}
