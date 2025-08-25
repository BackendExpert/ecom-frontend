import React from 'react'
import useForm from '../../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import DefaultInput from '../../../component/Form/DefaultInput';
import DefaultButton from '../../../component/Buttons/DefaultButton';
import API from '../../../services/api';


const UpdatePassword = () => {
    const { logout } = useAuth()
    const token = localStorage.getItem('token')

    const { values, handleChange } = useForm({
        current_pass: '',
        new_pass: '',
    });
    const navigate = useNavigate();

    const handleUpdaePassword = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post(`/auth/update-pass-viadash?nocache=${Date.now()}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            });
            if (res.data.success === true) {
                alert(res.data.message);
                logout(navigate)
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Update Password
            </h2>

            <div className="">
                <form onSubmit={handleUpdaePassword} method="post">
                    <div className="">
                        <DefaultInput
                            label={"Enter Current Password"}
                            type='password'
                            name={'current_pass'}
                            value={values.current_pass}
                            required
                            onChange={handleChange}
                            placeholder={"Enter your Current Password"}
                        />
                    </div>
                    <div className="">
                        <DefaultInput
                            label={"Enter New Password"}
                            type='password'
                            name={'new_pass'}
                            value={values.new_pass}
                            required
                            onChange={handleChange}
                            placeholder={"Enter your New Password"}
                        />
                    </div>

                    <div className="-mt-4">
                        <DefaultButton 
                            type='submit'
                            label='Update Password'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword