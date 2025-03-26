import CourseGoalList from "./components/CourseGoalList.tsx";
import goalsImage from "./assets/goals.jpg";
import Header from "./components/Header.tsx";
import { useState } from "react";
import NewGoal from "./components/NewGoal.tsx";

export type CourseGoal = {
  title: string;
  description: string;
  id: number;
};

export default function App() {
  const [goals, setGoals] = useState<CourseGoal[]>([]);

  function handleAddGoal(goal: string, summary: string) {
    setGoals((prevGoals) => {
      const newGoal: CourseGoal = {
        id: Math.random(),
        title: goal,
        description: summary,
      };
      return [...prevGoals, newGoal]
    });
  }

  function handleDeleteGoal(goalId: number) {
    setGoals((prevGoals) => {
      return prevGoals.filter(goal => goal.id !== goalId);
    });
  }

  return (
    <main>
      <Header image={{src: goalsImage, alt: "A list of goals"}}>
        <h1>Your Course Goals</h1>
      </Header>
      <NewGoal onAddGoal={handleAddGoal} />
      <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal} /> 
    </main>
  );
}
