<template>
  <div class="home">
    <div class="container">
      <div class="menu-lateral">
        <div class="titulo">
          <h1>TO-DO APP</h1>
        </div>
        <div class="listar-todas-tarefas">
          <p class="label-list-tasks">Listar todas tarefas cadastradas:</p>
          <button class="button-31" @click="toRouterList">Listar</button>
        </div>
        <div class="devs-nomes">
          <h4 class="devName">devs:</h4>
          <p class="devName">Nicolas Leonardo Miranda Lima</p>
          <p class="devName">Eliel Lima de Aguiar</p>
        </div>
      </div>



      <div class="espaco-formulario">
        <div class="add-tarefa">
          <h3 class="titulo-forms-add">Adicionar uma nova tarefa</h3>
          <div class="form-submit">
            <p class="subtitle-add">Tarefa</p>
            <input
              type="text"
              class="input-add"
              v-model="task.task"
              placeholder="Digite sua tarefa..."
            />
            <button class="button-31" @click="createTask">
              Adicionar Tarefa
            </button>
          </div>
        </div>



        <div class="add-lista">
          <h3 class="titulo-forms-add">Adicionar uma nova lista</h3>
          <div class="form-submit">
            <p class="subtitle-add">Lista</p>
            <input
              type="text"
              class="input-add"
              required
              v-model="list.name"
              placeholder="Digite o nome da sua lista..."
            />
            <button class="button-31" @click="createList">
              Adicionar Lista
            </button>
          </div>
        </div>


        <div class="ligar-tarefa-lista">
          <h3 class="titulo-forms">Vincule uma tarefa com uma lista</h3>
          <div class="link-dropdown">
            <div class="align-dropdown">
              <p class="subtitle-add">Selecione uma tarefa</p>
              <b-form-select
                class="input-add"
                v-model="TaskSelected"
                :options="allTasks"
              ></b-form-select>
            </div>
            <div class="align-dropdown">
              <p class="subtitle-add">Selecione uma lista</p>
              <b-form-select
                class="input-add"
                v-model="listForLink"
                :options="allLists"
              ></b-form-select>
            </div>
          </div>
          <button class="button-31" @click="linkTaskWithList">Vincular tarefa</button>
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
      tasks.filter((task) => {
        if(task.list == null) {
          this.allTasks.push({
            value: task.task,
            text: task.task
          })
        }
      })
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
    toRouterList() {
      this.$router.push({
        path: '/listagem-de-tarefas',
      })
    },
    createTask() {
      const taskReq = this.task;
      if (taskReq.task == null) {
        this.$swal("Digite sua tarefa!!");
      } else {
        try {
          api.post("task/create", taskReq).then((response) => {
            this.$swal(`tarefa '${response.data.task}' criada com sucesso!`);
          });
          window.location.reload();
        } catch (err) {
          this.$swal(err.message);
        }
      }
    },
    createList() {
      const listReq = this.list;
      if (listReq.name == null) {
        this.$swal("Digite o nome da lista!!");
      } else {
        try {
          api.post("list/create", listReq).then((response) => {
            this.$swal(`lista '${response.data.name}' criada com sucesso!`);
            window.location.reload();
          });
        } catch (err) {
          this.$swal(err.message);
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
        this.$swal("ambos os campos são necessarios!!");
      } else {
        try {
          api.put("add-task-in-list", linkRequest).then((response) => {
            console.log(response.data)
            this.$swal(
              `${this.TaskSelected} adicionado com sucesso em ${this.listForLink}`
            );
            window.location.reload();
          });
        } catch (err) {
          this.$swal(err.message);
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
  background-color: #31302f;
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
  justify-content: space-around;
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

.titulo-forms-add {
  margin-top: -15px;
}

.subtitle-add {
  font-weight: bold;
  background-color: hsl(312, 2%, 59%);
  color: #212529;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-top: 10px;
  width: 100%;
}

.input-add {
  width: 100%;
  height: 35px;
  border: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  text-align: center;
}
.add-tarefa {
  width: 80%;
  height: 25%;
  border-radius: 5px;
  background-color: #cac7bf;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-lista {
  width: 80%;
  height: 25%;
  border-radius: 5px;
  background-color: #cac7bf;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ligar-tarefa-lista {
  width: 80%;
  height: 30%;
  border-radius: 5px;
  background-color: #cac7bf;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}


.form-submit {
  width: 85%;
}

.form-submit .button-31 {
  margin-top: 10px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.link-dropdown {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.link-dropdown .subtitle-add {
  font-size: 13px;
}
.align-dropdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.ligar-tarefa-lista .titulo-forms{
  font-size: 25px;
}

.ligar-tarefa-lista .button-31 {
  width: 85%;
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
