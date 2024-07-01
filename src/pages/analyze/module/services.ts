import { AIP_FIX } from '@/constants';
import { ListResult, request } from '@/request';
import {
  ControlFixedSite,
  ControlMovingSite,
  ControlMovingSiteListQuery,
  EventFixedSite,
  EventFixedSiteListQuery,
  EventMovingSite,
  EventMovingSiteListQuery,
  LoadFixedSiteListQuery,
  RPageLoadFixedSite,
} from 'interface/serverApi';

export interface LoggerItem {
  context: string;
  level: string;
  message: string;
  trace: string;
}

/** 站点报警记录列表 */
export const getSiteEventLoggerListApi = (body: EventFixedSiteListQuery) => {
  return request.post<ListResult<EventFixedSite>>(`${AIP_FIX}/v1/eventfixedsite/list`, body);
};

/** 确认站点报警事件 */
export const confirmSiteEventApi = (body: EventFixedSite) => {
  return request.post<ListResult<void>>(`${AIP_FIX}/v1/eventfixedsite/update`, body);
};

/** 获取下发站点指令列表 */
export const getSiteCmdLoggerListApi = (body: EventFixedSiteListQuery) => {
  return request.post<ListResult<ControlFixedSite>>(`${AIP_FIX}/v1/controlfixedsite/list`, body);
};

/** 车辆报警记录列表 */
export const getCareEventLoggerListApi = (body: EventMovingSiteListQuery) => {
  return request.post<ListResult<EventMovingSite>>(`${AIP_FIX}/v1/eventmovingsite/list`, body);
};

/** 车辆指令记录列表 */
export const getCarCmdLoggerListApi = (body: ControlMovingSiteListQuery) => {
  return request.post<ListResult<ControlMovingSite>>(`${AIP_FIX}/v1/controlmovingsite/list`, body);
};

/** 确认车辆报警事件 */
export const confirmCarEventApi = (body: EventMovingSite) => {
  return request.post<ListResult<void>>(`${AIP_FIX}/v1/eventmovingsite/update`, body);
};

/** 装车记录 */
export const siteCarLoggerApi = (body: LoadFixedSiteListQuery) => {
  return request.post<RPageLoadFixedSite>(`${AIP_FIX}/v1/loadfixedsite/list`, body);
};
