import { AIP_FIX } from '@/constants';
import { ListResult, Result, request } from '@/request';
import {
  ControlFixedSite,
  FixedSiteVo,
  LoadFixedSite,
  PageRtdataFixedSite,
  Pages,
} from 'interface/serverApi';

/** 列表 */
export const getListApi = (page: Pages = {}) => {
  return request.post<ListResult<FixedSiteVo>>(`${AIP_FIX}/v1/fixedsite/list`, { page });
};

/** 拉油点日志列表 */
export const getSiteLogApi = (fixedSiteId: number, page?: Pages) => {
  return request.post<ListResult<LoadFixedSite>>(`${AIP_FIX}/v1/loadfixedsite/list`, {
    fixedSiteId,
    page,
  });
};

/** 曲线 */
export const getSiteDotLogApi = (fixedSiteId: number, page?: Pages) => {
  return request.post<Result<PageRtdataFixedSite>>(`${AIP_FIX}/v1/rtdatafixedsite/list`, {
    fixedSiteId,
    page,
  });
};

/** 详情 */
export const getDetailApi = (fixedSiteId: string) => {
  return request.post<Result<FixedSiteVo>>(`${AIP_FIX}/v1/fixedsite/get`, {
    fixedSiteId: Number(fixedSiteId),
  });
};

/** 更新详情 */
export const updateApi = (body: FixedSiteVo) => {
  return request.post<Result<FixedSiteVo>>(`${AIP_FIX}/v1/fixedsite/update`, body);
};

/** 修改命令 */
export const updateCMDApi = (fixedSiteId: number, body: ControlFixedSite) => {
  return request.post<Result<FixedSiteVo>>(`${AIP_FIX}/v1/controlfixedsite/add`, {
    fixedSiteId,
    setState: body.setState,
    setLock: body.setLock,
    setUrgLock: body.setUrgLock,
    employeeId: body.employeeId,
  });
};
