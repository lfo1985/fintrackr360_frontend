<template>
    <div class="text-start">
		<ItemDashboard />
    </div>
</template>

<script>

import AxiosHttp from '@/helpers/AxiosHttp';
import params from '@/store/params';
import { mapActions } from 'vuex';
import ItemDashboard from '@/components/Paginas/components/ItemDashboard';

export default {
	name: 'PaginaHome',
	data(){
		return {
			dados: []
		}
	},
	components: {
		ItemDashboard
	},
	methods: {
		...mapActions({
			defineEstadoLoader: 'defineEstadoLoader',
			defineEstadoIdGrupo: 'defineEstadoIdGrupo',
		}),
		buscar: function(){

			this.defineEstadoLoader(params.LOADER_SHOW);

			AxiosHttp().get('relatorio/resultado', response => {
				this.dados = response;
				this.defineEstadoLoader(params.LOADER_HIDE);
			});
		},
	},
	mounted(){
		this.buscar();
	}
}
</script>
<style scoped>
	.card {
		flex-grow: 3;
	}
</style>