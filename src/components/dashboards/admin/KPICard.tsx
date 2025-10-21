import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export function KPICard({ title, value, description, trend, icon }: KPICardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-red-400";
      case "down":
        return "text-green-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">{title}</CardTitle>
        {icon && <div className="text-slate-400">{icon}</div>}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className={`text-5xl font-bold ${getTrendColor()}`}>{value}</div>
        {description && (
          <p className="text-xs text-slate-400 mt-2 text-center">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}