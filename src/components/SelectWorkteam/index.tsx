import { useWorkteamListStore } from '@/store/workteam';
import { RefSelectProps, Select, SelectProps } from 'antd';
import { forwardRef } from 'react';

type SelectWorkteamProps = Omit<SelectProps, 'options'>;

export const SelectWorkteam = forwardRef<RefSelectProps, SelectWorkteamProps>((props, ref) => {
  const { data } = useWorkteamListStore();

  return (
    <Select
      style={{ minWidth: 100 }}
      placeholder="请选择作业大队"
      {...props}
      ref={ref}
      options={data?.map((o) => ({
        value: o.workTeamId,
        label: o.workTeamName,
      }))}
    />
  );
});
