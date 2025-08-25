import React, { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import API from "../../../services/api";
import { Link } from "react-router-dom";

const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usernameFilter, setUsernameFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 20;
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const res = await API.get(
                    `/admin/get-user-activities?nocache=${Date.now()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );
                const result = Array.isArray(res.data.result) ? res.data.result : [];
                setActivities(result);
                setFilteredActivities(result);
            } catch (err) {
                console.error("Failed to fetch activities:", err);
                setError("Could not load activities.");
                setActivities([]);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, [token]);

    // Filtering logic
    useEffect(() => {
        let data = [...activities];

        if (usernameFilter.trim()) {
            data = data.filter((a) =>
                a.user?.username
                    ?.toLowerCase()
                    .includes(usernameFilter.trim().toLowerCase())
            );
        }

        if (dateFilter) {
            const selectedDate = new Date(dateFilter).toDateString();
            data = data.filter(
                (a) => new Date(a.createdAt).toDateString() === selectedDate
            );
        }

        setFilteredActivities(data);
        setCurrentPage(1); // reset page when filter changes
    }, [usernameFilter, dateFilter, activities]);

    // Pagination logic
    const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
    const paginatedData = filteredActivities.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-full bg-lime-500 shadow-lg">
                    <MdHistory className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">User Activities</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Filter by username"
                    value={usernameFilter}
                    onChange={(e) => setUsernameFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <div className="w-10 h-10 border-4 border-lime-500 border-dashed rounded-full animate-spin"></div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow mb-6">
                    {error}
                </div>
            )}

            {/* Activities List */}
            {!loading && !error && (
                <>
                    {filteredActivities.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">
                            No activities found.
                        </div>
                    ) : (
                        <>
                            <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-lime-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                User
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Action
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {paginatedData.map((act, index) => (
                                            <tr
                                                key={index}
                                                className="hover:bg-lime-50 transition-colors duration-200"
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                                                    {act.user?.username || "Unknown"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-lime-600 font-semibold">
                                                    {act.action}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {act.description || "-"}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(act.createdAt).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    <Link to={`/Dashboard/view-activity/${act._id}`}>
                                                        <span className="text-lime-700 hover:underline">View</span>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-between items-center mt-6">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((p) => p - 1)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === 1
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : "bg-lime-500 text-white hover:bg-lime-600"
                                        }`}
                                >
                                    Previous
                                </button>
                                <span className="text-gray-600 text-sm">
                                    Page {currentPage} of {totalPages || 1}
                                </span>
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${currentPage === totalPages
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : "bg-lime-500 text-white hover:bg-lime-600"
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Activities;
