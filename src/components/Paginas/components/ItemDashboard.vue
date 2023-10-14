<template>
    <h4>Dashboard</h4>
    <div class="mt-4">
        <div class="row">
            <div class="mb-3 col-md-3">
                <label 
                    for="ano"
                    class="form-label"
                >
                    Escolha o ano para filtrar os meses
                </label>
                <select
                    class="form-select"
                    aria-label="Selecione o ano"
                    id="ano"
                    v-model="ano"
                    @change="filtro"
                >
                    <option 
                        v-for="ano in listaAnos"
                        :key="ano"
                        :value="ano"
                    >
                        {{ ano }}
                    </option>
                </select>
            </div>
        </div>
    </div>
    <h6 v-if="dadosFiltrados.length > 0">Resumo de todos os meses do ano.</h6>
    <h6 class="text-danger" v-if="dadosFiltrados.length == 0">Nenhuma resultado para renderizar o dashboard.</h6>
    <div class="d-flex flex-wrap mt-4">
        <div v-for="(dado, i) in dadosFiltrados" :key="i" class="item-card card me-2 mb-2 col-md-3">
            <div class="card-header fw-bold">
                {{ dado.MES_EXTENSO }}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item text-success">
                    <fa icon="plus" class="me-2" />
                    Crédito: R$ {{ dado.C }}
                </li>
                <li class="list-group-item text-danger">
                    <fa icon="minus" class="me-2" />
                    Débito: R$ {{ dado.D }}
                </li>
                <li class="list-group-item">
                    <span
                        :class="'text-'+dado.CLASSE_SALDO">
                        <fa icon="equals" class="me-2" />
                        Saldo: R$ {{ dado.SALDO }}
                    </span>
                </li>
                <li style="background-color: #f6f6f6;" class="list-group-item">
                    <span
                        :class="'text-'+dado.CLASSE_ACUMULADO+' fw-bold'">
                        <fa icon="equals" class="me-2" />
                        Saldo Ac.: R$ {{ dado.SALDO_ACUMULADO }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import AxiosHttp from '@/helpers/AxiosHttp';
import params from '@/store/params';
import moment from 'moment';
import { mapActions } from 'vuex';

export default {
	name: 'ItemDashboard',
	data(){
		return {
			dados: [],
			dadosFiltrados: [],
            listaAnos: [],
            ano: moment().format('Y'),
		}
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
                this.filtro();
				this.defineEstadoLoader(params.LOADER_HIDE);
			});
		},
        meses: function(){
            AxiosHttp()
                .get('relatorio/dados-filtro', response => {
                    this.listaAnos = response.anos;
                });
        },
        filtro: function(){

            this.dadosFiltrados = [];

            for (let index = 1; index <= 12; index++) {

                let mes = index.toString().padStart(2, '0');
                let chave = this.ano+'-'+mes;
                
                if(chave in this.dados){
                    this.dadosFiltrados.push(this.dados[chave]);
                }

            }

        }
	},
	mounted(){
		this.buscar();
        this.meses();
	}
}
</script>

<style scoped>
	.card {
		flex-grow: 3;
	}
</style>