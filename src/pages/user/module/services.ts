import { ADMIN_USER_STATUS_ENUM, AIP_FIX } from '@/constants';
import { ListResult, Pagination, Result, request } from '@/request';
import { Employee, RoleBind } from 'interface/serverApi';

/** 用户列表 */
export const getUserList = (query?: Pagination & { keyword?: string }) => {
  return request.post<ListResult<Employee>>(`${AIP_FIX}/v1/employee/list`, {
    params: {
      ...query,
    },
  });
};

/** 封禁/解封 */
export const updateStatus = (id: number, status: ADMIN_USER_STATUS_ENUM) => {
  return request.put<Result<void>>(`${AIP_FIX}/c-user/status`, {
    status,
    id,
  });
};

/** 绑定角色 */
export const bindRole = (body: RoleBind) => {
  return request.post<Result<void>>(`${AIP_FIX}/v1/bind/add`, body);
};

/** 删除绑定 */
export const bindRoleRemove = (body: RoleBind) => {
  return request.post<Result<void>>(`${AIP_FIX}/v1/bind/delete`, body);
};

export const bindRoleList = (body: RoleBind) => {
  return request.post<Result<RoleBind[]>>(`${AIP_FIX}/v1/bind/list`, body);
};

/** 创建 */
export const createUser = (body: Employee) => {
  return request.post<Result<void>>(`${AIP_FIX}/v1/employee/add`, body);
};

/** 修改 */
export const updateUser = (body: Employee) => {
  return request.post<Result<void>>(`${AIP_FIX}/v1/employee/update`, body);
};
/** 修改 */
export const deleteUser = (body: Employee) => {
  return request.post<Result<void>>(`${AIP_FIX}/v1/employee/delete`, body);
};
