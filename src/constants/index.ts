import { customTheme } from '@/theme';
import { TypeValue } from '@/types';
/** 用户登录后储存在 cookie 中的 token */
export const TOKEN_COOKIE_KEY = 'X-Auth-Token';
export const USERNAME_KEY = 'X-Auth-Employee';

export * from './carLogger';
export * from './siteLogger';

/** API 请求前缀 */
export const AIP_FIX = '/api';

/** 瓦片图 */
// export const MAP_TILE_URL = 'http://127.0.0.1:8080/roadmap/{z}/{x}/{y}.png';
export const MAP_TILE_URL = '/roadmap/{z}/{x}/{y}.png';

/** 发送验证码类型 */
export const SEND_VALIDATE_CODE_TYPE = {
  SMS: {
    value: 1,
    label: '手机短信',
  },
  EMAIL: {
    value: 2,
    label: '邮箱',
  },
} as const;

export type SEND_VALIDATE_CODE_TYPE_ENUM = TypeValue<typeof SEND_VALIDATE_CODE_TYPE>['value'];

export const SEND_TYPE = {
  REGISTER: {
    value: 1,
    label: '注册',
  },
  NOPASSWORD: {
    value: 2,
    label: '忘记密码',
  },
  UPDATE_PHONE: {
    value: 3,
    label: '更新手机号',
  },
  UPDATE_EMAIL: {
    value: 4,
    label: '更新邮箱',
  },
} as const;

export type SEND_TYPE_ENUM = TypeValue<typeof SEND_TYPE>['value'];

/** 部门 */
export const DEPARTMENT = {
  KONG_JIAN_DIAN_ZI: {
    value: '1',
    label: '空间电子',
  },
  JUN_GONG_DIAN_ZI: {
    value: '2',
    label: '军工电子',
  },
  TE_ZHONG_GONG_YE_DIAN_ZI: {
    value: '3',
    label: '特种工业电子',
  },
  XIN_XIN_AN_QUAN_YU_ZHONG_DUAN: {
    value: '4',
    label: '信息安全与加固终端',
  },
  CAO_ZUO_XI_TONG: {
    value: '5',
    label: '新兴领域',
  },
  XIN_XING_YE: {
    value: '6',
    label: '新兴业',
  },
} as const;
/** 部门类型 */
export type DEPARTMENT_TYPE = TypeValue<typeof DEPARTMENT>['value'];
export const DEPARTMENT_VALUES = [...Object.values(DEPARTMENT).map((i) => i.value)];

/** 学历 */
export const EDUCATION = {
  A: {
    value: '1',
    label: '小学',
  },
  B: {
    value: '2',
    label: '初中',
  },
  C: {
    value: '3',
    label: '高中',
  },
  D: {
    value: '4',
    label: '大专',
  },
  E: {
    value: '5',
    label: '本科',
  },
  F: {
    value: '6',
    label: '研究生',
  },
  G: {
    value: '7',
    label: '博士',
  },
} as const;

/** 学历类型 */
export type EDUCATION_TYPE = TypeValue<typeof EDUCATION>['value'];

/** 广告位状态 */
export const BANNER_STATUS = {
  NORMAL: {
    value: '1',
    label: '正常',
    color: 'success',
  },
  BAN: {
    value: '0',
    label: '下架',
    color: 'error',
  },
} as const;
export type BANNER_STATUS_TYPE = TypeValue<typeof BANNER_STATUS>['value'];

/** 广告位位置 */
export const BANNER_POSITION = {
  HOME: {
    value: 'home',
    label: '首页',
  },
} as const;
export type BANNER_POSITION_TYPE = TypeValue<typeof BANNER_POSITION>['value'];

/** 新闻类型 */
export const NEWS_TYPE = {
  COM: {
    value: '1',
    label: '公司新闻',
  },
  HANGYE: {
    value: '2',
    label: '行业动态',
  },
  DANGQUN: {
    value: '3',
    label: '党群建设',
  },
} as const;
export type NEWS_TYPE_ENUM = TypeValue<typeof NEWS_TYPE>['value'];

