<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="list" />
            <b>
                Contas
            </b>
        </h5>
        <div class="botoes-superiores">
            <router-link :to="{name: 'FormConta'}">
                <button id="botao-adicionar-conta" class="btn btn-success">
                    <fa icon="plus" />
                    Criar novo conta
                </button>
            </router-link>
            <div class="dropdown ms-2">
                <button id="botao-menu-grupos" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Selecione um grupo
                </button>
                <ul class="dropdown-menu">
                    <li v-for="grupo in grupos" :key="grupo.id">
                        <button 
                            class="dropdown-item"
                            type="button"
                            @click="buscar(grupo.id)"
                        >
                            {{ grupo.nome }}
                        </button>
                    </li>
                    <!-- <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li> -->
                </ul>
            </div>
        </div>
        <ul 
            v-if="contas.length > 0" 
            class="list-group mt-4"
        >
            <li v-for="conta in contas" :key="conta.id" class="list-group-item">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        {{ conta.titulo }}
                    </div>
                    <div class="col-md-2">
                        <strong>{{ conta.grupo.nome }}</strong>
                    </div>
                    <div class="col-md-1">
                        {{ conta.valor }}
                    </div>
                    <div class="col-md-1">
                        {{ conta.periodo.length > 1 ? conta.periodo.length+' parcelas' : 'a vista' }}
                    </div>
                    <div class="col-md-1">
                        {{ conta.periodo.length }}x de {{ conta.valor_parcela }}
                    </div>
                    <div class="col-md-3 botoes-acao">
                        <router-link :to="{name: 'FormEditarConta', params: { id: conta.id }}">
                            <button
                                type="button" 
                                class="btn btn-sm btn-info text-white"
                            >
                            <fa icon="pencil" />
                            </button>
                        </router-link>
                        <button 
                            class="btn btn-sm btn-danger ms-2"
                            @click="apagar(conta.id)"
                        >
                            <fa icon="trash" />
                        </button>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else-if="houveSelecaoGrupo && contas.length == 0" class="alert alert-danger mt-4" role="alert">
            Nenhuma conta registrada para este grupo
        </div>
        <div v-else-if="!houveSelecaoGrupo" class="alert alert-info mt-4" role="alert">
            Selecione um grupo para carregar as contas
        </div>
        <div class="mt-5" v-if="contas.length > 0">
            <nav aria-label="Paginação de dados">
                <ul class="pagination">
                    <li 
                        v-for="(pag, i) in paginacao" 
                        :key="i" 
                        :class="{
                            'page-item': true,
                            'disabled': (pag.url == null),
                            'active': paginaAtual == pag.label
                        }"
                    >
                        <button
                            type="button" 
                            class="page-link" 
                            :href="pag.url"
                            v-html="pag.label"
                            @click="irPagina(pag.url)"
                        >
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>

import {ir, parametrosUrl} from '@/helpers/Default';
import AxiosHttp from '@/helpers/AxiosHttp';
import params from '@/store/params';
import { mapActions } from 'vuex';

export default {
    name: 'IndexConta',
    data() {
        return {
            contas: [],
            grupos: [],
            paginacao: [],
            paginaAtual: 1,
            houveSelecaoGrupo: false,
            idGrupo: null
        }
    },
    methods: {
        ...mapActions({
            defineEstadoLoader: 'defineEstadoLoader'
        }),
        irPagina: function(url){

            let parametros = parametrosUrl(url);
            let pagina = parametros[0].valor;
            
            this.buscar(this.idGrupo, pagina);
            this.paginaAtual = pagina;

        },
        buscar: function(id_grupo, pagina = null){

            this.defineEstadoLoader(params.LOADER_SHOW);

            AxiosHttp()
                .get('contas/grupo/'+id_grupo+(pagina ? '?page='+pagina : ''), response => {
                    this.contas = response.data;
                    this.paginacao = response.meta.links;
                    this.defineEstadoLoader(params.LOADER_HIDE);
                    this.houveSelecaoGrupo = true;
                });

        },
        carregarGrupos: function(){
            AxiosHttp()
                .get('grupos/search-no-paginate', response => {
                    this.grupos = response.data;
                    this.defineEstadoLoader(params.LOADER_HIDE);
                });
        },
        editar: function(id){
            ir({name: 'FormEditarConta', params: { id: id }});
        },
        apagar: function(id){

            if(confirm('Tem certeza que deseja apagar?')){
            
                this.defineEstadoLoader(params.LOADER_SHOW);
            
                AxiosHttp().del('contas/'+id, () => {

                    this.defineEstadoLoader(params.LOADER_HIDE);
                    
                    this.buscar();

                });

            }

        }
    },
    created(){
        // this.buscar();
        this.carregarGrupos();
    }
}

</script>