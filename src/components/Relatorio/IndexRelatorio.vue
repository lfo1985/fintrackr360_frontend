<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="list" />
            <b>
                Relatório
            </b>
        </h5>
        <div class="mt-4">
            <div class="row">
                <div class="mb-3 col-md-2">
                    <label 
                        for="ano"
                        class="form-label"
                    >
                        Ano
                    </label>
                    <select
                        class="form-select"
                        aria-label="Selecione o ano"
                        id="ano"
                        v-model="ano"
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
                <div class="mb-3 col-md-2">
                    <label 
                        for="mes"
                        class="form-label"
                    >
                        Mês
                    </label>
                    <select
                        class="form-select"
                        aria-label="Selecione o mês"
                        id="mes"
                        v-model="mes"
                    >
                        <option 
                            v-for="mes in listaMeses"
                            :key="mes.numero"
                            :value="mes.numero"
                        >
                            {{ mes.nome }}
                        </option>
                    </select>
                </div>
                <div class="mb-3 col-md-2" style="margin-top: 32px;">
                    <button @click="buscar" class="btn btn-info text-white">
                        <fa icon="magnifying-glass" />
                        Pesquisar
                    </button>
                </div>
            </div>
        </div>
        <p class="text-info">
            <fa icon="info-circle" />
            Para definir uma conta como paga, basta clicar sobre o título da mesma!
        </p>
        <div class="mt-4 col-md-6">
            <div class="accordion" id="accordionRelatorio">
                <div 
                    v-for="item in dados"
                    :key="item.id"
                    class="accordion-item"
                >
                    <h2 class="accordion-header">
                        <button
                            class="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            :data-bs-target="'#item-'+item.id"
                            aria-expanded="true"
                            :aria-controls="'item-'+item.id"
                        >
                            {{ item.nome }}
                        </button>
                    </h2>
                    <div 
                        :id="'item-'+item.id"
                        class="accordion-collapse collapse"
                        data-bs-parent="#accordionRelatorio"
                    >
                        <div class="accordion-body">
                            <button type="button" @click="definirStatusTodas(item.conta)" class="btn btn-success mb-3">
                                <fa icon="check" />
                                Marcar todas como pago
                            </button>
                            <table class="table w-100">
                                <tbody>
                                    <tr v-for="conta in item.conta" :key="conta.id">
                                        <td>
                                            <fa v-if="conta.periodo.status == 'PENDENTE'" icon="clock" class="me-2 text-danger" />
                                            <fa v-if="conta.periodo.status == 'PAGO'" icon="check" class="me-2 text-success" />
                                            <a @click="defineStatus(conta.periodo.id, conta.periodo.status)">{{ conta.titulo }}</a>
                                            <div style="font-size: 13px; color: #8b8b8b;" v-if="conta.descricao">{{ conta.descricao }}</div>
                                        </td>
                                        <td
                                            :class="{
                                                'text-end': true,
                                                'text-danger': conta.natureza == 'D',
                                                'text-info': conta.natureza == 'C',
                                                'align-middle': true
                                            }"
                                        >
                                            {{ conta.periodo.valor_formatado }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 bg-light rounded p-2 border col-md-6">
            <table class="table">
                <tr>
                    <td>Total de Créditos:</td>
                    <td class="text-success text-end">{{ totalCredito }}</td>
                </tr>
                <tr>
                    <td>Total de Débitos:</td>
                    <td class="text-danger text-end">{{ totalDebito }}</td>
                </tr>
                <tr>
                    <td>Saldo do mês:</td>
                    <td :class="'text-end ' + 'text-' + classeSaldo">{{ saldoMes }}</td>
                </tr>
                <tr>
                    <td class="fw-bold">Saldo Acumulado:</td>
                    <td :class="'text-info bg-'+classeAcumulado+' text-white fw-bold text-end'">{{ saldoAcumulado }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>

import AxiosHttp from '@/helpers/AxiosHttp';
import params from '@/store/params';
import moment from 'moment';
import { mapActions } from 'vuex';

export default {
    name: 'IndexRelatorio',
    data() {
        return {
            dados: [],
            listaMeses: [],
            listaAnos: [],
            mes: moment().format('M'),
            ano: moment().format('Y'),
            totalCredito: 0,
            totalDebito: 0,
            saldoMes: 0,
            saldoAcumulado: 0,
            classeAcumulado: '',
            classeSaldo: '',
            periodos: [],
            periodosAterarStatus: []
        }
    },
    methods: {
        ...mapActions({
            defineEstadoLoader: 'defineEstadoLoader',
            defineEstadoIdGrupo: 'defineEstadoIdGrupo',
        }),
        buscar: function(){
            this.defineEstadoLoader(params.LOADER_SHOW);
            AxiosHttp()
                .get('relatorio/'+this.mes+'/'+this.ano, response => {

                    this.dados = response;

                    this.dados.forEach(grupo => {
                        grupo.conta.forEach(itemConta => {
                            this.periodos[itemConta.id] = itemConta.periodo;
                        });
                    });

                    this.defineEstadoLoader(params.LOADER_HIDE);

                    this.resultados();

                });
        },
        meses: function(){
            AxiosHttp()
                .get('relatorio/dados-filtro', response => {
                    this.listaMeses = response.meses;
                    this.listaAnos = response.anos;
                });
        },
        resultados: function(){
            AxiosHttp()
                .get('relatorio/resultado', response => {
                    this.totalCredito = response[this.ano+'-'+this.mes].C;
                    this.totalDebito = response[this.ano+'-'+this.mes].D;
                    this.saldoMes = response[this.ano+'-'+this.mes].SALDO;
                    this.saldoAcumulado = response[this.ano+'-'+this.mes].SALDO_ACUMULADO;
                    this.classeAcumulado = response[this.ano+'-'+this.mes].CLASSE_ACUMULADO;
                    this.classeSaldo = response[this.ano+'-'+this.mes].CLASSE_SALDO;
                    this.defineEstadoLoader(params.LOADER_HIDE);
                });
        },
        defineStatus: function(idPeriodo, statusPeriodo){
            
            this.defineEstadoLoader(params.LOADER_SHOW);

            var status = statusPeriodo == 'PAGO' ? 'PENDENTE' : 'PAGO';

            const callbackSalvar = () => {
                this.buscar();
            }
            
            AxiosHttp()
                .patch('relatorio/definir-status/'+idPeriodo+'/'+status, {}, callbackSalvar);

        },
        definirStatusTodas: function(contas){
            
            contas.forEach(itemConta => {
                this.periodosAterarStatus.push(itemConta.periodo.id);
            });
            
            const callbackSalvar = () => {
                this.buscar();
            }

            AxiosHttp()
                .patch('relatorio/definir-status-todas', {periodos: this.periodosAterarStatus}, callbackSalvar);

        },
    },
    mounted(){
        this.buscar();
        this.meses();
    }
}

</script>

<style scoped>
    .pago{
        background-color: rgb(207, 255, 207);
    }
</style>