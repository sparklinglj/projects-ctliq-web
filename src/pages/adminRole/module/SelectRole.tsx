import { useRequest } from 'ahooks';
import { RefSelectProps, Select, SelectProps } from 'antd';
import { forwardRef } from 'react';
import { getListApi } from '.';

interface SelectRoleProps extends Omit<SelectProps, 'options'> {
  disabledList?: number[];
}

export const SelectRole = forwardRef<RefSelectProps, SelectRoleProps>((props, ref) => {
  const { data } = useRequest(() => {
    return getListApi().then((res) => res.data.data);
  });

  return (
    <Select
      style={{ minWidth: 100 }}
      placeholder="请选择角色"
      {...props}
      ref={ref}
      options={data?.map((o) => ({
        value: o.id,
        label: o.name,
        disabled: props.disabledList?.includes(o.id!),
      }))}
    />
  );
});
