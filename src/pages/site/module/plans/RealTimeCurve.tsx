import { useThemeToken } from '@/hooks/useThemeToken';
import { date2Range } from '@/utils';
import { DualAxes } from '@ant-design/plots';
import { useRequest } from 'ahooks';
import { Card, Col, DatePicker, Descriptions, Flex, Form, Row, Tag } from 'antd';
import dayjs from 'dayjs';
import { useParams } from 'umi';
import { getSiteDotLogApi } from '..';
import styles from './index.module.less';

interface ResultItem {
  liquidLevel: number; // 液位
  temperature: number; // 温度
  dataList: {
    date: string;
    liquidLevel: number; // 液位
    temperature: number; // 温度
  }[];
}

export function RealTimeCurve() {
  const { id } = useParams();
  const { colorSuccess } = useThemeToken();
  const { data: logList, run } = useRequest(() => {
    return getSiteDotLogApi(Number(id!), {
      ...date2Range(form.getFieldValue('date')),
      orders: [
        {
          column: 'data_timestamp',
          asc: true,
        },
      ],
    }).then((res) => {
      const list: ResultItem[] = [];
      (res.data.data.records || []).forEach((item) => {
        const date = dayjs(item.dataTimestamp).format('YYYY-MM-DD HH:mm:ss');
        const ind = item.tankId!;
        if (!list[ind]) {
          list[ind] = {
            liquidLevel: item.liquidLevelValue!, // 液位
            temperature: item.temperatureValue!, // 温度
            dataList: [],
          };
        }
        const result = list[ind];
        result.dataList.push({
          date,
          liquidLevel: item.liquidLevelValue!, // 液位
          temperature: item.temperatureValue!, // 温度
          // liquidLevel: Math.random() * 30, // 液位
          // temperature: Math.random() * 30, // 温度
        });
      });
      return list;
    });
  });
  const [form] = Form.useForm();
  return (
    <Row gutter={[10, 10]} style={{ paddingBottom: 10 }}>
      <Col xs={24}>
        <Form
          form={form}
          onValuesChange={() => {
            run?.();
          }}
          initialValues={{
            date: dayjs(),
          }}
        >
          <Form.Item label="日期" name="date">
            <DatePicker disabledDate={(d) => d.isAfter(dayjs())} />
          </Form.Item>
        </Form>
      </Col>
      {logList?.map((item, ind) => {
        return (
          <Col key={ind} xs={24}>
            <Card hoverable>
              <Row align="middle">
                <Col xs={12} className={styles.leftCard}>
                  <Flex align="center" justify="space-between">
                    <div className={styles.titleInfo}>
                      <div>液位</div>
                      <div className={styles.value}>{item.liquidLevel!}</div>
                      <div>
                        <Tag>正常</Tag>
                      </div>
                    </div>
                    <Descriptions column={1} style={{ width: 150 }}>
                      <Descriptions.Item label="容量">{item.temperature!}</Descriptions.Item>
                      <Descriptions.Item label="液位状态">
                        <Tag color={colorSuccess}>正常</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="报警上限">2.55 M</Descriptions.Item>
                      <Descriptions.Item label="报警下限">0.2 M</Descriptions.Item>
                    </Descriptions>
                  </Flex>
                </Col>
                <Col xs={12}>
                  <Flex align="center" justify="space-between">
                    <div className={styles.titleInfo}>
                      <div>温度</div>
                      <div className={styles.value}>{item.temperature!}</div>
                      <div>
                        <Tag>正常</Tag>
                      </div>
                    </div>
                    <Descriptions column={1} style={{ width: 150 }}>
                      <Descriptions.Item label="温度状态">
                        <Tag color={colorSuccess}>正常</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="报警上限">80 ℃</Descriptions.Item>
                      <Descriptions.Item label="报警下限">0 ℃</Descriptions.Item>
                    </Descriptions>
                  </Flex>
                </Col>
                <Col xs={24}>
                  <br />

                  <DualAxes
                    data={[item.dataList || [], item.dataList || []]}
                    height={400}
                    xField="date"
                    yField={['liquidLevel', 'temperature']}
                    meta={{
                      liquidLevel: {
                        alias: '液位',
                      },
                      temperature: {
                        alias: '温度',
                      },
                    }}
                    yAxis={{
                      liquidLevel: {
                        min: 0,
                        max: 3,
                      },
                      temperature: {
                        min: 0,
                        max: 100,
                      },
                    }}
                    geometryOptions={[
                      {
                        geometry: 'line',
                        color: '#E97803',
                      },
                      {
                        geometry: 'line',
                        color: '#1EBF7A',
                      },
                    ]}
                    // slider={{}}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
