import { useRequest } from 'ahooks';
import { RefSelectProps, Select, SelectProps } from 'antd';
import { forwardRef } from 'react';
import { getListApi } from '.';

type SelectSiteProps = Omit<SelectProps, 'options'>;

export const SelectSite = forwardRef<RefSelectProps, SelectSiteProps>((props, ref) => {
  const { data } = useRequest(() => {
    return getListApi().then((res) =>
      res.data.data.records.map((item) => ({ label: item.fixedSiteName, value: item.fixedSiteId })),
    );
  });

  return (
    <Select
      style={{ minWidth: 100 }}
      placeholder="请选择站点"
      optionFilterProp="label"
      {...props}
      ref={ref}
      options={data}
    />
  );
});
