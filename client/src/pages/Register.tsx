import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { registerUser } from "../redux/authThunks";
import store, { RootState } from "../redux/store";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type RegisterFormData = {
    user: string;
    email: string;
    password: string;
};

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state: RootState) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const onSubmit = (data: RegisterFormData) => {
        store.dispatch(registerUser(data));
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);
    useEffect(() => {
        if (success) {
            toast.success("Register successfully!");
            navigate("/login");
        }
    }, [success, navigate]);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form
                className="w-full max-w-[450px] shadow-md rounded-2xl border border-gray-50 overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className="text-center text-xl font-semibold py-4 bg-amber-900 text-white">
                    Register Page
                </h3>
                <div className="px-4 pb-2">
                    {/* Name */}
                    <input
                        className="w-full border px-4 py-1 mt-6 rounded-md border-gray-200"
                        placeholder="Name"
                        {...register("user", {
                            required: "Name is required",
                            minLength: { value: 3, message: "Name must be at least 3 characters" },
                        })}
                    />
                    {errors.user && <p className="text-red-600 text-sm">{errors.user.message}</p>}

                    {/* Email */}
                    <input
                        className="w-full border px-4 py-1 mt-6 rounded-md border-gray-200"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Enter a valid email",
                            },
                        })}
                    />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                    {/* Password */}
                    <input
                        className="w-full border px-4 py-1 mt-6 rounded-md border-gray-200"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Password must be 8+ chars, 1 letter & 1 special character",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-600 text-sm">{errors.password.message}</p>
                    )}

                    {/* Submit */}
                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-amber-900 text-white px-6 py-1.5 cursor-pointer rounded-xl"
                            type="submit"
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>

                    {/* Redirect Link */}
                    <span className="mt-6 flex justify-end text-gray-600 text-sm">
                        Already registered?
                        <Link className="text-amber-700 font-semibold ml-2" to="/login">
                            Login
                        </Link>
                    </span>

                    {/* API Error */}
                    {error && <p className="text-red-600">{error}</p>}
                </div>
            </form>
        </div>
    );
};

export default Register;
