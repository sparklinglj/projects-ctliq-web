import { SelectWorkteam } from '@/components/SelectWorkteam';
import { TextWarning } from '@/components/TextWarning';
import { SiteStatus } from '@/constants';
import { useThemeToken } from '@/hooks/useThemeToken';
import { useRequest } from 'ahooks';
import { Card, Col, Descriptions, Input, Row, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { MovingSiteVo } from 'interface/serverApi';
import { useState } from 'react';
import { Link } from 'umi';
import { STATUS, StatusTabs } from '../site';
import styles from '../site/index.module.less';
import { getListApi } from './module';

export default function CarListPage() {
  const [searchForm, setSearchForm] = useState({
    keyword: '',
    status: -1,
    workteam: void 0,
  });
  const [statusList, setStatusList] = useState(STATUS);

  const { colorSuccess, colorError, colorWarning } = useThemeToken();
  const { data: list } = useRequest(
    () => {
      return getListApi().then((res) => {
        let o_count = 0;
        let off_count = 0;
        let not_count = 0;
        let all_count = res.data.data.records.length;

        const r = res.data.data.records.map((item) => {
          let normal = SiteStatus.NOT_FOUND;
          if (item.cvtMovingSite) {
            if (dayjs().add(-10, 'minute').isBefore(dayjs(item.cvtMovingSite?.dataTimestamp))) {
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
        r.sort((a, b) => {
          if (a.movingSiteId - b.movingSiteId > 0) {
            return 1;
          }
          return -1;
        });
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

  const isShow = (item: MovingSiteVo & { normal: SiteStatus }) => {
    const filter = [];
    if (searchForm.status === -1) {
      filter.push(true);
    } else {
      filter.push(item.normal === searchForm.status);
    }
    filter.push(
      item.movingSiteVagon?.toLocaleUpperCase()?.includes(searchForm.keyword.toLocaleUpperCase()),
    );
    if (searchForm.workteam === undefined) {
      filter.push(true);
    } else {
      filter.push(item.workTeamId === searchForm.workteam);
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
          <SelectWorkteam
            allowClear
            value={searchForm.workteam}
            onChange={(e) => {
              setSearchForm({ ...searchForm, workteam: e });
            }}
          />
          <Input
            placeholder="请输入车牌号搜索"
            value={searchForm.keyword}
            onChange={(e) => {
              setSearchForm((d) => ({ ...d, keyword: e.target.value }));
            }}
          />
        </Space>
      </div>
      <div className={styles.cardList}>
        <Row className={styles.list} gutter={[10, 10]}>
          {list?.map((item, ind) => {
            // const workteamName =
            //   data?.find((d) => d.workTeamId === item.workTeamId)?.workTeamName || '未知';
            return (
              <Col key={ind} lg={8} sm={12} xs={24} style={{ display: isShow(item) ? '' : 'none' }}>
                <Link to={`/car/detail/${item.movingSiteId}`}>
                  <Card
                    hoverable
                    type="inner"
                    title={
                      <Space>
                        <span style={{ fontSize: 18 }}>{item.movingSiteVagon}</span>
                        <div>
                          <Tag>{item.movingSiteId}</Tag>
                          {item.normal === SiteStatus.ONLINE && (
                            <Tag color={colorSuccess}>在线</Tag>
                          )}
                          {item.normal === SiteStatus.OFFLINE && <Tag color={colorError}>离线</Tag>}
                          {item.normal === SiteStatus.NOT_FOUND && (
                            <Tag color={colorWarning}>未启用</Tag>
                          )}
                          {item.cvtMovingSite?.cvtDiEvent && (
                            <>
                              {(item.cvtMovingSite.cvtDiEvent & parseInt('3FFFF000', 16)) !== 0 && (
                                <TextWarning>报警</TextWarning>
                              )}
                            </>
                          )}
                        </div>
                      </Space>
                    }
                    style={{ minHeight: 215 }}
                  >
                    <>
                      <Descriptions column={1} size="small">
                        {/* <Descriptions.Item label="所属车队">{workteamName}</Descriptions.Item> */}
                        <Descriptions.Item label="司机姓名">{item.driverName}</Descriptions.Item>
                        {/* <Descriptions.Item label="联系方式">{item.driverContact}</Descriptions.Item> */}
                        {item.cvtMovingSite && (
                          <>
                            <Descriptions.Item label="装油阀">
                              {(() => {
                                if ((item.cvtMovingSite.cvtDiDevice as number & 1) === 1) {
                                  return <b style={{ color: colorSuccess }}>开</b>;
                                }
                                if ((item.cvtMovingSite.cvtDiDevice as number & 2) === 2) {
                                  return <b style={{ color: colorWarning }}>关</b>;
                                }

                                return <b style={{ color: colorError }}>非正常</b>;
                              })()}
                            </Descriptions.Item>
                            <Descriptions.Item label="卸油阀">
                              {(() => {
                                if ((item.cvtMovingSite.cvtDiDevice as number & 8) === 8) {
                                  return <b style={{ color: colorSuccess }}>开</b>;
                                }
                                if ((item.cvtMovingSite.cvtDiDevice as number & 16) === 16) {
                                  return <b style={{ color: colorWarning }}>关</b>;
                                }

                                return <b style={{ color: colorError }}>非正常</b>;
                              })()}
                            </Descriptions.Item>
                            <Descriptions.Item label="位置">
                              {item.cvtMovingSite.posLongitude?.toFixed(2)} ,{' '}
                              {item.cvtMovingSite.posLatitude?.toFixed(2)}
                            </Descriptions.Item>
                            {/* <Descriptions.Item label="纬度">
                              {item.cvtMovingSite.posLatitude?.toFixed(2)}
                            </Descriptions.Item> */}

                            <Descriptions.Item label="车速">
                              {item.cvtMovingSite.speed?.toFixed(2)} km/h
                            </Descriptions.Item>
                            <Descriptions.Item label="上报时间">
                              {dayjs(item.cvtMovingSite.dataTimestamp).format(
                                'YYYY-MM-DD HH:mm:ss',
                              )}
                            </Descriptions.Item>
                          </>
                        )}
                      </Descriptions>
                    </>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}
