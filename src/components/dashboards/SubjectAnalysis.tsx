import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { BookOpen, Users, Clock, TrendingDown } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface Subject {
  id: string;
  name: string;
  code: string;
  workload: number;
  failureRate: number;
  failedStudents: number;
  prerequisites: string[];
  semester: number;
}

interface Student {
  id: string;
  name: string;
  registration: string;
  currentSemester: number;
  failedSubjects: string[];
}

const mockSubjects: Subject[] = [
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

const mockStudents: Student[] = [
  { id: "1", name: "Ana Silva Santos", registration: "2023001001", currentSemester: 4, failedSubjects: ["Banco de Dados I", "PI II", "APE II"] },
  { id: "2", name: "Carlos Oliveira Lima", registration: "2022005032", currentSemester: 6, failedSubjects: ["Banco de Dados II", "Segurança e Auditoria de Sistemas"] },
  { id: "3", name: "Maria Fernanda Costa", registration: "2023002015", currentSemester: 3, failedSubjects: ["Engenharia de Usabilidade", "APE II"] }
];

export function SubjectAnalysis() {
  const { isDark } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const subjectsByFailureRate = [...mockSubjects].sort((a, b) => b.failureRate - a.failureRate);

  const getFailedStudentsInSubject = (subjectName: string) => {
    return mockStudents.filter(student => 
      student.failedSubjects.includes(subjectName)
    );
  };

  const calculateRequiredTeachers = (failedStudents: number) => {
    const maxStudentsPerClass = 40;
    return Math.ceil(failedStudents / maxStudentsPerClass);
  };

  const getFailureRateColor = (rate: number) => {
    if (rate >= 40) return "text-red-400";
    if (rate >= 25) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className={`p-6 space-y-6 min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Análise de Disciplinas</h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Estatísticas e análise detalhada das disciplinas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <TrendingDown className="h-5 w-5" />
              Ranking de Reprovações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={isDark ? 'text-slate-300' : 'text-slate-700'}>Disciplina</TableHead>
                  <TableHead className={isDark ? 'text-slate-300' : 'text-slate-700'}>Taxa</TableHead>
                  <TableHead className={isDark ? 'text-slate-300' : 'text-slate-700'}>Reprovados</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjectsByFailureRate.map((subject) => (
                  <TableRow 
                    key={subject.id}
                    className={`cursor-pointer border-slate-600 ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    <TableCell>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{subject.name}</p>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{subject.code}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getFailureRateColor(subject.failureRate)}`}>
                          {subject.failureRate.toFixed(1)}%
                        </span>
                        <Progress 
                          value={subject.failureRate} 
                          className="w-16 h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">
                        {subject.failedStudents}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <BookOpen className="h-5 w-5" />
              Detalhes da Disciplina
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSubject ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className={`text-xl font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedSubject.name}</h3>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{selectedSubject.code}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <div className={`flex items-center gap-2 mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Carga Horária</span>
                      </div>
                      <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedSubject.workload}h</p>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <div className={`flex items-center gap-2 mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <TrendingDown className="h-4 w-4" />
                        <span className="text-sm">Taxa de Reprovação</span>
                      </div>
                      <p className={`text-lg font-medium ${getFailureRateColor(selectedSubject.failureRate)}`}>
                        {selectedSubject.failureRate.toFixed(1)}%
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <div className={`flex items-center gap-2 mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <Users className="h-4 w-4" />
                        <span className="text-sm">Reprovados</span>
                      </div>
                      <p className="text-lg font-medium text-red-400">{selectedSubject.failedStudents}</p>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <div className={`flex items-center gap-2 mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Semestre</span>
                      </div>
                      <p className={`text-lg font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedSubject.semester}º</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Pré-requisitos</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubject.prerequisites.length > 0 ? (
                      selectedSubject.prerequisites.map((prereq, index) => (
                        <Badge key={index} variant="secondary">
                          {prereq}
                        </Badge>
                      ))
                    ) : (
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Nenhum pré-requisito</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Planejamento de Recursos</h4>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      <strong>Professores necessários:</strong> {calculateRequiredTeachers(selectedSubject.failedStudents)}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>
                      <strong>Turmas sugeridas:</strong> {Math.ceil(selectedSubject.failedStudents / 40)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Alunos Reprovados</h4>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {getFailedStudentsInSubject(selectedSubject.name).map((student) => (
                      <div key={student.id} className={`flex items-center justify-between p-2 rounded border ${isDark ? 'bg-red-900/20 border-red-700' : 'bg-red-50 border-red-200'}`}>
                        <div>
                          <p className={`text-sm font-medium ${isDark ? 'text-red-300' : 'text-red-900'}`}>{student.name}</p>
                          <p className={`text-xs ${isDark ? 'text-red-400' : 'text-red-600'}`}>{student.registration}</p>
                        </div>
                        <Badge variant="outline" className={isDark ? 'text-red-400 border-red-600' : 'text-red-600 border-red-300'}>
                          {student.currentSemester}º sem
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className={`text-center py-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Selecione uma disciplina da tabela para ver os detalhes
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}