import { USERNAME_KEY } from '@/constants';
import { outLogin } from '@/services';
import { DownOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';
import { Avatar, Breadcrumb, Dropdown } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { useRef } from 'react';
import { history, useAppData, useLocation } from 'umi';
import styles from './index.module.less';

interface TreeNode {
  path?: string;
  title?: string;
  children?: TreeNode[];
}
function getParentNodesByKey(
  path?: string,
  tree: TreeNode[] = [],
  parentNodes: TreeNode[] = [],
): Omit<TreeNode, 'children'>[] | void {
  for (const node of tree) {
    const currentNode = { path: node.path, title: node.title };

    if (new RegExp(pathToRegexp(node.path!)).test(path!)) {
      return [...parentNodes, currentNode];
    }
    if (node.children) {
      const result = getParentNodesByKey(path, node.children, [...parentNodes, currentNode]);
      if (result) {
        return result;
      }
    }
  }
  return void 0;
}

export function HeaderBreadcrumb() {
  const { clientRoutes } = useAppData();
  const location = useLocation();
  const menuRoutes = clientRoutes[0].children?.find((i: any) => i.meta?.isMenuRoot)?.children;
  const currentPathname = location.pathname;
  const list = getParentNodesByKey(currentPathname, menuRoutes);
  useLocation();
  return (
    <Breadcrumb
      className={styles.headerBreadcrumb}
      items={list?.map((item) => ({
        title: item.title,
      }))}
    />
  );
}

function PageFullscreenButton(props: React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef(document.body);
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(ref);

  return (
    <div {...props} onClick={toggleFullscreen}>
      {!isFullscreen ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
    </div>
  );
}

export default function HeaderBar() {
  // const { data: userInfo } = useUserinfoStore();
  const userName = localStorage.getItem(USERNAME_KEY);

  return (
    <div className={`${styles.headerContainer} header`}>
      <div>
        <HeaderBreadcrumb />
      </div>
      <div className={styles.userContainer}>
        <div className={styles.item}>
          <PageFullscreenButton />
        </div>
        <Dropdown
          menu={{
            items: [
              // {
              //   label: '个人资料',
              //   key: 'userinfo',
              //   onClick: () => {
              //     history.push('/userinfo');
              //   },
              // },
              {
                label: '退出',
                key: 'outlogin',
                onClick: () => {
                  outLogin();
                  history.push('/login');
                },
              },
            ],
          }}
        >
          <div className={styles.item}>
            <Avatar>{userName}</Avatar>
            <span className={styles.username}>{userName}</span>
            <DownOutlined style={{ fontSize: 12 }} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
