import React from 'react'

const ProjectSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-4 bg-gradient-to-r from-indigo-700 to-blue-600 p-4 rounded-lg shadow-md">
            {/* Scrollable content */}
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[25rem] lg:min-w-[22rem] min-w-full">
                {/* Repeating skeleton blocks */}
                {[...Array(2)].map((_, index) => (
                    <div
                        key={index}
                        className="w-full p-4 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg animate-pulse"
                    >
                        {/* Skeleton title */}
                        <div className="h-6 w-3/4 bg-gray-300 rounded-md mb-3"></div>
                        {/* Skeleton description */}
                        <div className="h-4 w-5/6 bg-gray-300 rounded-md mb-2"></div>
                        <div className="h-4 w-2/3 bg-gray-300 rounded-md"></div>
                        {/* Skeleton user count */}
                        <div className="flex items-center space-x-2 mt-3">
                            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                            <div className="h-4 w-8 bg-gray-300 rounded-md"></div>
                        </div>
                        {/* Skeleton buttons */}
                        <div className="flex items-center justify-start gap-3 pt-4">
                            <div className="h-10 w-[90px] bg-yellow-400 rounded-lg"></div>
                            <div className="h-10 w-[90px] bg-gray-300 rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default ProjectSkeleton
