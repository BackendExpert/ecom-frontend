import React from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../../../services/api';
import FileInput from '../../../component/Form/FileInput';
import DefaultButton from '../../../component/Buttons/DefaultButton';

const UpdateProfileImage = () => {
    const token = localStorage.getItem('token');

    const [file, setFile] = React.useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpdateProfileImage = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select an image");
            return;
        }

        const formData = new FormData();
        formData.append("pimg", file);

        try {
            const res = await API.post(`/auth/update-profile-image?nocache=${Date.now()}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    Expires: "0",
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success === true) {
                alert(res.data.message);
                window.location.reload()
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update profile image. Please try again.");
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Update Profile Image
            </h2>

            <div className="mt-4">
                <form onSubmit={handleUpdateProfileImage} method="post">
                    <FileInput
                        label="Enter New Profile Image"
                        name="pimg"
                        required
                        onChange={handleFileChange}
                    />

                    <div className="-mt-4">
                        <DefaultButton
                            type="submit"
                            label="Update Profile Image"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileImage;
