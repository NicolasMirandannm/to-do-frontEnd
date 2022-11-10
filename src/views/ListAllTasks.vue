<template>
    <div>
        <div class="container">
            <div class="barra-lateral">
                <div class="titulo">
                  <h1>TO-DO APP</h1>
                </div>
                <div class="titulo-da-rota">
                    <h1>TODAS TAREFAS CRIADAS</h1>
                </div>
            </div>
            <div class="container-das-tarefas">
                <div class="barra-de-pesquisa">BARRA DE PESQUISA</div>
                <div class="listas-tarefas">V-FOR COM AS TAREFAS</div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api-conection/axios-api-conection';

export default {
    name: 'ListAllTasks',
    data() {
        return {
            tasks: []
        }
    },
    created() {
        api.get('task/findAll').then((response) => {
            this.tasks = response.data;
        })       
    }
}
</script>