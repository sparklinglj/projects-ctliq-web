import PageTable from '@/components/PageTable';
import { ModalType, useFormModal } from '@/hooks/useFormModal';
import { ApiCreateAdminRoleBodyDto } from '@/interface/serverApi';
import { usePermissionStore } from '@/store/permission';
import { message } from '@/utils/notice';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Popconfirm, Select, Space, TreeSelect } from 'antd';
import { Role } from 'interface/serverApi';
import { useRef, useState } from 'react';
import { UserBindRoleModal } from '../user';
import { createApi, getListApi, removeApi, updateApi } from './module';

type TableItem = Role;
type FormValues = ApiCreateAdminRoleBodyDto & { id?: number };

class BindUserModalState {
  open = false;
  roleId?: number;
}
export default function AdminRoleList() {
  const tableRef = useRef<ActionType>();
  const permissionStore = usePermissionStore();
  const [bindUserModal, setBindUserModal] = useState(new BindUserModalState());

  const infoModal = useFormModal<FormValues & { id?: number }>({
    submit: (values, modal) => {
      if (modal.type === ModalType.UPDATE) {
        return updateApi({
          ...values,
          id: Number(values.id),
        }).then(() => {
          tableRef.current?.reload();
        });
      }
      return createApi(values).then(() => {
        tableRef.current?.reload();
      });
    },
  });

  const columns: ProColumns<TableItem>[] = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 100,
    },
    {
      dataIndex: 'name',
      title: '角色名称',
    },
    // {
    //   dataIndex: 'version',
    //   title: 'version',
    // },
    {
      dataIndex: 'dataTimestamp',
      title: '创建时间',
      valueType: 'dateTime',
    },

    {
      dataIndex: 'operate',
      title: '操作',
      hideInSearch: true,
      width: 190,
      render: (_, row) => {
        return (
          <Space>
            <a
              onClick={() => {
                setBindUserModal({
                  open: true,
                  roleId: row.id,
                });
              }}
            >
              关联用户
            </a>
            <a
              onClick={() => {
                infoModal.form.setFieldsValue(row);
                infoModal.formModalShow(ModalType.UPDATE);
              }}
            >
              编辑
            </a>
            <Popconfirm
              title={`确定要删除角色 ${row.name} 吗？`}
              onConfirm={() => {
                const close = message.loading('删除中...', 0);
                removeApi(row.id as number)
                  .then(() => {
                    message.success('删除成功');
                    tableRef.current?.reload();
                  })
                  .finally(() => {
                    close();
                  });
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <PageTable<TableItem>
        columns={columns}
        request={() => {
          return getListApi().then(({ data }) => {
            return { data: data.data, total: data.data.length || 0 };
          });
        }}
        pagination={false}
        actionRef={tableRef}
        toolBarRender={() => [
          <Button
            type="primary"
            key="create"
            onClick={() => {
              infoModal.form.resetFields();
              infoModal.formModalShow();
            }}
          >
            新增角色
          </Button>,
        ]}
      />
      <Modal
        maskClosable={false}
        open={infoModal.formModal.open}
        title={`${infoModal.formModalTitle}`}
        onCancel={infoModal.formModalClose}
        onOk={infoModal.submitHandler}
        okButtonProps={{
          loading: infoModal.submitLoading,
        }}
        width={700}
      >
        <br />
        <Form
          form={infoModal.form}
          labelCol={{ flex: '80px' }}
          initialValues={{
            is_stable: false,
            statement: {
              effect: 'Allow',
            },
          }}
        >
          {infoModal.formModal.type === ModalType.UPDATE && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}
          <Form.Item name="name" label="角色名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="effect" name={['statement', 'effect']} rules={[{ required: true }]}>
            <Select
              options={[
                {
                  label: 'Allow',
                  value: 'Allow',
                },
                // {
                //   label: 'Deny',
                //   value: 'Deny',
                // },
              ]}
            />
          </Form.Item>
          <Form.Item label="权限" name={['statement', 'resources']}>
            <TreeSelect
              treeDefaultExpandAll
              multiple
              treeCheckable
              treeNodeFilterProp="title"
              treeData={[
                {
                  title: 'URL',
                  value: 'url',
                  children: permissionStore.urlList?.map((i) => ({
                    title: i.operation,
                    value: i.url,
                  })),
                },
                {
                  title: '资源',
                  value: 'region',
                  children: permissionStore.regionList?.map((i) => ({
                    title: i.name,
                    value: i.region,
                  })),
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      <UserBindRoleModal
        open={bindUserModal.open}
        roleId={bindUserModal.roleId}
        title="关联用户"
        onCancel={() => {
          setBindUserModal(new BindUserModalState());
        }}
      />
    </>
  );
}
