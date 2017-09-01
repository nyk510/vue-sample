<template>
    <div class="col-md-4">
        <edit-event :is-show="isShowEdit" @ok="update" header="編集モード" :default="item" @cancel="isShowEdit = false">
        </edit-event>
        <div class="panel panel-default">
            <div class="panel-body">
                <h3>
                    {{ item.title }}
                    <span class="label label-primary" v-if="item.isCompleted">済</span>
                </h3>
                <div>
                    <p>
                    Assigned:
                    <span class="label label-default" v-for="(person, key) in item.assignedPersons" :key="key">
                        {{ person.name }}
                    </span>
                    </p>
                </div>
                <div>
                    <section>
                        <p>
                            {{ item.contents }}
                        </p>
                        <p>{{ $t("deadline") }} : {{ item.deadlineDate }}
                            <span class="label label-danger" v-if="isOver">期限過</span>
                        </p>
                    </section>
                </div>
            </div>
            <div class="panel-footer">
                <div class="btn-group">
                    <button class="btn btn-default" @click="isShowEdit = true">{{ $t("edit") }}</button>
                    <button class="btn btn-default" @click="isShowDelete = true">{{ $t("delete") }}</button>
                </div>
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
<i18n>
{
    "en": {
        "edit": "Edit",
        "delete": "Delete"
    },
    "ja": {
        "edit": "編集",
        "delete": "削除"
    }
}
</i18n>
<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import EditEvent from './EditEvent.vue'
import { modal } from 'vue-strap'
import { TodoItem } from './Model'

Vue.filter("toMarkdown", function(s: string) {
    return marked(s)
})

@Component({
    components: {
        EditEvent, modal
    },
    props: {
        item: {}
    }
})
export default class PanelItem extends Vue {
    i18n: {
        messages: {
            en: { message: "Edit" },
            ja: { message: "編集" }
        }
    }
    isShowEdit: boolean = false
    isShowDelete: boolean = false
    item: TodoItem
    nowDate = new Date()

    update(n: TodoItem) {
        this.isShowEdit = false
        this.$emit("update", this.item, n)
    }

    onDelete() {
        this.isShowDelete = false
        this.$emit("delete", this.item)
    }

    get isOver() {
        if (this.item.isCompleted) {
            return false
        }

        let d = new Date(this.item.deadlineDate)
        let isOverDate = d.getTime() < this.nowDate.getTime()
        console.log(isOverDate, "isoverdate")

        if (isOverDate) {
            return true
        }
        return false
    }
}
</script>

