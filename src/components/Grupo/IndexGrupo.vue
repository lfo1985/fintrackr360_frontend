<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded border">
            <fa icon="pencil" class="me-2" />
            Grupos
        </h5>
        <router-link :to="{name: 'FormGrupo'}">
            <button class="btn btn-success mt-2">
                <fa icon="plus" />
                Criar novo grupo
            </button>
        </router-link>
        <ul 
            v-if="grupos.length > 0" 
            class="list-group mt-4"
        >
            <li v-for="grupo in grupos" :key="grupo.id" class="list-group-item">
                <div class="row align-items-center">
                    <div class="col-9">
                        {{ grupo.nome }}
                    </div>
                    <div class="col-3 botoes-acao"  >
                        <router-link :to="{name: 'FormEditarGrupo', params: { id: grupo.id }}">
                            <button
                                type="button" 
                                class="btn btn-sm btn-info text-white"
                            >
                            <fa icon="pencil" />
                            </button>
                        </router-link>
                        <button 
                            class="btn btn-sm btn-danger ms-2"
                            @click="apagar(grupo.id)"
                        >
                            <fa icon="trash" />
                        </button>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="alert alert-danger mt-4" role="alert">
            Nenhum registro encontrado!
        </div>
        <div class="mt-5">
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
    name: 'IndexGrupo',
    data() {
        return {
            grupos: [],
            paginacao: [],
            paginaAtual: 1
        }
    },
    methods: {
        ...mapActions({
            defineEstadoLoader: 'defineEstadoLoader'
        }),
        irPagina: function(url){

            let parametros = parametrosUrl(url);
            let pagina = parametros[0].valor;
            
            this.buscar(pagina);
            this.paginaAtual = pagina;

        },
        buscar: function(pagina = null){

            this.defineEstadoLoader(params.LOADER_SHOW);

            AxiosHttp()
                .get('grupos'+(pagina ? '?page='+pagina : ''), response => {
                    this.grupos = response.data;
                    this.paginacao = response.meta.links;
                    this.defineEstadoLoader(params.LOADER_HIDE);
                    console.log(this.paginacao);
                });

        },
        editar: function(id){
            ir({name: 'FormEditarGrupo', params: { id: id }});
        },
        apagar: function(id){

            if(confirm('Tem certeza que deseja apagar?')){
            
                this.defineEstadoLoader(params.LOADER_SHOW);
            
                AxiosHttp().del('grupos/'+id, () => {

                    this.defineEstadoLoader(params.LOADER_HIDE);
                    
                    this.buscar();

                });

            }

        }
    },
    created(){
        this.buscar();
    }
}

</script>

<style scoped>
    .list-group-item:hover{
        background-color: #f5f5f5;
    }
    .botoes-acao {
        display: flex;
        justify-content: end;
    }
</style>