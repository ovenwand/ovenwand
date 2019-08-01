export default [
  {
    path: '',
    redirect: '/portfolio',
  },
  {
    path: '/portfolio',
    component: { template: '<router-view></router-view>' },
    children: [
      {
        name: 'portfolio',
        path: '',
        component: () => import('./pages/Portfolio'),
      },
      {
        path: 'talentchannel',
        component: () => import('./pages/UnderConstruction'),
      },
      {
        path: 'medialab',
        component: () => import('./pages/UnderConstruction'),
      }
    ],
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('./pages/Profile'),
  },
  {
    name: 'company',
    path: '/company',
    component: () => import('./pages/Company'),
  },
]
