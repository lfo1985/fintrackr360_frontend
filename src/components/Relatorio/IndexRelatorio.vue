<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded border">
            <fa icon="money-bill-trend-up" class="me-2" />
            Extrato das Finanças
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
        <div class="col-md-6 mb-4 mt-4">
            <div class="row">
                <div class="col-md-6">
                    <div class="rounded border border-secondary border-1 p-2 mb-2">
                        <h4>Débito</h4>
                        <div class="row mb-2">
                            <div class="col-md-12 col-xs-12">
                                Total de lançamentos débito: {{ totalLancamentoDebito }}
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="text-start col-md-12 col-xs-12">
                                Total de contas pagas: {{ totalPagoDebito }}
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-md-12 mt-2">
                                <div class="progress">
                                    <div 
                                        :class="{
                                            'progress-bar': true,
                                            'bg-success': percentualDebitoPagoFloat == 100,
                                            'bg-info': percentualDebitoPagoFloat < 100,
                                        }"
                                        role="progressbar"
                                        :style="{
                                            width: percentualDebitoPagoFloat+'%'
                                        }"
                                        aria-valuenow="0"
                                        aria-valuemin="0"
                                        aria-valuemax="100">
                                        {{ percentualDebitoPagoString }}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="rounded border border-secondary  border-1 p-2 mb-2">
                        <h4>Crédito</h4>
                        <div class="row mb-2">
                            <div class="col-md-12">
                                Total de lançamentos: {{ totalLancamentoCredito }}
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-md-12">
                                Total de contas recebidas: {{ totalRecebidoCredito }}
                            </div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-md-12 mt-2">
                                <div class="progress">
                                    <div 
                                        :class="{
                                            'progress-bar': true,
                                            'bg-success': percentualCreditoRecebidoFloat == 100,
                                            'bg-info': percentualCreditoRecebidoFloat < 100,
                                        }"
                                        role="progressbar"
                                        :style="{
                                            width: percentualCreditoRecebidoFloat+'%'
                                        }"
                                        aria-valuenow="0"
                                        aria-valuemin="0"
                                        aria-valuemax="100">
                                        {{ percentualCreditoRecebidoString }}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="text-info">
            <fa icon="info-circle" />
            Para definir uma conta como paga, basta clicar sobre o título da mesma!
        </p>
        <div v-if="dados.length > 0" class="mt-4 col-md-6">
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
        <div v-else class="text-danger">
            <p>Nenhuma conta encontrada para este mês!</p>
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
            mes: moment().format('MM'),
            ano: moment().format('Y'),
            totalCredito: 0,
            totalDebito: 0,
            saldoMes: 0,
            saldoAcumulado: 0,
            classeAcumulado: '',
            classeSaldo: '',
            periodos: [],
            periodosAterarStatus: [],
            totalRecebidoCredito: 0,
            totalPagoDebito: 0,
            totalLancamentoCredito: 0,
            totalLancamentoDebito: 0,
            percentualCreditoRecebidoString: '',
            percentualDebitoPagoString: '',
            percentualCreditoRecebidoFloat: 0,
            percentualDebitoPagoFloat: 0,
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

                    this.totalCredito = 0;
                    this.totalDebito = 0;
                    this.saldoMes = 0;
                    this.saldoAcumulado = 0;
                    this.classeAcumulado = '';
                    this.classeSaldo = '';
                    this.totalRecebidoCredito = 0;
                    this.totalPagoDebito = 0;
                    this.totalLancamentoCredito = 0;
                    this.totalLancamentoDebito = 0;
                    this.percentualCreditoRecebidoString = '';
                    this.percentualDebitoPagoString = '';
                    this.percentualCreditoRecebidoFloat = 0;
                    this.percentualDebitoPagoFloat = 0;

                    if(this.dados.length > 0){
                        this.resultados();
                    }

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
                    this.totalRecebidoCredito = response[this.ano+'-'+this.mes].TOTAL_RECEBIDO_CREDITO;
                    this.totalPagoDebito = response[this.ano+'-'+this.mes].TOTAL_PAGO_DEBITO;
                    this.totalLancamentoCredito = response[this.ano+'-'+this.mes].TOTAL_LANCAMENTOS_CREDITO;
                    this.totalLancamentoDebito = response[this.ano+'-'+this.mes].TOTAL_LANCAMENTOS_DEBITO;
                    this.percentualCreditoRecebidoString = response[this.ano+'-'+this.mes].PERCENTUAL_CREDITO_RECEBIDO_STRING;
                    this.percentualDebitoPagoString = response[this.ano+'-'+this.mes].PERCENTUAL_DEBITO_PAGO_STRING;
                    this.percentualCreditoRecebidoFloat = response[this.ano+'-'+this.mes].PERCENTUAL_CREDITO_RECEBIDO_FLOAT;
                    this.percentualDebitoPagoFloat = response[this.ano+'-'+this.mes].PERCENTUAL_DEBITO_PAGO_FLOAT;
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