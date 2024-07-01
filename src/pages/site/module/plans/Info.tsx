import { Descriptions, Tag } from 'antd';
import { FixedSiteVo } from 'interface/serverApi';
import ReactJson from 'react-json-view';

export function Info({ data }: { data: FixedSiteVo }) {
  if (!data) return null;
  return (
    <>
      <Descriptions column={2} bordered>
        <Descriptions.Item label="站点 ID">{data.fixedSiteId}</Descriptions.Item>
        <Descriptions.Item label="站点名称">{data.fixedSiteName}</Descriptions.Item>
        <Descriptions.Item label="工区">{data.fixedSiteRegion}</Descriptions.Item>
        <Descriptions.Item label="经度">{data.fixedSiteLongitude}</Descriptions.Item>
        <Descriptions.Item label="纬度">{data.fixedSiteLatitude}</Descriptions.Item>
        <Descriptions.Item label="油罐数量">{data.tankNum}</Descriptions.Item>
        {Array.from({ length: 7 }).map((_, ind) => {
          return (
            <Descriptions.Item key={ind} label={`操作员 ${ind + 1}`}>
              <Tag>{data[`operator${ind + 1}Id` as 'operator1Id']}</Tag>
              {data[`operator${ind + 1}Name` as 'operator1Id']}
            </Descriptions.Item>
          );
        })}
        <Descriptions.Item label="上报时间">{data.cvtValue?.dataTimestamp}</Descriptions.Item>
        <Descriptions.Item label="cvtDiDevice">
          {data.cvtValue?.cvtDiDevice?.toString(16)}
        </Descriptions.Item>
        <Descriptions.Item label="cvtDi485link">
          {data.cvtValue?.cvtDi485link?.toString(16)}
        </Descriptions.Item>
        <Descriptions.Item label="cvtDiWork">
          {data.cvtValue?.cvtDiWork?.toString(16)}
        </Descriptions.Item>
        <Descriptions.Item label="cvtDiEvent">
          {data.cvtValue?.cvtDiEvent?.toString(16)}
        </Descriptions.Item>
      </Descriptions>
      <ReactJson src={data} />
    </>
  );
}
