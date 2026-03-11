import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { RiEditBoxFill } from "react-icons/ri";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [show, setShow] = useState(true);

    const [form, setForm] = useState({
        site: '',
        username: '',
        password: ''
    });

    const [passwordArray, setPasswordArray] = useState([]);
    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])


    const ShowPassword = () => {
        setShow(!show);
    };

    const SavePassword = () => {
        if (form.site === '' || form.username === '' || form.password === '') {
            toast.error('Please fill in all fields!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            return;
        }
        setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
        localStorage.setItem('passwords', JSON.stringify([...passwordArray, {...form, id: uuidv4()}]));
        setForm({
            site: '',
            username: '',
            password: ''
        });
        toast('Password saved successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    };

    const handleDelete = (id)=> {
        let c = confirm("Are you sure you want to delete this password?");
        if (c){
            setPasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem('passwords', JSON.stringify(passwordArray.filter(item => item.id !== id)));
        }
        toast('Password deleted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    };
    const handleEdit = (id)=> {
        setForm(passwordArray.filter(item => item.id === id)[0]);
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    };

    const handelChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCopy = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text);
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="sm:container text-center sm:mx-auto mx-0 w-full sm:w-1/2">
                <h1 className='font-bold text-2xl mt-5'> <span className='text-green-700'>&lt;</span>Pswd<span className='text-green-700'>Mgr/&gt;</span></h1>
                <p className='text-lg'>Your own Password Manager!</p>
                <div className="text-white flex flex-col items-center sm:mx-auto gap-4 mt-10">
                    <input value={form.site} onChange={handelChange} className='bg-gray-400 w-full rounded-full p-4 py-1 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="Enter website URL" name="site" />
                    <div className="flex flex-col sm:flex-row gap-5 w-full justify-center">
                        <input value={form.username} onChange={handelChange} className='bg-gray-400 w-full rounded-full p-4 py-1 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder="Enter username" name="username" />
                        <div className="relative w-full">
                            <input value={form.password} onChange={handelChange} type={show ? "password" : "text"} className="bg-gray-400 rounded-full w-full p-4 py-1 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter password" name="password" />
                            <span className="absolute rounded-full w-5 right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={ShowPassword}>
                                {show ? <img src="icons/eyecross.png" alt="eye" /> : <img src="icons/eye.png" alt="eye-slash" />}
                            </span>
                        </div>
                    </div>
                    <div onClick={SavePassword} className="button bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer">
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        <button>Save Password</button>
                    </div>
                </div>
                <div className="passwords mb-16">
                    <h2 className='font-bold text-2xl flex justify-start'>Your Passwords</h2>
                    {passwordArray.length === 0 ? <p className='text-gray-500 text-2xl font-bold p-10'>No passwords saved yet.</p> :
                        <table className="table-auto w-full mt-5">
                            <thead className='bg-green-600 text-white'>
                                <tr>
                                    <th className='py-2'>Website URL</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 text-center border border-white w-32'>
                                            <div className="flex gap-2 justify-center items-center">
                                                <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                                                <FaCopy className='cursor-pointer' onClick={() => { handleCopy(item.site) }} />                                  </div>
                                        </td>
                                        <td className='py-2 text-center border border-white w-32'> <div className="flex gap-2 justify-center items-center"> {item.username}<FaCopy className='cursor-pointer' onClick={() => { handleCopy(item.username) }} /> </div></td>
                                        <td typeof='password' className='py-2 text-center border border-white w-32'> <div className="flex gap-2 justify-center items-center"> {item.password}<FaCopy className='cursor-pointer' onClick={() => { handleCopy(item.password) }} /> </div> </td>

                                        <td className='py-2 text-center border border-white w-32'> <div className="flex gap-2 justify-center items-center"> <button className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded' onClick={() => { handleDelete(item.id) }}><MdDelete /></button>
                                        <button className='bg-gray-500 hover:bg-gray-800 text-white font-bold py-1 px-3 rounded' onClick={() => { handleEdit(item.id) }}><RiEditBoxFill /></button> </div> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                </div>
            </div>
        </div>
    )
}

export default Manager
