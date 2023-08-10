<template>
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand text-white" href="#">{{ config.titulo }}_{{ config.versao }}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{name: 'Home'}" class="nav-link text-white">
                Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link  :to="{name: 'ItensClientes'}" class="nav-link text-white">
                Clientes
              </router-link>
            </li>
          </ul>
          <span style="font-size: 10pt;" class="navbar-text text-end d-flex align-items-center">
            <div class="text-end text-white me-3">{{ this.nome }}<br> <span class="fw-normal">{{ this.email }}</span></div>
            <router-link :to="{name: 'Logout'}" class="nav-link text-white">
              <button @click="logout" class="btn btn-sm btn-info text-white mt-2 mb-2">Sair</button>
            </router-link>
          </span>
        </div>
      </div>
    </nav>
</template>

<script>

import Usuario from '@/helpers/Usuario';
import { mapActions } from 'vuex';

export default {
  name: 'NavBar',
  inject: ['config'],
  data(){
    return {
      nome: Usuario().get() != null ? Usuario().get()['name'] : null,
      email: Usuario().get() != null ? Usuario().get()['email'] : null
    }
  },
  methods: {
    ...mapActions({
        defineEstadoLoader: 'defineEstadoLoader',
        defineLogado: 'defineLogado',
        defineEstadoNavBar: 'defineEstadoNavBar'
    })
	},
  mounted(){

  }
}

</script>