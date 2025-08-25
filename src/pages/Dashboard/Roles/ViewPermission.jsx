import React, { useEffect, useState } from 'react';
import { FaUserShield } from 'react-icons/fa6';
import DefaultButton from '../../../component/Buttons/DefaultButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../../services/api';
import DefaultInput from '../../../component/Form/DefaultInput';
import useForm from '../../../hooks/useForm';

const ViewPermission = () => {
    const { id } = useParams();
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const token = localStorage.getItem('token')
    const { values, handleChange } = useForm({
        permission: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await API.get(
                    `/admin/get-role-data/${id}?nocache=${Date.now()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );

                // ✅ Expect a single role object from backend
                setRole(res.data.result || null);
            } catch (err) {
                console.error("Failed to fetch role:", err);
                setError("Could not load role");
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [token, id]);

    const handleDeletePermission = async (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Are you sure you want to delete this permission?");
        if (!confirmed) {
            return false;
        }
        try {
            const res = await API.delete(`/admin/delete-permission/${id}?nocache=${Date.now()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                },
                data: values,
            });

            if (res.data.success === true) {
                alert(res.data.message);
                window.location.reload()
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };



    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <div className="flex items-center gap-2">
                <div className="p-2 rounded bg-violet-400">
                    <FaUserShield className="fill-white" />
                </div>
                <h1 className="font-bold text-xl">View Permission {id}</h1>
            </div>

            <div className="mt-3">
                <Link to={'/Dashboard/permissions'}>
                    <DefaultButton type="button" label="Back" />
                </Link>
            </div>

            <div className="bg-white p-6 shadow-lg rounded-lg mt-8">

                <div className="">
                    <div className="text-gray-500">
                        <h1 className="text-xl">Role: <span className='text-violet-600 font-bold'>{role?.name}</span></h1>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-violet-400 py-4">
                        {role?.permissions?.length > 0 ? (
                            role.permissions.map((perm, i) => (
                                <span
                                    key={i}
                                    className="bg-violet-100 text-violet-800 px-2 py-1 rounded-full font-semibold"
                                >
                                    {perm}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 text-xs">No permissions</span>
                        )}
                    </div>
                </div>
            </div>

            {
                role?.name === 'admin' ?
                    <div className="bg-white p-6 rounded-lg shadow-xl text-red-500 font-semibold mt-4">Cannot Delete Permissions of Admin</div>
                    :
                    <div className="bg-white p-6 shadow-lg rounded-lg mt-4">
                        <h1 className="text-xl font-bold text-gray-500">Delete Permissions</h1>

                        <div className="">
                            <form onSubmit={handleDeletePermission} method="post">
                                <DefaultInput
                                    label={"Enter Permission to Delete"}
                                    type='text'
                                    name={'permission'}
                                    value={values.permission}
                                    onChange={handleChange}
                                    required
                                    placeholder={"Enter Permission to Delete"}
                                />

                                <div className="-mt-4">
                                    <DefaultButton
                                        type='submit'
                                        label='Delete Permission'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
            }


        </div>
    );
};

export default ViewPermission;
