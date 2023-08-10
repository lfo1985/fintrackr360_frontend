<template>
    <h3 class="text-center mt-3">{{ config.titulo }}_{{ config.versao }}</h3>
    <div class="d-flex align-items-center justify-content-center">
        <form class="w-25 border rounded p-3">
            <div class="mb-3">
                <label for="inputEmail" class="form-label">E-mail</label>
                <input type="email" v-model="dadosLogin.email" class="form-control" id="inputEmail" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="inputSenha" class="form-label">Senha</label>
                <input type="password" v-model="dadosLogin.password" class="form-control" id="inputSenha">
            </div>
            <button type="button" @click="login" class="btn btn-primary">Conectar</button>
        </form>
    </div>
</template>
  
<script>

import AxiosHttp from '@/helpers/AxiosHttp';
import params from '@/store/params';
import { mapActions } from 'vuex';

export default {
    inject: ['config'],
    name: 'FormLogin',
    data(){
        return {
            loader: false,
            dadosLogin: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        ...mapActions({
            defineEstadoLoader: 'defineEstadoLoader',
            defineLogado: 'defineLogado',
            defineEstadoUsuario: 'defineEstadoUsuario',
            defineEstadoNavBar: 'defineEstadoNavBar'
        }),
        login: function(){

            this.defineEstadoLoader(params.LOADER_SHOW);
            
            const sucesso = r => {
                this.defineEstadoLoader(params.LOADER_HIDE);
                if(r.sucesso){
                    this.defineLogado(params.LOGIN);
                    this.defineEstadoUsuario({usuario: r.usuario});
                    this.defineEstadoNavBar(params.NAVBAR_SHOW);
                    this.$router.push({name: 'Home'});
                } else {
                    alert(r.msg);
                }
            }

            const erro = e => {
                this.defineEstadoLoader(params.LOADER_HIDE);
                alert(e.msg);
            }

            AxiosHttp().login({
                email: this.dadosLogin.email,
                password: this.dadosLogin.password
            }, sucesso, erro);
        },
    },
    mounted(){
        this.defineEstadoNavBar(params.NAVBAR_HIDE);
    }
};

</script>