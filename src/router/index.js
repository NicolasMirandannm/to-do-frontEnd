import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeToDo from '../views/HomeToDo.vue'
import ListAllTasks from '../views/ListAllTasks.vue'
import ListTasksForList from '../views/ListTasksForList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeToDo
  },
  {
    path: '/listagem-de-tarefas',
    name: 'allTasks',
    component: ListAllTasks
  },
  {
    path: '/lista',
    name: 'ListofTasks',
    component: ListTasksForList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
