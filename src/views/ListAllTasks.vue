<template>
  <div class="main">
    <div class="container">
      <div class="barra-lateral">
        <div class="titulo">
          <h1>TO-DO APP</h1>
        </div>
        <div class="titulo-da-rota">
          <p>TODAS TAREFAS CRIADAS</p>
        </div>
        <div class="back">
          <button class="button-31" @click="toRouteHome">Voltar</button>
        </div>
      </div>
      <div class="container-das-tarefas">
        <div class="barra-de-filtro">
          <div class="filtro-lista">
            <b-form-select
              class="dropdown"
              v-model="listSelected"
              :options="allLists"
            ></b-form-select>
            <div>{{listSelected}}</div>
            <button class="button-31 deletar" @click="deletarLista">Deletar lista</button>
          </div>
        <button class="button-31" @click="clearAllTasksFromList">Remover todas tarefas da lista</button>
          
        </div>
        <div class="listas-tarefas">
          <b-list-group-item class="lista-titulo">
            <p>TAREFA</p>
            <p>STATUS</p>
            <p>LISTA</p>
            <p>AÇÕES</p>
          </b-list-group-item>
          <b-list-group
            class="list-group"
            v-for="task in tasksAux"
            :key="task.id"
          >
            <b-list-group-item class="items" v-if="task.doneStatus == false">
              <div class="input-task">
                <input class="input-task-name" type="text" v-model="task.task" />
                <button class="button-31" @click="updateTask(task)">Editar</button>
              </div>
              <div class="task-status">
                <p class="status">Incompleto</p>
                <button class="button-31" @click="doneTask(task)" :disabled="task.doneStatus">Concluir</button>
              </div>
              <div class="lista-name">
                <p v-if="task.list != null">{{ task.list.name }}</p>
                <p v-else>Sem lista</p>
              </div>
              <div class="acoes">
                <button class="button-deletar" @click="deleteTask(task)">deletar</button>
                <button class="button-31" @click="removerDaLista(task)">remover da lista</button>
              </div>
            </b-list-group-item>

            <b-list-group-item class="items1" v-else>
              <div class="input-task">
                <input class="input-task-name" type="text" v-model="task.task" />
                <button class="button-31" @click="updateTask(task)">Editar</button>
              </div>
              <div class="task-status">
                <p class="status2">Concluído</p>
              </div>
              <div class="lista-name">
                <p v-if="task.list != null">{{ task.list.name }}</p>
                <p v-else>Sem lista</p>
              </div>
              <div class="acoes">
                <button class="button-deletar" @click="deleteTask(task)">deletar</button>
                <button class="button-31" @click="removerDaLista(task)">remover da lista</button>
              </div>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api-conection/axios-api-conection";

