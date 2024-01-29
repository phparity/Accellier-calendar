export default class ConsoleLogger {
    log(message, ...optionalParam) {
      console.log(message, ...optionalParams);
    }
  
    warn(message, ...optionalParam) {
      console.warn(message, ...optionalParams);
    }
  
    error(message, ...optionalParam) {
      console.error(message, ...optionalParams);
    }
  }