<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="floppy-disk" />
            <b>
                Grupos - Criar
            </b>
        </h5>
        <form>
            <div class="mb-3 col-md-6">
                <label 
                    for="nome"
                    class="form-label"
                >
                    Nome
                </label>
                <input 
                    type="text"
                    class="form-control"
                    id="nome"
                    aria-describedby="nomeGrupo"
                    v-model="grupo.nome"
                    ref="nome"
                >
            </div>
            <button
                type="button"
                class="btn btn-primary"
                @click="salvar"
            >
                <fa icon="floppy-disk" class="me-1" />
                Salvar
            </button>
            <button
                type="button"
                class="btn btn-secondary ms-2"
                @click="voltar"
            >
                <fa icon="arrow-circle-left" class="me-1" />
                Voltar
            </button>
        </form>
    </div>
</template>

<script>

import {ir, voltar} from '@/helpers/Default';
import params from '@/store/params';
import AxiosHttp from '@/helpers/AxiosHttp';
import { mapActions } from 'vuex';

export default {
    name: 'FormGrupo',
    data() {
        return {
            grupo: {
                id: null,
                nome: null
            }
        }
    },
    methods: {

        ...mapActions({
            defineEstadoLoader: 'defineEstadoLoader'
        }),

        buscar: function(){

            if(this.$route.params.id){

                this.defineEstadoLoader(params.LOADER_SHOW);
                
                AxiosHttp().get('grupos/'+this.$route.params.id, response => {
                    this.grupo = response.data;
                    this.defineEstadoLoader(params.LOADER_HIDE);
                });
            }
            

        },

        voltar: function(){
            voltar();
        },

        salvar: function(){

            this.defineEstadoLoader(params.LOADER_SHOW);

            const callbackSalvar = () => {

                this.defineEstadoLoader(params.LOADER_SHOW);
                
                alert('Salvo com sucesso!');

                ir('/grupos');
            
            }
            if(this.$route.params.id){
                AxiosHttp().put('grupos/'+this.$route.params.id, this.grupo, callbackSalvar);
            } else {
                AxiosHttp().post('grupos', this.grupo, callbackSalvar);
            }

        },
        focusInput: function(){
            this.$refs.nome.focus();
        }

    },
    created(){
        this.buscar();
    },
    mounted(){
        this.focusInput();
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