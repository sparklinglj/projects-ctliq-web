import { file2base64 } from '@/utils';
import { message } from '@/utils/notice';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, UploadProps } from 'antd';
interface UploadImageProps {
  value?: string;
  onChange?: (value: string) => void;
}
export default function UploadImage({ value, onChange }: UploadImageProps) {
  const changeHandler: UploadProps<string>['onChange'] = (e) => {
    if (e.file.response) {
      onChange?.(e.file.response);
    }
  };
  return (
    <Upload<string>
      onChange={changeHandler}
      listType="picture-card"
      showUploadList={false}
      accept="image/*"
      customRequest={({ file, onError, onSuccess }) => {
        file2base64(file as File)
          .then((res) => {
            onSuccess?.(res);
            message.success('上传成功');
          })
          .catch(onError);
        return {
          abort() {
            console.log('abort');
          },
        };
      }}
    >
      {value ? (
        <img style={{ width: '100%', height: '100%', display: 'block' }} src={`${value}`} />
      ) : (
        <div>
          <PlusOutlined style={{ fontSize: 30, color: '#666' }} />
        </div>
      )}
    </Upload>
  );
}
