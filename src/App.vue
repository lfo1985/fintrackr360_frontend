<template>
	<ItemLoader v-if="loader" />
	<NavBar v-if="navBar" />
	<div class="container-fluid mt-3">
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
		font-family: 'Tahoma';
		font-size: 12pt;
		color: #2c3e50;
	}
	.list-group-item:hover{
		background-color: #f5f5f5;
	}
	.botoes-acao {
		display: flex;
		justify-content: end;
	}
	@media (max-width: 765px) {
        .botoes-acao {
            margin-top: 16px;
            text-align: left!important;
        }
		#botao-menu-grupos, #botao-adicionar-conta {
			width: 100%;
			flex: 1;
		}
		#menu-grupos {
			margin-left: 0!important;
		}
		.botoes-superiores {
			display: block!important;
		}
		.botoes-superiores .dropdown{
			margin-left: 0!important;
			margin-top: 15px;
		}
    }
	.botoes-superiores {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	a {
		color: #000000!important;
		text-decoration: none!important;
		cursor: pointer;
	}
	a:hover {
		color: #a5a5a5!important;
	}
</style>
