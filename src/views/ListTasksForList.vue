<template>
  <div>
    <div class="container">
      <div class="barra-lateral">
        <div class="titulo">
          <h1>TO-DO APP</h1>
        </div>
        <div class="nome-da-lista">NOME DA LISTA</div>
      </div>
      <div class="listagem-tarefas">
        <div class="tarefas">V-FOR COM TODAS TAREFAS DA LISTAS</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ListTasksForList",
  data() {
    return {
      list: {
        name: '',
        tasks: []
      }
    }
  },
  created() {
    this.list = this.$route.query
  }
}
</script>