<template>
  <div class="home">
    <div class="container">
      <div class="menu-lateral">
        <div class="titulo">
          <h1>TO-DO APP</h1>
        </div>
        <div class="listar-tarefas-por-lista"></div>
        <div class="listar-todas-tarefas"></div>
        <div class="devs-nomes">
          <h4>Nicolas Leonardo Miranda Lima</h4>
          <h4>Eliel Lima de Aguiar</h4>
        </div>
      </div>
      <div class="espaco-formulario">
        <div class="add-tarefa"></div>
        <div class="add-lista"></div>
        <div class="ligar-tarefa-lista"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api-conection/axios-api-conection';

export default {
  name: 'HomeToDo',
  data() {
    return {
      task: {
        task: '',
        doneStatus: false,
      },
      list: {
        name: '',
        tasks: ''
      },
      allTasks: [],
      allLists: [],
    }
  },
  mounted() {
    api.get('task/findAll').then((response) => {
      this.allTasks = response.data;
    }),
    api.get('list/findAll').then((response) => {
      this.allLists = response.data
    })
  },
  methods: {
    createTask() {
      const taskReq = this.task;
      api.post("task/create", taskReq).then((response) => {
        console.log(response)
      })
      this.task.task = '';
      this.task.doneStatus = false;
    },
    createList() {
      const listReq = this.list
      api.post("list/create", listReq).then((response) => {
        console.log(response);
      })
      this.list.name = '',
      this.list.tasks = []
    },
    linkTaskWithList(list, task) {
      const linkRequest = {task, list};
      api.put('add-task-in-list', linkRequest).then((response) => {
        console.log(response);
      })
    }
  }
  
}
</script>
