<template>
    <div class="text-start">
        <h5 class="bg-light d-block p-2 rounded">
            <fa icon="list" />
            <b>
                Relatório
            </b>
        </h5>
        <div class="mt-4">
            xxxx
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