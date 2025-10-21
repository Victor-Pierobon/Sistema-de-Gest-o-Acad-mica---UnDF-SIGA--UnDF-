import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Users, TrendingUp, AlertTriangle, GraduationCap } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

const mockKPIs = {
  totalStudentsWithFailures: 1247,
  subjectWithHighestFailureRate: "Banco de Dados II",
  studentsAtRisk: 23.4,
  criticalSubjects: 8
};

const mockSubjects = [
  { id: "1", name: "Banco de Dados I", code: "BDI301", workload: 80, failureRate: 42.5, failedStudents: 156, prerequisites: [], semester: 3 },
  { id: "2", name: "Banco de Dados II", code: "BDII401", workload: 80, failureRate: 48.3, failedStudents: 142, prerequisites: ["Banco de Dados I"], semester: 4 },
  { id: "17", name: "PI V", code: "PI501", workload: 80, failureRate: 45.6, failedStudents: 134, prerequisites: ["PI IV"], semester: 5 },
  { id: "18", name: "Segurança e Auditoria de Sistemas", code: "SAS501", workload: 60, failureRate: 44.1, failedStudents: 128, prerequisites: ["Banco de Dados I"], semester: 5 },
  { id: "16", name: "PI IV", code: "PI401", workload: 80, failureRate: 40.2, failedStudents: 118, prerequisites: ["PI III"], semester: 4 },
  { id: "12", name: "Engenharia de Usabilidade", code: "EU401", workload: 60, failureRate: 38.4, failedStudents: 112, prerequisites: [], semester: 4 },
  { id: "15", name: "PI III", code: "PI301", workload: 80, failureRate: 36.8, failedStudents: 108, prerequisites: ["PI II"], semester: 3 },
  { id: "9", name: "APE III", code: "APE301", workload: 60, failureRate: 33.2, failedStudents: 105, prerequisites: ["APE II"], semester: 3 },
  { id: "8", name: "APE IV", code: "APE401", workload: 60, failureRate: 35.9, failedStudents: 98, prerequisites: ["APE III"], semester: 4 },
  { id: "14", name: "PI II", code: "PI201", workload: 80, failureRate: 31.5, failedStudents: 94, prerequisites: ["PI I"], semester: 2 }
];

const mockCourses = [
  { id: "1", name: "Engenharia de Software", studentsWithFailures: 189, totalStudents: 450, failurePercentage: 42.0 },
  { id: "2", name: "Ciência da Computação", studentsWithFailures: 156, totalStudents: 390, failurePercentage: 40.0 },
  { id: "3", name: "Sistemas de Informação", studentsWithFailures: 124, totalStudents: 325, failurePercentage: 38.1 },
  { id: "4", name: "Gestão da Tecnologia da Informação", studentsWithFailures: 95, totalStudents: 280, failurePercentage: 33.9 },
  { id: "5", name: "Matemática", studentsWithFailures: 78, totalStudents: 245, failurePercentage: 31.8 }
];

const semesterDistribution = [
  { semester: "1º", failures: 156, percentage: 12.5 },
  { semester: "2º", failures: 324, percentage: 26.0 },
  { semester: "3º", failures: 298, percentage: 23.9 },
  { semester: "4º", failures: 245, percentage: 19.6 },
  { semester: "5º", failures: 145, percentage: 11.6 },
  { semester: "6º", failures: 79, percentage: 6.3 }
];

const failureEvolution = [
  { semester: "2023.1", rate: 28.5 },
  { semester: "2023.2", rate: 31.2 },
  { semester: "2024.1", rate: 29.8 },
  { semester: "2024.2", rate: 26.4 },
  { semester: "2025.1", rate: 24.8 }
];

export function AdminDashboard() {
  const { isDark } = useTheme();
  
  const topFailureSubjects = mockSubjects
    .sort((a, b) => b.failedStudents - a.failedStudents)
    .slice(0, 10);

  const topCriticalSubjects = mockSubjects
    .sort((a, b) => b.failureRate - a.failureRate)
    .slice(0, 3)
    .map(subject => ({
      name: subject.name,
      failureRate: subject.failureRate
    }));

  const topCriticalCourses = mockCourses
    .sort((a, b) => b.failurePercentage - a.failurePercentage)
    .slice(0, 3);

  return (
    <div className={`p-6 space-y-6 min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>SIGA-UnDF</h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Visão geral administrativa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`hover:shadow-lg transition-shadow ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Alunos com Reprovações</CardTitle>
            <Users className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-blue-400">{mockKPIs.totalStudentsWithFailures.toLocaleString()}</div>
            <p className={`text-xs mt-2 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Total de estudantes</p>
          </CardContent>
        </Card>

        <Card className={`hover:shadow-lg transition-shadow ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Disciplinas Mais Críticas</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topCriticalSubjects.map((subject, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {index + 1}. {subject.name}
                  </span>
                  <span className="text-sm font-bold text-red-400">
                    {subject.failureRate.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
            <p className={`text-xs mt-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Top 3 com maior taxa de reprovação</p>
          </CardContent>
        </Card>

        <Card className={`hover:shadow-lg transition-shadow ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Alunos em Risco</CardTitle>
            <TrendingUp className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-red-400">{mockKPIs.studentsAtRisk}%</div>
            <p className={`text-xs mt-2 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Risco de atraso na formatura</p>
          </CardContent>
        </Card>

        <Card className={`hover:shadow-lg transition-shadow ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Cursos Mais Críticos</CardTitle>
            <GraduationCap className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCriticalCourses.map((course, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                      {index + 1}. {course.name}
                    </span>
                    <span className="text-sm font-bold text-red-400">
                      {course.failurePercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {course.studentsWithFailures} de {course.totalStudents} alunos
                  </div>
                </div>
              ))}
            </div>
            <p className={`text-xs mt-3 pt-2 border-t ${isDark ? 'text-slate-400 border-slate-600' : 'text-slate-600 border-slate-200'}`}>Cursos com mais alunos reprovados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Distribuição de Reprovações por Semestre</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={semesterDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ semester, percentage }) => `${semester}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="failures"
                >
                  {semesterDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Evolução das Taxas de Reprovação</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={failureEvolution}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#475569" : "#e2e8f0"} />
                <XAxis dataKey="semester" stroke={isDark ? "#94a3b8" : "#64748b"} />
                <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Top 10 Disciplinas com Maior Número de Reprovações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topFailureSubjects.map((subject, index) => {
              const colors = ['#2264af', '#307bc7', '#5698da', '#91bbe8', '#c4daf3', '#1c4d88', '#1b4371', '#1b395f', '#12243f', '#0f172a'];
              const maxValue = topFailureSubjects[0]?.failedStudents || 1;
              const percentage = (subject.failedStudents / maxValue) * 100;
              
              return (
                <div key={subject.id} className="flex items-center space-x-4">
                  <div className={`w-32 text-sm font-medium text-right ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {subject.name}
                  </div>
                  <div className={`flex-1 rounded-full h-8 relative ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
                    <div 
                      className="h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-bold transition-all duration-500"
                      style={{ 
                        width: `${Math.max(percentage, 10)}%`,
                        backgroundColor: colors[index % colors.length]
                      }}
                    >
                      {subject.failedStudents}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`mt-4 text-sm text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Número de reprovações por disciplina
          </div>
        </CardContent>
      </Card>
    </div>
  );
}