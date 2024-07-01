import { AIP_FIX } from '@/constants';
import { ListResult, Result, request } from '@/request';
import { MovingSiteVo, Pages, RPageRtdataMovingSite } from 'interface/serverApi';

/** 列表 */
export const getListApi = (page: Pages = {}) => {
  return request.post<ListResult<MovingSiteVo>>(`${AIP_FIX}/v1/movingsite/list`, { page });
};

/** 位置列表 */
export const getPosListApi = (movingSiteId: number, page?: Pages) => {
  return request.post<RPageRtdataMovingSite>(`${AIP_FIX}/v1/rtdatamovingsite/list`, {
    movingSiteId,
    page,
  });
};

/** 详情 */
export const getDetailApi = (movingSiteId: number) => {
  return request.post<Result<MovingSiteVo>>(`${AIP_FIX}/v1/movingsite/get`, { movingSiteId });
};
