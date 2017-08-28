import ItemList from './ItemList.vue'
import Vue from "vue"
import { TodoItem, TodoObject, Manager } from './Model'
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
    title: "野球観戦",
    contents: "野球のルールを把握する",
    assignedPersons: [persons[0]],
    responsiblePerson: persons[3],
    deadlineDate: "2017/3/2"
}
todoList.push(new TodoItem(v2))

let main = new ItemList({
    el: "#main",
    data: {
        todoItems: todoList
    }
})