<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="list" />
            <b>
                Contas
            </b>
        </h5>
        <div class="botoes-superiores mt-3">
            <router-link :to="{name: 'FormConta'}">
                <button id="botao-adicionar-conta" class="btn btn-success">
                    <fa icon="plus" />
                    Criar novo conta
                </button>
            </router-link>
            <div class="dropdown ms-2">
                <button id="botao-menu-grupos" class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Grupo
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
                </ul>
            </div>
        </div>
        <div class="mt-3 bg-light p-3 border rounded">
            Grupo selecionado: <strong>{{ nomeGrupo() }}</strong>
        </div>
        <ul 
            v-if="contas.length > 0" 
            class="list-group mt-4"
        >
            <li v-for="conta in contas" :key="conta.id" class="list-group-item">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <div class="badge text-bg-secondary">{{ conta.grupo.nome }}</div>
                    </div>
                    <div class="col-md-5">
                        {{ conta.titulo }}
                    </div>
                    <div class="col-md-1">
                        {{ conta.valor }}
                    </div>
                    <div class="col-md-1">
                        {{ conta.nome_tipo }}
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
                            v-html="pag.label == 'pagination.next' ? 'Próximo' : (pag.label == 'pagination.previous' ? 'Anterior' : pag.label)"
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
            defineEstadoLoader: 'defineEstadoLoader',
            defineEstadoIdGrupo: 'defineEstadoIdGrupo',
        }),
        irPagina: function(url){

            let parametros = parametrosUrl(url);
            let pagina = parametros[0].valor;
            
            this.buscar(this.idGrupo, pagina);
            this.paginaAtual = pagina;

        },
        buscar: async function(id_grupo, pagina = null){

            this.defineEstadoLoader(params.LOADER_SHOW);
            this.defineEstadoIdGrupo({idGrupo: id_grupo});

            this.idGrupo = id_grupo;

            await AxiosHttp()
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
                    
                    this.buscar(this.idGrupo, this.paginaAtual);

                });

            }

        },
        nomeGrupo: function(){
            if(this.grupos.length > 0 && this.$store.getters.idGrupo){
                let grupo = this.grupos.filter(item => {
                    return item.id == this.$store.getters.idGrupo;
                });
                return grupo[0].nome;
            } else {
                return '-Nenhum grupo selecionado-';
            }
        }
    },
    created(){

        if(this.$store.getters.idGrupo){
            this.buscar(this.$store.getters.idGrupo);
        }

        this.carregarGrupos();
        
    }
}

</script>