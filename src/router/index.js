import { createRouter, createWebHashHistory } from 'vue-router';

import ItensClientes from '@/components/Cliente/ItensClientes';
import InfoCliente from '@/components/Cliente/InfoCliente';
import PaginaHome from '@/components/Paginas/PaginaHome';
import PaginaLogin from '@/components/Paginas/PaginaLogin';
import PaginaLogout from '@/components/Paginas/PaginaLogout';
import PaginaErro from '@/components/Paginas/PaginaErro';
import Token from '@/helpers/Token';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            name: 'Home',
            path: '/',
            component: PaginaHome
        },
        {
            name: 'Login',
            path: '/login',
            component: PaginaLogin
        },
        {
            name: 'Logout',
            path: '/logout',
            component: PaginaLogout
        },
        {
            name: 'ItensClientes',
            path: '/clientes',
            component: ItensClientes
        },
        {
            name: 'InfoCliente',
            path: '/cliente/:id',
            component: InfoCliente
        },
        {
            name: 'PaginaErro',
            path: '/erro/:codigo/:descricao',
            component: PaginaErro
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.name != 'Login' && to.name != 'PaginaErro' && !Token().get()){
        router.push({name: 'Login'});
    }
    next();
});

export default router;