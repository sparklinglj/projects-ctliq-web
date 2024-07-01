export const enum SiteOperateType {
  A = 0,
  B = 1,
  C = 2,
  D = 3,
  E = 4,
  F = 5,
  G = 6,
  H = 7,
  I = 8,
  J = 9,
  K = 10,
  L = 11,
  M = 30,
  N = 31,
}
export const SiteOperateTypeMap = {
  [SiteOperateType.A]: {
    label: '站点启动',
  },
  [SiteOperateType.B]: {
    label: '人脸识别模块加电',
  },
  [SiteOperateType.C]: {
    label: '人脸识别解锁',
  },
  [SiteOperateType.D]: {
    label: '紧急解锁',
  },
  [SiteOperateType.E]: {
    label: '1#阀门打开',
  },
  [SiteOperateType.F]: {
    label: '1#阀门关闭',
  },
  [SiteOperateType.G]: {
    label: '2#阀门打开',
  },
  [SiteOperateType.H]: {
    label: '2#阀门关闭',
  },
  [SiteOperateType.I]: {
    label: '3#阀门打开',
  },
  [SiteOperateType.J]: {
    label: '3#阀门关闭',
  },
  [SiteOperateType.K]: {
    label: '4#阀门打开',
  },
  [SiteOperateType.L]: {
    label: '4#阀门关闭',
  },
  [SiteOperateType.M]: {
    label: '开始装油',
  },
  [SiteOperateType.N]: {
    label: '完成装油',
  },
} as const;
