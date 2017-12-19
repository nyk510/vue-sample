<template>
    <tr>
        <td>
        </td>
    </tr>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import * as Model from './Model'

@Component({
    props: {
        item: {}
    }
}) export default class TrItem extends Vue {
    item: Model.TodoItem
}
</script>
