const router = {
  routes: [
    { path: '/login', component: 'login' },
    { path: '/nopassword', component: 'nopassword' },
    // { path: '/init-root-user', component: 'initRootUser' },
    { path: '/', redirect: '/site/list' },
    {
      path: '/',
      component: '@/layouts/main',
      meta: {
        isMenuRoot: true,
      },
      routes: [
        {
          path: '/userinfo',
          component: 'userinfo',
          title: '用户信息',
          menuHide: true,
        },
        {
          path: '/user',
          component: 'user',
          title: '用户列表',
        },
        {
          path: '/role',
          component: 'adminRole',
          title: '角色管理',
        },
        {
          path: '/map',
          component: 'map',
          title: '地图',
        },
        {
          path: '/site',
          title: '站点管理',
          routes: [
            {
              path: '/site/list',
              component: 'site',
              title: '站点列表',
            },
            {
              path: '/site/map',
              component: 'site/map',
              title: '站点地图',
            },
            {
              path: '/site/detail/:id',
              component: 'site/detail',
              title: '站点详情',
              menuHide: true,
            },
          ],
        },
        {
          path: '/car',
          title: '车辆管理',
          routes: [
            {
              path: '/car/list',
              component: 'car',
              title: '车辆列表',
            },
            {
              path: '/car/map',
              component: 'car/map',
              title: '车辆地图',
            },
            {
              path: '/car/detail/:id',
              component: 'car/detail',
              title: '车辆详情',
              menuHide: true,
            },
          ],
        },
        {
          path: '/analyze-event',
          title: '报警日志',
          routes: [
            {
              path: '/analyze-event/site-event-logger',
              component: 'analyze/siteEventLogger',
              title: '站点报警日志',
            },
            {
              path: '/analyze-event/car-event-logger',
              component: 'analyze/carEventLogger',
              title: '车辆报警日志',
            },
          ],
        },
        {
          path: '/analyze-site',
          title: '站点统计分析',
          routes: [
            {
              path: '/analyze-site/site-operate-logger',
              component: 'analyze/siteOperateLogger',
              title: '站点操作日志',
            },
            {
              path: '/analyze-site/site-cmd-logger',
              component: 'analyze/siteCmdLogger',
              title: '站点指令日志',
            },
            {
              path: '/analyze-site/site-car-logger',
              component: 'analyze/siteCarLogger',
              title: '站点装车记录',
            },
          ],
        },
        {
          path: '/analyze-car',
          title: '车辆统计分析',
          routes: [
            {
              path: '/analyze-car/car-operate-logger',
              component: 'analyze/carOperateLogger',
              title: '车辆操作日志',
            },
            {
              path: '/analyze-car/car-cmd-logger',
              component: 'analyze/carCmdLogger',
              title: '车辆指令日志',
            },
          ],
        },
      ],
    },
    { path: '*', component: '404' },
  ],
};
export default router;
