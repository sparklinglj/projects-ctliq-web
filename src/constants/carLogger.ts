export const enum CarOperateType {
  A = 11,
  B = 12,
  C = 13,
  D = 16,
  E = 17,
  F = 20,
  G = 21,
}
export const CarOperateTypeMap = {
  [CarOperateType.A]: {
    label: '定位模块节点故障',
    level: 1,
  },
  [CarOperateType.B]: {
    label: '装油阀节点故障',
    level: 1,
  },
  [CarOperateType.C]: {
    label: '卸油阀节点故障',
    level: 1,
  },
  [CarOperateType.D]: {
    label: '装油阀盖板打开报警',
    level: 3,
  },
  [CarOperateType.E]: {
    label: '卸油阀盖板打开报警',
    level: 3,
  },
  [CarOperateType.F]: {
    label: '装油阀阀位报警',
    level: 2,
  },
  [CarOperateType.G]: {
    label: '卸油阀阀位报警',
    level: 2,
  },
} as const;
