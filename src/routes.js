export default [
  {
    path: '',
    redirect: '/profile',
  },
  {
    name: 'portfolio',
    path: '/portfolio',
    component: () => import('./pages/Portfolio'),
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
