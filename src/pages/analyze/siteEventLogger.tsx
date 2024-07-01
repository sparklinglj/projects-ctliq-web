import PageTable from '@/components/PageTable';
import {
  EventFixedType,
  EventFixedTypeMap,
  SiteOperateType,
  SiteOperateTypeMap,
} from '@/constants';
import { date2Range, transformPagination, transformSort, uuid } from '@/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button, DatePicker, Form, Popconfirm, Space, Tag, message } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { EventFixedSite } from 'interface/serverApi';
import { useRef } from 'react';
import { SelectSite } from '../site/module/SiteSelect';
import { confirmSiteEventApi, getSiteEventLoggerListApi } from './module';

interface SearchValues {
  date: Dayjs;
  fixedSiteId: number;
}

// 站点日志
export default function SiteEventLogger({
  eventType = 2,
  siteId,
}: {
  eventType?: 0 | 1 | 2;
  siteId?: number;
}) {
  const [form] = Form.useForm<SearchValues>();
  const tableRef = useRef<ActionType>();

  return (
    <>
      <Form<SearchValues>
        layout="inline"
        style={{ padding: '15px 10px' }}
        form={form}
        initialValues={{
          fixedSiteId: siteId,
        }}
      >
        <Form.Item label="日期" name="date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="站点" name="fixedSiteId">
          <SelectSite allowClear showSearch />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              tableRef.current?.reload();
            }}
          >
            查询
          </Button>
        </Form.Item>
      </Form>
      <PageTable<EventFixedSite>
        actionRef={tableRef}
        scroll={{ y: window.innerHeight - 240 }}
        style={{ padding: '0 10px 10px' }}
        columns={[
          {
            title: '时间',
            dataIndex: 'dataTimestamp',
            valueType: 'dateTimeRange',
            width: 180,
            render: (_, row) => dayjs(row.dataTimestamp).format('YYYY-MM-DD HH:mm:ss'),
            sorter: true,
          },
          {
            title: '报警名称',
            dataIndex: 'eventType',
            hideInSearch: true,
            render: (_, row) => {
              if (eventType === 1) {
                const item = SiteOperateTypeMap[row.eventType as SiteOperateType];
                if (!item) return row.eventType;
                return (
                  <>
                    <span>{item?.label}</span>
                  </>
                );
              }
              const item = EventFixedTypeMap[row.eventType as EventFixedType];
              if (!item) return row.eventType;
              return (
                <div>
                  <Tag>{item?.level}</Tag>
                  <span>{item?.label}</span>
                </div>
              );
            },
          },
          {
            title: '站点',
            dataIndex: 'fixedSiteName',
          },
          {
            title: '员工',
            dataIndex: 'employeeName',
            hideInSearch: true,
          },
          {
            title: '确认时间',
            dataIndex: 'dataTimestampAck',
            hideInSearch: true,
            hideInTable: eventType === 1,
            valueType: 'dateTime',
          },
          {
            title: '操作',
            dataIndex: 'operate',
            hideInSearch: true,
            width: 80,
            hideInTable: eventType === 1,
            render: (_, row) => {
              if (row.dataTimestampAck) return null;
              return (
                <Space>
                  <Popconfirm
                    title="确定要执行这个操作吗?"
                    onConfirm={() => {
                      const close = message.loading('操作中', 0);
                      confirmSiteEventApi(row)
                        .then(() => {
                          message.success('操作成功');
                          tableRef.current?.reload();
                        })
                        .finally(() => {
                          close();
                        });
                    }}
                  >
                    <a>确认</a>
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
        rowKey={() => uuid()}
        toolBarRender={false}
        pagination={{
          pageSize: 100,
        }}
        request={(params, sorter) => {
          const values = form.getFieldsValue();
          return getSiteEventLoggerListApi({
            fixedSiteId: values.fixedSiteId,
            page: {
              ...transformPagination(params),
              ...transformSort(sorter),
              ...date2Range(values.date),
            },
            eventType,
          }).then((res) => {
            return {
              data: res.data.data.records,
              total: res.data.data.total,
            };
          });
        }}
      />
    </>
  );
}
