import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api";
import DefaultInput from "../../../component/Form/DefaultInput";
import DefaultButton from "../../../component/Buttons/DefaultButton";
import useForm from "../../../hooks/useForm";
import { FaTag } from "react-icons/fa6";


const CreateProductType = () => {
    const { values, handleChange } = useForm({ name: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/products/create-product-type", values);
            if (res.data.success) {
                alert(res.data.message);
                navigate("/product-types");
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while creating product type");
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-lime-400 to-green-500 shadow-md">
                    <FaTag className="text-white text-xl" />
                </div>
                <h1 className="font-extrabold text-2xl ml-3 text-gray-800">
                    Create New Product Type
                </h1>
            </div>

            <div className="bg-white p-8 shadow-md rounded-lg">
                <form onSubmit={handleSubmit}>
                    <DefaultInput
                        label="Product Type Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        placeholder="Enter product type (e.g., Electronics)"
                        required
                    />

                    <DefaultButton
                        type="submit"
                        label="Create Product Type"
                    />
                </form>
            </div>
        </div>
    );
};

export default CreateProductType;
