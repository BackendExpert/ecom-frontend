import React, { useEffect, useState } from 'react'
import { FaUserShield } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import API from '../../../services/api'

const Permissions = () => {
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

    return (
        <div>
            <div className="flex">
                <div className="p-2 rounded bg-violet-400">
                    <FaUserShield className='fill-white' />
                </div>
                <div className="">
                    <h1 className="font-bold text-xl ml-2">Permissions</h1>
                </div>
            </div>

            <div className="">
                <Link to={'/Dashboard/create-permissions'}>
                    <DefaultButton
                        type='button'
                        label='Create Permissions'
                    />
                </Link>
            </div>

            <div className="">
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 mt-8">
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
                                    Permissions
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                                    View
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
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800 flex flex-wrap gap-2">
                                            {Array.isArray(role.permissions) && role.permissions.length > 0 ? (
                                                role.permissions.map((perm, i) => (
                                                    <span
                                                        key={i}
                                                        className="bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-xs font-semibold"
                                                    >
                                                        {perm}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-gray-400 text-xs">No permissions</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
                                            <Link to={`/Dashboard/view-permissions/${role._id}`}>
                                                <p className="text-violet-600 hover:underline">
                                                    View
                                                </p>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Permissions