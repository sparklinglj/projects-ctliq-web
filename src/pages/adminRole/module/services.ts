import { AIP_FIX } from '@/constants';
import { ApiUpdateAdminRolePermissionBodyDto, PermissionLabelType } from '@/interface/serverApi';
import { Result, request } from '@/request';
import { Role } from 'interface/serverApi';

/** 权限码列表 */
export const getCodeListApi = () => {
  return request.get<Result<Record<string, Required<PermissionLabelType>>>>(
    `${AIP_FIX}/role/permission/codes`,
  );
};

/** 修改权限 */
export const updateCodeApi = (body: ApiUpdateAdminRolePermissionBodyDto) => {
  return request.put<Result<void>>(`${AIP_FIX}/role/permission/codes`, body);
};

/** 列表 */
export const getListApi = () => {
  return request.post<Result<Role[]>>(`${AIP_FIX}/v1/role/list`);
};

/** 创建 */
export const createApi = (body: Role) => {
  return request.post<Result<void>>(`${AIP_FIX}/v1/role/add`, body);
};

/** 修改 */
export const updateApi = (body: Role) => {
  return request.post<Result<void>>(`${AIP_FIX}/v1/role/update`, body);
};

/** 删除 */
export const removeApi = (id: number | string) => {
  return request.post<Result<void>>(`${AIP_FIX}/v1/role/delete`, { id });
};
