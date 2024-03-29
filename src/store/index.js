
import Token from '@/helpers/Token';
import { createStore } from 'vuex';

const store = createStore({
    state(){
        return {
            logado: Token().get() || false,
            rotaAnterior: null,
            loader: false,
            usuario: null,
            navBar: true,
            idGrupo: null
        }
    },
    getters: {
        logado(state) {
            return state.logado;
        },
        rotaAnterior(state){
            return state.rotaAnterior;
        }, 
        loader(state){
            return state.loader;
        }, 
        usuario(state){
            return state.usuario;
        },
        navBar(state){
            return state.navBar;
        },
        idGrupo(state){
            return state.idGrupo;
        }
    },
    mutations: {
        alteraEstadoLogado(state, value){
            state.logado = value;
        },
        alteraRotaAnterior(state, value){
            state.rotaAnterior = value;
        },
        alteraEstadoLoader(state, value){
            state.loader = value;
        },
        alteraEstadoUsuario(state, value){
            state.usuario = value;
        },
        alteraEstadoNavBar(state, value){
            state.navBar = value;
        },
        alteraEstadoIdGrupo(state, value){
            state.idGrupo = value;
        }
    },
    actions: {
        defineLogado({commit}, obj){
            commit('alteraEstadoLogado', obj.logado);
        },
        defineRotaAnterior({commit}, obj){
            commit('alteraRotaAnterior', obj.rota);
        },
        defineEstadoLoader({commit}, obj){
            commit('alteraEstadoLoader', obj.loader);
        },
        defineEstadoUsuario({commit}, obj){
            commit('alteraEstadoUsuario', obj.usuario);
        },
        defineEstadoNavBar({commit}, obj){
            commit('alteraEstadoNavBar', obj.navBar);
        },
        defineEstadoIdGrupo({commit}, obj){
            commit('alteraEstadoIdGrupo', obj.idGrupo);
        }
    }
});

export default store;