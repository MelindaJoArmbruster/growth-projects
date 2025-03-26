import { type ReactNode } from "react";

interface CourseGoalProps {
    title: string;
    goalId: number;
    onDelete: (goalId: number) => void;
    children: ReactNode;
};

export default function CourseGoal({
    title,
    goalId,
    onDelete,
    children
}: CourseGoalProps) {
    return (
    <article>
        <div>
            <h2>{title}</h2>
            {children}
        </div>
        <button onClick={() => onDelete(goalId)} >Delete</button>
    </article>
    );
}