export enum LogServertyLevel {
    low     = 'low',
    medium  = 'medium',
    high    = 'high'
}

export class LogEntity {
    public level: LogServertyLevel; //Enum
    public message: string;
    public createdAt: Date;

    constructor (message:string , level: LogServertyLevel) {
        this.message  = message;
        this.level = level;
        this.createdAt = new Date()
    }

    static fromJson = (json:string):LogEntity =>{
      const {message, level, createdAt} =   JSON.parse(json)

      if(!message) throw new Error('Message is required') 


      const log = new LogEntity (message, level)
      log.createdAt = new Date(createdAt)

      return log

    }
}