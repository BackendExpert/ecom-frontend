import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import DefaultButton from '../../component/Buttons/DefaultButton';
import DefaultInput from '../../component/Form/DefaultInput';
import API from '../../services/api';

const UpdatePassword = () => {
    const token = localStorage.getItem('emailverify');
    const { values, handleChange } = useForm({ new_password: '', confirmpass: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            localStorage.clear();
            navigate('/', { replace: true });
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { new_password, confirmpass } = values;

        if (new_password !== confirmpass) {
            alert("Passwords Not Match");
            return;
        }

        try {
            const res = await API.post('/auth/update-password', values, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success === true || res.data.success === "true") {
                alert(res.data.message);
                localStorage.clear();
                navigate('/login');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="md:my-[4%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-8 px-6 py-12 items-start">

            <div className="bg-white border border-violet-200 rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-center text-lime-700 mb-6">
                    Update Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <DefaultInput
                        label="Enter New Password"
                        type='password'
                        name="new_password"
                        value={values.new_password}
                        onChange={handleChange}
                        placeholder="Enter Your New Password"
                        required
                    />

                    <DefaultInput
                        label="Confirm Password"
                        type='password'
                        name="confirmpass"
                        value={values.confirmpass}
                        onChange={handleChange}
                        placeholder="Confirm Your Password"
                        required
                    />

                    <DefaultButton
                        type="submit"
                        label="Update Password"
                    />
                </form>

                <p className="text-gray-500 text-xs text-center mt-6">
                    &copy; {new Date().getFullYear()} LawCase System — All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default UpdatePassword;
