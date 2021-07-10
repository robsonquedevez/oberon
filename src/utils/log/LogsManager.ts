import fs from 'fs'

class LogsManager {

    public static execute(payload: any): void {
        const msg = Date() + ' - ' + payload;

        fs.writeFileSync(
            'errors-log.log',
            msg+"\n",
            {
                encoding: 'utf-8',
                flag: 'w+'
            }
        );
    }
}

export default LogsManager;