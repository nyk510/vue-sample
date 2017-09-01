import ItemList from './ItemList.vue'
import Vue from "vue"
import VueI18n from 'vue-i18n'
import { TodoItem, TodoObject, Manager } from './Model'
require('bootstrap/dist/css/bootstrap.min.css')

Vue.use(VueI18n)

let persons = Manager.persons

let todoList = []
let v: TodoObject = {
    isCompleted: true,
    title: "将棋",
    contents: "詰将棋の本を10ページ読む",
    assignedPersons: [persons[0]],
    responsiblePerson: persons[4],
    deadlineDate: "2017/11/22"
}
todoList.push(new TodoItem(v))

let v2: TodoObject = {
    isCompleted: false,
    title: "買い出し",
    contents: "ひときれのパン ナイフ ランプ,",
    assignedPersons: [persons[0]],
    responsiblePerson: persons[3],
    deadlineDate: "2017/3/2"
}
todoList.push(new TodoItem(v2))

const i18n = new VueI18n({
    locale: "ja",
    messages: {
        en: {}
    }
})

let main = new ItemList({
    i18n,
    el: "#main",
    data: {
        todoItems: todoList
    }
})

console.log(main)