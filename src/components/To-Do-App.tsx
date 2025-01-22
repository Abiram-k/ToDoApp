import { Plus, Check, X, Trash2, Filter, Search } from 'lucide-react';

const TodoApp = () => {

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="ml-2 outline-none bg-transparent"
              />
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Filter className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Add Task Input */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
              <input
                type="text"
                placeholder="Add a new task..."
                className="flex-1 outline-none text-lg"
              />
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Plus className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {/* Completed Task */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 opacity-60 hover:opacity-100 transition-opacity">
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="flex-1 text-lg line-through">Complete project documentation</span>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Trash2 className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Task */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 transform hover:-translate-y-1 transition-all">
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors" />
                <span className="flex-1 text-lg">Design new landing page</span>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Urgent Task */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-red-500">
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-full border-2 border-gray-300 hover:border-gray-400 transition-colors" />
                <span className="flex-1 text-lg">Review client feedback</span>
                <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-full">Urgent</span>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 border-dashed">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-gray-100 rounded-full">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No tasks yet</h3>
            <p className="text-gray-500">Add a new task to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;

