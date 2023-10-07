import { createRouter, createWebHashHistory } from 'vue-router';

import IndexGrupo from '@/components/Grupo/IndexGrupo';
import FormGrupo from '@/components/Grupo/FormGrupo';
import IndexConta from '@/components/Conta/IndexConta';
import FormConta from '@/components/Conta/FormConta';
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
            name: 'IndexGrupo',
            path: '/grupos',
            component: IndexGrupo
        },
        {
            name: 'FormGrupo',
            path: '/grupos/criar',
            component: FormGrupo
        },
        {
            name: 'FormEditarGrupo',
            path: '/grupos/editar/:id',
            component: FormGrupo
        },
        {
            name: 'IndexConta',
            path: '/contas',
            component: IndexConta
        },
        {
            name: 'FormConta',
            path: '/contas/criar',
            component: FormConta
        },
        {
            name: 'FormEditarConta',
            path: '/contas/:id',
            component: FormConta
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