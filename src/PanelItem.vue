<template>
    <div class="col-md-4">
        <edit-event :is-show="isShowEdit" @ok="update" header="編集モード" :default="item" @cancel="isShowEdit = false">
        </edit-event>
        <div class="panel panel-default">
            <div class="panel-body">
                <h3>
                    {{ item.title }}
                </h3>
                <div>
                    Assigned:
                    <span class="label label-default" v-for="(person, key) in item.assignedPersons" :key="key">
                        {{ person.name }}
                    </span>
                </div>
                <div>
                    <section>
                        <h4>内容</h4>
                        <p>
                            {{ item.contents }}
                        </p>
                    </section>
                    <section>
                        <h4>締め切り： {{ item.deadlineDate }}
                            <span class="label label-danger" v-if="isOver"> Overed </span>
                        </h4>
                    </section>
                </div>
            </div>
            <div class="panel-footer">
                <button class="btn btn-default" @click="isShowEdit = true">編集</button>
                <button class="btn btn-default" @click="isShowDelete = true">削除</button>
            </div>
        </div>
        <modal v-model="isShowDelete" @ok="onDelete" title="削除" cancel-text="キャンセル" ok-text="削除">
            以下のデータを削除します
            <ul>
                <li>Title: {{ item.title }}</li>
                <li>内容: {{ item.contents }}</li>
                <li>締め切り: {{ item.deadlineDate }}</li>
            </ul>
        </modal>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import EditEvent from './EditEvent.vue'
import { modal } from 'vue-strap'
import { TodoItem } from './Model'

@Component({
    components: {
        EditEvent, modal
    },
    props: {
        item: {}
    }
})
export default class PanelItem extends Vue {
    isShowEdit: boolean = false
    isShowDelete: boolean = false
    item: TodoItem
    nowDate = new Date()

    update(n: TodoItem) {
        this.isShowEdit = false
        this.$emit("update", this.item, n)
    }

    onDelete() {
        this.$emit("delete", this.item)
        this.isShowDelete = false
    }

    get isOver() {
        let d = new Date(this.item.deadlineDate)
        if (d.getTime() > this.nowDate.getTime()) {
            return false
        } else {
            return true
        }
    }
}
</script>

