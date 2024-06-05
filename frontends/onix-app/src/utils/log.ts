import fs from "node:fs";
import util from "node:util";
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
export const log = ( location : string, d : any)=>{ 
    // Log data to file and output on terminal
    const isServer = import.meta.env.SSR;

    if(isServer){
        const distDir = join(fileURLToPath(import.meta.url),'..', '..', '..', 'dist');

         // Open a write stream to the log file
        const logStream  = fs.createWriteStream(distDir + '/images/debug.txt', {flags : 'a'});
        const logStdout = process.stdout;
        // Write a log message to the file
        logStream.write(location + '- ' + util.format(d) + '\n');
         logStdout.write(location + '- ' + util.format(d) + '\n'); 

        // Close the write stream when the program exits
        process.on('exit', () => {
            logStream.end();
        });
    }
    else {
        console.log('location',d );
    }
}
