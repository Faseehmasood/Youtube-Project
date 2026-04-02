import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "../features/auth/authApiSlice"
import { setCredentials } from "../features/auth/authSlice"
import toast from "react-hot-toast"

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be 6 characters")
})

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data) => {
        try {
            const result = await login(data).unwrap()
            dispatch(setCredentials(result.data.user))
            toast.success("Login Successful!")
            navigate("/")
        } catch (error) {
            toast.error(error?.data?.message || "Login Failed!")
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">
                
                {/* Logo */}
                <h1 className="text-red-500 text-3xl font-bold text-center mb-2">
                    ▶ YouTube
                </h1>
                <p className="text-gray-400 text-center mb-8">
                    Sign in to your account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    {/* Email */}
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">
                            Email
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="Enter email"
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">
                            Password
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="Enter password"
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                {/* Register Link */}
                <p className="text-gray-400 text-center mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-red-500 hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage