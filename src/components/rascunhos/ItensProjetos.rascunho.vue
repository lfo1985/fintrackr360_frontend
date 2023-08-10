<!-- eslint-disable vue/require-v-for-key -->
<template>
    <div class="text-start">

        <!-- <h5 class="bg-light d-block p-2 rounded">
            <fa icon="diagram-project" />
            <b>
                Projetos
            </b>
        </h5>

        <ul v-if="itensProjetos.length > 0" class="list-group mt-3 mb-3">
            <ItemProjeto 
                v-for="projeto in itensProjetos" 
                :key="projeto.id" 
                :projeto="projeto"
            />
        </ul>

        <div v-else>
            <small class="text-danger">Nenhum projeto encontrado!</small>
        </div>

        <hr>
        
        <h6 class="fw-bold">JSON de dados</h6>
        
        <div>{{ dadosComputados }}</div>

        <hr> -->

        <!-- <h6 class="fw-bold">VueX</h6>
        <p>Dados vindo do store: {{  getTexto  }}</p>
        <button @click="alteraTexto" class="btn btn-success">Teste para alterar o texto</button> -->

        <h3 class="mt-3">Os dados abaixo foram carregados de uma API de teste criada em Laravel</h3>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cliente in itensClientes" :key="cliente.id">
                    <td>{{ cliente.id }}</td>
                    <td>{{ cliente.nome }}</td>
                    <td>{{ cliente.email }}</td>
                </tr>
            </tbody>
        </table>

        
    </div>
</template>

<script>

import AxiosHttp from '@/helpers/AxiosHttp';
// import ItemProjeto from './ItemProjeto.vue';
// import Token from '@/helpers/Token'

export default {
    name: 'ItensProjetos',
    data() {
        return {
            // itensProjetos: [],
            itensClientes: [],
            // textoAlterado: null,
            // loader: false,
            // token: Token().get()
        }
    },
    methods: {
        // getItensProjetos: function(){

        //     this
        //         .axios.get('/data.json')
        //         .then(response => this.itensProjetos = response.data );
            
        // },
        // alteraTexto: function() {
        //     /**
        //      * Método utilizado para realizar a alteração no store (vuex)
        //      * Ciclo:   action (dispatch) -> 
        //      *          mutator (alteraTexto) -> 
        //      *          [realiza a altereação] ->
        //      *          getter (this.$store.getters.getTexto) retorna os dados alterados
        //      */
        //     // this.$store.dispatch({
        //     //     type: 'alteraTexto',
        //     //     texto: 'Bruto pra caramba!'
        //     // });
        // },
        buscaClientes: function(){
            
            AxiosHttp().get('clientes', response => {
                this.itensClientes = response.data;
            });

        },
        // login: function(){
            
        //     this.loader = true;

        //     AxiosHttp().login({
        //         email: this.dadosLogin.email,
        //         password: this.dadosLogin.password
        //     }, (r) => {
        //         if(r.sucesso){
        //             this.token = Token().get();
        //             this.buscaClientes();
        //         } else {
        //             alert(r.msg);
        //         }
        //         this.loader = false;
        //     }, (e) => {
        //         console.log(e);
        //         alert(e.msg);
        //     });

        // },
        // verificaLogin: async function (){

        //     const falha = e => {
        //         if(!e.sucesso){
        //             this.token = null;
        //         }
        //     }

        //     AxiosHttp().get('verifica', response => {
        //         console.log(response);
        //     }, falha);

        // },
        // logout: function(){
        //     AxiosHttp().post('logout', response => {
        //         if(response.sucesso){
        //             Token().remove();
        //             this.token = null;
        //         }
        //     });
        // }
    },
    components: {
        // ItemProjeto
    },
    created(){
        // this.getItensProjetos();
        this.buscaClientes();
    },
    mounted(){
        // this.verificaLogin();
    },
    computed: {
        // dadosComputados(){
        //     return this.itensProjetos;
        // },
        // getTexto(){
        //     return this.$store.getters.getTexto;
        // }
    }
}

</script>

<style lang="scss">
    .list-group-item {
        text-align: left;
        border-left: 6px solid #25cff2!important;
    }
</style>