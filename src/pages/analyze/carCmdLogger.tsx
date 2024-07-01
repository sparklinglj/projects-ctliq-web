import PageTable from '@/components/PageTable';
import { SiteState, SiteStateMap } from '@/constants';
import { date2Range, transformPagination, transformSort } from '@/utils';
import { ActionType } from '@ant-design/pro-components';
import { Button, DatePicker, Form, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { ControlFixedSite } from 'interface/serverApi';
import { useRef } from 'react';
import { SelectCar } from '../car/module/CarSelect';
import { getCarCmdLoggerListApi } from './module';

interface SearchValues {
  date: Dayjs;
  movingSiteId: number;
}

// 站点日志
export default function CarCmdLogger({ carId }: { carId?: number }) {
  const [form] = Form.useForm<SearchValues>();
  const tableRef = useRef<ActionType>();

  return (
    <>
      <Form<SearchValues>
        layout="inline"
        style={{ padding: '15px 10px' }}
        form={form}
        initialValues={{
          movingSiteId: carId,
        }}
      >
        <Form.Item label="日期" name="date">
          <DatePicker />
        </Form.Item>
        <Form.Item label="车辆" name="movingSiteId">
          <SelectCar allowClear showSearch />
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
            title: '车辆',
            dataIndex: 'movingSiteId',
          },
          {
            title: '工作方式',
            dataIndex: 'setState',
            hideInSearch: true,
            sorter: true,
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
            title: '执行状态',
            dataIndex: 'isExecuted',
            sorter: true,
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
            dataIndex: 'employeeId',
            hideInSearch: true,
            sorter: true,
          },
        ]}
        rowKey={'autoId'}
        toolBarRender={false}
        pagination={{
          pageSize: 100,
        }}
        request={(params, sorter) => {
          const values = form.getFieldsValue();
          return getCarCmdLoggerListApi({
            movingSiteId: values.movingSiteId,
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
