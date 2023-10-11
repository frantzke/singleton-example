
class Singleton {

    constructor() {
        this.globalTodos = [];
        this.value = Math.random();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton();
        }
        return this.instance;
    }

    getTodos() {
        return [...this.globalTodos];
    }

    pushTodo(todo) {
        this.globalTodos.push(todo);
        return [...this.globalTodos];
    }

    setTodos(todos) {
        this.globalTodos = [...todos];
    }

    getValue() {
        return this.value;
    }

}

module.exports = Singleton; 