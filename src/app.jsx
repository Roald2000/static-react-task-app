
import React, { useRef, useState } from 'react';
import ToggleTheme from './components/ToggleTheme';

import { AiOutlinePlus, AiOutlineDelete, AiOutlineEdit, AiFillPlusCircle } from 'react-icons/ai';
import { AppModal, modalController } from './components/AppModals';
import { createPortal } from 'react-dom';
import { Container, document } from 'postcss';


function Input({ htmlFor = "", inputType = "text", label = "Input", className, children }) {

    return <label htmlFor={htmlFor} className={className + " relative"}>
        {!children ? <>
            <input required className='peer p-2 rounded w-full' type={inputType} name="" id="" />
            <span className='absolute left-3 top-1/2 -translate-y-1/2  peer-valid:-top-[105%] peer-focus:-top-[105%] peer-valid:text-xs peer-focus:text-xs duration-300'>{label}</span>
        </> : children}

    </label>
}

function Header() {
    return <header className="shadow-md p-4">
        <ul className=" navbar justify-between items-center gap-3">
            <li>
                <h1 className='text-3xl font-semibold'>Tasks</h1>
            </li>
            <li>
                <ToggleTheme />
            </li>
        </ul>
    </header>
}


function Main() {

    const task = useRef(null);
    const description = useRef(null);
    const status = useRef(null);
    const task_update = useRef(null);
    const description_update = useRef(null);
    const status_update = useRef(null);

    let [taskList, setTask] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTask([...taskList, {
            task: task.current.value,
            description: description.current.value,
            status: status.current.value,
        }])
        console.log(taskList);
        modalController('addTaskModal', 'close');
        setTimeout(() => {
            emptyInputsAdd();
        }, 1000);
    }

    const deleteTask = (index) => {
        const newTaskList = [...taskList];
        newTaskList.splice(index, 1);
        setTask(newTaskList);
    };


    const updateTask = (index) => {
        const newTaskList = [...taskList, {
            task: task_update.current.value,
            description: description_update.current.value,
            status: status_update.current.value,
        }];
        newTaskList.splice(index, 1);
        setTask(newTaskList);
    }

    const [updateId, setUpdateId] = useState(null);

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        updateTask(updateId);
        setTimeout(() => {
            emptyInputsUpdate()
        }, 1000);
    }

    function emptyInputsAdd() {
        task.current.value = ""
        description.current.value = ""
    }

    function emptyInputsUpdate() {
        task_update.current.value = ""
        description_update.current.value = ""
    }

    return <main>
        <AppModal className='w-[468px]' id={'addTaskModal'} title='Add Task'>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-2'>
                <label htmlFor="" className=' input-group-vertical gap-2'>
                    <span className='label indent-4 bg-base-300'>Task</span>
                    <input required ref={task} placeholder='ex. Do something' className='w-full input input-bordered' type="text" name="" id="task" />
                </label>
                <label htmlFor="" className=' input-group-vertical gap-2'>
                    <span className='label indent-4 bg-base-300'>Task Description</span>
                    <input required ref={description} placeholder='ex. Finish It' className='w-full input input-bordered' type="text" name="" id="description" />
                </label>

                <select required ref={status} className=' select select-bordered' name="" id="status">
                    <option className=' select-text' value="Ongoing">Choose Status</option>
                    <option className=' select-text' value="Ongoing">Status (Ongoing)</option>
                    <option className=' select-text' value="Done">Status (Done)</option>
                </select>

                <button type='submit' className='mt-3 btn btn-primary'>Add</button>
            </form>
        </AppModal>
        <AppModal className='w-[468px]' id={'updateTask'} title={`Update Task`}>
            <p className='p-3'>Now updating <strong className=' underline'>{taskList && taskList[updateId]?.task}</strong></p>
            <form onSubmit={handleUpdateSubmit} className='grid grid-cols-1 gap-2'>
                <label htmlFor="" className=' input-group-vertical gap-2'>
                    <span className='label indent-4 bg-base-300'>Task</span>
                    <input required ref={task_update} placeholder='ex. Do something' className='w-full input input-bordered' type="text" name="" id="task" />
                </label>
                <label htmlFor="" className=' input-group-vertical gap-2'>
                    <span className='label indent-4 bg-base-300'>Task Description</span>
                    <input required ref={description_update} placeholder='ex. Finish It' className='w-full input input-bordered' type="text" name="" id="description" />
                </label>

                <select required ref={status_update} className=' select select-bordered' name="" id="status">
                    <option className=' select-text' value="Ongoing">Choose Status</option>
                    <option className=' select-text' value="Ongoing">Status (Ongoing)</option>
                    <option className=' select-text' value="Done">Status (Done)</option>
                </select>

                <button type='submit' className='mt-3 btn btn-primary'>Update</button>
            </form>
        </AppModal>
        <section className='max-w-xl mx-auto p-3'>
            <div>
                <button onClick={() => {
                    setTimeout(() => {
                        modalController('addTaskModal', 'open')
                    }, 100);
                }} type=' button' className='btn btn-primary'>Add Task <AiFillPlusCircle size={24} /></button>
            </div>
            <div className='divider'></div>
            <div className={`h-[368px] max-h-96 ${taskList && taskList.length > 4 && 'overflow-y-scroll'} pr-3`}>
                <table className=' table'>
                    <thead className=' table-header-group'>
                        <tr className=''>
                            <th className=' table-cell'>Task</th>
                            <th className=' table-cell'>Description</th>
                            <th className=' table-cell'>Status</th>
                            <th className=' table-cell'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className=' table-row-group'>
                        {taskList.length !== 0 ? taskList.map((item, key) => {
                            return <tr className=' table-row' key={key}>
                                <td className=' table-cell'>{item.task}</td>
                                <td className=' table-cell'>{item.description}</td>
                                <td className=' table-cell'>{item.status}</td>
                                <td className=' flex flex-row gap-3 flex-wrap'>
                                    <button onClick={() => deleteTask(key)} className=' ' type='button'>
                                        <AiOutlineDelete size={18} />
                                    </button>
                                    <button onClick={() => {
                                        setUpdateId(key);
                                        modalController('updateTask', 'open');
                                    }} className=' ' type='button'>
                                        <AiOutlineEdit size={18} />
                                    </button>
                                </td>
                            </tr>
                        }) :
                            <tr><td className='p-2 bg-error text-white' colSpan={4}>
                                You dont have any task added, {" "}
                                <button type='button' className='link link-primary' onClick={() => {
                                    setTimeout(() => {
                                        modalController('addTaskModal', 'open')
                                    }, 100);
                                }}>Add Task</button>
                            </td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </section>
    </main>
}


export default function App() {
    return <>
        <Header />
        <Main />
    </>
} 