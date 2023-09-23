<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="diagram-project" />
            <b>
                Grupos
            </b>
        </h5>
        <router-link :to="{name: 'FormGrupo'}">
            <button class="btn btn-success mt-2">
                Criar novo grupo
            </button>
        </router-link>
        <ul 
            v-if="grupos.length > 0" 
            class="list-group mt-4"
        >
            <li v-for="grupo in grupos" :key="grupo.id" class="list-group-item">
                <div class="row">
                    <div class="col-sm-12 col-md-8">
                        {{ grupo.nome }}
                    </div>
                    <div class="col-sm-12 col-md-4 botoes-acao">
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
    </div>
</template>

<script>

import AxiosHttp from '@/helpers/AxiosHttp';
import router from '@/router';
import params from '@/store/params';
import { mapActions } from 'vuex';

export default {
    name: 'IndexGrupo',
    data() {
        return {
            grupos: []
        }
    },
    methods: {
        ...mapActions({
            defineEstadoLoader: 'defineEstadoLoader'
        }),
        buscar: function(){
            this.defineEstadoLoader(params.LOADER_SHOW);
            AxiosHttp().get('grupos', response => {
                this.grupos = response.data; 
                this.defineEstadoLoader(params.LOADER_HIDE);
            });
        },
        editar: function(id){
            router.push({name: 'FormEditarGrupo', params: { id: id }});
        },
        apagar: function(id){
            if(confirm('Tem certeza que deseja apagar?')){
                this.defineEstadoLoader(params.LOADER_SHOW);
                AxiosHttp().del('grupos/'+id, () => {
                    this.defineEstadoLoader(params.LOADER_HIDE);
                    alert('Excluído com sucesso!');
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
    @media (max-width: 765px) {
        .botoes-acao {
            margin-top: 16px;
        }
    }
    .list-group-item:hover{
        background-color: #f5f5f5;
        cursor: pointer;
    }
    .list-group-item {
        border-left: 8px solid black;
    }
    .botoes-acao {
        display: flex;
        justify-content: end;
    }
</style>