import Home from '@/components/Home.vue';
import Error404 from '@/components/Views/Errors/Error404.vue';

//* Webpack will recognize wthis syntax to lazy load parts.
// Whenever we want to laod something in ensure's firest argument,
// execute function from second parameter, and resolves the path we should really use.
// So those parts will be loaded when they really needed.
const AssortmentEdit = resolve => {
    require.ensure(
        ['@/components/admin/AssortmentEdit.vue'],
        () => {
            resolve(require('@/components/admin/AssortmentEdit.vue'));
        },
        'admin'
    );
};

const RootAdmin = resolve => {
    require.ensure(['@/components/admin/Admin.vue'], () => {
        resolve(require('@/components/admin/Admin.vue'));
    });
};

const RootGoods = resolve => {
    require.ensure(['@/components/goods/RootGoods.vue'], () => {
        resolve(require('@/components/goods/RootGoods.vue'));
    });
};

const GoodDetail = resolve => {
    require.ensure(['@/components/goods/GoodDetail.vue'], () => {
        resolve(require('@/components/goods/GoodDetail.vue'));
    });
};

const AdminStart = resolve => {
    require.ensure(
        ['@/components/admin/AdminStart.vue'],
        () => {
            resolve(require('@/components/admin/AdminStart.vue'));
        },
        'admin'
    );
};

const Login = resolve => {
    require.ensure(
        ['@/views/Login.vue'],
        () => {
            resolve(require('@/views/Login.vue'));
        },
        'login'
    );
};

const Register = resolve => {
    require.ensure(
        ['@/views/Register.vue'],
        () => {
            resolve(require('@/views/Register.vue'));
        },
        'register'
    );
};

const Catalog = resolve => {
    require.ensure(
        ['@/views/Catalog.vue'],
        () => {
            resolve(require('@/views/Catalog.vue'));
        },
        'catalog'
    );
};

const Profile = resolve => {
    require.ensure(
        ['@/views/Profile.vue'],
        () => {
            resolve(require('@/views/Profile.vue'));
        },
        'profile'
    );
};

export const routes = [
    {
        path: '',
        name: 'home',
        component: Home
    },
    {
        path: '/goods', // or menu?
        alias: '/admin/good-detail',
        component: RootGoods,
        children: [
            {
                path: ':id',
                name: 'goodDetail',
                component: GoodDetail
            }
        ]
    },
    {
        path: '/admin',
        component: RootAdmin,
        children: [
            { path: '', component: AdminStart },
            {
                path: 'assortment',
                name: 'assortmentEdit',
                component: AssortmentEdit
            },
            {
                path: 'good-detail/:id',
                redirect: { name: 'goodDetail' }
            }
        ]
    },
    {
        path: '/login',
        component: Login,
        children: [
            { path: '', component: Login },
            {
                path: 'login',
                name: 'login',
                component: Login
            }
        ]
    },
    {
        path: '/register',
        component: Register,
        children: [
            { path: '', component: Register },
            {
                path: 'register',
                name: 'register',
                component: Register
            }
        ]
    },
    {
        path: '/profile',
        component: Profile,
        children: [
            { path: '', component: Profile },
            {
                path: 'profile',
                name: 'profile',
                component: Profile
            }
        ]
    },
    {
        path: '/catalog',
        component: Catalog,
        children: [
            { path: '', component: Catalog },
            {
                path: 'catalog',
                name: 'catalog',
                component: Catalog
            }
        ]
    },
    { path: '*', component: Error404 }
];
