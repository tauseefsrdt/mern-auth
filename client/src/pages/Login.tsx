import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/authThunks";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type LoginFormData = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { loading, error, token } = useSelector((state: RootState) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        dispatch(loginUser(data));
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);
    useEffect(() => {
        if (token) {
            toast.success("✅ Logged in successfully!");
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form
                className="w-full max-w-[450px] shadow-md rounded-2xl border border-gray-50 overflow-hidden"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className="text-center text-xl font-semibold py-4 bg-amber-900 text-white">
                    Login Page
                </h3>
                <div className="px-4 pb-2">
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
                                message:
                                    "Password must be 8+ chars, include 1 alphabet & 1 special character",
                            },
                        })}
                    />
                    {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

                    {/* Submit Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            className="bg-amber-900 text-white px-6 py-1.5 cursor-pointer rounded-xl"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>

                    {/* Register Link */}
                    <span className="mt-6 flex justify-end text-gray-600 text-sm">
                        If you are not registered
                        <Link className="text-amber-700 font-semibold ml-2" to="/register">
                            Register
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
