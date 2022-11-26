<template>
    <div class="todo" v-for="todo in todos" v-bind:key="todo._id">
        <div ><strong>Todo:</strong> {{ todo.name }}</div>
        <div ><strong>Completed:</strong><input type="checkbox"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
           todos: [
            {
                "_id": 1, name: "Создать аутентификацию", done: false
            },
            {
                "_id": 2, name: "Добавить crud", done: false
            },
            {
                "_id": 3, name: "Сделать logout", done: false
            }
           ]
        }
    },
    methods: {
       
    }
}
</script>

<style>
* {
    margin: 10;
    padding: 0;
    box-sizing: border-box;
}

.todo {
    padding: 15px;
    border: 1px solid blueviolet;
    margin-top: 5px;
}
</style>