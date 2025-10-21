import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar, Clock, Users, Calculator, PlayCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface Subject {
  id: string;
  name: string;
  workload: number;
  failedStudents: number;
}

interface SimulationResult {
  selectedSubjects: string[];
  period: string;
  schedule: string;
  studentsServed: number;
  requiredTeachers: number;
  requiredRooms: number;
  impactOnGraduation: number;
}

const mockSubjects: Subject[] = [
  { id: "1", name: "Banco de Dados I", workload: 80, failedStudents: 156 },
  { id: "2", name: "Banco de Dados II", workload: 80, failedStudents: 142 },
  { id: "17", name: "PI V", workload: 80, failedStudents: 134 },
  { id: "18", name: "Segurança e Auditoria de Sistemas", workload: 60, failedStudents: 128 },
  { id: "16", name: "PI IV", workload: 80, failedStudents: 118 },
  { id: "12", name: "Engenharia de Usabilidade", workload: 60, failedStudents: 112 },
  { id: "15", name: "PI III", workload: 80, failedStudents: 108 },
  { id: "9", name: "APE III", workload: 60, failedStudents: 105 },
  { id: "8", name: "APE IV", workload: 60, failedStudents: 98 },
  { id: "14", name: "PI II", workload: 80, failedStudents: 94 }
];

export function OfferPlanning() {
  const { isDark } = useTheme();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [selectedSchedule, setSelectedSchedule] = useState<string>("");
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const topFailedSubjects = [...mockSubjects]
    .sort((a, b) => b.failedStudents - a.failedStudents)
    .slice(0, 10);

  const periods = [
    { value: "summer", label: "Férias de Verão" },
    { value: "winter", label: "Férias de Inverno" },
    { value: "saturday", label: "Aos Sábados" },
    { value: "regular", label: "Período Regular" }
  ];

  const schedules = [
    { value: "morning", label: "Manhã (7h-12h)" },
    { value: "afternoon", label: "Tarde (13h-18h)" },
    { value: "evening", label: "Noite (19h-22h)" },
    { value: "intensive", label: "Intensivo" }
  ];

  const handleSubjectToggle = (subjectId: string, checked: boolean) => {
    if (checked) {
      setSelectedSubjects([...selectedSubjects, subjectId]);
    } else {
      setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
    }
  };

  const runSimulation = () => {
    if (selectedSubjects.length === 0 || !selectedPeriod || !selectedSchedule) {
      return;
    }

    const subjects = mockSubjects.filter(s => selectedSubjects.includes(s.id));
    const totalFailedStudents = subjects.reduce((sum, s) => sum + s.failedStudents, 0);
    
    const maxStudentsPerClass = 40;
    const requiredClasses = Math.ceil(totalFailedStudents / maxStudentsPerClass);
    const requiredTeachers = requiredClasses;
    const requiredRooms = requiredClasses;

    const availabilityFactor = selectedPeriod === "regular" ? 0.9 : 
                              selectedPeriod === "saturday" ? 0.7 : 0.6;
    const studentsServed = Math.floor(totalFailedStudents * availabilityFactor);

    const impactOnGraduation = Math.floor(studentsServed * 0.4);

    const result: SimulationResult = {
      selectedSubjects: subjects.map(s => s.name),
      period: periods.find(p => p.value === selectedPeriod)?.label || "",
      schedule: schedules.find(s => s.value === selectedSchedule)?.label || "",
      studentsServed,
      requiredTeachers,
      requiredRooms,
      impactOnGraduation
    };

    setSimulationResult(result);
  };

  return (
    <div className={`p-6 space-y-6 min-h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Planejamento de Ofertas</h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Simulação e otimização da oferta de disciplinas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Calculator className="h-5 w-5" />
              Selecionar Disciplinas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Selecione as disciplinas para incluir na simulação:
              </p>
              {topFailedSubjects.map((subject) => (
                <div key={subject.id} className={`flex items-center space-x-3 p-2 border rounded-lg ${isDark ? 'border-slate-600' : 'border-slate-200'}`}>
                  <Checkbox
                    id={subject.id}
                    checked={selectedSubjects.includes(subject.id)}
                    onCheckedChange={(checked) => handleSubjectToggle(subject.id, !!checked)}
                  />
                  <div className="flex-1">
                    <label htmlFor={subject.id} className={`text-sm font-medium cursor-pointer ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {subject.name}
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="destructive" className="text-xs">
                        {subject.failedStudents} reprovados
                      </Badge>
                      <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{subject.workload}h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Clock className="h-5 w-5" />
              Parâmetros da Simulação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Período de Oferta
              </label>
              <Select onValueChange={setSelectedPeriod}>
                <SelectTrigger className={isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className={`text-sm font-medium mb-2 block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Horário
              </label>
              <Select onValueChange={setSelectedSchedule}>
                <SelectTrigger className={isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}>
                  <SelectValue placeholder="Selecione o horário" />
                </SelectTrigger>
                <SelectContent>
                  {schedules.map((schedule) => (
                    <SelectItem key={schedule.value} value={schedule.value}>
                      {schedule.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={runSimulation}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={selectedSubjects.length === 0 || !selectedPeriod || !selectedSchedule}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Executar Simulação
            </Button>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Users className="h-5 w-5" />
              Resultados da Simulação
            </CardTitle>
          </CardHeader>
          <CardContent>
            {simulationResult ? (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Configuração</h4>
                  <p className={`text-sm mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <strong>Período:</strong> {simulationResult.period}
                  </p>
                  <p className={`text-sm mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <strong>Horário:</strong> {simulationResult.schedule}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <strong>Disciplinas:</strong> {simulationResult.selectedSubjects.length}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-700'}`}>Alunos Atendidos</p>
                    <p className={`text-xl font-bold ${isDark ? 'text-green-400' : 'text-green-800'}`}>
                      {simulationResult.studentsServed}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-yellow-900/20 border-yellow-700' : 'bg-yellow-50 border-yellow-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>Professores</p>
                    <p className={`text-xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-800'}`}>
                      {simulationResult.requiredTeachers}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-purple-900/20 border-purple-700' : 'bg-purple-50 border-purple-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Salas</p>
                    <p className={`text-xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-800'}`}>
                      {simulationResult.requiredRooms}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                    <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Impacto Formatura</p>
                    <p className={`text-xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
                      +{simulationResult.impactOnGraduation}
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${isDark ? 'bg-green-900/20 border-green-700' : 'bg-green-50 border-green-200'}`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-green-300' : 'text-green-900'}`}>Benefícios Estimados</h4>
                  <ul className={`text-sm space-y-1 ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                    <li>• {simulationResult.impactOnGraduation} alunos poderão se formar mais cedo</li>
                    <li>• Redução de 15-20% na sobrecarga das disciplinas no próximo semestre</li>
                    <li>• Melhoria na taxa de retenção estudantil</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Disciplinas Selecionadas</h4>
                  <div className="flex flex-wrap gap-1">
                    {simulationResult.selectedSubjects.map((subject, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className={`text-center py-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Configure os parâmetros e execute a simulação para ver os resultados
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}