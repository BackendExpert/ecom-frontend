import React from 'react'
import useForm from '../../hooks/useForm';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import DefaultInput from '../../component/Form/DefaultInput';
import DefaultButton from '../../component/Buttons/DefaultButton';

const Register = () => {
    const { values, handleChange } = useForm({ username: '', email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const headlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', values)
            if (res.data.success === true) {
                login(res.data.token)
                alert(res.data.message)
                navigate('/dashboard/home')
            }
            else if (res.data.success === false) {
                alert(res.data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="flex items-center justify-center py-16 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-lime-600 text-center">Login</h2>
                <p className="text-gray-500 text-center mt-2">Welcome back! Please log in to your account.</p>

                <form className="mt-8 space-y-5">
                    <DefaultInput
                        label={'Username'}
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        required
                        placeholder={"Username"}
                    />
                    <DefaultInput
                        label={'Email Address'}
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        required
                        placeholder={"Email Address"}
                    />
                    <DefaultInput
                        label={'Password'}
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        required
                        placeholder={"Password"}
                    />

                    <DefaultButton
                        type='submit'
                        label='Register'
                    />
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Don’t have an account? <a href="/register" className="text-lime-600 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )
}

export default Register
