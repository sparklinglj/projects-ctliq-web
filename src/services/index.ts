import { TOKEN_COOKIE_KEY } from '@/constants';
import { ModelAdminUser } from '@/interface/serverApi';
import { AIP_FIX, ListResult, Result, request } from '@/request';
import { AxiosProgressEvent } from 'axios';
import {
  ApiCreateCaptchaBodyDto,
  Region,
  RegionResource,
  UrlResource,
  WorkTeam,
} from 'interface/serverApi';

/** 获取当前登录用户信息 */
export const getUserInfo = () => {
  return request.get<Result<ModelAdminUser>>(`${AIP_FIX}/user/current`, { ignoreNotice: true });
};

/** 退出登录 */
export const outLogin = () => {
  localStorage.removeItem(TOKEN_COOKIE_KEY);
  return Promise.resolve();
};

/** 文件上传 */
export const uploadFile = (
  file: File,
  options?: { onUploadProgress?: (p: AxiosProgressEvent) => void },
) => {
  const formData = new FormData();
  formData.append('file', file);
  return request.post<Result<string>>(`${AIP_FIX}/user/upload`, formData, {
    onUploadProgress: options?.onUploadProgress,
  });
};

/** 获取图片验证码 */
export const getImageCaptchaCode = () => {
  return request.get<Result<string>>(`/api/captcha/image`);
};

/** 发送验证码 */
export const sendCaptcha = (body: ApiCreateCaptchaBodyDto) => {
  return request.post<Result<void>>(`/api/captcha`, body);
};

/** 发送手机号验证码 */
export const sendSmsCode = (phone: string, scenes: number) => {
  return request.post<Result<void>>(`/api/captcha`, { phone, scenes, type: 1 });
};

/** 发送邮箱验证码 */
export const sendEmailCode = (email: string) => {
  return request.post<Result<void>>(`${AIP_FIX}/send-validate-code/forget-password`, { email });
};

/** 获取车队列表 */
export const getWorkteamList = () => {
  return request.post<ListResult<WorkTeam>>(`${AIP_FIX}/v1/workteam/list`);
};

/** 获取工区列表 */
export const getRegionList = () => {
  return request.post<ListResult<Region>>(`${AIP_FIX}/v1/region/list`);
};

/** 获取权限列表 */
export const getPermissionUrlList = () => {
  return request.post<Result<UrlResource[]>>(`${AIP_FIX}/v1/urlresource/list`);
};

/** 获取站点权限列表 */
export const getPermissionRegionList = () => {
  return request.post<Result<RegionResource[]>>(`${AIP_FIX}/v1/regionresource/list`);
};
