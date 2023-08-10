<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="diagram-project" />
            <b>
                Clientes
            </b>
        </h5>
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
import params from '@/store/params';
import { mapActions } from 'vuex';

export default {
    name: 'ItensClientes',
    data() {
        return {
            itensClientes: []
        }
    },
    methods: {
        ...mapActions({
            defineEstadoLoader: 'defineEstadoLoader'
        }),
        buscaClientes: function(){
            this.defineEstadoLoader(params.LOADER_SHOW);
            AxiosHttp().get('clientes', response => {
                this.itensClientes = response.data; 
                this.defineEstadoLoader(params.LOADER_HIDE);
            });
        }
    },
    created(){
        this.buscaClientes();
    }
}

</script>