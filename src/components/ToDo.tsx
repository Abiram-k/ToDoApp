class Todo {
  id: number;
  task: string;
  completed: boolean;
  isUrgent: boolean;

  constructor(task: string, isUrgent: boolean) {
    this.id = new Date().getTime();
    this.task = task;
    this.completed = false;
    this.isUrgent = isUrgent;
  }
}

interface ITodoManager {
  todos: Todo[];
  loadFromLocalStorage(): Todo[];
  saveToLocalStorage(): void;
  addTask(task: string, isUrgent: boolean): void;
  removeTask(id: number): void;
  toggleCompletion(id: number): void;
  searchTasks(search: string): Todo[];
  editTask(id: number, task: string): void;
}

export class ToDoApp implements ITodoManager {
  todos: Todo[];

  constructor() {
    this.todos = this.loadFromLocalStorage();
  }

  loadFromLocalStorage(): Todo[] {
    let todos = localStorage.getItem("tasks");
    return todos ? JSON.parse(todos) : [];
  }

  saveToLocalStorage(): void {
    localStorage.setItem("tasks", JSON.stringify(this.todos));
  }

  addTask(task: string, isUrgent: boolean): void {
    const todo = new Todo(task, isUrgent);
    if (isUrgent) this.todos.unshift(todo);
    else this.todos.push(todo);
    this.saveToLocalStorage();
  }

  removeTask(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveToLocalStorage();
  }

  toggleCompletion(id: number): void {
    let todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
    }
  }

  searchTasks(search: string): Todo[] {
    return this.todos.filter((todo) =>
      todo.task.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  editTask(id: number, task: string): void {
    let todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.task = task;
      this.saveToLocalStorage();
    }
  }
}
