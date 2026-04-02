import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../features/auth/authApiSlice"
import toast from "react-hot-toast"

const registerSchema = z.object({
    fullName: z.string().min(3, "Full name must be 3 characters"),
    username: z.string().min(3, "Username must be 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be 6 characters"),
    avatar: z.any().refine(files => files?.length > 0, "Avatar is required")
})

const RegisterPage = () => {
    const navigate = useNavigate()
    const [register, { isLoading }] = useRegisterMutation()

    const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data) => {
        try {
            const formData = new FormData()
            formData.append("fullname", data.fullName)
            formData.append("username", data.username)
            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("avatar", data.avatar[0])

            await register(formData).unwrap()
            toast.success("Registered Successfully!")
            navigate("/login")
        } catch (error) {
            toast.error(error?.data?.message || "Register Failed!")
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center py-8">
            <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">
                
                {/* Logo */}
                <h1 className="text-red-500 text-3xl font-bold text-center mb-2">
                    ▶ YouTube
                </h1>
                <p className="text-gray-400 text-center mb-8">
                    Create your account
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    {/* Full Name */}
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
                        <input
                            {...formRegister("fullName")}
                            placeholder="Enter full name"
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* Username */}
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Username</label>
                        <input
                            {...formRegister("username")}
                            placeholder="Enter username"
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Email</label>
                        <input
                            {...formRegister("email")}
                            type="email"
                            placeholder="Enter email"
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Password</label>
                        <input
                            {...formRegister("password")}
                            type="password"
                            placeholder="Enter password"
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Avatar */}
                    <div>
                        <label className="text-gray-400 text-sm mb-1 block">Avatar</label>
                        <input
                            {...formRegister("avatar")}
                            type="file"
                            accept="image/*"
                            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                        />
                        {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-gray-400 text-center mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-500 hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default RegisterPage