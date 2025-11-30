import React from "react";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: any;
  onClick?: (course: any) => void;
  className?: string;
}

export default function CourseCard({
  course,
  onClick,
  className,
}: CourseCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow",
        className
      )}
      onClick={() => onClick?.(course)}
    >
      <div className="space-y-3">
        <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm">Imagen del curso</span>
        </div>
        <h3 className="font-semibold text-gray-900">{course.name}</h3>
        <p className="text-sm text-gray-600">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600">
            {course.price}
          </span>
          <span className="text-xs text-gray-500">{course.level}</span>
        </div>
      </div>
    </div>
  );
}
