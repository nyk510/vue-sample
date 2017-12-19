<i18n>
{
    "en": {
        "hello": "hello world",
        "Add New Item": "Add New Item",
        "options": "Options",
        "Only Future": "Only Future",
        "Sorted by Date": "Sorted by Date",
        "title": "Title",
        "contents": "Contents",
        "deadline": "Deadline",
        "assigned": "Assigned",
        "finished?": "Finished?",
        "yes": "yes",
        "no": "no"
    },
    "ja": {
        "hello": "こんにちは、世界!",
        "Add New Item": "新規作成",
        "Only Future": "未来のタスクのみ",
        "Sorted by Date": "日付けでソート",
        "options": "表示オプション",
        "title": "タイトル",
        "contents": "内容",
        "deadline": "締め切り",
        "assigned": "割当",
        "finished?": "おわった?",
        "yes": "はい",
        "no": "いいえ"
    }
}
</i18n>

<template>
	<div class="row">
		<h3>ToDo List</h3>
		<edit-event :is-show="isShowAdd" @ok="onAdd" header="新規作成" @cancel="isShowAdd = false">
		</edit-event>
		<button class="btn btn-default" @click="isShowAdd = true">{{ $t('Add New Item') }}</button>
		<div>
			<h4>{{ $t('options') }}</h4>
			<div class="form-group">
				<div class="checkbox">
					<label for="only-future">
						<input type="checkbox" v-model="showOnlyAfterNow" id="only-future">{{ $t('Only Future' )}}
					</label>
				</div>
				<div class="checkbox">
					<label for="sort-day">
						<input type="checkbox" v-model="sortDate" id="sort-day">{{ $t('Sorted by Date')}}
					</label>
				</div>
			</div>
		</div>
		<transition-group tag="div" class="row" name="fade">
			<panel-item v-for="item in items" :key="item.id" :item="item" @update="onUpdate" @delete="onDelete">
			</panel-item>
		</transition-group>
		<div>
			<table class="table table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>{{ $t("title") }}</th>
						<th>{{ $t("contents") }}</th>
						<th>{{ $t("deadline") }}</th>
						<th>{{ $t("assigned") }}</th>
						<th>{{ $t("finished?") }}</th>
					</tr>
				</thead>
				<transition-group tag="tbody" name="fade">
					<tr v-for="(item, key) in items" :key="item.id">
						<td>{{ key + 1 }}</td>
						<td>{{ item.title }}</td>
						<td>{{ item.contents }}</td>
						<td>{{ item.deadlineDate }}</td>
						<td>{{ item.assignedPersons.map(function(v) { return v.name}).join(" ")}}</td>
						<td>{{ $t(boolToString(item.isCompleted)) }}</td>
					</tr>
				</transition-group>
			</table>
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

	boolToString(v: boolean) {
		if (v) {
			return "yes"
		} else {
			return "no"
		}
	}

	showOnlyAfterNow: boolean = false
	sortDate: boolean = false

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
		let idx = this.todoItems.indexOf(oldItem)
		if (idx > -1) {
			TodoItem.copy(newItem, oldItem)
		} else {
			console.warn("昔のデータが見つからない！")
		}
	}

	get items() {
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

<style>
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}

.fade-move {
  transition: transform 1s;
}

.fade-leave-active {
  position: absolute;
}
</style>
