import { useRequest } from 'ahooks';
import { Tabs } from 'antd';
import { useParams } from 'umi';
import SiteCarLogger from '../analyze/siteCarLogger';
import SiteCmdLogger from '../analyze/siteCmdLogger';
import SiteEventLogger from '../analyze/siteEventLogger';
import { getDetailApi } from './module';
import { Info } from './module/plans/Info';
import { OperateUser } from './module/plans/OperateUser';
import { PullOilLog } from './module/plans/PullOilLog';
import { RealTimeCurve } from './module/plans/RealTimeCurve';

export default function SiteDetailPage() {
  const { id } = useParams();
  const { data: info, run } = useRequest(() => {
    return getDetailApi(id!).then((res) => res.data.data);
  });

  return (
    <>
      <Tabs
        style={{ margin: '0 10px' }}
        items={[
          {
            label: '实时曲线',
            key: '1',
            children: <RealTimeCurve />,
          },
          {
            label: '拉油日志',
            key: '2',
            children: <PullOilLog />,
          },
          {
            label: '报警日志',
            key: '3',
            children: <SiteEventLogger eventType={2} siteId={Number(id!)} />,
          },
          {
            label: '操作日志',
            key: '4',
            children: <SiteEventLogger eventType={1} siteId={Number(id!)} />,
          },
          {
            label: '指令日志',
            key: '5',
            children: <SiteCmdLogger siteId={Number(id!)} />,
          },
          {
            label: '详细信息',
            key: '6',
            children: <Info data={info!} />,
          },
          {
            label: '装车记录',
            key: '7',
            children: <SiteCarLogger siteId={Number(id!)} />,
          },
          {
            label: '人脸识别操作员管理',
            key: '8',
            children: <OperateUser data={info!} onRefresh={run} />,
          },
        ]}
      ></Tabs>
    </>
  );
}
