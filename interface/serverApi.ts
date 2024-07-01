/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RString {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: string;
}

export interface OrderItem {
  column?: string;
  asc?: boolean;
}

export interface Pages {
  /** @format int64 */
  current?: number;
  /** @format int64 */
  size?: number;
  /** @format date-time */
  startTime?: string;
  /** @format date-time */
  endTime?: string;
  orders?: OrderItem[];
}

export interface WorkTeamListQuery {
  page?: Pages;
}

export interface PageWorkTeam {
  records?: WorkTeam[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageWorkTeam {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageWorkTeam;
}

export interface WorkTeam {
  /**
   * 作业大队ID
   * @format int64
   */
  workTeamId?: number;
  /** 作业大队名称 */
  workTeamName?: string;
}

export interface RWorkTeam {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: WorkTeam;
}

export interface RListUrlResource {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: UrlResource[];
}

export interface UrlResource {
  url?: string;
  name?: string;
  operation?: string;
}

export interface RtdataMovingSiteListQuery {
  /** @format int32 */
  movingSiteId: number;
  page: Pages;
}

export interface PageRtdataMovingSite {
  records?: RtdataMovingSite[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageRtdataMovingSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageRtdataMovingSite;
}

export interface RtdataMovingSite {
  /**
   * 数据时间戳
   * @format date-time
   */
  dataTimestamp?: string;
  /**
   * 移动站点ID
   * @format int32
   */
  movingSiteId?: number;
  /**
   * 工作状态（0：正常；1：维修；2：暂停）
   * @format int32
   */
  workState?: number;
  /**
   * 实时位置：经度
   * @format double
   */
  posLongitude?: number;
  /**
   * 实时位置：纬度
   * @format double
   */
  posLatitude?: number;
  /**
   * 实时位置：速度
   * @format double
   */
  speed?: number;
}

export interface RtdataFixedSiteListQuery {
  /** @format int32 */
  fixedSiteId: number;
  /** @format int32 */
  topN?: number;
  page?: Pages;
}

export interface PageRtdataFixedSite {
  records?: RtdataFixedSite[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageRtdataFixedSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageRtdataFixedSite;
}

export interface RtdataFixedSite {
  /**
   * 数据时间戳
   * @format date-time
   */
  dataTimestamp?: string;
  /**
   * 固定站点ID
   * @format int32
   */
  fixedSiteId?: number;
  /**
   * 液位数据值
   * @format float
   */
  liquidLevelValue?: number;
  /**
   * 温度数据值
   * @format float
   */
  temperatureValue?: number;
  /**
   * 0~3
   * @format int32
   */
  tankId?: number;
}

export interface Role {
  /** @format int64 */
  id?: number;
  name?: string;
  version?: string;
  /** @format date-time */
  dataTimestamp?: string;
  /** @format int64 */
  operatorId?: number;
  statement?: Statement;
}

export interface Statement {
  effect?: string;
  action?: string;
  resources?: string[];
}

export interface RRole {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: Role;
}

export interface RListRole {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: Role[];
}

export interface RListRegionResource {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: RegionResource[];
}

export interface RegionResource {
  region?: string;
  name?: string;
}

export interface RegionListQuery {
  page?: Pages;
}

export interface PageRegion {
  records?: Region[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageRegion {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageRegion;
}

export interface Region {
  /**
   * 工区ID
   * @format int32
   */
  regionId?: number;
  regionName?: string;
}

export interface MovingSiteListQuery {
  page?: Pages;
}

/** 车辆当前值，来自cvtMovingSite */
export interface CVTMovingSite {
  /**
   * 最新数据的时间戳
   * @format date-time
   */
  dataTimestamp?: string;
  /**
   * 移动站点ID
   * @format int32
   */
  movingSiteId?: number;
  /**
   * 远端设备当前动作记录，定义了32位中某些位
   * @format int32
   */
  cvtDiDevice?: number;
  /**
   * 远端主控制器所连接的485模块的通信状态(32位)：1--故障；0--正常
   * @format int32
   */
  cvtDi485link?: number;
  /**
   * 远端设备工作状态 BIT0-15有效
   * @format int32
   */
  cvtDiWork?: number;
  /**
   * 远端设备事件，定义了32位中某些位
   * @format int32
   */
  cvtDiEvent?: number;
  /**
   * 当前车辆位置值
   * @format double
   */
  posLongitude?: number;
  /**
   * 当前车辆位置值
   * @format double
   */
  posLatitude?: number;
  /**
   * 当前车辆速度值
   * @format double
   */
  speed?: number;
  /**
   * 车辆在某个fixed_site站点周边100m以内
   * @format int32
   */
  cvtAiFixedSiteId?: number;
  /**
   * 工作方式：0：工作；1：维修；2：暂停
   * @format int32
   */
  cvtAiEtnMode?: number;
  /** @format int64 */
  employeeId?: number;
}

export interface MovingSiteVo {
  /**
   * 移动站点ID,预先设定，跟ETN拨号一致
   * @format int32
   */
  movingSiteId?: number;
  /** 移动站点车号 */
  movingSiteVagon?: string;
  /**
   * 作业大队ID
   * @format int64
   */
  workTeamId?: number;
  /** 司机姓名 */
  driverName?: string;
  /**
   * 司机联系方式
   * @format int64
   */
  driverContact?: number;
  /** 车辆当前值，来自cvtMovingSite */
  cvtMovingSite?: CVTMovingSite;
}

export interface PageMovingSiteVo {
  records?: MovingSiteVo[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageMovingSiteVo {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageMovingSiteVo;
}

export interface RMovingSiteVo {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: MovingSiteVo;
}

export interface LoginVo {
  /** 登录名 */
  employeeName: string;
  /**
   * 登录密码
   * @pattern ^[A-Za-z0-9][A-Za-z0-9-_#@/.|]{1,31}$
   */
  passWord: string;
}

export interface RTokenVo {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: TokenVo;
}

export interface TokenVo {
  employeeName?: string;
  token?: string;
}

export interface LoadFixedSiteListQuery {
  /** @format int32 */
  fixedSiteId?: number;
  movingSiteIds?: number[];
  page?: Pages;
}

export interface LoadFixedSite {
  /**
   * 数据记录时间戳，即完成装载的时间（关阀时间
   * @format date-time
   */
  dataTimestamp?: string;
  /**
   * 固定站点ID
   * @format int32
   */
  fixedSiteId?: number;
  /** 站点名称 */
  fixedSiteName?: string;
  /** 区域名称 */
  fixedSiteRegion?: string;
  /**
   * 鹤管序号（0，1，2，3）
   * @format int32
   */
  tankI?: number;
  /**
   * 装载用时（秒）
   * @format int32
   */
  loadTimercnt?: number;
  /**
   * 该站点人脸识别模块中的人脸注册序号（1，2，...），对应fixedsite表中的operator（i）（i=1~8）
   * @format int32
   */
  operatorI?: number;
  /**
   * 1--通过人脸识别解封；2--通过紧急解锁解封
   * @format int32
   */
  unlockType?: number;
  /**
   * 车辆ID
   * @format int32
   */
  movingSiteId?: number;
  /** 车牌号 */
  movingSiteVagon?: string;
  /** @format int64 */
  employeeId?: number;
  /** @format int64 */
  operatorId?: number;
}

export interface PageLoadFixedSite {
  records?: LoadFixedSite[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageLoadFixedSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageLoadFixedSite;
}

/** 站点当前值，来自cvtFixedSite */
export interface CVTFixedSite {
  /**
   * 最新数据的时间戳
   * @format date-time
   */
  dataTimestamp?: string;
  /**
   * 固定站点ID
   * @format int32
   */
  fixedSiteId?: number;
  /**
   * 远端设备当前动作记录，定义了32位中某些位
   * @format int32
   */
  cvtDiDevice?: number;
  /**
   * 远端主控制器所连接的485模块的通信状态(32位)：1--故障；0--正常
   * @format int32
   */
  cvtDi485link?: number;
  /**
   * 远端设备工作状态 BIT0-15有效
   * @format int32
   */
  cvtDiWork?: number;
  /**
   * 远端设备事件，定义了32位中某些位
   * @format int32
   */
  cvtDiEvent?: number;
  /**
   * 0#罐液位值
   * @format float
   */
  cvtAiLevel0?: number;
  /**
   * 0#罐温度值
   * @format float
   */
  cvtAiTemperature0?: number;
  /**
   * 1#罐液位值
   * @format float
   */
  cvtAiLevel1?: number;
  /**
   * 1#罐温度值
   * @format float
   */
  cvtAiTemperature1?: number;
  /**
   * 2#罐液位值
   * @format float
   */
  cvtAiLevel2?: number;
  /**
   * 2#罐温度值
   * @format float
   */
  cvtAiTemperature2?: number;
  /**
   * 3#罐液位值
   * @format float
   */
  cvtAiLevel3?: number;
  /**
   * 3#罐温度值
   * @format float
   */
  cvtAiTemperature3?: number;
  /**
   * 站点分类：0：井站；1：车载；2：集输站
   * @format int32
   */
  cvtAiEtnType?: number;
  /**
   * 工作方式：0：工作；1：维修；2：暂停
   * @format int32
   */
  cvtAiEtnMode?: number;
  /**
   * 该站点具有的鹤管及油罐总数1~4
   * @format int32
   */
  cvtAiEtnTankNum?: number;
  /**
   * 人脸识别成功，该站点被识别的人脸注册登记序号
   * @format int32
   */
  cvtAiEtnFaceId?: number;
  /**
   * 当前工作的鹤管号（0~3）
   * @format int32
   */
  cvtAiEtnTankI?: number;
  /**
   * 当前工作鹤管装载计时器（秒）
   * @format int32
   */
  cvtAiEtnLoadTimecnt?: number;
  /** 标识当前在场内的车辆ID，格式：“车辆1_id,车辆2_id,车辆3_id“，3个数据之间用逗号分割。当车辆存在时，为车辆的id号，不存在时为0。 */
  cvtMovingId?: string;
  /** 当前存在的车辆ID */
  cvtMoingIds?: number[];
  /** 当前存在的车辆名称 */
  cvtMoingNames?: string[];
  /**
   * 操作员
   * @format int64
   */
  employeeId?: number;
}

export interface ControlFixedSite {
  /**
   * 数据时间戳，最新更新的时间
   * @format date-time
   */
  dataTimestamp?: string;
  /**
   * 固定站点ID
   * @format int32
   */
  fixedSiteId?: number;
  /**
   * 工作状态（0：正常状态；1：维修调试；2：暂停使用）
   * @format int32
   */
  setState?: number;
  /**
   * 解封指令
   * @format int32
   */
  setLock?: number;
  /**
   * 紧急解封指令
   * @format int32
   */
  setUrgLock?: number;
  /**
   * 0：未执行；1：已执行
   * @format int32
   */
  isExecuted?: number;
  /** @format int32 */
  autoId?: number;
  /**
   * 操作员
   * @format int64
   */
  employeeId?: number;
}

export interface FixedSiteVo {
  /**
   * 站点ID，预先设定，跟ETN拨号一致
   * @format int32
   */
  fixedSiteId?: number;
  /** 站点名称 */
  fixedSiteName?: string;
  /** 区域名称 */
  fixedSiteRegion?: string;
  /**
   * 所在位置的经度
   * @format double
   */
  fixedSiteLongitude?: number;
  /**
   * 所在位置的纬度
   * @format double
   */
  fixedSiteLatitude?: number;
  /**
   * 作业大队ID
   * @format int64
   */
  workTeamId?: number;
  /**
   * 液罐数量
   * @format int32
   */
  tankNum?: number;
  /**
   * 操作员1#ID，与employee表中的employee_id对应
   * @format int64
   */
  operator1Id?: number;
  operator1Name?: string;
  /**
   * 操作员2#ID，与employee表中的employee_id对应
   * @format int64
   */
  operator2Id?: number;
  operator2Name?: string;
  /**
   * 操作员3#ID，与employee表中的employee_id对应
   * @format int64
   */
  operator3Id?: number;
  operator3Name?: string;
  /**
   * 操作员4#ID，与employee表中的employee_id对应
   * @format int64
   */
  operator4Id?: number;
  operator4Name?: string;
  /**
   * 操作员5#ID，与employee表中的employee_id对应
   * @format int64
   */
  operator5Id?: number;
  operator5Name?: string;
  /**
   * 操作员6#ID，与employee表中的employee_id对应
   * @format int64
   */
  operator6Id?: number;
  operator6Name?: string;
  /**
   * 操作员7#ID，与employee表中的employee_id对应
   * @format int64
   */
  operator7Id?: number;
  operator7Name?: string;
  /**
   * 操作员8#ID，与employee表中的employee_id对应
   * @format int64
   */
  operator8Id?: number;
  operator8Name?: string;
  /**
   * 工区ID
   * @format int32
   */
  fixedSiteRegionId?: number;
  /** 站点当前值，来自cvtFixedSite */
  cvtValue?: CVTFixedSite;
  controlFixedSite?: ControlFixedSite;
}

export interface RFixedSiteVo {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: FixedSiteVo;
}

export interface FixedSiteListQuery {
  page?: Pages;
}

export interface PageFixedSiteVo {
  records?: FixedSiteVo[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageFixedSiteVo {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageFixedSiteVo;
}

export interface EventMovingSite {
  /**
   * 数据时间戳
   * @format date-time
   */
  dataTimestamp?: string;
  /**
   * 移动站点ID
   * @format int32
   */
  movingSiteId?: number;
  /**
   * 事件类型值（type值待定）
   * @format int32
   */
  eventType?: number;
  /**
   * 实时位置：经度
   * @format double
   */
  posLongitude?: number;
  /**
   * 实时位置：经度
   * @format double
   */
  posLatitude?: number;
  /**
   * 雇员ID
   * @format int64
   */
  employeeId?: number;
  /**
   * 报警确认时间
   * @format date-time
   */
  dataTimestampAck?: string;
  /**
   * 报警级别
   * @format int32
   */
  eventClass?: number;
  /** 移动站点车号 */
  movingSiteVagon?: string;
  /** 雇员姓名 */
  employeeName?: string;
}

export interface REventMovingSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: EventMovingSite;
}

export interface EventMovingSiteListQuery {
  /** @format int32 */
  movingSiteId?: number;
  /**
   * 事件类型，0:全部; 1:普通; 2:报警
   * @format int32
   */
  eventType?: number;
  page?: Pages;
}

export interface PageEventMovingSite {
  records?: EventMovingSite[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageEventMovingSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageEventMovingSite;
}

export interface EventFixedSite {
  /**
   * 数据时间戳
   * @format date-time
   */
  dataTimestamp?: string;
  /**
   * 固定站点ID
   * @format int32
   */
  fixedSiteId?: number;
  /**
   * 事件类型状态（参见cvtfixedsite中cvtdievent）
   * @format int32
   */
  eventType?: number;
  /**
   * 操作ID
   * @format int64
   */
  operatorId?: number;
  /**
   * 报警确认时间
   * @format date-time
   */
  dataTimestampAck?: string;
  /**
   * 报警级别
   * @format int32
   */
  eventClass?: number;
  /** 站点名称 */
  fixedSiteName?: string;
  /** 区域名称 */
  fixedSiteRegion?: string;
  /**
   * 雇员ID
   * @format int64
   */
  employeeId?: number;
  /** 雇员姓名 */
  employeeName?: string;
}

export interface REventFixedSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: EventFixedSite;
}

export interface EventFixedSiteListQuery {
  /** @format int32 */
  fixedSiteId?: number;
  /**
   * 事件类型，0:全部; 1:普通; 2:报警
   * @format int32
   */
  eventType?: number;
  page?: Pages;
}

export interface PageEventFixedSite {
  records?: EventFixedSite[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageEventFixedSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageEventFixedSite;
}

export interface Employee {
  /**
   * 雇员ID，可使用雪花算法生成
   * @format int64
   */
  employeeId?: number;
  /** 雇员姓名 */
  employeeName?: string;
  /**
   * 雇员级别：
   * 1：操作管理员；
   * 2：阀门解封操作员；
   * 3：查看操作员I；
   * 4：查看操作员II；
   * @format int32
   */
  employeeClass?: number;
  employeePassword?: string;
  /** 人脸数据（来自人脸识别设备） */
  employeeFace?: string[];
  /** 照片 */
  employeePhoto?: string;
  /** 手机号 */
  employeePhone?: string;
  roles?: Role[];
}

export interface REmployee {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: Employee;
}

export interface EmployeeListQuery {
  page?: Pages;
}

export interface PageEmployee {
  records?: Employee[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageEmployee {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageEmployee;
}

export interface RCVTMovingSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  /** 车辆当前值，来自cvtMovingSite */
  data?: CVTMovingSite;
}

export interface CVTMovingSiteListQuery {
  page?: Pages;
}

export interface PageCVTMovingSite {
  records?: CVTMovingSite[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageCVTMovingSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageCVTMovingSite;
}

export interface RCVTFixedSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  /** 站点当前值，来自cvtFixedSite */
  data?: CVTFixedSite;
}

export interface CVTFixedSiteListQuery {
  page?: Pages;
}

export interface PageCVTFixedSite {
  records?: CVTFixedSite[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageCVTFixedSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageCVTFixedSite;
}

export interface ControlMovingSiteListQuery {
  /** @format int32 */
  movingSiteId?: number;
  page?: Pages;
}

export interface ControlMovingSite {
  /**
   * 数据时间戳
   * @format date-time
   */
  dataTimestamp?: string;
  /**
   * 移动站点ID
   * @format int32
   */
  movingSiteId?: number;
  /**
   * 工作状态（0：正常状态；1：维修调试；2：暂停使用）
   * @format int32
   */
  setState?: number;
  /** @format int32 */
  setDo?: number;
  /**
   * 0：未执行；1：已执行
   * @format int32
   */
  isExecuted?: number;
  /** @format int32 */
  autoId?: number;
  /** @format int64 */
  employeeId?: number;
}

export interface PageControlMovingSite {
  records?: ControlMovingSite[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageControlMovingSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageControlMovingSite;
}

export interface RControlMovingSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: ControlMovingSite;
}

export interface ControlFixedSiteListQuery {
  /** @format int32 */
  fixedSiteId?: number;
  page?: Pages;
}

export interface PageControlFixedSite {
  records?: ControlFixedSite[];
  /** @format int64 */
  total?: number;
  /** @format int64 */
  size?: number;
  /** @format int64 */
  current?: number;
  /** @deprecated */
  orders?: OrderItem[];
  /** @deprecated */
  optimizeCountSql?: boolean;
  /** @deprecated */
  searchCount?: boolean;
  optimizeJoinOfCountSql?: boolean;
  /**
   * @deprecated
   * @format int64
   */
  maxLimit?: number;
  /** @deprecated */
  countId?: string;
  /** @format int64 */
  pages?: number;
}

export interface RPageControlFixedSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: PageControlFixedSite;
}

export interface RControlFixedSite {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: ControlFixedSite;
}

export interface RoleBind {
  /** @format int64 */
  employeeId?: number;
  /** @format int64 */
  roleId?: number;
  /** @format date-time */
  dataTimestamp?: string;
  /** @format int64 */
  operatorId?: number;
  employeeName?: string;
  roleName?: string;
}

export interface RListRoleBind {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: RoleBind[];
}

export interface RRoleBind {
  ok?: boolean;
  /** @format int32 */
  code?: number;
  message?: string;
  data?: RoleBind;
}
