import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Users, 
  BookOpen, 
  Calendar, 
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react';

interface GerenciarTurmasProps {
  onBack: () => void;
}

export function GerenciarTurmas({ onBack }: GerenciarTurmasProps) {
  const { isDark } = useTheme();

  const turmas = [
    {
      id: '1',
      nome: 'Algoritmos Avançados',
      codigo: 'ALG001-A',
      periodo: '2024.1',
      alunos: 35,
      horario: 'Seg/Qua 08:00-10:00',
      sala: 'Lab 1',
      cargaHoraria: 60,
      aulasDadas: 28,
      frequenciaMedia: 87.5,
      notaMedia: 7.2,
      aprovados: 28,
      reprovados: 4,
      emAndamento: 3
    },
    {
      id: '2',
      nome: 'Estruturas de Dados',
      codigo: 'EDD002-B',
      periodo: '2024.1',
      alunos: 28,
      horario: 'Ter/Qui 14:00-16:00',
      sala: 'Lab 2',
      cargaHoraria: 60,
      aulasDadas: 30,
      frequenciaMedia: 82.1,
      notaMedia: 6.8,
      aprovados: 22,
      reprovados: 3,
      emAndamento: 3
    },
    {
      id: '3',
      nome: 'Programação III',
      codigo: 'PRG003-C',
      periodo: '2024.1',
      alunos: 32,
      horario: 'Sex 16:00-20:00',
      sala: 'Sala 15',
      cargaHoraria: 60,
      aulasDadas: 25,
      frequenciaMedia: 89.3,
      notaMedia: 7.8,
      aprovados: 26,
      reprovados: 2,
      emAndamento: 4
    }
  ];

  const alunosRisco = [
    { nome: 'Ana Carolina', turma: 'Algoritmos Avançados', faltas: 8, nota: 5.2, situacao: 'Frequência' },
    { nome: 'Carlos Eduardo', turma: 'Estruturas de Dados', faltas: 9, nota: 4.8, situacao: 'Nota e Frequência' },
    { nome: 'Beatriz Lima', turma: 'Programação III', faltas: 7, nota: 6.1, situacao: 'Frequência' }
  ];

  const proximasAtividades = [
    { turma: 'Algoritmos Avançados', atividade: 'Prova P2', data: '2024-02-15', tipo: 'Avaliação' },
    { turma: 'Estruturas de Dados', atividade: 'Projeto Final', data: '2024-02-18', tipo: 'Projeto' },
    { turma: 'Programação III', atividade: 'Lista de Exercícios 3', data: '2024-02-20', tipo: 'Exercício' }
  ];

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
            Gerenciar Turmas
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Visão geral e gestão das suas turmas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Total de Turmas
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {turmas.length}
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {turmas.reduce((acc, t) => acc + t.alunos, 0)} alunos total
            </p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Frequência Média
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {(turmas.reduce((acc, t) => acc + t.frequenciaMedia, 0) / turmas.length).toFixed(1)}%
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Todas as turmas
            </p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Nota Média
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {(turmas.reduce((acc, t) => acc + t.notaMedia, 0) / turmas.length).toFixed(1)}
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Média geral
            </p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Alunos em Risco
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {alunosRisco.length}
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Necessitam atenção
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="turmas" className="w-full">
        <TabsList className={`grid w-full grid-cols-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
          <TabsTrigger value="turmas">Minhas Turmas</TabsTrigger>
          <TabsTrigger value="alunos-risco">Alunos em Risco</TabsTrigger>
          <TabsTrigger value="atividades">Próximas Atividades</TabsTrigger>
        </TabsList>

        <TabsContent value="turmas" className="space-y-4">
          {turmas.map((turma) => (
            <Card key={turma.id} className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                      {turma.nome}
                    </CardTitle>
                    <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                      {turma.codigo} - {turma.periodo}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className={isDark ? 'bg-slate-600 text-slate-200' : 'bg-slate-200 text-slate-700'}>
                    <Users className="h-3 w-3 mr-1" />
                    {turma.alunos} alunos
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Progresso do Curso
                      </span>
                      <Clock className="h-4 w-4 text-blue-500" />
                    </div>
                    <Progress 
                      value={(turma.aulasDadas / turma.cargaHoraria) * 100} 
                      className="mb-2"
                    />
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {turma.aulasDadas}h de {turma.cargaHoraria}h
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Frequência Média
                      </span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {turma.frequenciaMedia}%
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Nota Média
                      </span>
                      <BarChart3 className="h-4 w-4 text-purple-500" />
                    </div>
                    <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {turma.notaMedia}
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Situação
                      </span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex space-x-1">
                      <Badge className="bg-green-600 text-xs">
                        {turma.aprovados} Aprov.
                      </Badge>
                      <Badge variant="destructive" className="text-xs">
                        {turma.reprovados} Reprov.
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {turma.horario} - {turma.sala}
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Gerenciar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="alunos-risco" className="space-y-4">
          <Card className={isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                <AlertTriangle className="h-5 w-5 mr-2" />
                Alunos que Necessitam Atenção
              </CardTitle>
              <CardDescription className={isDark ? 'text-red-300' : 'text-red-600'}>
                Alunos com risco de reprovação por nota ou frequência
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alunosRisco.map((aluno, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <div>
                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {aluno.nome}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {aluno.turma}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex space-x-2">
                        <Badge variant="destructive">
                          {aluno.faltas} faltas
                        </Badge>
                        <Badge variant="outline" className="border-yellow-600 text-yellow-600">
                          Nota: {aluno.nota}
                        </Badge>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Risco: {aluno.situacao}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="atividades" className="space-y-4">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                Próximas Atividades
              </CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Atividades programadas para as próximas semanas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proximasAtividades.map((atividade, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div>
                      <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {atividade.atividade}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {atividade.turma}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={atividade.tipo === 'Avaliação' ? 'destructive' : 'secondary'}
                        className={atividade.tipo === 'Projeto' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                      >
                        {atividade.tipo}
                      </Badge>
                      <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {new Date(atividade.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}