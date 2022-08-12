import api, { APIClass } from 'api';

let genv = getgenv;
if (!genv)
// @ts-ignore
  genv = ()=>_G;

if (!genv()._do_not_globally_expose_tenacity_statistics){
  genv().TenacityStatistics = api;
  genv().__TenacityStatisticsClass = APIClass;
}
