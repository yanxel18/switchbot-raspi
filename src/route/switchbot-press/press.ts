import {
    StatusCodes
} from 'http-status-codes';
import {
    Request,
    Response
} from 'express';
import {
    spawn
} from 'child_process';
import path from 'path';
export function PressSwitch(req: Request, res: Response): void {

    try {
        const mac: string = req.body.mac;
        const macformat = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
        const pythonFile = path.join(__dirname + "/switchbot.py");
        if (macformat.test(mac)) {
            const process = spawn("python", [pythonFile, "-d", mac, "-c", "press"]);
            process.stdout.on('data', (data: string) => {
                const dOUt = data.toString();
                if (dOUt.includes("Complete")) {
                    res.status(StatusCodes.OK).json('{"result":"Success"}');
                    res.end();
                }
            });


            process.on('close', (err) => {
                if (err) {
                    if (err.toString() == "1") {
                        res
                            .status(StatusCodes.BAD_REQUEST)
                            .send(
                                '{"result":"Switchbot cannot find. Cannot trigger Switchbot!"}'
                            );
                    }
                }
            });
        } else {
            res.status(StatusCodes.BAD_REQUEST).send('{"result":"Unknown Mac Address format!"}');
        }
    } catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }

}