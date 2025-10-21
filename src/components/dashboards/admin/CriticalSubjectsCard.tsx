import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface Subject {
  name: string;
  failureRate: number;
}

interface CriticalSubjectsCardProps {
  title: string;
  subjects: Subject[];
  description?: string;
  icon?: React.ReactNode;
}

export function CriticalSubjectsCard({ title, subjects, description, icon }: CriticalSubjectsCardProps) {
  return (
    <Card className="bg-slate-800 border-slate-700 hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        {icon && <div className="text-slate-400">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {subjects.map((subject, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-slate-200 font-medium">
                {index + 1}. {subject.name}
              </span>
              <span className="text-sm font-bold text-red-400">
                {subject.failureRate.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
        {description && (
          <p className="text-xs text-slate-400 mt-3">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}