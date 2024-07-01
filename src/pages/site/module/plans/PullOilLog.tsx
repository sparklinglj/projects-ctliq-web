import { UnlockType, UnlockTypeMap } from '@/constants';
import { date2Range } from '@/utils';
import { useRequest } from 'ahooks';
import { DatePicker, Empty, Form, Timeline } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'umi';
import { getSiteLogApi } from '..';

export function PullOilLog() {
  const { id } = useParams();
  const { data, run } = useRequest(() => {
    return getSiteLogApi(Number(id), {
      ...date2Range(form.getFieldValue('date')),
    }).then((res) => res.data.data?.records);
  });
  const [form] = Form.useForm();
  return (
    <>
      <Form
        form={form}
        onValuesChange={() => {
          run?.();
        }}
      >
        <Form.Item label="日期" name="date">
          <DatePicker disabledDate={(d) => d.isAfter(dayjs())} allowClear />
        </Form.Item>
      </Form>
      {data?.length ? (
        <Timeline
          items={data.map((item) => {
            return {
              children: (
                <div>
                  <div>
                    在 <span>{dayjs(item.dataTimestamp).format('YYYY-MM-DD HH:mm:ss')}</span> 使用{' '}
                    <b>{UnlockTypeMap[item.unlockType as UnlockType].label}</b> 方式进行解封
                  </div>
                  <div>
                    车辆：<span>{item.movingSiteVagon}</span>
                  </div>
                </div>
              ),
            };
          })}
        />
      ) : (
        <Empty style={{ padding: 40 }}></Empty>
      )}
    </>
  );
}
