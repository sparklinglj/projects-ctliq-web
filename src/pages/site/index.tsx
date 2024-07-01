import SITE_LOGO from '@/assets/site-icon.png';
import { SelectRegion } from '@/components/SelectRegion';
import { TextWarning } from '@/components/TextWarning';
import {
  SiteLock,
  SiteLockMap,
  SiteState,
  SiteStateMap,
  SiteStatus,
  SiteStatusMap,
  SiteUrgLock,
  SiteUrgLockMap,
} from '@/constants';
import { useThemeToken } from '@/hooks/useThemeToken';
import { cls } from '@/utils';
import { message } from '@/utils/notice';
import { useRequest } from 'ahooks';
import { Button, Card, Dropdown, Flex, Input, Space, Spin, Tag } from 'antd';
import dayjs from 'dayjs';
import { CVTFixedSite, FixedSiteVo } from 'interface/serverApi';
import { useState } from 'react';
import { Link } from 'umi';
import styles from './index.module.less';
import { getListApi, updateCMDApi } from './module';

export interface TabItem {
  label: string;
  value: number;
  count: number;
}

export const STATUS: TabItem[] = [
  {
    label: '全部',
    value: -1,
    count: 0,
  },
  ...Object.entries(SiteStatusMap).map(([key, item]) => ({
    value: Number(key),
    label: item.label,
    count: 0,
  })),
];

