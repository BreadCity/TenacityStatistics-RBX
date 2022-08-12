import { APIClass } from 'api';
import CachedHTTP from 'cachedHttp';
import fs from './fs';

export default class Util {
  /** File-System Stuff */
  static fs = fs;
  /** Raw Queue On Teleport Function */
  _queueOnTeleport = queueonteleport ?? queue_on_teleport ?? syn.queue_on_teleport;
  /** Queued Status */
  _queued = false;
  /** Gets the Loader */
  GetLoader(){
    return CachedHTTP.Get('https://tenacity-statistics-rbx.astolfo.gay/public/loader.lua');
  }
  /** Ensures a directory exists */
  /** Persist Playtime */
  PersistPlaytime(ShouldQueueLoader = true){
    if (this._queued)
      return;
    const qotp = this._queueOnTeleport;
    const write = fs.writefile;

    const FileName = fs.ResolvePathFromPeriodSeperatedValue('TenacityStatistics.Utility.PersistPlaytime.PlaytimeValue');

    if (!qotp)
      return warn('[PersistPlaytime] Feature Unavailable; queueonteleport is nil'); // wow u can detect 0.01% of executors running the script congrats | if anyone actually uses this im moving to messageboxes or custom uis per-error
    if (!fs.rawFs.readfile)
      return warn('[PersistPlaytime] Feature Unavailable; readfile is nil');
    if (!fs.rawFs.writefile)
      return warn('[PersistPlaytime] Feature Unavailable; writefile is nil');

    const LoadPlaytime = `local API = TenacityStatistics;
API:SetTimer(tonumber(API.Utility.fs.readfile('${FileName}')));
API.Utility.fs.rmfile('${FileName}');`;
    if (ShouldQueueLoader)
      qotp(`${this.GetLoader()}
${LoadPlaytime}`);
    else
      qotp(`repeat task.wait(1) until TenacityStatistics;
${LoadPlaytime}`);
    this.api.TimeChanged.Connect((time)=>{
      write(FileName, tostring(time));
    });
    this._queued = true;
  }
  /** Parent Class */
  api: APIClass;
  /** Constructor */
  constructor(API: APIClass){
    this.api = API;
  }
}
