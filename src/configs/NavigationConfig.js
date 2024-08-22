import { GlobalOutlined, GroupOutlined, ProfileOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const dashBoardNavTree = [{
  key: 'Home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Home',
  breadcrumb: false,
  submenu: [{
    key: 'Dashboard',
    path: `${APP_PREFIX_PATH}/dashboard`,
    title: 'Dashboard',
    icon: GlobalOutlined,
    breadcrumb: false,
    submenu: [],
  },{
    key: 'My SODA',
    path: `${APP_PREFIX_PATH}/my-soda`,
    title: 'My SODA',
    icon: ProfileOutlined,
    breadcrumb: false,
    submenu: []
  },
  {
    key: 'My Performance',
    path: `${APP_PREFIX_PATH}/my-performance`,
    title: 'My Performance',
    icon: BarChartOutlined,
    breadcrumb: false,
    submenu: []
  },]
}]

const analyticsNavTree = [{
  key: 'Absen',
  path: `${APP_PREFIX_PATH}/absen`,
  title: 'Absen',
  breadcrumb: false,
  submenu: [
    
    // {
    //   key: 'My Report',
    //   path: `${APP_PREFIX_PATH}/my-report`,
    //   title: 'My Report',
    //   icon: FieldTimeOutlined,
    //   breadcrumb: false,
    //   submenu: [
    //     {
    //       key: 'My Report',
    //       path: `${APP_PREFIX_PATH}/my-report`,
    //       title: 'My Report',
    //       breadcrumb: false,
    //       submenu: []
    //     },
    //     {
    //       key: 'Mingguan',
    //       path: `${APP_PREFIX_PATH}/my-report-mingguan`,
    //       title: 'Mingguan',
    //       breadcrumb: false,
    //       submenu: []
    //     },
    //     {
    //       key: 'Bulanan',
    //       path: `${APP_PREFIX_PATH}/my-report-bulanan`,
    //       title: 'Bulanan',
    //       breadcrumb: false,
    //       submenu: []
    //     },
    //     {
    //       key: 'Tahunan',
    //       path: `${APP_PREFIX_PATH}/my-report-tahunan`,
    //       title: 'Tahunan',
    //       breadcrumb: false,
    //       submenu: []
    //     }]
    // }
  ]
}]

const usersTree = [{
  key: 'Account',
  path: `${APP_PREFIX_PATH}/profile`,
  title: 'Account',
  breadcrumb: false,
  submenu: [
    {
      key: 'My Account',
      path: `${APP_PREFIX_PATH}/my-account`,
      title: 'My Account',
      icon: UserOutlined,
      breadcrumb: false,
      submenu: []
    }
]
}]

const navigationConfig = [
  ...dashBoardNavTree,
  // ...analyticsNavTree,
  ...usersTree
]

export default navigationConfig;
