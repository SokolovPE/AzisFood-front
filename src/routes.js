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
    { path: '*', component: Error404 }
];
