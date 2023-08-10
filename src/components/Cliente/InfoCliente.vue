<template>
    <div class="text-start">

        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="info-circle" />
            <b>
                Informações do cliente
            </b>
        </h5>
        
        <h1>{{ cliente.name }}</h1>
        
        <p>E-mail: {{ cliente.email }}</p>
        <p>Criado em: {{ cliente.created_at }}</p>
        
        <div class="text-center">
            <router-link to="/" class="btn btn-sm btn-dark me-1 text-white">
                <fa icon="arrow-left-long" />
                Voltar
            </router-link>
        </div>

    </div>
</template>

<script>

import AxiosHttp from '@/helpers/AxiosHttp';

export default {
  name: 'InfoCliente',
  data() {
    return {
        cliente: null
    }
  },
  methods: {
    getId: function(){
        return this.$route.params.id;
    },
    getCliente: async function(){
        AxiosHttp().get('cliente/'+this.getId(), cliente => {
            this.cliente = cliente;
        });
    }
  },
  created(){
    this.getCliente();
  }
}

</script>