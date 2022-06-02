
const routes = [
  {
    path: '/',
    component: () => import('layouts/TCD_Layout.vue'),
    children: [
      { path: 'pruebas', component: () => import('pages/pruebas.vue') },
      { path: 'newfilm', component: () => import('pages/newFilm.vue') },
      { path: 'film', component: () => import('pages/filmInfo.vue') },
      { path: 'director', component: () => import('pages/dirInfo.vue') },
      { path: 'filmList', component: () => import('pages/filmList.vue') },
      { path: 'directorList', component: () => import('pages/dirList.vue') },
      { path: 'genreList', component: () => import('pages/genreList.vue') },
      { path: 'genre', component: () => import('pages/genreInfo.vue') },
      { path: '', component: () => import('pages/main.vue') }

    ]
  },
  {
    path: '/',
    component: () => import('layouts/TCD_Layout_empty.vue'),
    children: [
      { path: 'login', component: () => import('pages/login.vue') }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
