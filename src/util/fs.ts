export class rawFs {
  /** Read File Function */
  static readfile = readfile;
  /** Write File Function */
  static writefile = writefile;
  /** Make a folder */
  static mkdir = makefolder;
  /** Does a folder exist */
  static isdir = isfolder;
  /** Does a file exist */
  static isfile = isfile;
  /** Remove a file */
  static rmfile = delfile;
  /** Remove a folder */
  static rmdir = delfolder;
}
export class fsClass {
  /** Raw FS Functions */
  rawFs = rawFs;
  /** Safely & Recursively make a folder | will do nothing if folders are not supported */
  mkdir = (...parts:string[])=>{
    if (rawFs.mkdir as unknown) {
      const current = [];
      for (const partgroup of parts)
        for (const part of partgroup.split('/')) {
          current.push(part);
          rawFs.mkdir(current.join('/'));
        }
    }
  };
  /** Does a folder exist | Returns true if folders are not supported, as readfile/writefile will still safely read/write */
  isdir = (path: string)=>{
    if (rawFs.isdir as unknown) {
      path = this.ResolvePath(...path.split('/'));
      return this.isdir;
    } else
      return true;
  };
  /** Read a file */
  readfile = (path: string)=>{
    path = this.ResolvePath(...path.split('/'));
    return rawFs.readfile(`${path}.txt`); // Synapse-X v3 only supports certain extensions so rip
  };
  /** Write a file | If the parent folder does not exist, make it */
  writefile = (path: string, contents: string)=>{
    path = this.ResolvePath(...path.split('/'));
    if (path.find('/')[0]){
      const split = path.split('/');
      split.pop();
      this.mkdir(...split);
    }
    return rawFs.writefile(`${path}.txt`, contents); // Synapse-X v3 only supports certain extensions so rip
  };
  /** Delete a file | Does nothing if delfile is not defined | Does nothing if isfile exists and the file doesn't */
  rmfile = (path: string)=>{
    path = this.ResolvePath(...path.split('/'));
    if (rawFs.rmfile as unknown && (rawFs.isfile as unknown ? rawFs.isfile(path) : true))
      return rawFs.rmfile(`${path}.txt`); // Synapse-X v3 only supports certain extensions so rip
  };
  /** Checks if the executor supports directories */
  SupportsDirectories(){
    const mkdir: unknown = rawFs.mkdir, isdir: unknown = rawFs.isdir;
    const dirSupport = mkdir && isdir;
    return dirSupport;
  }
  /** Resolves a path, depending on if folders are supported */
  ResolvePath(...parts: string[]){
    if (this.SupportsDirectories())
      return parts.join('/');
    else
      return parts.join('.');
  }
  /** Converts period-seperated path to slash-seperated one if dirs are available */
  ResolvePathFromPeriodSeperatedValue(name: string){
    return this.ResolvePath(...name.split('.'));
  }
  /** {@link ResolvePathFromPeriodSeperatedValue} but for slashes; makes it safe for non-folder-envs */
  MakePathSafe(name: string){
    return this.ResolvePath(...name.split('/'));
  }
}
export const fs = new fsClass;
export default fs;
