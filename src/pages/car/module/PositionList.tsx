import TileMap from '@/components/TileMap';
import { date2Range } from '@/utils';
import { LineLayer, Scene } from '@antv/l7';
import { DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { getPosListApi } from '.';

const DATA_LAYER_NAME = 'dataLayer';
interface PositionListProps {
  carId?: number;
}
export function PositionList({ carId }: PositionListProps) {
  const [form] = Form.useForm();
  const sceneRef = useRef<Scene>();
  if (!carId) return null;
  const getDataHandler = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    getPosListApi(carId, {
      ...date2Range(form.getFieldValue('date')),
    }).then((res) => {
      const l = scene.getLayerByName(DATA_LAYER_NAME);
      if (l) {
        scene.removeLayer(scene.getLayerByName(DATA_LAYER_NAME)!);
      }
      const list = res.data.data?.records || [];
      const mapsList = list.map((item) => [item.posLongitude, item.posLatitude]) as [
        number,
        number,
      ][];

      const data = [
        {
          name: 'data',
          coordinates: mapsList,
          length: 10,
        },
      ];
      console.log('data: ', data);

      const layer = new LineLayer({ zIndex: 1, name: DATA_LAYER_NAME })
        .source(data, {
          parser: {
            type: 'json',
            coordinates: 'coordinates',
          },
        })
        .size(5)
        .shape('line')
        .texture('arrow')
        .active(true)
        .color('length', ['#1677ff', '#1677ff'])
        .animate({
          interval: 1, // 间隔
          duration: 1, // 持续时间，延时
          trailLength: 2, // 流线长度
        })
        .style({
          opacity: 1,
          lineTexture: true, // 开启线的贴图功能
          iconStep: 20, // 设置贴图纹理的间距
          borderWidth: 0.5, // 默认文 0，最大有效值为 0.5
          borderColor: '#1677ff', // 默认为 #ccc
        });
      scene.setCenter(mapsList[0]);
      scene.addLayer(layer);
    });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 10 }}>
      <Form
        form={form}
        initialValues={{ date: dayjs() }}
        onValuesChange={(e) => {
          console.log(e);
          getDataHandler();
        }}
      >
        <Form.Item label="日期" name="date">
          <DatePicker />
        </Form.Item>
      </Form>
      <TileMap
        style={{ height: `calc(100vh - 210px)`, position: 'relative' }}
        zoom={8}
        center={[121.500372, 31.376501]}
        onLoaded={(scene) => {
          sceneRef.current = scene;
          scene.addImage('arrow', '/arrow.svg');
          getDataHandler();
        }}
      />
    </div>
  );
}
