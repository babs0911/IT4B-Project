import { User } from "../types/index";

type UserWithScore = User & { score: number };

function getUser(id: number): UserWithScore {
  return {
    id: id,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
    score: 95.5,
  };
}

function calculateGrade(score: number, maxScore: number): string {
  const percentage: number = (score / maxScore) * 100;
  if (percentage >= 90) return "Letter grade is: A";
  if (percentage >= 80) return "Letter grade is: B";
  if (percentage >= 70) return "Letter grade is: C";
  return "Letter grade is: F";
}

function formatCourse(name: string, units: number, semester: string): string {
  return `${name} (${units} units) - ${semester}`;
}

const user: UserWithScore = getUser(1);
console.log(user);
console.log(calculateGrade(85, 100));
console.log(formatCourse("IT Elective 4", 3, "1st Semester"));
