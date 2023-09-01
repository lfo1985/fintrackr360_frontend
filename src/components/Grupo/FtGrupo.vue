<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="diagram-project" />
            <b>
                Grupos
            </b>
        </h5>
        <button class="btn btn-success mt-2">
            Criar novo grupo
        </button>
        <ul 
            v-if="grupos.length > 0" 
            class="list-group mt-4"
        >
            <li  v-for="grupo in grupos" :key="grupo.id" class="list-group-item">
                <div class="row">
                    <div class="col-sm-12 col-md-8">
                        {{ grupo.nome }}
                    </div>
                    <div class="col-sm-12 col-md-4 text-end botoes-acao">
                        <button 
                            class="btn btn-sm btn-danger me-2"
                            @click="apagar(grupo.id)"
                        >
                            Apagar
                        </button>
                        <button class="btn btn-sm btn-info text-white">Editar</button>
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
import params from '@/store/params';
import { mapActions } from 'vuex';

export default {
    name: 'FtGrupo',
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
            text-align: left!important;
        }
    }
</style>