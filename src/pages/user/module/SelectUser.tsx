import { useRequest } from 'ahooks';
import { RefSelectProps, Select, SelectProps } from 'antd';
import { forwardRef } from 'react';
import { getUserList } from '.';

interface SelectUserProps extends Omit<SelectProps, 'options'> {
  disabledList?: number[];
}

export const SelectUser = forwardRef<RefSelectProps, SelectUserProps>((props, ref) => {
  const { data } = useRequest(() => {
    return getUserList().then((res) => res.data.data.records);
  });

  return (
    <Select
      style={{ minWidth: 100 }}
      placeholder="请选择用户"
      {...props}
      ref={ref}
      options={data?.map((o) => ({
        value: o.employeeId,
        label: o.employeeName,
        disabled: props.disabledList?.includes(o.employeeId),
      }))}
    />
  );
});
