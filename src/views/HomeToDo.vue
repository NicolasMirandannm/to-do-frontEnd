<template>
  <div class="home">
    <div class="container">
      <div class="menu-lateral">
        <div class="titulo">
          <h1>TO-DO APP</h1>
        </div>
        <div class="listar-tarefas-por-lista">
          <p class="label-list-tasks">Selecione a lista que deseja abrir:</p>
          <b-form-select
            class="dropdown"
            v-model="listSelected"
            :options="allLists"
          ></b-form-select>
          <button>Listar</button>
        </div>
        <div class="listar-todas-tarefas">
          <p class="label-list-tasks">Listar todas tarefas cadastradas:</p>
          <button>Listar</button>
        </div>
        <div class="devs-nomes">
          <h4 class="devName">devs:</h4>
          <p class="devName">Nicolas Leonardo Miranda Lima</p>
          <p class="devName">Eliel Lima de Aguiar</p>
        </div>
      </div>
      <div class="espaco-formulario">
        <div class="add-tarefa">
          <h3 class="titulo-forms">Adicionar uma nova tarefa</h3>
          <div class="form-submit">
            <p>tarefa:</p>
            <input
              type="text"
              v-model="task.task"
              placeholder="Digite sua tarefa..."
            />
            <button class="add-button" @click="createTask">
              Adicionar Tarefa
            </button>
          </div>
        </div>
        <div class="add-lista">
          <h3 class="titulo-forms">Adicionar uma nova lista</h3>
          <div class="form-submit">
            <p>Lista:</p>
            <input
              type="text"
              required
              v-model="list.name"
              placeholder="Digite o nome da sua lista..."
            />
            <button class="add-button" @click="createList">
              Adicionar Lista
            </button>
          </div>
        </div>
        <div class="ligar-tarefa-lista">
          <h3 class="titulo-forms">Vincule uma tarefa com uma lista</h3>
          <div class="link-dropdown">
            <p>Selecione uma tarefa</p>
            <b-form-select
              class="dropdown"
              v-model="TaskSelected"
              :options="allTasks"
            ></b-form-select>
            <p>Selecione uma lista</p>
            <b-form-select
              class="dropdown"
              v-model="listForLink"
              :options="allLists"
            ></b-form-select>
          </div>
          <button @click="linkTaskWithList">Vincular tarefa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api-conection/axios-api-conection";

export default {
  name: "HomeToDo",
  data() {
    return {
      task: {
        task: null,
        doneStatus: false,
      },
      list: {
        name: null,
        tasks: null,
      },
      allTasks: [],
      allLists: [],
      listSelected: null,
      TaskSelected: null,
      listForLink: null
    };
  },
  mounted() {
    api.get("task/findAll").then((response) => {
      const tasks = response.data;
      this.allTasks = tasks.map((task) => {
        return {
          value: task.task,
          text: task.task,
        };
      });
    }),
      api.get("list/findAll").then((response) => {
        const lists = response.data;
        this.allLists = lists.map((list) => {
          return {
            value: list.name,
            text: list.name,
          };
        });
      });
  },
  methods: {
    createTask() {
      const taskReq = this.task;
      if (taskReq.task == null) {
        alert("Digite sua tarefa!!");
      } else {
        try {
          api.post("task/create", taskReq).then((response) => {
            alert(`tarefa '${response.data.task}' criada com sucesso!`);
          });
          window.location.reload();
        } catch (err) {
          alert(err.message);
        }
      }
    },
    createList() {
      const listReq = this.list;
      if (listReq.name == null) {
        alert("Digite o nome da lista!!");
      } else {
        try {
          api.post("list/create", listReq).then((response) => {
            alert(`lista '${response.data.name}' criada com sucesso!`);
            window.location.reload();
          });
        } catch (err) {
          alert(err.message);
        }
      }
    },
    linkTaskWithList() {
      const linkRequest = {
        task: {
          task: this.TaskSelected,
        },
        list: {
          name: this.listForLink,
        },
      };
      if (linkRequest.task.task == null || linkRequest.list.name == null) {
        alert("ambos os campos são necessarios!!");
      } else {
        try {
          api.put("add-task-in-list", linkRequest).then((response) => {
            alert(
              `${this.TaskSelected} adicionado com sucesso em ${this.listSelected}`
            );
            window.location.reload();
          });
        } catch (err) {
          alert(err.message);
        }
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.home {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #343a40;
}

.container {
  height: 80%;
  width: 80%;
  background-color: #e0ddcf;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 3px #212529;
  display: flex;
  flex-direction: row;
  position: absolute;
}
.menu-lateral {
  height: 100%;
  width: 30%;
  background-color: #534b52;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  border-top-right-radius: 0%;
  border-bottom-right-radius: 0%;
}

.label-list-tasks {
  color: #f1f0ea;
  font-weight: bolder;
}

.devs-nomes {
  background-color: #2d232e;
  width: 80%;
  height: 25%;
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f1f0ea;
  font-size: 15px;
  border-radius: 5px;
}

.devName {
  margin-top: 15px;
}

.titulo {
  height: 25%;
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

.listar-tarefas-por-lista {
  width: 80%;
  height: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.listar-todas-tarefas {
  width: 80%;
  height: 15%;
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.espaco-formulario {
  background-color: #e0ddcf;
  position: relative;
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  border-top-left-radius: 0%;
  border-bottom-left-radius: 0%;
}

.add-tarefa {
  width: 80%;
  height: 25%;
  border-radius: 5px;
  background-color: #cac7bf;
}

.add-lista {
  width: 80%;
  height: 25%;
  border-radius: 5px;
  background-color: #cac7bf;
}

.ligar-tarefa-lista {
  width: 80%;
  height: 25%;
  border-radius: 5px;
  background-color: #cac7bf;
}
</style>
