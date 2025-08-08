import React from 'react'
import useForm from '../../hooks/useForm';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import DefaultInput from '../../component/Form/DefaultInput';
import DefaultButton from '../../component/Buttons/DefaultButton';

const EmailVerify = () => {
    const token = localStorage.getItem('emailverify')
    const navigate = useNavigate()
    const { verifyEmailInfo, handleEmailVerificationToken } = useAuth()

    useEffect(() => {
        if (!token) {
            navigate('/login', { replace: true })
        }
    }, [token, navigate])

    useEffect(() => {
        if (!verifyEmailInfo.email && token) {
            try {
                handleEmailVerificationToken(token)
            } catch (err) {
                localStorage.removeItem('emailverify')
                navigate('/login')
            }
        }
    }, [verifyEmailInfo, token, handleEmailVerificationToken, navigate])

    const { values, handleChange } = useForm({ email: verifyEmailInfo.email, otp: '' })
    
    const headlesubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post('/auth/verify-email', values, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success === true) {
                alert(res.data.message)
                localStorage.clear()
                navigate('/login', { replace: true })
            }
            else {
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

                <form onSubmit={headlesubmit} className="mt-8 space-y-5">
                    <DefaultInput
                        label={'OTP Number'}
                        type="text"
                        name="otp"
                        value={values.otp}
                        onChange={handleChange}
                        required
                        placeholder={"Enter OTP Number"}
                    />

                    <DefaultButton
                        type='submit'
                        label='Verify OTP'
                    />
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    Please Verify OTP here at this time, if not you cannot verify later
                </p>
            </div>
        </div>
    )
}

export default EmailVerify