/** 友情链接类型 */
export const FRIENDLINK_TYPE = ['股东', '下属事业部'];

/** 公司信息 */
export const COMINFO_TYPE = {
  INTRODUCE: {
    value: 'introduce',
    label: '公司介绍',
  },
  LI_CHENG: {
    value: 'licheng',
    label: '发展历程',
  },
  JING_ZHNEG_LI: {
    value: 'jingzhengli',
    label: '核心竞争力',
  },
} as const;
export type COMINFO_TYPE_ENUM = TypeValue<typeof COMINFO_TYPE>['value'];

/** 应用案例类型 */
export const CASE_TYPE = {
  KONG_JIAN_ZHAN: {
    value: '1',
    label: '空间站',
  },
  WEI_XING: {
    value: '2',
    label: '卫星',
  },
  YUN_ZAI_HUO_JIAN: {
    value: '3',
    label: '运载火箭',
  },
  DAO_DAN: {
    value: '4',
    label: '导弹',
  },
  JI_ZAI: {
    value: '5',
    label: '机载',
  },
  TE_ZHONG_CHE_LIANG: {
    value: '6',
    label: '特种车辆',
  },
  JIAN_CHUAN: {
    value: '7',
    label: '舰船',
  },
  ZHI_NENG_CE_SHI: {
    value: '8',
    label: '智能测试',
  },
} as const;
export type CASE_TYPE_ENUM = TypeValue<typeof CASE_TYPE>['value'];

/** 留言状态 */
export const COMMENTS_STATUS = {
  UNSOLVED: {
    value: '0',
    label: '未解决',
  },
  SOLVE: {
    value: '1',
    label: '已解决',
  },
} as const;
export type COMMENTS_STATUS_ENUM = TypeValue<typeof COMMENTS_STATUS>['value'];

/** 用户状态 */
export const ADMIN_USER_STATUS = {
  NORMAL: {
    value: 1,
    label: '正常',
    action: '解封',
    color: customTheme.colorSuccess,
  },
  LOCK: {
    value: -1,
    label: '封禁',
    action: '封禁',
    color: customTheme.colorError,
  },
} as const;
export type ADMIN_USER_STATUS_ENUM = TypeValue<typeof ADMIN_USER_STATUS>['value'];

/** 员工级别 */
export const enum EmployeeClass {
  ROOT_ADMIN = 1,
  OPERATE_ADMIN,
  FACE_ADMIN,
  LOOK_ADMIN,
}
export const EmployeeClassMap = {
  [EmployeeClass.ROOT_ADMIN]: {
    label: '系统管理员',
  },
  [EmployeeClass.OPERATE_ADMIN]: {
    label: '操作管理员',
  },
  [EmployeeClass.FACE_ADMIN]: {
    label: '人脸识别操作员',
  },
  [EmployeeClass.LOOK_ADMIN]: {
    label: '查看监视员',
  },
} as const;

/** 站点状态 */
export const enum SiteStatus {
  ONLINE = 0,
  OFFLINE = 1,
  NOT_FOUND = 3,
}
export const SiteStatusMap = {
  [SiteStatus.ONLINE]: {
    label: '在线',
  },
  [SiteStatus.OFFLINE]: {
    label: '离线',
  },
  [SiteStatus.NOT_FOUND]: {
    label: '未启用',
  },
} as const;

/** 站点状态 */
export const enum SiteType {
  A = 0,
  B = 1,
  C = 2,
}
export const SiteTypeMap = {
  [SiteType.A]: {
    label: '井站',
  },
  [SiteType.B]: {
    label: '车载',
  },
  [SiteType.C]: {
    label: '集输站',
  },
} as const;

