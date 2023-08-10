<template>
    <div class="text-start">
        <h1>Ops!</h1>
        <h4>Ocorreu um erro inesperado.</h4>
        <h6>Código do erro: {{ codigo }}</h6>
        <h6>Descrição do erro: {{ descricao }}</h6>
        <button type="button" @click="voltar" class="btn btn-danger">
            Voltar
        </button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import params from '@/store/params';

export default {
  name: 'PaginaHome',
  data(){
    return {
        codigo: this.$route.params.codigo,
        descricao: atob(this.$route.params.descricao)
    }
  },
  methods: {
    ...mapActions({
        defineEstadoNavBar: 'defineEstadoNavBar',
        defineEstadoLoader: 'defineEstadoLoader'
    }),
    voltar: function(){
        if(this.codigo == 401){
            this.$router.push('/login');
        } else {
            this.$router.go(-1);
        }
    }
  },
  mounted(){
    if(this.codigo == 401){
        this.defineEstadoNavBar(params.NAVBAR_HIDE);
    }
    this.defineEstadoLoader(params.LOADER_HIDE);
  }
}
</script>