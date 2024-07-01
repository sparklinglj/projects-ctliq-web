import PageTable from '@/components/PageTable';
import {
  SiteLock,
  SiteLockMap,
  SiteState,
  SiteStateMap,
  SiteUrgLock,
  SiteUrgLockMap,
} from '@/constants';
import { date2Range, transformPagination, transformSort } from '@/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button, DatePicker, Form, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ControlFixedSite } from 'interface/serverApi';
import { useRef } from 'react';
import { SelectSite } from '../site/module/SiteSelect';
import { getSiteCmdLoggerListApi } from './module';

interface SearchValues {
  date: Dayjs;
  fixedSiteId: number;
}

// 站点指令日志
export default function SiteCmdLogger({ siteId }: { siteId?: number }) {
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
      <PageTable<ControlFixedSite>
        actionRef={tableRef}
        style={{ padding: '0 10px 10px' }}
        scroll={{ y: window.innerHeight - 240 }}
        columns={[
          {
            title: '指令序列号',
            dataIndex: 'autoId',
            width: 100,
          },
          {
            title: '时间',
            dataIndex: 'dataTimestamp',
            valueType: 'dateTimeRange',
            width: 160,
            render: (_, row) => dayjs(row.dataTimestamp).format('YYYY-MM-DD HH:mm:ss'),
            sorter: true,
          },
          {
            title: '工作状态',
            dataIndex: 'setState',
            hideInSearch: true,
            render: (_, row) => {
              const item = SiteStateMap[row.setState as SiteState];
              if (!item) return null;
              return (
                <>
                  <span style={{ color: item.color }}>{item?.label}</span>
                </>
              );
            },
          },
          {
            title: '解封指令',
            dataIndex: 'setLock',
            render: (_, row) => {
              const item = SiteLockMap[row.setLock as SiteLock];
              if (!item) return null;
              return (
                <>
                  <span style={{ color: item.color }}>{item?.label}</span>
                </>
              );
            },
          },
          {
            title: '紧急解封指令',
            dataIndex: 'setUrgLock',
            render: (_, row) => {
              const item = SiteUrgLockMap[row.setUrgLock as SiteUrgLock];
              if (!item) return null;
              return (
                <>
                  <span style={{ color: item.color }}>{item?.label}</span>
                </>
              );
            },
          },
          {
            title: '执行状态',
            dataIndex: 'isExecuted',
            render: (_, row) => {
              return row.isExecuted === 0 ? (
                <Tag color="warning">未执行</Tag>
              ) : (
                <Tag color="success">已执行</Tag>
              );
            },
          },
          {
            title: '员工',
            dataIndex: 'employeeName',
            hideInSearch: true,
          },
        ]}
        rowKey={'autoId'}
        toolBarRender={false}
        pagination={{
          pageSize: 100,
        }}
        request={(params, sorter) => {
          const values = form.getFieldsValue();
          return getSiteCmdLoggerListApi({
            fixedSiteId: values.fixedSiteId,
            page: {
              ...transformPagination(params),
              ...transformSort(sorter),
              ...date2Range(values.date),
            },
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
