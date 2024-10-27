import Home from '@/views/home/Home.vue' // 首页
import Center from '@/views/center/Center.vue' // 个人中心
import UserAdd from '@/views/user-manage/UserAdd.vue' // 添加用户
import UserList from '@/views/user-manage/UserList.vue' // 用户列表
import NewsAdd from '@/views/news-manage/NewsAdd.vue' // 新闻添加
import NewsEdit from '@/views/news-manage/NewsEdit.vue' // 新闻编辑
import NewsList from '@/views/news-manage/NewsList.vue' // 新闻列表
import ProductAdd from '@/views/product-manage/ProductAdd.vue' // 产品添加
import ProductList from '@/views/product-manage/ProductList.vue' // 产品列表
import ProductEdit from '@/views/product-manage/ProductEdit.vue' // 产品编辑
import NotFound from '@/views/notfound/NotFound.vue' // 404 页面

const routes = [
    { path: '/index', component: Home },
    { path: '/center', component: Center },
    { path: '/user-manage/adduser', component: UserAdd, requireAdmin: true },
    { path: '/user-manage/userlist', component: UserList, requireAdmin: true },
    { path: '/news-manage/addnews', component: NewsAdd },
    { path: '/news-manage/editnews/:id', component: NewsEdit },
    { path: '/news-manage/newslist', component: NewsList },
    { path: '/product-manage/addproduct', component: ProductAdd },
    { path: '/product-manage/productlist', component: ProductList },
    { path: '/product-manage/editproduct/:id', component: ProductEdit },
    { path: '/', redirect: '/index' },
    { path: '/:pathMatch(.*)*', name: 'Notfound', component: NotFound }
]

export default routes