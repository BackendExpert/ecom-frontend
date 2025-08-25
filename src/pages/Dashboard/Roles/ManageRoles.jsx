import React, { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa6";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import { Link } from "react-router-dom";
import API from "../../../services/api";


const ManageRoles = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

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

    const handleDeleteRole = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this Role?");
        if (!confirmed) {
            return false;
        }
        try {
            const res = await API.delete(`/admin/delete-role/${id}?nocache=${Date.now()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                }                
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

    return (
        <div>
            <div className="flex">
                <div className="p-2 rounded bg-violet-400">
                    <FaUserShield className="fill-white" />
                </div>
                <div>
                    <h1 className="font-bold text-xl ml-2">Manage System Roles</h1>
                </div>
            </div>

            <div className="my-8">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-violet-500 via-violet-600 to-purple-700 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-400 opacity-20 rounded-full blur-2xl"></div>

                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <h1 className="text-sm uppercase tracking-wide text-violet-200 font-medium">
                                    Total Roles
                                </h1>
                                <p className="mt-2 text-3xl font-bold text-white">
                                    {loading ? "..." : Array.isArray(roles) ? roles.length : 0}
                                </p>
                            </div>

                            <div className="p-4 bg-violet-400/30 rounded-full backdrop-blur-sm">
                                <FaUserShield className="text-white text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="-mt-6 mb-4">
                <Link to={'/Dashboard/create-newrole'}>
                    <DefaultButton type="button" label="Create New Role" />
                </Link>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-violet-500 via-violet-600 to-purple-700 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                #
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Role
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="2" className="text-center py-4 text-gray-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : roles.length === 0 ? (
                            <tr>
                                <td colSpan="2" className="text-center py-4 text-gray-400">
                                    No roles found
                                </td>
                            </tr>
                        ) : (
                            roles.map((role, index) => (
                                <tr key={role._id || index} className="hover:bg-violet-50 transition-colors duration-200">
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700 font-medium">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
                                        {role.name}
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
                                        {
                                            role.name === 'admin' || role.name === 'judge' || role.name === 'lawyer' || role.name === 'member' ? 
                                            <div className="">The Default System roles cannot be Deleted</div>
                                            :
                                            <div className="">
                                                <span className="text-red-500 hover:underline cursor-pointer" onClick={() => handleDeleteRole(role._id)}>Delete</span>
                                            </div>
                                        }
                                        
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageRoles;
