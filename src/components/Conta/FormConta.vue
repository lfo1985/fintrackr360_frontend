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
                    class="form-label">
                    Título
                </label>
                <input 
                    type="text"
                    class="form-control"
                    id="nome"
                    aria-describedby="nomeGrupo"
                    v-model="conta.titulo"
                    ref="titulo">
                <span 
                    v-if="!conta.titulo && validacao" 
                    class="small text-danger">
                    Digite o título!
                </span>
            </div>
            <div class="mb-3 col-md-2">
                <label 
                    for="id_grupo"
                    class="form-label">
                    Grupo
                </label>
                <select
                    v-model="conta.id_grupo"
                    class="form-select"
                    aria-label="Selecione o grupo"
                    :disabled="conta.id != null"
                    ref="id_grupo">
                    <option 
                        v-for="grupo in grupos"
                        :key="grupo.id"
                        :value="grupo.id"
                        v-html="grupo.nome"
                    ></option>
                </select>
                <span 
                    v-if="!conta.id_grupo && validacao" 
                    class="small text-danger">
                    Escolha um grupo!
                </span>
            </div>
            <div class="mb-3 col-md-2">
                <label 
                    for="natureza"
                    class="form-label">
                    Natureza
                </label>
                <select
                    class="form-select"
                    v-model="conta.natureza"
                    aria-label="Selecione a natureza"
                    :disabled="conta.id != null"
                    ref="natureza">
                    <option 
                        v-for="natureza in naturezas"
                        :key="natureza.id"
                        :value="natureza.id"
                        v-html="natureza.nome"
                    ></option>
                </select>
                <span 
                    v-if="!conta.natureza && validacao" 
                    class="small text-danger">
                    Escolha uma natureza!
                </span>
            </div>
            <div class="mb-3 col-md-2">
                <label 
                    for="tipo"
                    class="form-label">
                    Tipo
                </label>
                <select
                    class="form-select"
                    v-model="conta.tipo"
                    aria-label="Selecione o tipo"
                    :disabled="conta.id != null"
                    @change="defineUmaParcela"
                    ref="tipo">
                    <option 
                        v-for="tipo in tipos"
                        :key="tipo.id"
                        :value="tipo.id"
                        v-html="tipo.nome"
                    ></option>
                </select>
                <span 
                    v-if="!conta.tipo && validacao" 
                    class="small text-danger">
                    Escolha um tipo!
                </span>
            </div>
            <div class="mb-3 col-md-2">
                <label 
                    for="titulo"
                    class="form-label">
                    Periodos
                </label>
                <input 
                    type="number"
                    class="form-control"
                    v-model="conta.periodos"
                    v-mask-number
                    ref="periodos"
                    :disabled="conta.id != null || conta.tipo == 'A_VISTA'">
                <span 
                    v-if="!conta.periodos && validacao" 
                    class="small text-danger">
                    Preencha a quantidade de períodos!
                </span>
            </div>
            <div class="mb-3 col-md-1">
                <label 
                    for="valor"
                    class="form-label">
                    Valor
                </label>
                <input 
                    type="text"
                    class="form-control"
                    id="valor"
                    aria-describedby="valorConta"
                    v-model="conta.valor"
                    ref="valor"
                    v-mask-decimal.br="2">
                <span 
                    v-if="!conta.valor && validacao" 
                    class="small text-danger">
                    Informe o valor!
                </span>
            </div>
            <div class="mb-3 col-md-2">
                <label 
                    for="data_vencimento"
                    class="form-label">
                    Vencimento
                </label>
                <input 
                    type="text"
                    class="form-control"
                    id="data_vencimento"
                    aria-describedby="dataVencimento"
                    v-model="conta.data_vencimento"
                    ref="data_vencimento"
                    v-mask-date.br>
                <span 
                    v-if="!conta.data_vencimento && validacao" 
                    class="small text-danger">
                    Digite a data de vencimento!
                </span>
            </div>
            <div class="mb-3 col-md-6">
                <label 
                    for="descricao"
                    class="form-label">
                    Descrição
                </label>
                <textarea 
                    class="form-control"
                    v-model="conta.descricao"
                    rows="3"
                    ref="descricao"></textarea>
                <span 
                    v-if="!conta.descricao && validacao" 
                    class="small text-danger">
                    Digite uma descrição!
                </span>
            </div>
            <button
                type="button"
                class="btn btn-primary"
                @click="salvar">
                <fa icon="floppy-disk" class="me-1" />
                Salvar
            </button>
            <button
                type="button"
                class="btn btn-secondary ms-2"
                @click="voltar">
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
            validacao: false,
            erroValidacao: false,
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
            } else {
                this.conta.id_grupo = this.$store.getters.idGrupo;
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

            this.validacao = true;

            if(!this.conta.titulo) {
                this.erroValidacao = true;
                this.focusTitulo();
            } else if(!this.conta.id_grupo){
                this.erroValidacao = true;
                this.focusGrupo();
            } else if(!this.conta.natureza){
                this.erroValidacao = true;
                this.focusNatureza();
            } else if(!this.conta.tipo){
                this.erroValidacao = true;
                this.focusTipo();
            } else if(!this.conta.periodos){
                this.erroValidacao = true;
                this.focusPeriodo();
            } else if(!this.conta.valor){
                this.erroValidacao = true;
                this.focusValor();
            } else if(!this.conta.data_vencimento){
                this.erroValidacao = true;
                this.focusVencimento();
            } else if(!this.conta.descricao){
                this.erroValidacao = true;
                this.focusDescricao();
            } else {
                this.erroValidacao = false;
            }

            if(!this.erroValidacao){
                
                this.defineEstadoLoader(params.LOADER_SHOW);
    
                const callbackSalvar = () => {
    
                    this.defineEstadoLoader(params.LOADER_SHOW);
                    this.defineEstadoIdGrupo({idGrupo: this.conta.id_grupo});
    
                    ir({name: 'IndexConta'});
                    
                }
                if(this.$route.params.id){
                    AxiosHttp().put('contas/'+this.$route.params.id, this.conta, callbackSalvar);
                } else {
                    AxiosHttp().post('contas', this.conta, callbackSalvar);
                }

            }


        },
        focusTitulo: function(){
            this.$refs.titulo.focus();
        },
        focusGrupo: function(){
            this.$refs.id_grupo.focus();
        },
        focusNatureza: function(){
            this.$refs.natureza.focus();
        },
        focusTipo: function(){
            this.$refs.tipo.focus();
        },
        focusValor: function(){
            this.$refs.valor.focus();
        },
        focusVencimento: function(){
            this.$refs.data_vencimento.focus();
        },
        focusPeriodo: function(){
            this.$refs.periodos.focus();
        },
        focusDescricao: function(){
            this.$refs.descricao.focus();
        },
        defineUmaParcela: function(){
            if(!this.conta.id){
                this.conta.periodos = 1;
            }
            this.focusPeriodo();
        }
    },
    mounted(){
        this.focusTitulo();
        this.buscar();
    },
    created(){
        this.buscarDependencias();
    }
}

</script>