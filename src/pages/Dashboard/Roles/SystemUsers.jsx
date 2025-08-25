import React, { useEffect, useState } from 'react'
import API from '../../../services/api';
import { FaUserShield } from 'react-icons/fa';
import DefaultButton from '../../../component/Buttons/DefaultButton';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const SystemUsers = () => {
    const [systemusers, setsystemusers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await API.get(
                    `/admin/system-users?nocache=${Date.now()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );
                setsystemusers(Array.isArray(res.data.result) ? res.data.result : []);
            } catch (err) {
                console.error("Failed to fetch roles:", err);
                setError("Could not load roles");
                setsystemusers([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRoles();
    }, [token]);

    const { auth } = useAuth();

    const handleUpdateUserStatus = async (id) => {
        const confirmed = window.confirm("Are you sure you want to Update this user status ?");
        if (!confirmed) return;

        try {
            const res = await API.post(`/admin/update-user-status/${id}?nocache=${Date.now()}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                },                
            });

            if (res.data.success) {
                alert(res.data.message);
                window.location.reload();
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Search filter
    const filteredUsers = systemusers.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const goToPage = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center">
                <div className="p-2 rounded bg-lime-400">
                    <FaUserShield className='fill-white' />
                </div>
                <h1 className="font-bold text-xl ml-2">System Users</h1>
            </div>

            {/* Stats */}
            <div className="my-8">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                    <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-lime-500 via-lime-600 to-purple-700 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-lime-400 opacity-20 rounded-full blur-2xl"></div>
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <h1 className="text-sm uppercase tracking-wide text-lime-200 font-medium">Total Roles</h1>
                                <p className="mt-2 text-3xl font-bold text-white">
                                    {loading ? "..." : filteredUsers.length}
                                </p>
                            </div>
                            <div className="p-4 bg-lime-400/30 rounded-full backdrop-blur-sm">
                                <FaUserShield className="text-white text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Button */}
            <div className="-mt-6">
                <Link to={'/Dashboard/create-system-users'}>
                    <DefaultButton type='button' label='Create New System User' />
                </Link>
            </div>

            {/* Search Input */}
            <div className="mt-6">
                <input
                    type="text"
                    placeholder="Search by email..."
                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // reset page when searching
                    }}
                />
            </div>

            {/* Table */}
            <div className="">
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200 mt-8">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-lime-500 via-lime-600 to-purple-700 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Account Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email Status</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Dates</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-gray-500">Loading...</td>
                                </tr>
                            ) : currentUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-gray-400">No System Users found</td>
                                </tr>
                            ) : (
                                currentUsers.map((user, index) => (
                                    <tr
                                        key={user._id || index}
                                        className="hover:bg-lime-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-3">{indexOfFirstItem + index + 1}</td>
                                        <td className="px-6 py-3">{user.username}</td>
                                        <td className="px-6 py-3 break-all">{user.email}</td>
                                        <td className="px-6 py-3">{user?.role?.name}</td>
                                        <td className="px-6 py-3">
                                            {user.isActive ? (
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">Active</span>
                                            ) : (
                                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">Deactive</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3">
                                            {user.isEmailVerified ? (
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">Email Verified</span>
                                            ) : (
                                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">Email Not Verified</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3">
                                            <p>join: <span className="text-lime-800 font-bold">{new Date(user.createdAt).toLocaleDateString()}</span></p>
                                            <p>last Update: <span className="text-lime-800 font-bold">{new Date(user.updatedAt).toLocaleDateString()}</span></p>
                                        </td>
                                        <td className="px-6 py-3">
                                            {user?.role?.name === "admin" || user._id === auth.id ? (
                                                <p>This Account Cannot be Updated or Deleted</p>
                                            ) : (
                                                <span
                                                    className="text-lime-600 hover:underline cursor-pointer font-semibold"
                                                    onClick={() => handleUpdateUserStatus(user._id)}
                                                >
                                                    Click to {user.isActive ? "Deactive" : "Active"}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-6">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border rounded-lg hover:bg-lime-100 disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="font-semibold">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border rounded-lg hover:bg-lime-100 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SystemUsers;
