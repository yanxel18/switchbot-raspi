import './pre-start'; // Must be the first import
import app from './Server';
import logger from 'jet-logger';
import cluster from 'cluster';
import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { cpus } from 'os';  
const cpuCount = cpus().length;
if (cluster.isMaster){
    for (var i = 0; i < cpuCount; i++) cluster.fork(); 
    cluster.on('exit',function(worker,code,signal){
        cluster.fork();
    })
}else{
// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

}