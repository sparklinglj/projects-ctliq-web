import { Tabs } from 'antd';
import { useParams } from 'umi';
import CarCmdLogger from '../analyze/carCmdLogger';
import CarEventLogger from '../analyze/carEventLogger';
import { PositionList } from './module/PositionList';

export default function CarDetailPage() {
  const { id } = useParams();

  return (
    <>
      <Tabs
        style={{ margin: '0 10px' }}
        defaultActiveKey="6"
        items={[
          {
            label: '报警日志',
            key: '3',
            children: <CarEventLogger eventType={2} carId={Number(id!)} />,
          },
          {
            label: '操作日志',
            key: '4',
            children: <CarEventLogger eventType={1} carId={Number(id!)} />,
          },
          {
            label: '指令日志',
            key: '5',
            children: <CarCmdLogger carId={Number(id!)} />,
          },
          {
            label: '车辆轨迹',
            key: '6',
            children: <PositionList carId={Number(id!)} />,
          },
        ]}
      ></Tabs>
    </>
  );
}
