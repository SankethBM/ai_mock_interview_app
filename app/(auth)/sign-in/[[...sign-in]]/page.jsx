import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black font-itim">

            {/* Animated Gradient Background */}
            <div className="absolute inset-0">
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600 opacity-30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-blue-600 opacity-30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-150px] left-1/3 w-[400px] h-[400px] bg-pink-600 opacity-20 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Heading */}
                <h1 className="text-white text-3xl md:text-4xl font-bold mb-6 text-center">
                    Welcome to PrepWise
                </h1>

                {/* Tagline */}
                <p className="text-gray-300 text-center mb-8 max-w-md">
                    Practice Smarter, Improve Faster, and Crack your Dream Job.
                </p>

                {/* Clerk SignIn (UNCHANGED) */}
                <SignIn />

            </div>
        </div>
    )
}