import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { spawn } from 'child_process';
import path from 'path';
export async function PressSwitch(req: Request, res: Response): Promise<void> {

  try {
    const mac = req.body.mac;
    const macformat = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;
    const pythonFile = path.join(__dirname + "/switchbot.py");
    if (macformat.test(mac)) {
      const process = spawn("python", [pythonFile, mac, "Bot", "Press"]);
      process.stdout.on("data", function (data: any) {
        console.log(data.toString());
        const dOUt = data.toString();
        if (dOUt.includes("TIMEDOUT")) {
          res.status(StatusCodes.OK).json('{"result":"Cannot connect to switchbot! Connection TimedOut!"}');
        } else if (dOUt.includes("Complete")) {
          res.status(StatusCodes.OK).json('{"result":"Success"}');
        } else {
          res
            .status(StatusCodes.BAD_REQUEST)
            .send(
              '{"result":"Switchbot cannot find. Cannot trigger Switchbot!"}'
            );
        }
      });

      process.stdout.on('error', (err) => {
        console.error(err);
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).send('{"result":"Unknown Mac Address format!"}');
    }
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send(error);
  }

}