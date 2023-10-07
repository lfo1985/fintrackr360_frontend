<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="floppy-disk" />
            <b>
                Contas - {{ conta.id ? 'Editar' : 'Criar' }}
            </b>
        </h5>
        <form>
            <div class="mb-3 col-md-6">
                <label 
                    for="titulo"
                    class="form-label"
                >
                    Título
                </label>
                <input 
                    type="text"
                    class="form-control"
                    id="nome"
                    aria-describedby="nomeGrupo"
                    v-model="conta.titulo"
                    ref="titulo"
                >
            </div>
            <div class="mb-3 col-md-2">
                <label 
                    for="id_grupo"
                    class="form-label"
                >
                    Grupo
                </label>
                <select
                    v-model="conta.id_grupo"
                    class="form-select"
                    aria-label="Selecione o grupo"
                    :disabled="conta.id != null"
                >
                    <option 
                        v-for="grupo in grupos"
                        :key="grupo.id"
                        :value="grupo.id"
                        v-html="grupo.nome"
                    ></option>
                </select>
            </div>
            <div class="mb-3 col-md-1">
                <label 
                    for="natureza"
                    class="form-label"
                >
                    Natureza
                </label>
                <select
                    class="form-select"
                    v-model="conta.natureza"
                    aria-label="Selecione a natureza"
                    :disabled="conta.id != null"
                >
                    <option 
                        v-for="natureza in naturezas"
                        :key="natureza.id"
                        :value="natureza.id"
                        v-html="natureza.nome"
                    ></option>
                </select>
            </div>
            <div class="mb-3 col-md-2">
                <label 
                    for="tipo"
                    class="form-label"
                >
                    Tipo
                </label>
                <select
                    class="form-select"
                    v-model="conta.tipo"
                    aria-label="Selecione o tipo"
                    :disabled="conta.id != null"
                >
                    <option 
                        v-for="tipo in tipos"
                        :key="tipo.id"
                        :value="tipo.id"
                        v-html="tipo.nome"
                    ></option>
                </select>
            </div>
            <div class="mb-3 col-md-1">
                <label 
                    for="valor"
                    class="form-label"
                >
                    Valor
                </label>
                <input 
                    type="text"
                    class="form-control"
                    id="valor"
                    aria-describedby="valorConta"
                    v-model="conta.valor"
                    ref="valor"
                    v-mask-decimal.br="2"
                >
            </div>
            <div class="mb-3 col-md-1">
                <label 
                    for="titulo"
                    class="form-label"
                >
                    Periodos
                </label>
                <input 
                    type="number"
                    class="form-control"
                    v-model="conta.periodos"
                    v-mask-number
                    ref="periodos"
                    :disabled="conta.id != null"
                >
            </div>
            <div class="mb-3 col-md-2">
                <label 
                    for="data_vencimento"
                    class="form-label"
                >
                    Vencimento
                </label>
                <input 
                    type="text"
                    class="form-control"
                    id="data_vencimento"
                    aria-describedby="dataVencimento"
                    v-model="conta.data_vencimento"
                    ref="data_vencimento"
                    v-mask-date.br
                >
            </div>
            <div class="mb-3 col-md-6">
                <label 
                    for="descricao"
                    class="form-label"
                >
                    Descrição
                </label>
                <textarea class="form-control" v-model="conta.descricao" rows="3"></textarea>
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
    name: 'FormConta',
    data() {
        return {
            conta: {
                id: null,
                id_grupo: null,
                titulo: null,
                natureza: null,
                descricao: null,
                valor: null,
                tipo: null,
                periodos: null
            },
            tipos: [],
            grupos: [],
            naturezas: []
        }
    },
    methods: {
        ...mapActions({
            defineEstadoLoader: 'defineEstadoLoader',
            defineEstadoIdGrupo: 'defineEstadoIdGrupo',
        }),
        buscar: function(){

            if(this.$route.params.id){

                this.defineEstadoLoader(params.LOADER_SHOW);
                
                AxiosHttp().get('contas/'+this.$route.params.id, response => {
                    this.conta = response.data;
                    this.defineEstadoLoader(params.LOADER_HIDE);
                    this.defineEstadoIdGrupo({idGrupo: this.conta.id_grupo});
                });
            }

        },
        buscarDependencias: function(){
            AxiosHttp().get('contas/dependencias', response => {
                this.grupos = response.grupos;
                this.tipos = response.tipos;
                this.naturezas = response.natureza;
            });
        },
        voltar: function(){
            voltar();
        },
        salvar: function(){

            this.defineEstadoLoader(params.LOADER_SHOW);

            const callbackSalvar = () => {

                this.defineEstadoLoader(params.LOADER_SHOW);

                ir({name: 'IndexConta'});
            
            }
            if(this.$route.params.id){
                AxiosHttp().put('contas/'+this.$route.params.id, this.conta, callbackSalvar);
            } else {
                AxiosHttp().post('contas', this.conta, callbackSalvar);
            }

        },
        focusInput: function(){
            this.$refs.titulo.focus();
        }
    },
    mounted(){
        this.focusInput();
        this.buscar();
    },
    created(){
        this.buscarDependencias();
    }
}

</script>