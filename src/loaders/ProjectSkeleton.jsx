import React from 'react'

const ProjectSkeleton = () => {
    return (
        <div className="min-h-40 h-fit p-6 sm:w-[24rem] w-[67vw] bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg shadow-lg animate-pulse">
            <div className="h-6 bg-white rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-white rounded w-3/4"></div>
            <div className="mt-2 flex items-center space-x-2">
                <div className="w-5 h-5 bg-white rounded-full"></div>
                <div className="h-4 bg-white rounded w-4"></div>
            </div>
        </div>
    )
}

export default ProjectSkeleton
