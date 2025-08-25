import React, { useEffect, useState } from "react";
import { MdHistory } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import API from "../../../services/api";
import DefaultButton from "../../../component/Buttons/DefaultButton";

const ViewActivity = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const res = await API.get(
                    `/admin/get-one-activity/${id}?nocache=${Date.now()}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                            Expires: "0",
                        },
                    }
                );

                setActivity(res.data.result || null);
            } catch (err) {
                console.error("Failed to fetch activity:", err);
                setError("Could not load activity");
                setActivity(null);
            } finally {
                setLoading(false);
            }
        };

        fetchActivity();
    }, [token, id]);

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 rounded-full bg-violet-500 shadow-lg">
                    <MdHistory className="text-white text-2xl" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                    User Activity: {id}
                </h1>
            </div>

            <div className="-mt-8 mb-4">
                <Link to={'/Dashboard/activities'}>
                    <DefaultButton 
                        type="button"
                        label="back"
                    />
                </Link>
            </div>

            {/* Loading */}
            {loading && (
                <div className="flex justify-center items-center py-10">
                    <div className="w-10 h-10 border-4 border-violet-500 border-dashed rounded-full animate-spin"></div>
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow mb-6">
                    {error}
                </div>
            )}

            {/* Activity Details */}
            {!loading && !error && activity && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase">
                                User
                            </h2>
                            <p className="text-lg font-medium text-gray-800">
                                {activity.user?.username || "Unknown"}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase">
                                Action
                            </h2>
                            <p className="text-lg font-medium text-violet-600">
                                {activity.action}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase">
                                Description
                            </h2>
                            <p className="text-gray-700">
                                {activity.description || "-"}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase">
                                Date & Time
                            </h2>
                            <p className="text-gray-700">
                                {new Date(activity.createdAt).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase">
                                IP Address
                            </h2>
                            <p className="text-gray-700">{activity.ipAddress || "-"}</p>
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-500 uppercase">
                                User Agent
                            </h2>
                            <p className="text-gray-700 break-all">
                                {activity.userAgent || "-"}
                            </p>
                        </div>
                    </div>

                    {/* Metadata Section */}
                    {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                                Metadata
                            </h2>
                            <pre className="bg-gray-100 text-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                                {JSON.stringify(activity.metadata, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            )}

            {!loading && !error && !activity && (
                <div className="text-center text-gray-500 py-10">
                    Activity not found.
                </div>
            )}
        </div>
    );
};

export default ViewActivity;