/** 工作方式 */
export const enum SiteWorkWay {
  NORMAL = 0,
  DISABLED = 1,
  PAUSE = 2,
}
export const SiteWorkWayMap = {
  [SiteWorkWay.NORMAL]: {
    label: '工作',
  },
  [SiteWorkWay.DISABLED]: {
    label: '维修',
  },
  [SiteWorkWay.PAUSE]: {
    label: '暂停',
  },
} as const;

/** 解封类型 */
export const enum UnlockType {
  FACE = 1,
  URGENT = 2,
}
export const UnlockTypeMap = {
  [UnlockType.FACE]: {
    label: '人脸识别',
    color: '#2f54eb',
  },
  [UnlockType.URGENT]: {
    label: '紧急解锁',
    color: '#f5222d',
  },
} as const;

export const enum SiteUrgLock {
  NORMAL = 1,
  DISABLED = 0,
}
export const SiteUrgLockMap = {
  [SiteUrgLock.NORMAL]: {
    label: '允许紧急解封',
    color: 'green',
  },
  [SiteUrgLock.DISABLED]: {
    label: '禁止紧急解封',
    color: 'red',
  },
} as const;

export const enum SiteLock {
  NORMAL = 1,
  DISABLED = 0,
}
export const SiteLockMap = {
  [SiteLock.NORMAL]: {
    label: '允许解封',
    color: 'green',
  },
  [SiteLock.DISABLED]: {
    label: '禁止解封',
    color: 'red',
  },
} as const;

export const enum SiteState {
  NORMAL = 0,
  REPAIR = 1,
  PAUSE = 2,
}
export const SiteStateMap = {
  [SiteState.NORMAL]: {
    label: '正常工作',
    color: 'green',
  },
  [SiteState.REPAIR]: {
    label: '维修调试',
    color: '#d09b04',
  },
  [SiteState.PAUSE]: {
    label: '暂停使用',
    color: 'red',
  },
} as const;

export const enum EventFixedType {
  A = 12,
  B = 13,
  C = 14,
  D = 15,
  E = 16,
  F = 17,
  G = 18,
  H = 19,
  I = 20,
  J = 21,
  K = 22,
  L = 23,
  M = 24,
  N = 25,
  O = 26,
  P = 27,
  Q = 28,
  R = 29,
}
export const EventFixedTypeMap = {
  [EventFixedType.A]: {
    label: '1#阀节点故障',
    level: 1,
  },
  [EventFixedType.B]: {
    label: '2#阀节点故障',
    level: 1,
  },
  [EventFixedType.C]: {
    label: '3#阀节点故障',
    level: 1,
  },
  [EventFixedType.D]: {
    label: '4#阀节点故障',
    level: 1,
  },
  [EventFixedType.E]: {
    label: '1#阀盖板打开报警',
    level: 3,
  },
  [EventFixedType.F]: {
    label: '2#阀盖板打开报警',
    level: 3,
  },
  [EventFixedType.G]: {
    label: '3#阀盖板打开报警',
    level: 3,
  },
  [EventFixedType.H]: {
    label: '4#阀盖板打开报警',
    level: 3,
  },
  [EventFixedType.I]: {
    label: '1#阀阀位报警',
    level: 2,
  },
  [EventFixedType.J]: {
    label: '2#阀阀位报警',
    level: 2,
  },
  [EventFixedType.K]: {
    label: '3#阀阀位报警',
    level: 2,
  },
  [EventFixedType.L]: {
    label: '4#阀阀位报警',
    level: 2,
  },
  [EventFixedType.M]: {
    label: '1#罐二次表模块故障',
    level: 1,
  },
  [EventFixedType.N]: {
    label: '2#罐二次表模块故障',
    level: 1,
  },
  [EventFixedType.O]: {
    label: '3#罐二次表模块故障',
    level: 1,
  },
  [EventFixedType.P]: {
    label: '4#罐二次表模块故障',
    level: 1,
  },
  [EventFixedType.Q]: {
    label: '控制柜1#节点故障',
    level: 1,
  },
  [EventFixedType.R]: {
    label: '控制柜2#节点故障障',
    level: 1,
  },
} as const;
