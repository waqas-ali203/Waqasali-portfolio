import React from "react";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col space-y-4 rounded-xl border border-transparent max-w-xs md:max-w-none w-full p-6 transition-transform duration-200 hover:scale-105 hover:shadow-xl flex-grow",
                className
            )}
        >
            {header}
            <div className="flex flex-col items-center text-center space-y-2">
                {icon}
                <div className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                    {title}
                </div>
                <div className="text-sm font-normal text-neutral-600 dark:text-neutral-400">
                    {description}
                </div>
            </div>
        </div>
    );
};
