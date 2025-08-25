import React, { useEffect, useState } from 'react'
import { FaUserShield } from 'react-icons/fa6'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../../services/api'
import useForm from '../../../hooks/useForm'
import DefaultInput from '../../../component/Form/DefaultInput'
import Dropdown from '../../../component/Form/Dropdown'

const CreateUser = () => {
    const token = localStorage.getItem('token')
    const { values, handleChange } = useForm({
        username: '',
        email: '',
        role: '',
    });
    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await API.get(
                    `/admin/get-roles?nocache=${Date.now()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );

                setRoles(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch roles:", err);
                setError("Could not load roles");
                setRoles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post(`/admin/create-system-user?nocache=${Date.now()}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            });
            if (res.data.success === true) {
                alert(res.data.message);
                navigate('/Dashboard/system-users');
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
                <div className="p-2 rounded bg-lime-400">
                    <FaUserShield className='fill-white' />
                </div>
                <div className="">
                    <h1 className="font-bold text-xl ml-2">Create New System User</h1>
                </div>
            </div>

            <div className="">
                <Link to={'/Dashboard/system-users'}>
                    <DefaultButton
                        type='button'
                        label='Back'
                    />
                </Link>
            </div>

            <div className="bg-white p-4 mt-8 rounded-lg shadow-xl">
                <div className="">
                    <form onSubmit={handleSubmit} method="post">
                        <div className="">
                            <DefaultInput
                                label={"Enter Username"}
                                type='text'
                                name={'username'}
                                value={values.username}
                                onChange={handleChange}
                                required
                                placeholder={"Enter Username"}
                            />
                        </div>
                        <div className="">
                            <Dropdown
                                label="Select Roles"
                                name="role"
                                value={values.role}
                                required
                                onChange={handleChange}
                                options={roles.map(role => ({
                                    label: role.name, 
                                    value: role._id
                                }))}
                            />
                        </div>
                        <div className="">
                            <DefaultInput
                                label={"Enter Email Address"}
                                type='email'
                                name={'email'}
                                value={values.email}
                                onChange={handleChange}
                                required
                                placeholder={"Enter Email Address"}
                            />
                        </div>

                        <div className="-mt-4">
                            <DefaultButton
                                type='submit'
                                label='Create New System User'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser