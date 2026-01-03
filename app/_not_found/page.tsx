import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            {/* Background Large Text */}
            <h1 className="text-9xl font-black text-gray-200 dark:text-gray-900 select-none">
                404
            </h1>

            {/* Content Overlay */}
            <div className="space-y-6 -mt-16 z-10 relative">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
                    Page not found
                </h2>

                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto text-lg">
                    Oops! The page you are looking for seems to have vanished into the digital void.
                </p>

                {/* Button */}
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 transform rounded-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 hover:scale-105 hover:shadow-lg"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}