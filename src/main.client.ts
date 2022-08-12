import api, { APIClass } from 'api';

if (!getgenv()._do_not_globally_expose_tenacity_statistics){
  getgenv().TenacityStatistics = api;
  getgenv().__TenacityStatisticsClass = APIClass;
}
