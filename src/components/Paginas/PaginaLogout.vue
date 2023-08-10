<template>
    <div class="text-start">
        <h2 class="text-center">Saindo...</h2>
    </div>
</template>

<script>
import AxiosHttp from '@/helpers/AxiosHttp';
import params from '@/store/params';
import { mapActions } from 'vuex';

export default {
  name: 'PaginaLogout',
  methods: {
    ...mapActions({
        defineEstadoLoader: 'defineEstadoLoader',
        defineEstadoNavBar: 'defineEstadoNavBar'
    })
  },
  mounted(){
    this.defineEstadoLoader(params.LOADER_SHOW);
    this.defineEstadoNavBar(params.NAVBAR_HIDE);
    AxiosHttp().logout(() => {
        this.defineEstadoLoader(params.LOADER_HIDE);
    });
  }
}
</script>