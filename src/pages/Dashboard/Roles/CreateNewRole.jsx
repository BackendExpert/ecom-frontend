import React from 'react'
import { FaUserShield } from "react-icons/fa6";
import DefaultButton from '../../../component/Buttons/DefaultButton';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../../services/api';
import useForm from '../../../hooks/useForm';
import DefaultInput from '../../../component/Form/DefaultInput';

const CreateNewRole = () => {
    const token = localStorage.getItem('token')

    const { values, handleChange } = useForm({
        role: '',
    });
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post(`/admin/create-newrole?nocache=${Date.now()}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            });
            if (res.data.success === true) {
                alert(res.data.message);
                navigate('/Dashboard/manage-roles');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="flex">
                <div className="p-2 rounded bg-violet-400">
                    <FaUserShield className='fill-white' />
                </div>
                <div className="">
                    <h1 className="font-bold text-xl ml-2">Create New Role</h1>
                </div>
            </div>
            <div className="">
                <Link to={'/Dashboard/manage-roles'}>
                    <DefaultButton
                        type='button'
                        label='Back'
                    />
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
                <form onSubmit={handleSubmit} method="post">
                    <DefaultInput 
                        label={"Enter Role Name"}
                        type='text'
                        value={values.role}
                        name={'role'}
                        onChange={handleChange}
                        required
                        placeholder={"Enter Role Name"}
                    />

                    <div className="-mt-4">
                        <DefaultButton 
                            type='submit'
                            label='Create New Role'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateNewRole