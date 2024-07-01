import PageTable from '@/components/PageTable';
import { EmployeeClass, EmployeeClassMap } from '@/constants';
import { ModalType, useFormModal } from '@/hooks/useFormModal';
import { enumMap2Options, transformPagination, transformSort } from '@/utils';
import { message } from '@/utils/notice';
import { ActionType, ProColumns } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Flex, Form, Input, Modal, ModalProps, Select, Space, Tag } from 'antd';
import { Employee } from 'interface/serverApi';
import { useEffect, useRef, useState } from 'react';
import { SelectRole } from '../adminRole/module/SelectRole';
import {
  bindRole,
  bindRoleList,
  bindRoleRemove,
  createUser,
  getUserList,
  updateUser,
} from './module';
import { SelectUser } from './module/SelectUser';

type TableItem = Employee;

class RoleModalState {
  open: boolean = false;
  employeeId?: number;
}

export default function UserAdminList() {
  const tableRef = useRef<ActionType>();
  const [searchForm, setSearchForm] = useState({
    keyword: '',
  });
  const [roleModal, setRoleModal] = useState(new RoleModalState());

  const columns: ProColumns<TableItem>[] = [
    // {
    //   dataIndex: 'employeePhoto',
    //   title: '头像',
    //   width: 80,
    //   valueType: 'image',
    // },
    // {
    //   dataIndex: 'employeeId',
    //   title: 'ID',
    // },
    {
      dataIndex: 'employeeName',
      title: '员工姓名',
    },
    {
      dataIndex: 'employeeClass',
      title: '员工级别',
      render: (_, row) => {
        return EmployeeClassMap[row.employeeClass as EmployeeClass]?.label;
      },
    },
    {
      dataIndex: 'employeePhone',
      title: '手机号',
    },
    {
      dataIndex: 'role',
      title: '角色',
      render: (_, row) => {
        return row.roles?.map((r) => <Tag key={r.id}>{r.name}</Tag>);
      },
    },
    {
      dataIndex: 'operate',
      title: '操作',
      render: (_, row) => {
        return (
          <Space>
            <a
              onClick={() => {
                form.resetFields();
                setRoleModal({ open: true, employeeId: row.employeeId! });
              }}
            >
              绑定角色
            </a>
            <a
              onClick={() => {
                form.setFieldsValue(row);
                formModalShow(ModalType.UPDATE);
              }}
            >
              修改
            </a>
          </Space>
        );
      },
    },
  ];
  const {
    submitLoading,
    form,
    formModal,
    formModalShow,
    formModalClose,
    submitHandler,
    formModalTitle,
  } = useFormModal<Employee>({
    submit: (values, modal) => {
      if (modal.type === ModalType.UPDATE) {
        return updateUser(values).then(() => {
          tableRef.current?.reload();
        });
      }

      return createUser(values).then(() => {
        tableRef.current?.reload();
      });
    },
  });

  return (
    <>
      <PageTable<TableItem>
        columns={columns}
        rowKey="employeeId"
        request={(params, sort) => {
          return getUserList({
            ...transformPagination(params),
            ...transformSort(sort),
            keyword: searchForm.keyword,
          }).then(({ data }) => {
            return { data: data.data.records, total: data.data.total || 0 };
          });
        }}
        headerTitle={
          <Input.Search
            value={searchForm.keyword}
            onChange={(e) => {
              setSearchForm((state) => ({
                ...state,
                keyword: e.target.value.trim(),
              }));
            }}
            style={{ width: 400 }}
            placeholder="请输入姓名/用户名搜索"
            enterButton={<>搜索</>}
            allowClear={true}
            onSearch={() => {
              tableRef.current?.setPageInfo?.({ current: 1 });
              tableRef.current?.reload();
            }}
          />
        }
        actionRef={tableRef}
        toolBarRender={() => [
          <Button
            key="create"
            type="primary"
            onClick={() => {
              form.resetFields();
              formModalShow();
            }}
          >
            新增用户
          </Button>,
        ]}
      />
      <UserBindRoleModal
        key={roleModal.employeeId}
        title="绑定角色"
        open={roleModal.open}
        employeeId={roleModal.employeeId}
        onCancel={() => {
          setRoleModal(new RoleModalState());
        }}
        onRefresh={() => {
          tableRef.current?.reload();
        }}
      />
      <Modal
        maskClosable={false}
        open={formModal.open}
        title={formModal.type === ModalType.OTHER ? '重置密码' : `${formModalTitle}用户`}
        onCancel={formModalClose}
        onOk={submitHandler}
        okButtonProps={{
          loading: submitLoading,
        }}
      >
        <br />
        <Form form={form} labelCol={{ span: 4 }} initialValues={{ redundancy_count: 1 }}>
          {formModal.type !== ModalType.CREATE && (
            <Form.Item name="employeeId" hidden>
              <Input />
            </Form.Item>
          )}
          {/* <Form.Item name="employeePhoto" label="员工头像" rules={[{ required: true }]}>
            <UploadImage />
          </Form.Item> */}
          <Form.Item name="employeeName" label="员工姓名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="employeeClass" label="员工级别" rules={[{ required: true }]}>
            <Select
              options={enumMap2Options(EmployeeClassMap).map((i) => ({
                ...i,
                value: Number(i.value),
              }))}
            />
          </Form.Item>
          <Form.Item name="employeePhone" label="手机号" rules={[{ required: true }]}>
            <Input disabled={formModal.type === ModalType.OTHER} />
          </Form.Item>
          {(formModal.type === ModalType.CREATE || formModal.type === ModalType.OTHER) && (
            <>
              <Form.Item name="employeePassword" label="密码" rules={[{ required: true }]}>
                <Input.Password />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
}

interface UserBindRoleModalProps extends ModalProps {
  roleId?: number;
  employeeId?: number;
  onRefresh?: () => void;
}

export function UserBindRoleModal({
  roleId,
  employeeId,
  onRefresh,
  ...props
}: UserBindRoleModalProps) {
  const { data, run } = useRequest(() => {
    return bindRoleList({ roleId, employeeId }).then((res) => res.data.data);
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [form] = Form.useForm();
  const submitHandler = () => {
    form.validateFields().then(() => {
      setSubmitLoading(true);
      bindRole({
        roleId: roleId ? roleId : form.getFieldValue('roleId'),
        employeeId: employeeId ? employeeId : form.getFieldValue('employeeId'),
      })
        .then(() => {
          message.success('添加成功');
          run();
          form.resetFields();
          onRefresh?.();
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    });
  };
  useEffect(() => {
    run();
  }, [roleId, employeeId]);
  return (
    <Modal
      title="绑定角色"
      {...props}
      onOk={submitHandler}
      okButtonProps={{ loading: submitLoading }}
    >
      {employeeId && (
        <>
          <Flex wrap="wrap" gap={'10px 0'}>
            {data?.map((d) => {
              return (
                <Tag
                  key={d.roleId}
                  closeIcon
                  onClose={() => {
                    bindRoleRemove(d).then(() => {
                      run();
                    });
                  }}
                >
                  {d.roleName}
                </Tag>
              );
            })}
          </Flex>
          <br />
          <Form form={form}>
            <Form.Item name="roleId" label="角色">
              <SelectRole disabledList={data?.map((d) => d.roleId!)} />
            </Form.Item>
          </Form>
        </>
      )}
      {roleId && (
        <>
          <Flex wrap="wrap" gap={'10px 0'}>
            {data?.map((d) => {
              return (
                <Tag
                  key={d.employeeId}
                  closeIcon
                  onClose={() => {
                    bindRoleRemove(d).then(() => {
                      run();
                    });
                  }}
                >
                  {d.employeeName}
                </Tag>
              );
            })}
          </Flex>
          <br />
          <Form form={form}>
            <Form.Item name="employeeId" label="用户">
              <SelectUser disabledList={data?.map((d) => d.employeeId!)} />
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
}
