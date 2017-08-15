import ItemList from './ItemList.vue'
import Vue from "vue"
import { TodoItem, TodoObject, Manager } from './Model'
let persons = Manager.persons

let todoList = []
let v: TodoObject = {
    title: "将棋",
    contents: "詰将棋の本を10ページ読む",
    assignedPersons: [],
    responsiblePerson: persons[0],
    deadlineDate: "2017/11/22"
}
todoList.push(new TodoItem(v))

let main = new ItemList({
    el: "#main",
    data: {
        todoItems: todoList
    }
})