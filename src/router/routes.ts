
const routes = [
  {
    path: '/',
    component: () => import('layouts/DesktopLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/IndexPage.vue')

      },

      { path: 'Settings', component: () => import('pages/Settings.vue') },
      { path: 'Accounts', component: () => import('pages/Accounts.vue') },
      { path: 'ATP', component: () => import('pages/ATP.vue') },
      { path: 'Analysis', component: () => import('pages/Analysis.vue') },
      { path: 'Calendar', component: () => import('pages/Calendar.vue') },
      { path: 'mondana', component: () => import('pages/Mandana.vue') },
      { path: '/activity', component: () => import('pages/activity.vue') },
      { path: '/collectPractive', component: () => import('pages/CollectPractive.vue') }
    ]
  },

  {
    path: '/SignOut',
    component: () => import('pages/SignOut.vue')
  },
  {
    path: '/forgotPassword',
    component: () => import('pages/forgotPassword.vue')
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue')
  },
  {
    path: '/send',
    component: () => import('pages/Send.vue')
  },
  {
    path: '/profile',
    component: () => import('pages/Profile.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
