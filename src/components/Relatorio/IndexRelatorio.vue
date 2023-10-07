<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="list" />
            <b>
                Relatório
            </b>
        </h5>
        <div class="mt-4">
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Accordion Item #1
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <table class="table w-100">
                                <tbody>
                                    <tr>
                                        <td>Conta xxxx</td>
                                        <td class="text-end">123,98</td>
                                    </tr>
                                    <tr>
                                        <td>Conta xxxx</td>
                                        <td class="text-end">-123,98</td>
                                    </tr>
                                    <tr>
                                        <td>Conta xxxx</td>
                                        <td class="text-end">123,98</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Accordion Item #2
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Accordion Item #3
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-4 bg-light rounded p-2 border">
            <div class="text-info p-1">Total de Créditos: 12,00</div>
            <div class="text-danger p-1">Total de Débitos: 10,00</div>
            <div class="p-1">Saldo do mês: 2,00</div>
            <div class="p-1">Saldo do mês anterior: 2,00</div>
            <div class="bg-info p-1 text-white rounded">Saldo Acumulado: 100,00</div>
        </div>
    </div>
</template>

<script>

// import AxiosHttp from '@/helpers/AxiosHttp';
import { mapActions } from 'vuex';

export default {
    name: 'IndexRelatorio',
    data() {
        return {
            //
        }
    },
    methods: {
        ...mapActions({
            defineEstadoLoader: 'defineEstadoLoader',
            defineEstadoIdGrupo: 'defineEstadoIdGrupo',
        }),
    },
    mounted(){

    }
}

</script>