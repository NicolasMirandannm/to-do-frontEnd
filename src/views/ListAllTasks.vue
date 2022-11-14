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
            </div>
            <div class="container-das-tarefas">
                <div class="barra-de-pesquisa">BARRA DE PESQUISA</div>
                <div class="listas-tarefas">
                    <b-list-group-item class="lista-titulo">
                        <p>TAREFA</p>
                        <p>STATUS</p>
                        <p>LISTA</p>
                        <p>AÇÕES</p>
                    </b-list-group-item>
                    <b-list-group class="list-group" v-for="task in allTasks" :key="task.id">
                        <b-list-group-item class="items">
                            <div class="input-task">
                                <input type="text" v-model="task.task">
                                <button>Editar</button>
                            </div>
                            <div class="task-status">
                                <p>{{task.doneStatus}}</p>
                                <button>Concluir task</button>
                            </div>
                            <div class="lista-name">
                                <p v-if="task.list != null">{{task.list.name}}</p>
                            </div>
                            <div class="acoes">
                                <button>deletar</button>
                                <button>remover da lista</button>
                            </div>
                        </b-list-group-item>
                    </b-list-group>
                </div>
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
            allTasks: [ {
                id: null,
                list: {
                    name: null
                },
                doneStatus: null,
                task: null
            }]
        }
    },
    mounted() {
        try {
            api.get('task/findAll').then((response) => {
                this.allTasks = response.data;
                console.log(this.tasks)
                console.log(response.data)
            })       
        } catch(err) {
            alert(err.message)
        }
    }
}
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
    background-color: #adb5bd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.titulo {
  height: 30%;
  width: 80%;
  background-color: #495057;
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
    background-color: #ced4da;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    margin-bottom: 10%;
    color: #495057;
    font-weight: bold;
    font-size: 20px;
}

.container-das-tarefas {
    background-color: #f8f9fa;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.barra-de-pesquisa {
    height: 15%;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.listas-tarefas {
    background-color: #ced4da;
    width: 90%;
    height: 80%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    color: #495057;
}

.list-group{
    width: 95%;
}

.items {
    width: 100%;
    display: flex;    
}
</style>