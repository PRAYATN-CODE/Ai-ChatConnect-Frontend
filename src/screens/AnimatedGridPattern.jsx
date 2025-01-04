import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

// Utility function for classnames
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function AnimatedGridPattern({
    width = 50, // Adjust width for grid cells
    height = 50, // Adjust height for grid cells
    x = -1,
    y = -1,
    strokeDasharray = 0,
    numSquares = 15, // Adjust number of animated squares
    className,
    maxOpacity = 1, // Adjust opacity for subtle effect
    duration = 1,
    repeatDelay = 0.2,
    ...props
}) {
    const id = useId();
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [squares, setSquares] = useState(() => generateSquares(numSquares));

    function getPos() {
        return [
            Math.floor((Math.random() * dimensions.width) / width),
            Math.floor((Math.random() * dimensions.height) / height),
        ];
    }

    function generateSquares(count) {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            pos: getPos(),
        }));
    }

    const updateSquarePosition = (id) => {
        setSquares((currentSquares) =>
            currentSquares.map((sq) =>
                sq.id === id
                    ? {
                        ...sq,
                        pos: getPos(),
                    }
                    : sq
            )
        );
    };

    useEffect(() => {
        if (dimensions.width && dimensions.height) {
            setSquares(generateSquares(numSquares));
        }
    }, [dimensions, numSquares]);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, [containerRef]);

    return (
        <svg
            ref={containerRef}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-primary-500 stroke-gray-200/50",
                "z-[-1]", // Ensure background is behind text
                className
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path
                        d={`M.5 ${height}V.5H${width}`}
                        fill="none"
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
            <svg x={x} y={y} className="overflow-visible">
                {squares.map(({ pos: [x, y], id }, index) => (
                    <motion.rect
                        initial={{ opacity: 0 }}
                        animate={{ opacity: maxOpacity }}
                        transition={{
                            duration,
                            repeat: 1,
                            delay: index * 0.1,
                            repeatType: "reverse",
                        }}
                        className='rounded-xl'
                        onAnimationComplete={() => updateSquarePosition(id)}
                        key={`${x}-${y}-${index}`}
                        width={width - 1}
                        height={height - 1}
                        x={x * width + 1}
                        y={y * height + 1}
                        fill="#3d7bf4"
                        strokeWidth="0"
                    />
                ))}
            </svg>
        </svg>
    );
}


export default AnimatedGridPattern;