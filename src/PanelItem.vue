<template>
    <div class="col-md-4">
        <edit-event :is-show="isShowEdit" @ok="update" header="編集モード" :default="item" @cancel="isShowEdit = false">
        </edit-event>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3>
                    {{ item.title }}
                </h3>
                <div>
                    <span class="label label-default" v-for="(person, key) in item.assignedPersons" :key="key">
                        {{ person.name }}
                    </span>
                </div>
            </div>
            <div class="panel-body">
                <div>
                    <p>
                        {{ item.contents }}
                    </p>
                    <p>
                        責任者: {{ item.responsiblePerson.name }}
                    </p>
                    <section>
                        <h4>締め切り</h4>
                        <p> {{ item.deadlineDate }} </p>
                    </section>
                </div>
            </div>
            <div class="panel-footer">
                <button class="btn btn-default" @click="isShowEdit = true">編集</button>
                <button class="btn btn-default" @click="onDelete">削除</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import EditEvent from './EditEvent.vue'
import { TodoItem } from './Model'

@Component({
    components: {
        EditEvent
    },
    props: {
        item: {

        }
    }
})
export default class PanelItem extends Vue {
    isShowEdit: boolean = false
    item: TodoItem
    nowDate = new Date()

    update(n: TodoItem) {
        this.isShowEdit = false
        this.$emit("update", this.item, n)
    }

    onDelete() {
        this.$emit("delete", this.item)
    }
}
</script>

