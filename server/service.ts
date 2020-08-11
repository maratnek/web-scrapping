import * as Service from './scrap-service';
import * as Fastify from "./test";

export class CsvHandler {
  handler(stream: string) {
    //getOrderByUrl(stream);
    console.log(Fastify.maxThing);
    console.log(Fastify.getArrayLength(['car', 'Bar']));
    let url = "http://google.com";
    console.log(Service.getOrderByUrl(url))
    
    console.log('handle', stream);
  } 
};

import stream from 'stream'

export class CsvStream extends stream.Readable {
    //const _data : string;
    // _write(ch : any, enc : any, next: any) {
    //     console.log('My stream', ch.toString());
    //     next();
    // }
}