export default {
  name: "ListAllTasks",
  data() {
    return {
      listSelected: null,
      tasksAux: [],
      allTasks: [
        {
          id: null,
          list: {
            name: null,
          },
          doneStatus: null,
          task: null,
        },
      ],
      allLists: [],
      TaskFilter: null,
    };
  },
  mounted() {
    api
      .get("task/findAll")
      .then((response) => {
        this.allTasks = response.data;
        this.tasksAux = this.allTasks;
      })
      .catch((err) => this.$swal(err.message));

    api
      .get("list/findAll")
      .then((response) => {
        const lists = response.data;
        this.allLists = lists.map((list) => {
          return {
            value: list.name,
            text: list.name,
          };
        });
        this.allLists.unshift({
            value: null,
            text: 'Sem filtro'
        })
      })
      .catch((err) => this.$swal(err.message));
  },

  watch: {
    listSelected() {
      if(this.listSelected) {
          const tasks = this.allTasks;
          this.tasksAux = tasks.filter((task) => {
              if(task.list) {
                  return task.list.name === this.listSelected;
              }
          })
          console.log(this.tasksAux)
      }
      else {
          this.tasksAux = this.allTasks;
      }
    },

  },  
  methods: {
    deletarLista() {
      if(this.listSelected) {
        api.delete("list/delete", {data: {name: this.listSelected}})
        .then((response) => {
          this.$swal(`lista ${this.listSelected} deletada com sucesso!`);
          window.location.reload()
        })
        .catch((err) => {
          this.$swal(err.data.message)
        })
      }
      else {
        this.$swal('Selecione uma lista!')
      }
    },
    updateTask(task) {
      try {
        api.put("task/update", task).then((response) => {
          this.$swal(`${response.data.task} alterado com sucesso`);
        });
      } catch (err) {
        this.$swal(err.message);
      }
    },
    doneTask(task) {
      let taskDone = task;
      taskDone.doneStatus = true;
      try {
        api.put("task/update", taskDone).then((response) => {
          this.$swal(`Parabens por concluir a tarefa: ${response.data.task}`);
        });
      } catch (err) {
        this.$swal(err.message);
      }
    },
    deleteTask(task) {
      try {
        api.delete("task/delete", { data: task }).then((response) => {
          this.$swal(`Tarefa ${response.data.task} deletada com sucesso`);
        });
        window.location.reload();
      } catch (err) {
        this.$swal(err.message);
      }
    },
    removerDaLista(task) {
      api
        .put("remove-task-from-list", task)
        .then((response) => {
          this.$swal(
            `tarefa ${response.data.task} removido com sucesso da lista '${task.list.name}'`
          );
          window.location.reload()
        })
        .catch((err) => {
          this.$swal("Tarefa não pertence a nenhuma lista");
        });
    },
    toRouteHome() {
      this.$router.push({
        path: '/',
      })
    },
    clearAllTasksFromList() {
      if(this.listSelected) {
        api.put("remove-all-task-from-list", {list: this.listSelected}).then((response) => {
          this.$swal(`lista ${response.data.name} esvaziada com sucesso`)
          window.location.reload()
        }).catch((err) => {
          this.$swal(err.data.message)
        })
      }
      else {
        this.$swal('selecione uma lista para poder remover suas tarefas!')
      }
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #343a40;
}
.container {
  width: 80%;
  height: 80%;
  background-color: #ced4da;
  box-shadow: 1px 2px 2px 3px #212529;
  display: flex;
  position: absolute;
  flex-direction: row;
  padding: 0;
}

.barra-lateral {
  width: 30%;
  background-color: #534b52;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.titulo {
  height: 30%;
  width: 80%;
  background-color: #2d232e;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 10%;
  color: #f1f0ea;
}

.titulo-da-rota {
  height: 30%;
  width: 80%;
  background-color: #2d232e;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 10%;
  color: #f1f1f1;
  font-weight: bold;
  font-size: 20px;
}

.back {
  width: 80%;
}

.container-das-tarefas {
  background-color: #e0ddcf;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.barra-de-filtro {
  margin-top: 15px;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.barra-de-filtro .button-31 {
  width: 85%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.filtro-lista {
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.dropdown {
  width: 100%;
  border: 0;
  border-radius: 2px;
  margin-right: 5px;
  margin-left: 5px;
}

.filtro-lista .button-31 {
  background-color: #9b0800;
  width: 40%;
  margin-right: 5px;
}

.listas-tarefas {
  background-color: #cac7bf;
  width: 90%;
  margin-top: 20px;
  height: 75%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
}

.lista-titulo {
  margin-top: 10px;
  width: 95%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-weight: 600;
  color: #383737;
  background-color: hsl(312, 2%, 59%);;
}

.list-group {
  width: 95%;
}

.items {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.items1 {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  opacity: 0.8;
  background-color: #cce9de;
}

.input-task {
  width: 22%;
}

.input-task .button-31 {
  height: 15px;
  display: flex;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  background-color: #1b676b;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.input-task-name {
  width: 100%;
  height: 25px;
  border-radius: 3px;
  border: 0;
  text-align: center;
  background-color: #e3e6e9;
  font-size: 15px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.task-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 22%;
}
.task-status .button-31{
  width: 80%;
  height: 15px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #88c425;
}

.status {
  font-size: 15px;
  font-weight: bold;
}

.status2 {
  font-size: 15px;
  font-weight: bold;
  color: #88c425;
  opacity: 0.5;
}

.lista-name {
  width: 22%;
  font-weight: bolder;
}

.acoes {
  width: 22%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.acoes .button-31 {
  font-size: 10px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-deletar {
  border-radius: 3px;
  width: 100%;
  background-color: #9b0800;
  color: #f1f0ea;
  font-weight: 200px;
  border: 0;
  font-size: 15px;
  margin-bottom: 5px;
}

/* CSS BUTTON */
.button-31 {
  background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Farfetch Basis","Helvetica Neue",Arial,sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  max-width: none;
  min-height: 30px;
  min-width: 10px;
  outline: none;
  overflow: hidden;
  padding: 9px 20px 8px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
}

.button-31:hover,
.button-31:focus {
  opacity: .75;
}

</style>
