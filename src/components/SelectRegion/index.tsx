import { useRegionListStore } from '@/store/region';
import { RefSelectProps, Select, SelectProps } from 'antd';
import { forwardRef } from 'react';

type SelectRegionProps = Omit<SelectProps, 'options'>;

export const SelectRegion = forwardRef<RefSelectProps, SelectRegionProps>((props, ref) => {
  const { data } = useRegionListStore();

  return (
    <Select
      style={{ minWidth: 100 }}
      placeholder="请选择工区"
      {...props}
      ref={ref}
      options={data?.map((o) => ({
        value: o.regionName,
        label: o.regionName,
      }))}
    />
  );
});
