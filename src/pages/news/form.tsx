import Editor from '@/components/Editor';
import Header from '@/components/Header';
import PageContainer from '@/components/PageContainer';
import UploadImage from '@/components/UploadImage';
import { NEWS_TYPE } from '@/constants';
import { message } from '@/utils/notice';
import { useRequest } from 'ahooks';
import { Button, Card, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import dayjs from 'dayjs';
import { ApiUpdateNewsBodyDto } from 'interface/serverApi';
import { useEffect } from 'react';
import { history, useParams } from 'umi';
import { createApi, getDetailApi, updateApi } from './module';

type FormValues = ApiUpdateNewsBodyDto;

export default function NewsForm() {
  const { id } = useParams();
  const isUpdate = !!id;
  const [form] = Form.useForm<FormValues>();
  const { run: submitHandler, loading } = useRequest(
    async () => {
      const values = form.getFieldsValue();
      values.push_date = dayjs(values.push_date).format('YYYY-MM-DD HH:mm:ss');
      if (isUpdate) {
        await updateApi({
          ...values,
          id: Number(id),
          push_date: dayjs(values.push_date).format('YYYY-MM-DD HH:mm:ss'),
        });
        message.success('更新成功');
      } else {
        await createApi({ ...values });
        history.push('/news/list');
        message.success('创建成功');
      }
    },
    { manual: true },
  );

  useEffect(() => {
    if (id) {
      getDetailApi(Number(id)).then((res) => {
        console.log('res: ', res);
        form.setFieldsValue({
          ...res.data.data,
          // @ts-ignore
          push_date: dayjs(res.data.data.push_date),
        });
      });
    }
  }, [id]);

  return (
    <>
      <Header />
      <PageContainer>
        <Card style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Form<FormValues>
            form={form}
            onFinish={submitHandler}
            labelCol={{ xs: 3 }}
            initialValues={{ recommend: 0, type: NEWS_TYPE.COM.value }}
          >
            <Form.Item label="新闻标题" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="发布日期" name="push_date">
              <DatePicker format={'YYYY-MM-DD HH:mm'} showTime />
            </Form.Item>
            <Form.Item
              label="推荐等级"
              name="recommend"
              help="0 为不推荐，大于 0 会在首页根据值进行排序展示，值越大排列越靠前"
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item label="新闻封面" name="cover">
              <UploadImage />
            </Form.Item>
            <Form.Item label="新闻描述" name="desc">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="新闻详情"
              name="content"
              rules={[{ required: true, validateTrigger: 'submit' }]}
            >
              <Editor style={{ height: 400 }} />
            </Form.Item>
            <Form.Item label=" ">
              <Row justify="center">
                <Button style={{ width: 160 }} type="primary" htmlType="submit" loading={loading}>
                  提交
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      </PageContainer>
    </>
  );
}
