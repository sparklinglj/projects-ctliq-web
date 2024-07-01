import { SelectUser } from '@/pages/user/module/SelectUser';
import { Form } from 'antd';
import { FixedSiteVo } from 'interface/serverApi';
import { useEffect } from 'react';
import { updateApi } from '..';

export function OperateUser({ data, onRefresh }: { data: FixedSiteVo; onRefresh?: () => void }) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);
  return (
    <>
      <Form
        style={{ maxWidth: 400 }}
        labelCol={{ flex: '100px' }}
        onValuesChange={(e) => {
          updateApi({
            fixedSiteId: data.fixedSiteId,
            ...e,
          }).then((res) => {
            console.log(res);
            onRefresh?.();
          });
        }}
        initialValues={{
          operator1Id: 3,
        }}
        form={form}
      >
        {Array.from({ length: 8 }).map((_, ind) => {
          return (
            <Form.Item label={`操作员${ind + 1}`} key={ind} name={`operator${ind + 1}Id`}>
              <SelectUser />
            </Form.Item>
          );
        })}
        {/* <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item> */}
      </Form>
    </>
  );
}
