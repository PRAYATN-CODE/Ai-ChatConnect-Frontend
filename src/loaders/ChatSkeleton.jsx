import React from 'react'

const ChatSkeleton = () => {
    return (
        <div className="flex flex-col space-y-4 animate-pulse">
            {/* Left-aligned skeleton */}
            <div className="flex justify-start">
                <div className="flex flex-col items-start space-y-2">
                    <div className="h-4 w-24 bg-blue-300 rounded"></div>
                    <div className="h-8 w-64 bg-blue-300 rounded"></div>
                    <div className="h-4 w-32 bg-blue-300 rounded"></div>
                </div>
            </div>

            {/* Right-aligned skeleton */}
            <div className="flex justify-end">
                <div className="flex flex-col items-end space-y-2">
                    <div className="h-4 w-24 bg-blue-600 rounded"></div>
                    <div className="h-8 w-64 bg-blue-600 rounded"></div>
                    <div className="h-4 w-32 bg-blue-600 rounded"></div>
                </div>
            </div>

            {/* Left-aligned skeleton */}
            <div className="flex justify-start">
                <div className="flex flex-col items-start space-y-2">
                    <div className="h-4 w-24 bg-blue-300 rounded"></div>
                    <div className="h-8 w-64 bg-blue-300 rounded"></div>
                    <div className="h-4 w-32 bg-blue-300 rounded"></div>
                </div>
            </div>
            {/* Right-aligned skeleton */}
            <div className="flex justify-end">
                <div className="flex flex-col items-end space-y-2">
                    <div className="h-4 w-24 bg-blue-600 rounded"></div>
                    <div className="h-8 w-64 bg-blue-600 rounded"></div>
                    <div className="h-4 w-32 bg-blue-600 rounded"></div>
                </div>
            </div>
            {/* Left-aligned skeleton */}
            <div className="flex justify-start">
                <div className="flex flex-col items-start space-y-2">
                    <div className="h-4 w-24 bg-blue-300 rounded"></div>
                    <div className="h-8 w-64 bg-blue-300 rounded"></div>
                    <div className="h-4 w-32 bg-blue-300 rounded"></div>
                </div>
            </div>
            {/* Right-aligned skeleton */}
            <div className="flex justify-end">
                <div className="flex flex-col items-end space-y-2">
                    <div className="h-4 w-24 bg-blue-600 rounded"></div>
                    <div className="h-8 w-64 bg-blue-600 rounded"></div>
                    <div className="h-4 w-32 bg-blue-600 rounded"></div>
                </div>
            </div>
            {/* Left-aligned skeleton */}
            <div className="flex justify-start">
                <div className="flex flex-col items-start space-y-2">
                    <div className="h-4 w-24 bg-blue-300 rounded"></div>
                    <div className="h-8 w-64 bg-blue-300 rounded"></div>
                    <div className="h-4 w-32 bg-blue-300 rounded"></div>
                </div>
            </div>
            {/* Right-aligned skeleton */}
            <div className="flex justify-end">
                <div className="flex flex-col items-end space-y-2">
                    <div className="h-4 w-24 bg-blue-600 rounded"></div>
                    <div className="h-8 w-64 bg-blue-600 rounded"></div>
                    <div className="h-4 w-32 bg-blue-600 rounded"></div>
                </div>
            </div>
        </div>

    )
}

export default ChatSkeleton
