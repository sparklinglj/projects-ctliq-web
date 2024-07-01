import { useRequest } from 'ahooks';
import { RefSelectProps, Select, SelectProps } from 'antd';
import { forwardRef } from 'react';
import { getListApi } from '.';

type SelectCarProps = Omit<SelectProps, 'options'>;

export const SelectCar = forwardRef<RefSelectProps, SelectCarProps>((props, ref) => {
  const { data } = useRequest(() => {
    return getListApi().then((res) =>
      res.data.data.records.map((item) => ({
        label: item.movingSiteVagon,
        value: item.movingSiteId,
      })),
    );
  });

  return (
    <Select
      style={{ minWidth: 100 }}
      placeholder="请选择车辆"
      {...props}
      ref={ref}
      options={data}
    />
  );
});
