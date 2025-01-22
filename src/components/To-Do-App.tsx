import {
  Plus,
  Check,
  X,
  Trash2,
  Filter,
  Search,
  Edit,
  Pencil,
} from "lucide-react";
import { ToDoApp } from "./ToDo";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface tasksType {
  id: number;
  task: string;
  completed: boolean;
  isUrgent: boolean;
}
const TodoApp = () => {
  const [tasks, setTasks] = useState<tasksType[]>([]);
  const [task, setTask] = useState<string>("");
  const inpurRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState<string>("");
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState("");
  const [isEditing, setIsEditing] = useState("");

  useEffect(() => {
    setIsEditing(editedTask);
  }, [editedTask]);

  const taskInstance = new ToDoApp();

  useEffect(() => {
    setTasks(taskInstance.searchTasks(search));
  }, [taskInstance.todos, search]);

  const handleAddTask = () => {
    if (task === "") {
      toast.error("Add a task to get started");
      return;
    }
    taskInstance.addTask(task, isUrgent);
    setTask("");
    toast.success("Task added successfully");
  };
  const handleTaskComplete = (id: number) => {
    taskInstance.toggleCompletion(id);
    toast.success("Task completed successfully");
  };
  const handleDeleteTask = (id: number) => {
    taskInstance.removeTask(id);
    toast.success("Task removed successfully");
  };

  const handleEditTask = (task: string) => {
    // setIsEditing(!isEditing);
    setEditedTask(task);
  };

  const handleSaveEdit = (id: number) => {
    taskInstance.editTask(id, isEditing);
    setEditedTask("");
    toast.success("Task edited successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="ml-2 outline-none bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-300">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
              <input
                type="text"
                placeholder="Add a new task..."
                className="flex-1 outline-none text-lg font-mono "
                ref={inpurRef}
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  className="h-5 w-5 border-none rounded focus:ring-2 "
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                />
                <span className="text-sm font-medium">Mark as Urgent</span>
              </label>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={handleAddTask}
              >
                <Plus className="h-8 w-8 text-gray-500 hover:text-green-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.length > 0 ? (
            tasks.map((todo) => (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 transform hover:-translate-y-1 transition-all">
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    {todo.completed ? (
                      <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    ) : editedTask == todo.task ? (
                      <Pencil className="h-5 w-5 hover:text-orange-600 text-orange-500" />
                    ) : (
                      <button
                        className="h-6 w-6 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors"
                        onClick={() => handleTaskComplete(todo.id)}
                      ></button>
                    )}
                    {todo.task == editedTask ? (
                      <input
                        type="text"
                        value={isEditing}
                        onChange={(e) => setIsEditing(e.target.value)}
                        className="flex-1 text-lg font-mono border border-gray-300 rounded p-2"
                      />
                    ) : todo.completed ? (
                      <span className="flex-1 text-lg line-through font-mono">
                        {todo.task}
                      </span>
                    ) : (
                      <span className="flex-1 text-lg font-mono">
                        {todo.task}
                      </span>
                    )}

                    {todo.isUrgent && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">
                        Urgent
                      </span>
                    )}

                    {todo.task == editedTask ? (
                      <button
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => handleSaveEdit(todo.id)}
                      >
                        <Check className="h-4 w-4 text-green-500" />
                      </button>
                    ) : (
                      !todo.completed && (
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          onClick={() => handleEditTask(todo.task)}
                        >
                          <Edit className="h-4 w-4 text-gray-400 hover:text-green-600" />
                        </button>
                      )
                    )}
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => handleDeleteTask(todo.id)}
                    >
                      {todo.completed ? (
                        <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400 hover:text-red-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
              <div className="flex flex-col items-center space-y-2">
                <div
                  className="p-3 bg-gray-100 rounded-full hover:scale-110 hover:shadow-md duration-200 cursor-pointer"
                  onClick={() => inpurRef.current?.focus()}
                >
                  <Plus className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  No tasks yet
                </h3>
                <p className="text-gray-500">Add a new task to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
