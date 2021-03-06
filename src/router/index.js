import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['administrator','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/user/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: '首页', icon: 'tab' }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /*{
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['administrator', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['administrator'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['administrator']
        }
      }
    ]
  },*/

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,

  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'User',
    meta: {
      title: '用户',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/user/edit'),
        name: 'UserCreate',
        meta: { title: '添加用户', icon: 'edit' },
        hidden: true
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/user/edit'),
        name: 'UserEdit',
        meta: { title: '编辑用户', noCache: true },
        hidden: true
      },
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        name: 'UserIndex',
        meta: { title: '用户列表', icon: 'list' }
      },
      {
        path: 'rider',
        component: () => import('@/views/user/index'),
        name: 'Rider',
        meta: { title: '骑手列表', icon: 'list' }
      },
      {
        path: 'incharge',
        component: () => import('@/views/user/index'),
        name: 'Incharge',
        meta: { title: '站长列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/school',
    component: Layout,
    redirect: '/school/index',
    name: 'school',
    meta: {
      title: '学校',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/school/index'),
        name: 'SchoolIndex',
        meta: { title: '学校列表', icon: 'list' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    name: 'Order',
    meta: {
      title: '订单',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/order/index'),
        name: 'OrderIndex',
        meta: { title: '订单列表', icon: 'list' }
      },
      {
        path: 'edit',
        component: () => import('@/views/order/edit'),
        name: 'OrderEdit',
        meta: { title: '订单详情', icon: 'list', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    redirect: '/promotion/index',
    name: 'Promotion',
    meta: {
      title: '促销',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/promotion/index'),
        name: 'PromotionIndex',
        meta: { title: '促销列表', icon: 'list' }
      },
      {
        path: 'edit',
        component: () => import('@/views/promotion/edit'),
        name: 'PromotionEdit',
        meta: { title: '编辑促销', icon: 'list', noCache: true },
        hidden: true
      },
      {
        path: 'coupon',
        component: () => import('@/views/promotion/coupon'),
        name: 'PromotionCoupon',
        meta: { title: '优惠券列表', icon: 'list' },
        hidden: true
      }
    ]
  },
  {
    path: '/runsetting',
    component: Layout,
    redirect: '/runsetting/edit',
    name: 'Runsetting',
    meta: {
      title: '财务',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'edit',
        component: () => import('@/views/runsetting/edit'),
        name: 'costEdit',
        meta: { title: '提现详情', icon: 'list', noCache: true },
        hidden: true
      },
      {
        path: 'drawlist',
        component: () => import('@/views/runsetting/drawlist'),
        name: 'Drawlist',
        meta: { title: '提现列表', icon: 'list' }
      },
      {
        path: 'costset',
        component: () => import('@/views/runsetting/costset'),
        name: 'costset',
        meta: { title: '财务设置', icon: 'list', noCache: true }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/web',
    name: 'setting',
    meta: {
      title: '设置',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'web',
        component: () => import('@/views/setting/web'),
        name: 'settingweb',
        meta: { title: '系统设置', icon: 'list', noCache: true },
      },
      {
        path: 'pay',
        component: () => import('@/views/setting/web'),
        name: 'settingpay',
        meta: { title: '支付设置', icon: 'list', noCache: true },
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
