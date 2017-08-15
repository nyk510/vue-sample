<template>
    <div class="row">
        <edit-event :is-show="isShowAdd" @ok="onAdd" header="新規作成" @cancel="isShowAdd = false">
        </edit-event>
        <button class="btn btn-default" @click="isShowAdd = true">新規作成</button>
        <div class="row">
            <div>
                <h4>表示オプション</h4>
            </div>
            <div class="form-group">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" v-model="showOnlyAfterNow"> 未来のタスクのみ
                    </label>
                </div>
                <div class="checkbox">
                    <label for="sort-day">
                        <input type="checkbox" v-model="sortDate"> 日付けでソート
                    </label>
                </div>
            </div>
        </div>
        <div class="row">
            <panel-item v-for="(item, key) in Items" :key="key" :item="item" @update="onUpdate" @delete="onDelete">
            </panel-item>
        </div>
    </div>
</template>

<script lang="ts">
require('bootstrap/dist/css/bootstrap.min.css')
import Vue from "vue"
import Component from "vue-class-component"
import { TodoItem } from './Model'
import EditEvent from './EditEvent.vue'
import PanelItem from './PanelItem.vue'

@Component({
    components: {
        EditEvent, PanelItem
    }
})
export default class ItemList extends Vue {
    title = ""
    contents = ""
    todoItems: Array<TodoItem> = []
    isShowAdd: boolean = false

    showOnlyAfterNow: boolean = true
    sortDate: boolean = true

    onEdit(key: number) {
        console.log("編集ボタンがおされた", key)
    }

    onAdd(v: TodoItem) {
        this.todoItems.push(v)
        console.log(this.todoItems)
        this.isShowAdd = false
    }

    onDelete(v: TodoItem) {
        let idx = this.todoItems.indexOf(v)
        if (idx > -1) {
            this.todoItems.splice(idx, 1)
        }
    }

    onUpdate(oldItem: TodoItem, newItem: TodoItem) {
        this.onDelete(oldItem)
        this.onAdd(newItem)
    }

    get Items() {
        let items = this.todoItems
        if (this.showOnlyAfterNow) {
            items = this.getAfterNow(items)
        }
        if (this.sortDate) {
            items = this.sortByDate(items)
        }
        return items
    }

    getAfterNow(arr: Array<TodoItem>) {
        let retval = []
        let dateNow = new Date()
        for (let i of arr) {
            let date_i = new Date(i.deadlineDate)
            if (dateNow.getTime() <= date_i.getTime()) {
                retval.push(i)
            }
        }
        return retval
    }

    sortByDate(arr: Array<TodoItem>) {
        return arr.concat().sort((a, b) => {
            let dateA = new Date(a.deadlineDate).getTime()
            let dateB = new Date(b.deadlineDate).getTime()

            if (dateA > dateB) {
                return 1
            }
            if (dateA < dateB) {
                return -1
            }
            return 0
        })
    }
}
</script>
