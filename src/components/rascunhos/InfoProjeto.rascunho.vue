<template>
    <div class="text-start">

        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="info-circle" />
            <b>
                Informações do projetos
            </b>
        </h5>
        
        <h1>{{ projeto.titulo }}</h1>
        
        <p>Descrição: {{ projeto.descricao }}</p>
        <p>Criado em: {{ projeto.criado_em }}</p>
        
        <div class="text-center">
            <router-link to="/" class="btn btn-sm btn-dark me-1 text-white">
                <fa icon="arrow-left-long" />
                Voltar
            </router-link>
        </div>

    </div>
</template>

<script>

export default {
  name: 'InfoProjeto',
  data() {
    return {
        projeto: {}
    }
  },
  methods: {
    getId: function(){
        return this.$route.params.id;
    },
    getItensProjetos: async function(){
        
        var projeto = {};
        var id = this.getId();
        
        await this.axios.get('/data.json').then(function(response){
            projeto = response.data.filter(item => item.id == id)[0];
        });

        this.projeto = projeto;

    }
  },
  created(){
    this.getItensProjetos();
  }
}

</script>