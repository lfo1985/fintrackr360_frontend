<!-- eslint-disable vue/require-v-for-key -->
<template>
    <li class="list-group-item d-flex align-items-center justify-content-between">
        <span>
            <!-- Uma forma diferente de incluir o conteúdo dentro da tag fora do ecopo da mesma  -->
            <span class="d-block me-2" v-html="projeto.titulo"></span>
            <small class="fs-7 text-info">{{ projeto.descricao }}</small>
        </span>
        <div class="d-flex">
            <!-- Forma de chamar a rota usando o nome e aplicando parâmetros -->
            <router-link 
                :to="{name: 'InfoProjeto', params: {id: projeto.id}}" 
                class="btn btn-info me-1 text-white rounded-5"
            >
                <fa icon="info-circle" />
                Ver mais informações
            </router-link>
        </div>
    </li>
</template>

<script>

export default {
    name: 'ItemProjeto',
    props: {
        projeto: Object
    }
}

</script>