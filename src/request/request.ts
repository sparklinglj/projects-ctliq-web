import { TOKEN_COOKIE_KEY } from '@/constants';
import { notification } from '@/utils/notice';
import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';
import { history } from 'umi';

export interface CustomConfig extends AxiosRequestConfig {
  // 请求错误时不弹出错误提示
  ignoreNotice?: boolean;
  // 身份过期不跳转登录页
  ignoreLogin?: boolean;
}

const request = axios.create({
  baseURL: '/',
  // transformResponse: [
  //   // (data) => {
  //   //   try {
  //   //     // 如果转换成功则返回转换的数据结果
  //   //     return jsonBig.parse(data);
  //   //   } catch (err) {
  //   //     // 如果转换失败，则包装为统一数据格式并返回
  //   //     return data;
  //   //   }
  //   // },
  // ],
});

const ignoreLoginPaths = [].map((p) => `${p}`);

/** 请求拦截 */
request.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_COOKIE_KEY);
  // const username = localStorage.getItem(USERNAME_KEY);
  if (token) {
    // @ts-ignore
    config.headers.set(TOKEN_COOKIE_KEY, token);
    // config.headers.set(USERNAME_KEY, decodeURIComponent(username || ''));
  }
  return config;
});

/** 响应拦截 */
request.interceptors.response.use(
  (response) => {
    const data = response.data;
    const config = (response.config as CustomConfig) || {};
    if (data.code !== 200) {
      // 是否忽略错误提示
      if (!config.ignoreNotice && data.code !== 403 && data.code !== 401) {
        notification.error({ message: data.message || '服务异常' });
      }
      // 是否忽略身份过期跳转登录页
      if (
        !config.ignoreLogin &&
        data.code === 401 &&
        !ignoreLoginPaths.includes(history.location.pathname)
      ) {
        history.push('/login');
      }
    }
    return Promise.resolve(response);
  },
  (error) => {
    const response = error.response || {};
    const config = (response.config as CustomConfig) || {};
    const data = response.data || {};

    if (response.status === 504) {
      message.error('请求超时');
      return Promise.reject(response);
    }

    // 忽略身份过期重定向
    if (data.code !== 200) {
      // 是否忽略错误提示
      if (!config.ignoreNotice && data.code !== 403 && data.code !== 401) {
        notification.error({ message: data.message || '服务异常' });
      }
      // 是否忽略身份过期跳转登录页
      if (
        !config.ignoreLogin &&
        data.code === 401 &&
        !ignoreLoginPaths.includes(history.location.pathname)
      ) {
        history.push('/login');
      }
    }
    return Promise.reject(error);
  },
);

class Request {
  get<T>(url: string, config?: CustomConfig) {
    return request.get<T>(url, config);
  }
  post<T>(url: string, data?: Record<string, any>, config?: CustomConfig) {
    return request.post<T>(url, data, config);
  }
  put<T>(url: string, data: Record<string, any>, config?: CustomConfig) {
    return request.put<T>(url, data, config);
  }
  delete<T>(url: string, config?: CustomConfig) {
    return request.delete<T>(url, config);
  }
}

export async function awaitRequest<T, E = any>(
  promiseFn: () => Promise<any>,
): Promise<[E | null, T | null]> {
  try {
    const result = await promiseFn();
    return [null, result];
  } catch (err: any) {
    return [err, null];
  }
}

export default new Request();
