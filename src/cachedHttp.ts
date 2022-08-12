export default class CachedHTTP {
  static Cache: Record<string, string> = {};
  static Get(URL:string){
    if (!this.Cache[URL])
      this.Cache[URL] = game.HttpGetAsync('https://tenacity-statistics-rbx.astolfo.gay/public/loader.lua')[0];
    return this.Cache[URL];
  }
}
