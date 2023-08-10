<template>
	<ItemLoader v-if="loader" />
	<NavBar v-if="navBar" />
	<div class="container-fluid w-75 mt-3">
        <router-view />
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import NavBar from './components/Default/NavBar.vue';
import ItemLoader from '@/components/Default/ItemLoader';

export default {
	name: 'App',
	inject: ['config'],
	components: {
		NavBar,
		ItemLoader
	},
	computed: {
		...mapGetters([
			'logado',
			'loader',
			'navBar'
		])
	}
}
</script>

<style lang="scss">
  #app {
    font-family: 'Segoe UI';
    color: #2c3e50;
  }
</style>
