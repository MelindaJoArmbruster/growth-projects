import CourseGoal from "./CourseGoal";
import { type CourseGoal as CGoalType } from "../App";
import InfoBox from "./InfoBox";
import { ReactNode } from "react";

type CourseGoalListProps = {
    goals: CGoalType[];
    onDeleteGoal: (goalId: number) => void;
};

export default function CourseGoalList({goals, onDeleteGoal}: CourseGoalListProps) {
    if (goals.length === 0) {
        return (
            <InfoBox mode="hint">
                <p>You have no course goals yet. Start adding some!</p>
            </InfoBox>
        );
    }

    let warningBox: ReactNode;

    if (goals.length >= 4) {
        warningBox = (
            <InfoBox mode="warning" severity="medium">
                <p>You're collecting a lot of goals. Don't put too much on your plate!</p>
            </InfoBox>
        );
    }

    return (
        <>
            {warningBox}
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>
                    <CourseGoal goalId={goal.id} title={goal.title} onDelete={onDeleteGoal}>
                        <p>{goal.description}</p>
                    </CourseGoal >
                    </li>
                ))}
            </ul>
        </>
    );
}