import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Manage',
    component: () => import('../views/Manage/Manage.vue'),
    redirect:"/home",
    children:[
      {
        path: '/user', name: 'User', component: () => import('../views/Manage/User.vue')
      },
      {
        path: '/home', name: 'Home', component: () => import('../views/Manage/Home.vue')
      },
      {
        path: '/book', name: 'Book', component: () => import('../views/Manage/Book.vue')
      },
      {
        path: '/case', name: 'Case', component: () => import('../views/Manage/Case.vue')
      },
      {
        path: '/drug', name: 'Drug', component: () => import('../views/Manage/Drug.vue')
      },
      {
        path: '/comb', name: 'Comb', component: () => import('../views/Manage/Comb.vue')
      }
    ]

  },
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Normal/Main.vue'),
    redirect:"/index",
    children: [
      {
        path: '/index', name: 'Index', component: () => import('../views/Normal/Index')
      },
      {
        path: '/bookList', name: 'BookList', component: () => import('../views/InfoShow/BookList.vue')
      },
      {
        path: '/caseList', name: 'CaseList', component: () => import('../views/InfoShow/CaseList')
      },
      {
        path: '/combList', name: 'CombList', component: () => import('../views/InfoShow/CombList')
      },
      {
        path: '/drugList', name: 'DrugList', component: () => import('../views/InfoShow/DrugList')
      },
      {
        path: '/bookCollect', name: 'BookCollect', component: () => import('../views/InfoShow/BookCollect')
      },
      {
        path: '/caseCollect', name: 'CaseCollect', component: () => import('../views/InfoShow/CaseCollect')
      },
      {
        path: '/combCollect', name: 'CombCollect', component: () => import('../views/InfoShow/CombCollect')
      },
      {
        path: '/drugCollect', name: 'DrugCollect', component: () => import('../views/InfoShow/DrugCollect')
      },
      {
        path: '/bookDetail', name: 'BookDetail', component: () => import('../views/InfoShow/BookDetail.vue')
      },
      {
        path: '/caseDetail', name: 'CaseDetail', component: () => import('../views/InfoShow/CaseDetail')
      },
      {
        path: '/combDetail', name: 'CombDetail', component: () => import('../views/InfoShow/CombDetail.vue')
      },
      {
        path: '/drugDetail', name: 'DrugDetail', component: () => import('../views/InfoShow/DrugDetail.vue')
      },
      {
        path: '/userDetail', name: 'UserDetail', component: () => import('../views/InfoShow/UserDetail.vue')
      },
      {
        path: '/login', name: 'Login', component: () => import('../views/Normal/Login')
      },
      {
        path: '/register', name: 'Register', component: () => import('../views/Normal/Register')
      },


    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/Normal/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Normal/Login.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/test/Form.vue')
  },
  {
    path: '/hello',
    name: 'Hello',
    component: () => import('../views/test/Hello.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('../views/test/test.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
