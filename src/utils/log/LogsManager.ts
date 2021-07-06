import fs from 'fs'

class LogsManager {

    public static execute(payload: any): void {
        fs.writeFileSync(
            '../../../errors-log.log',
            payload+"\n",
            {
                encoding: 'utf-8',
                flag: 'w+'
            }
        );
    }
}

export default LogsManager;