export default function NewsListPage() {
  const [searchForm, setSearchForm] = useState({
    keyword: '',
    status: -1,
    area: '',
  });
  const [statusList, setStatusList] = useState(STATUS);
  const { colorSuccess, colorError, colorWarning } = useThemeToken();
  const {
    data: list,
    loading,
    run: getList,
  } = useRequest(
    () => {
      return getListApi().then((res) => {
        const dataList = res.data.data.records || [];
        let o_count = 0;
        let off_count = 0;
        let not_count = 0;
        let all_count = dataList.length;
        const r = dataList.map((item) => {
          let normal = SiteStatus.NOT_FOUND;
          if (item.cvtValue) {
            if (dayjs().add(-10, 'm').isBefore(dayjs(item.cvtValue?.dataTimestamp))) {
              normal = SiteStatus.ONLINE;
              o_count++;
            } else {
              normal = SiteStatus.OFFLINE;
              off_count++;
            }
          } else {
            not_count++;
          }
          return {
            ...item,
            normal,
          };
        });
        // r.sort((a, b) => {
        //   if (a.fixedSiteId - b.fixedSiteId > 0) {
        //     return 1;
        //   }
        //   return -1;
        // });
        setStatusList((list) => {
          return list.map((d) => {
            let count = all_count;
            if (d.value === SiteStatus.ONLINE) {
              count = o_count;
            }
            if (d.value === SiteStatus.OFFLINE) {
              count = off_count;
            }
            if (d.value === SiteStatus.NOT_FOUND) {
              count = not_count;
            }
            return {
              ...d,
              count,
            };
          });
        });
        return r;
      });
    },
    {
      pollingInterval: 5000,
    },
  );

  const isShow = (item: FixedSiteVo & { normal: SiteStatus }) => {
    const filter = [];
    if (searchForm.status === -1) {
      filter.push(true);
    } else {
      filter.push(item.normal === searchForm.status);
    }
    filter.push(item.fixedSiteName?.includes(searchForm.keyword));
    if (searchForm.area) {
      filter.push(item.fixedSiteRegion === searchForm.area);
    } else {
      filter.push(true);
    }
    return filter.filter(Boolean).length === filter.length;
  };

  return (
    <>
      <div className={styles.topHeader}>
        <StatusTabs
          tabs={statusList}
          onChange={(v) => {
            setSearchForm({ ...searchForm, status: v });
          }}
        />
        <Space>
          <SelectRegion
            allowClear
            value={searchForm.area}
            onChange={(e) => {
              setSearchForm({ ...searchForm, area: e });
            }}
          />
          <Input
            placeholder="请输入抽油点名称搜索"
            value={searchForm.keyword}
            onChange={(e) => {
              setSearchForm((d) => ({ ...d, keyword: e.target.value }));
            }}
          />
        </Space>
      </div>
      <div className={styles.cardList}>
        <Spin spinning={!list && loading}>
          <div className={styles.siteList}>
            {list?.map((item) => {
              const items = [
                {
                  key: 3,
                  value: `setLock_${SiteLock.NORMAL}`,
                  label: SiteLockMap[SiteLock.NORMAL].label,
                  hide: siteLockValue(item) === SiteLock.NORMAL,
                },
                {
                  key: 4,
                  value: `setLock_${SiteLock.DISABLED}`,
                  label: SiteLockMap[SiteLock.DISABLED].label,
                  hide: siteLockValue(item) === SiteLock.DISABLED,
                },

                {
                  key: 1,
                  value: `setUrgLock_${SiteUrgLock.NORMAL}`,
                  label: SiteUrgLockMap[SiteUrgLock.NORMAL].label,
                  hide: siteUrgLockValue(item) === SiteUrgLock.NORMAL,
                },
                {
                  key: 2,
                  value: `setUrgLock_${SiteUrgLock.DISABLED}`,
                  label: SiteUrgLockMap[SiteUrgLock.DISABLED].label,
                  hide: siteUrgLockValue(item) === SiteUrgLock.DISABLED,
                },

                {
                  key: 5,
                  value: `setState_${SiteState.NORMAL}`,
                  label: SiteStateMap[SiteState.NORMAL].label,
                  hide: item.cvtValue?.cvtAiEtnMode === SiteState.NORMAL,
                },
                {
                  key: 6,
                  value: `setState_${SiteState.REPAIR}`,
                  label: SiteStateMap[SiteState.REPAIR].label,
                  hide: item.cvtValue?.cvtAiEtnMode === SiteState.REPAIR,
                },
                {
                  key: 7,
                  value: `setState_${SiteState.PAUSE}`,
                  label: SiteStateMap[SiteState.PAUSE].label,
                  hide: item.cvtValue?.cvtAiEtnMode === SiteState.PAUSE,
                },
              ];
              return (
                <Card
                  key={item.fixedSiteId}
                  className={styles.siteItem}
                  style={{ display: isShow(item) ? '' : 'none' }}
                  hoverable
                  title={
                    <Space className={styles.siteHeader} size={10}>
                      <div className={styles.cover}>
                        <img src={SITE_LOGO} alt="" />
                      </div>
                      <Flex>
                        <Flex align="center">
                          <Tag>{item.fixedSiteId}</Tag>
                          {item.normal === SiteStatus.ONLINE && (
                            <Tag color={colorSuccess}>在线</Tag>
                          )}
                          {item.normal === SiteStatus.OFFLINE && <Tag color={colorError}>离线</Tag>}
                          {item.normal === SiteStatus.NOT_FOUND && (
                            <Tag color={colorWarning}>未启用{/*  */}</Tag>
                          )}
                        </Flex>
                        <div className={styles.name}>
                          <small>{item.fixedSiteRegion}</small>-{item.fixedSiteName}
                        </div>
                        {item.cvtValue?.cvtDiEvent && (
                          <>
                            <span style={{ marginLeft: 8 }}> </span>
                            {(item.cvtValue.cvtDiEvent & parseInt('3FFFF000', 16)) !== 0 && (
                              <TextWarning
                                color={item.normal === SiteStatus.ONLINE ? 'red' : void 0}
                              >
                                报警
                              </TextWarning>
                            )}
                          </>
                        )}
                      </Flex>

                      {item.cvtValue && (
                        <div className={styles.time}>
                          {dayjs(item.cvtValue?.dataTimestamp).format('YYYY-MM-DD HH:mm:ss')}
                        </div>
                      )}
                    </Space>
                  }
                  extra={
                    <Space>
                      <Dropdown
                        placement="bottom"
                        menu={{
                          items: items
                            .filter((i) => !i.hide)
                            .map((i) => ({ key: i.key, label: i.label })),
                          onClick: (res) => {
                            const opt = items.find((t) => Number(t.key) === Number(res.key));
                            if (!opt) return;
                            const [k, v] = opt.value.split('_');
                            const body: Record<string, number | undefined> = {
                              setLock: siteLockValue(item),
                              setUrgLock: siteUrgLockValue(item),
                              setState: item.cvtValue?.cvtAiEtnMode,
                            };
                            body[k] = Number(v);

                            updateCMDApi(item.fixedSiteId, body).then((res) => {
                              console.log(res);
                              message.success('命令已发出');
                              getList();
                            });
                          },
                        }}
                      >
                        <Button
                          type="primary"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          控制指令
                        </Button>
                      </Dropdown>
                    </Space>
                  }
                >
                  <Link
                    to={`/site/detail/${item.fixedSiteId}`}
                    key={item.fixedSiteId}
                    className={styles.siteItem}
                    style={{ display: isShow(item) ? '' : 'none' }}
                  >
                    <div className={styles.siteBody}>
                      {(() => {
                        const A = SiteLockMap[siteLockValue(item)];
                        const B = SiteUrgLockMap[siteUrgLockValue(item)];
                        const C = SiteStateMap[item.cvtValue?.cvtAiEtnMode as SiteState];
                        const l = [A, B, C].filter((i) => !!i);
                        if (!l.length) return null;
                        return (
                          <div className={styles.descList}>
                            {l.map((i) => (
                              <div key={i.label} style={{ color: i.color }}>
                                {i.label}
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                      {/* <div className={styles.descList}>
                        <div>
                          <span>区域</span>
                          {item.fixedSiteRegion}
                        </div>
                      </div> */}
                      <div className={styles.descList}>
                        {/* <div>
                          <span>经度</span>
                          {item.fixedSiteLongitude}
                        </div>
                        <div>
                          <span>纬度</span>
                          {item.fixedSiteLatitude}
                        </div> */}

                        {typeof item.cvtValue !== 'undefined' && (
                          <>
                            {/* <div>
                              <span>站点分类</span>
                              {(item.cvtValue?.cvtAiEtnTankNum || 0) > 0 ? '拉油点' : '卸油点'}
                            </div> */}
                            {/* <div>
                              <span>油罐数量</span>
                              {item.cvtValue?.cvtAiEtnTankNum || '-'}
                            </div> */}

                            {(() => {
                              let value = '非正常';
                              let color = colorError;

                              if (((item.cvtValue.cvtDiWork as number) & 16) === 16) {
                                value = '开';
                                color = colorSuccess;
                              } else {
                                value = '关';
                                color = colorWarning;
                              }
                              return (
                                <Flex>
                                  锁：<b style={{ color }}>{value}</b>
                                </Flex>
                              );
                            })()}
                            {(() => {
                              let value = '非正常';
                              let color = colorError;

                              if (((item.cvtValue.cvtDiDevice as number) & 1) === 1) {
                                value = '开';
                                color = colorSuccess;
                              } else if (((item.cvtValue.cvtDiDevice as number) & 2) === 2) {
                                value = '关';
                                color = colorWarning;
                              }
                              return (
                                <Flex>
                                  阀门：<b style={{ color }}>{value}</b>
                                </Flex>
                              );
                            })()}
                          </>
                        )}
                      </div>

                      {Array.from({ length: 4 }).map((_, ind) => {
                        if (!item.cvtValue) return null;
                        if (!item.cvtValue[('cvtAiLevel' + ind) as keyof CVTFixedSite]) return null;
                        const cvtAiLevel = ('cvtAiLevel' + ind) as keyof CVTFixedSite;
                        const cvtAiTemperature = ('cvtAiTemperature' + ind) as keyof CVTFixedSite;
                        return (
                          <Flex key={ind} gap={10}>
                            <div>
                              <b>#{ind + 1}</b>
                            </div>
                            <div className={styles.descList}>
                              <div>
                                <span>液位</span>
                                {
                                  // 大于等于 2.4 报警
                                  (() => {
                                    const v = item.cvtValue[cvtAiLevel] as number;
                                    if (typeof v === 'undefined') return null;
                                    let color = colorSuccess;
                                    if (v >= 2.4) {
                                      color = colorError;
                                    }
                                    return (
                                      <i style={{ color, fontStyle: 'normal', fontWeight: 700 }}>
                                        {v}
                                      </i>
                                    );
                                  })()
                                }
                              </div>
                              <div>
                                <span>温度</span>
                                {
                                  // 小于等于 0 报警 大于等于 70 报警
                                  (() => {
                                    const v = item.cvtValue[cvtAiTemperature] as number;
                                    if (typeof v === 'undefined') return null;
                                    let color = colorSuccess;
                                    if (v <= 0 || v >= 70) {
                                      color = colorError;
                                    }
                                    return (
                                      <i style={{ color, fontStyle: 'normal', fontWeight: 700 }}>
                                        {v}
                                      </i>
                                    );
                                  })()
                                }
                              </div>
                            </div>
                          </Flex>
                        );
                      })}
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </Spin>
      </div>
    </>
  );
}

interface StatusTabsProps {
  tabs: typeof STATUS;
  onChange?: (value: number) => void;
}

export function StatusTabs({ tabs, onChange }: StatusTabsProps) {
  const [active, setActive] = useState(tabs[0].value);
  return (
    <div className={styles.tabs}>
      {tabs.map((item) => {
        return (
          <div
            className={cls(styles.item, active === item.value ? styles.active : '')}
            key={item.value}
            onClick={() => {
              setActive(item.value);
              onChange?.(item.value);
            }}
          >
            <span className={styles.label}>{item.label}</span>
            <span className={styles.total}>{item.count}</span>
          </div>
        );
      })}
    </div>
  );
}

function siteLockValue(item: FixedSiteVo) {
  return ((item.cvtValue?.cvtDiWork || 0) & 1) === 1 ? SiteLock.NORMAL : SiteLock.DISABLED;
}

function siteUrgLockValue(item: FixedSiteVo) {
  return ((item.cvtValue?.cvtDiWork || 0) & 2) === 2 ? SiteUrgLock.NORMAL : SiteUrgLock.DISABLED;
}
