import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Search, User, Calendar, BookOpen, AlertCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface Student {
  id: string;
  name: string;
  registration: string;
  cpf: string;
  course: string;
  currentSemester: number;
  failedSubjects: string[];
  completedSubjects: string[];
  estimatedGraduation: string;
  totalAbsences: number;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ana Silva Santos",
    registration: "2023001001",
    cpf: "123.456.789-01",
    course: "Engenharia de Software",
    currentSemester: 4,
    failedSubjects: ["Banco de Dados I", "PI II", "APE II"],
    completedSubjects: ["HPGTI I", "PI I", "APE I"],
    estimatedGraduation: "2027.2",
    totalAbsences: 45
  },
  {
    id: "2",
    name: "Carlos Oliveira Lima",
    registration: "2022005032",
    cpf: "987.654.321-02",
    course: "Ciência da Computação",
    currentSemester: 6,
    failedSubjects: ["Banco de Dados II", "Segurança e Auditoria de Sistemas"],
    completedSubjects: ["Banco de Dados I", "HPGTI I", "HPGTI II", "HPGTI III", "PI I", "PI II", "PI III"],
    estimatedGraduation: "2026.1",
    totalAbsences: 28
  },
  {
    id: "3",
    name: "Maria Fernanda Costa",
    registration: "2023002015",
    cpf: "456.789.123-03",
    course: "Sistemas de Informação",
    currentSemester: 3,
    failedSubjects: ["Engenharia de Usabilidade", "APE II"],
    completedSubjects: ["HPGTI I", "APE I"],
    estimatedGraduation: "2027.1",
    totalAbsences: 32
  }
];

export function StudentAnalysis() {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.registration.includes(searchTerm) ||
    student.cpf.includes(searchTerm)
  );

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
  };

  return (
    <div className={`p-6 space-y-6 min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Análise de Alunos</h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Busca e análise detalhada de estudantes</p>
        </div>
      </div>

      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <Search className="h-5 w-5" />
            Buscar Aluno
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Digite o nome, matrícula ou CPF do aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Resultados da Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${isDark ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'}`}
                  onClick={() => handleStudentSelect(student)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{student.name}</p>
                      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{student.registration}</p>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{student.course}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={student.failedSubjects.length > 0 ? "destructive" : "secondary"}>
                        {student.failedSubjects.length} reprovações
                      </Badge>
                      <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{student.currentSemester}º semestre</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <p className={`text-center py-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Nenhum aluno encontrado</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <User className="h-5 w-5" />
              Perfil do Aluno
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedStudent ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Informações Básicas</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Nome:</p>
                      <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedStudent.name}</p>
                    </div>
                    <div>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Matrícula:</p>
                      <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedStudent.registration}</p>
                    </div>
                    <div>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>CPF:</p>
                      <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedStudent.cpf}</p>
                    </div>
                    <div>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Curso:</p>
                      <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedStudent.course}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className={`font-medium flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <Calendar className="h-4 w-4" />
                    Status Acadêmico
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Semestre Atual:</p>
                      <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedStudent.currentSemester}º</p>
                    </div>
                    <div>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Previsão de Formatura:</p>
                      <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedStudent.estimatedGraduation}</p>
                    </div>
                    <div>
                      <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Total de Faltas:</p>
                      <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{selectedStudent.totalAbsences}</p>
                    </div>
                  </div>
                </div>

                {selectedStudent.failedSubjects.length > 0 && (
                  <div className="space-y-2">
                    <h3 className={`font-medium flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <AlertCircle className="h-4 w-4" />
                      Disciplinas em Dependência
                    </h3>
                    <div className="space-y-1">
                      {selectedStudent.failedSubjects.map((subject, index) => (
                        <Badge key={index} variant="destructive" className="mr-2 mb-1">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className={`font-medium flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <BookOpen className="h-4 w-4" />
                    Disciplinas Concluídas
                  </h3>
                  <div className="space-y-1">
                    {selectedStudent.completedSubjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="mr-2 mb-1">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className={`text-center py-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Selecione um aluno da lista para ver os detalhes
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}