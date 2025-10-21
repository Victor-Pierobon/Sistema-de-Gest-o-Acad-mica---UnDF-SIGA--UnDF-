import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface Course {
  name: string;
  failurePercentage: number;
  studentsWithFailures: number;
  totalStudents: number;
}

interface CriticalCoursesCardProps {
  title: string;
  courses: Course[];
  description?: string;
  icon?: React.ReactNode;
}

export function CriticalCoursesCard({ title, courses, description, icon }: CriticalCoursesCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700 hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        {icon && <div className="text-slate-400">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {courses.map((course, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-200 font-medium">
                  {index + 1}. {course.name}
                </span>
                <span className="text-sm font-bold text-red-400">
                  {course.failurePercentage.toFixed(1)}%
                </span>
              </div>
              <div className="text-xs text-slate-400">
                {course.studentsWithFailures} de {course.totalStudents} alunos
              </div>
            </div>
          ))}
        </div>
        {description && (
          <p className="text-xs text-slate-400 mt-3 pt-2 border-t border-slate-600">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}