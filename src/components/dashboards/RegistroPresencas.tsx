import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTheme } from '../../contexts/ThemeContext';
import { ArrowLeft, Users, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface RegistroPresencasProps {
  onBack: () => void;
}

export function RegistroPresencas({ onBack }: RegistroPresencasProps) {
  const { isDark } = useTheme();
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [presencas, setPresencas] = useState<Record<string, boolean>>({});

  const turmas = [
    { id: '1', nome: 'Algoritmos Avançados - Turma A', codigo: 'ALG001-A' },
    { id: '2', nome: 'Estruturas de Dados - Turma B', codigo: 'EDD002-B' },
    { id: '3', nome: 'Programação III - Turma C', codigo: 'PRG003-C' }
  ];

  const alunos = [
    { id: '1', nome: 'Ana Carolina Silva', matricula: '2021001001', presencasTotal: 28, faltasTotal: 4 },
    { id: '2', nome: 'Bruno Santos Costa', matricula: '2021001002', presencasTotal: 30, faltasTotal: 2 },
    { id: '3', nome: 'Carlos Eduardo Lima', matricula: '2021001003', presencasTotal: 25, faltasTotal: 7 },
    { id: '4', nome: 'Daniela Oliveira', matricula: '2021001004', presencasTotal: 29, faltasTotal: 3 },
    { id: '5', nome: 'Eduardo Ferreira', matricula: '2021001005', presencasTotal: 31, faltasTotal: 1 },
    { id: '6', nome: 'Fernanda Rodrigues', matricula: '2021001006', presencasTotal: 27, faltasTotal: 5 },
    { id: '7', nome: 'Gabriel Almeida', matricula: '2021001007', presencasTotal: 26, faltasTotal: 6 },
    { id: '8', nome: 'Helena Martins', matricula: '2021001008', presencasTotal: 32, faltasTotal: 0 }
  ];

  const handlePresencaChange = (alunoId: string, presente: boolean) => {
    setPresencas(prev => ({
      ...prev,
      [alunoId]: presente
    }));
  };

  const handleSalvarPresencas = () => {
    // Simular salvamento
    alert('Presenças registradas com sucesso!');
    setPresencas({});
  };

  const turmaAtual = turmas.find(t => t.id === turmaSelecionada);
  const totalPresentes = Object.values(presencas).filter(Boolean).length;
  const totalAusentes = Object.values(presencas).filter(p => p === false).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Registro de Presenças
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Registre a presença dos alunos na aula de hoje
          </p>
        </div>
      </div>

      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
            Selecionar Turma
          </CardTitle>
          <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Escolha a turma para registrar as presenças
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={turmaSelecionada} onValueChange={setTurmaSelecionada}>
            <SelectTrigger className={`w-full ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-300'}`}>
              <SelectValue placeholder="Selecione uma turma" />
            </SelectTrigger>
            <SelectContent>
              {turmas.map((turma) => (
                <SelectItem key={turma.id} value={turma.id}>
                  {turma.nome} ({turma.codigo})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {turmaSelecionada && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Total de Alunos
                </CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {alunos.length}
                </div>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Presentes
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {totalPresentes}
                </div>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Ausentes
                </CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {totalAusentes}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                Lista de Chamada - {turmaAtual?.nome}
              </CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Data: {new Date().toLocaleDateString('pt-BR')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alunos.map((aluno) => {
                  const percentualFaltas = (aluno.faltasTotal / (aluno.presencasTotal + aluno.faltasTotal)) * 100;
                  const emRisco = percentualFaltas > 20;
                  
                  return (
                    <div
                      key={aluno.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'
                      } ${emRisco ? (isDark ? 'border-red-800 bg-red-900/20' : 'border-red-200 bg-red-50') : ''}`}
                    >
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          id={`presenca-${aluno.id}`}
                          checked={presencas[aluno.id] === true}
                          onCheckedChange={(checked) => handlePresencaChange(aluno.id, checked as boolean)}
                        />
                        <div>
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {aluno.nome}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Matrícula: {aluno.matricula}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            Presenças: {aluno.presencasTotal}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Faltas: {aluno.faltasTotal} ({percentualFaltas.toFixed(1)}%)
                          </p>
                        </div>
                        
                        {emRisco && (
                          <Badge variant="destructive">
                            Risco
                          </Badge>
                        )}
                        
                        {presencas[aluno.id] === true && (
                          <Badge className="bg-green-600 hover:bg-green-700">
                            Presente
                          </Badge>
                        )}
                        
                        {presencas[aluno.id] === false && (
                          <Badge variant="destructive">
                            Ausente
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setPresencas({})}
                  className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
                >
                  Limpar
                </Button>
                <Button
                  onClick={handleSalvarPresencas}
                  disabled={Object.keys(presencas).length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Salvar Presenças
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}