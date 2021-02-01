import Home from '@/modules/common/views/Home.vue';
import Error404 from '@/modules/common/views/errors/Error404.vue';

//* Webpack will recognize wthis syntax to lazy load parts.
// Whenever we want to laod something in ensure's firest argument,
// execute function from second parameter, and resolves the path we should really use.
// So those parts will be loaded when they really needed.
const AssortmentEdit = resolve => {
    require.ensure(
        ['@/modules/admin/catalog/views/AssortmentEdit.vue'],
        () => {
            resolve(
                require('@/modules/admin/catalog/views/AssortmentEdit.vue')
            );
        },
        'admin'
    );
};

const RootAdmin = resolve => {
    require.ensure(['@/modules/admin/common/views/AdminRoot.vue'], () => {
        resolve(require('@/modules/admin/common/views/AdminRoot.vue'));
    });
};

const GoodDetail = resolve => {
    require.ensure(
        ['@/modules/public/catalog/views/GoodDetail.vue'],
        () => {
            resolve(require('@/modules/public/catalog/views/GoodDetail.vue'));
        },
        'goodDetail'
    );
};

const AdminHome = resolve => {
    require.ensure(
        ['@/modules/admin/common/views/AdminHome.vue'],
        () => {
            resolve(require('@/modules/admin/common/views/AdminHome.vue'));
        },
        'admin'
    );
};

const Login = resolve => {
    require.ensure(
        ['@/modules/authentication/views/Login.vue'],
        () => {
            resolve(require('@/modules/authentication/views/Login.vue'));
        },
        'login'
    );
};

const Register = resolve => {
    require.ensure(
        ['@/modules/authentication/views/Register.vue'],
        () => {
            resolve(require('@/modules/authentication/views/Register.vue'));
        },
        'register'
    );
};

const Profile = resolve => {
    require.ensure(
        ['@/modules/authentication/views/Profile.vue'],
        () => {
            resolve(require('@/modules/authentication/views/Profile.vue'));
        },
        'profile'
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

export const routes = [
    {
        path: '',
        name: 'home',
        component: Home
    },
    {
        path: '/admin',
        component: RootAdmin,
        children: [
            { path: '', component: AdminHome },
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
        path: '/good-detail/:id',
        name: 'goodDetail',
        component: GoodDetail
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
