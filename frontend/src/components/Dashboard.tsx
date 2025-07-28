import React, { useState, useEffect, FormEvent } from 'react'; 
import axios, { AxiosError } from 'axios'; 
import { useNavigate } from 'react-router-dom';

// Define an interface for your Task object
interface ITask {
    _id: string;
    userId: string;
    title: string;
    description?: string; // Optional
    completed: boolean;
    createdAt: string; // Date string
}

const Dashboard = () => {
    // Explicitly type useState hooks
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [newTaskDescription, setNewTaskDescription] = useState<string>('');
    const [editingTask, setEditingTask] = useState<ITask | null>(null); // Can be a Task or null
    const navigate = useNavigate();

    // Get the base backend URL from environment variable
    const API_URL = process.env.REACT_APP_BASE_BACKEND_URL || 'http://localhost:5000'; // Fallback for local dev

    // Function to fetch tasks
    const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if no token
            return;
        }
        try {
            const res = await axios.get<ITask[]>(`${API_URL}/api/tasks`, { // Expect an array of ITask
                headers: {
                    'x-auth-token': token
                }
            });
            setTasks(res.data);
        } catch (err: unknown) { // Explicitly type err as unknown
            console.error('Error fetching tasks:', err);
            // Type guard to check if err is an AxiosError
            if (axios.isAxiosError(err) && err.response && (err.response.status === 401 || err.response.status === 403)) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    };

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, [navigate]); // Add navigate to dependency array as it's used in useEffect

    // Function to handle adding a new task
    const handleAddTask = async (e: FormEvent) => { // Type 'e' as FormEvent
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await axios.post<ITask>(`${API_URL}/api/tasks`, // Expect a single ITask
                { title: newTaskTitle, description: newTaskDescription },
                { headers: { 'x-auth-token': token } }
            );
            setTasks([...tasks, res.data]); // Add new task to state
            setNewTaskTitle(''); // Clear input fields
            setNewTaskDescription('');
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    // Function to handle updating a task
    const handleUpdateTask = async (taskId: string, updatedFields: Partial<ITask>) => { // Type parameters
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await axios.put<ITask>(`${API_URL}/api/tasks/${taskId}`, // Expect a single ITask
                updatedFields,
                { headers: { 'x-auth-token': token } }
            );
            setTasks(tasks.map(task => (task._id === taskId ? res.data : task))); // Update task in state
            setEditingTask(null); // Exit editing mode
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    // Function to handle deleting a task
    const handleDeleteTask = async (taskId: string) => { // Type parameter
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            setTasks(tasks.filter(task => task._id !== taskId)); // Remove task from state
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
                >
                    Logout
                </button>
            </div>

            {/* Add New Task Form */}
            <form onSubmit={handleAddTask} className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Task</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Task title"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description (Optional):</label>
                    <textarea
                        id="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        placeholder="Task description"
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 w-full"
                >
                    Add Task
                </button>
            </form>

            {/* Task List */}
            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No tasks yet. Add one above!</p>
                ) : (
                    tasks.map((task: ITask) => ( // Explicitly type 'task' in map callback
                        <div key={task._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center">
                            {editingTask && editingTask._id === task._id ? (
                                <> {/* Use React Fragment for multiple top-level elements */}
                                {/* Edit Form */}
                                <div className="w-full">
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                                        value={editingTask.title}
                                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                    />
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20 mb-2"
                                        value={editingTask.description || ''} // Handle potential undefined description
                                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                    ></textarea>
                                    <label className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                            checked={editingTask.completed}
                                            onChange={(e) => setEditingTask({ ...editingTask, completed: e.target.checked })}
                                        />
                                        <span className="ml-2 text-gray-700">Completed</span>
                                    </label>
                                    <div className="flex justify-end space-x-2">
                                        <button 
                                            onClick={() => handleUpdateTask(editingTask._id, { title: editingTask.title, description: editingTask.description, completed: editingTask.completed })} 
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
                                        >
                                            Save
                                        </button>
                                        <button 
                                            onClick={() => setEditingTask(null)} 
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                                </>
                            ) : (
                                <> {/* Use React Fragment for multiple top-level elements */}
                                {/* Display Task */}
                                <div className="w-full md:w-3/4 mb-4 md:mb-0">
                                    <h3 className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                        {task.title}
                                    </h3>
                                    {task.description && (
                                        <p className="text-gray-600 mt-1">{task.description}</p>
                                    )}
                                    <p className="text-sm text-gray-400 mt-2">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                                </div>
                                </>
                            )}
                            
                            {/* Task Actions */}
                            {!editingTask || editingTask._id !== task._id ? (
                                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-1/4 justify-end">
                                    <button 
                                        onClick={() => handleUpdateTask(task._id, { completed: !task.completed })} 
                                        className={`py-2 px-4 rounded-md shadow-md transition duration-300 ${task.completed ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold`}
                                    >
                                        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                                    </button>
                                    <button 
                                        onClick={() => setEditingTask({ ...task })} 
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteTask(task._id)} 
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;