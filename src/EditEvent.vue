<template>
    <modal :value="isShow" @cancel="onCancel" effect="fade/zoom">
        <h4 slot="modal-header" class="modal-header">
            {{ header }}
        </h4>
        <div class="form-group">
            <label>
                タイトル
            </label>
            <input type="text" class="form-control" v-model="inputed.title" placeholder="タイトル" @input="onInput">
        </div>
        <div class="form-group">
            <label>
                内容
            </label>
            <textarea class="form-control" placeholder="明日までに詰将棋やること" rows="3" v-model="inputed.contents" @input="onInput"></textarea>
        </div>
        <div class="checkbox">
            <label>
                <input type="checkbox">Done
            </label>
        </div>
        <div class="form-group">
            <label>責任者</label>
            <select class="form-control" v-model="inputed.responsiblePerson" @input="onInput">
                <option v-for="(item, key) in personList" :key="key"> {{ item.name }}</option>
            </select>
        </div>
        <div class="form-group">
            <label>アサイン</label>
            <multiselect :options=personList label="name" :multiple="true" v-model="inputed.assignedPersons" @input="onInput">
            </multiselect>
        </div>
        <datepicker v-model="inputed.deadlineDate" @input="onInput"></datepicker>
        <div slot="modal-footer" class="modal-footer">
            {{ inputed }} {{ inputed.isValid() }} {{ title }}
            <button class="btn btn-default" @click="onSave" :class="saveButtonClass" :disabled="!isValid">保存</button>
        </div>
    </modal>
</template>

<script lang="ts">
require('vue-multiselect/dist/vue-multiselect.min.css')
import Vue from "vue"
import Component from "vue-class-component"
const multiselect = require('vue-multiselect').Multiselect
import { modal, datepicker } from 'vue-strap'
import { TodoItem, OneItem, Manager } from './Model'

@Component({
    components: { modal, datepicker, multiselect },
    props: {
        // 入力画面の初期値となるオブジェクト
        default: {
            default: null
        },
        isShow: {
            type: Boolean,
            default: false
        },
        header: {
            type: String
        }
    }
})
export default class EditEvent extends Vue {
    default: TodoItem
    isShow: boolean
    isValid: boolean = false
    inputed: TodoItem
    title: string
    personList = Manager.persons

    debug(e: any){
        console.log(e)
    }

    onInput() {
        this.isValid = this.inputed.isValid()
        console.log(this.isValid)
    }

    get saveButtonClass() {
        return {
            "btn": true,
            "btn-default": true,
            "btn-primary": this.isValid
        }
    }

    created() {
        this.onReset()
    }

    onReset() {
        this.inputed = new TodoItem()
        let from = this.default
        if (this.default == null) {
            from = new TodoItem()
        }
        TodoItem.copy(from, this.inputed)
        console.log(this.inputed)
    }

    onSave() {
        console.log(this.inputed)
        let pushItem = new TodoItem()
        TodoItem.copy(this.inputed, pushItem)
        this.$emit("ok", pushItem)

        if (this.default == null) {
            console.log("リセットするよー")
            this.onReset()
        }
    }

    onCancel() {
        this.$emit("cancel")
    }
}
</script>
