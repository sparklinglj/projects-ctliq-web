import PageTable from '@/components/PageTable';
import { UnlockType, UnlockTypeMap } from '@/constants';
import { date2Range, transformPagination, transformSort, uuid } from '@/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button, DatePicker, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { LoadFixedSite } from 'interface/serverApi';
import { useRef } from 'react';
import { SelectSite } from '../site/module/SiteSelect';
import { siteCarLoggerApi } from './module';

interface SearchValues {
  date: Dayjs;
  fixedSiteId: number;
}

interface SiteCarLoggerProps {
  siteId?: number;
}

// 站点装车记录日志
export default function SiteCarLogger({ siteId }: SiteCarLoggerProps) {
  console.log('siteId: ', siteId);
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
      <PageTable<LoadFixedSite>
        actionRef={tableRef}
        scroll={{ y: window.innerHeight - 305 }}
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
            title: '描述',
            dataIndex: 'unlockType',
            width: 170,
            render: (_, row) => {
              const { label, color } = UnlockTypeMap[row.unlockType as UnlockType] || {};
              if (label) {
                return (
                  <>
                    通过 <span style={{ color }}>{label}</span> 解封
                  </>
                );
              }
              return;
            },
          },
          {
            title: '站点',
            dataIndex: 'fixedSiteName',
          },
          {
            title: '车辆',
            dataIndex: 'movingSiteVagon',
          },
          {
            title: '鹤管序号',
            dataIndex: 'tankI',
            width: 90,
          },
          {
            title: '装载用时（秒）',
            dataIndex: 'loadTimercnt',
          },
          {
            title: '操作员',
            dataIndex: 'employeeName',
          },
        ]}
        rowKey={() => uuid()}
        toolBarRender={false}
        pagination={{
          pageSize: 100,
        }}
        request={(params, sorter) => {
          const values = form.getFieldsValue();
          return siteCarLoggerApi({
            fixedSiteId: values.fixedSiteId,
            page: {
              ...transformPagination(params),
              ...transformSort(sorter),
              ...date2Range(values.date),
            },
          }).then((res) => {
            return {
              data: res.data.data?.records || [],
              total: res.data.data?.total || 0,
            };
          });
        }}
      />
    </>
  );
}
