import { APIClass } from 'api';

export default class Util {
  /** Persist Playtime */
  PersistPlaytime(){
    error('Not Implemented!');
  }
  /** Parent Class */
  api: APIClass;
  /** Constructor */
  constructor(API: APIClass){
    this.api = API;
  }
}
