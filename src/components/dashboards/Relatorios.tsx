import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  FileText, 
  Download, 
  Calendar,
  Users,
  BookOpen,
  TrendingDown,
  ArrowLeft,
  Filter
} from 'lucide-react';

interface RelatoriosProps {
  onBack: () => void;
}

export function Relatorios({ onBack }: RelatoriosProps) {
  const { isDark } = useTheme();
  const [tipoRelatorio, setTipoRelatorio] = useState('');
  const [periodo, setPeriodo] = useState('');

  const relatoriosDisponiveis = [
    {
      id: 'disciplinas-criticas',
      nome: 'Disciplinas Críticas',
      descricao: 'Relatório das disciplinas com maior taxa de reprovação',
      icon: BookOpen,
      dados: [
        { disciplina: 'Banco de Dados II', codigo: 'BDII401', taxa: '63.64%', alunos: 11, reprovacoes: 7 },
        { disciplina: 'Algoritmos', codigo: 'ALG101', taxa: '54.55%', alunos: 11, reprovacoes: 6 },
        { disciplina: 'Cálculo I', codigo: 'CALC101', taxa: '50.00%', alunos: 4, reprovacoes: 2 },
        { disciplina: 'Banco de Dados I', codigo: 'BD201', taxa: '33.33%', alunos: 3, reprovacoes: 1 }
      ]
    },
    {
      id: 'alunos-risco',
      nome: 'Alunos em Risco',
      descricao: 'Lista de alunos com risco de evasão',
      icon: Users,
      dados: [
        { nome: 'Carlos Souza Lima', matricula: '202110003', reprovacoes: 5, cr: 4.1, status: 'Trancado', risco: 'CRÍTICO' },
        { nome: 'João Silva Santos', matricula: '202110001', reprovacoes: 4, cr: 6.2, status: 'Ativo', risco: 'ALTO' },
        { nome: 'Lucas Gabriel Ferreira', matricula: '202110005', reprovacoes: 2, cr: 6.8, status: 'Ativo', risco: 'MÉDIO' },
        { nome: 'Matheus Azevedo', matricula: '202120007', reprovacoes: 2, cr: 7.2, status: 'Ativo', risco: 'MÉDIO' }
      ]
    },
    {
      id: 'solicitacoes',
      nome: 'Solicitações de Recuperação',
      descricao: 'Relatório de todas as solicitações por período',
      icon: FileText,
      dados: [
        { aluno: 'João Silva Santos', disciplina: 'Banco de Dados II', data: '2023-12-15', status: 'Indeferida' },
        { aluno: 'Carlos Souza Lima', disciplina: 'Cálculo I', data: '2021-06-20', status: 'Indeferida' },
        { aluno: 'Lucas Gabriel Ferreira', disciplina: 'Banco de Dados II', data: '2023-12-10', status: 'Deferida' }
      ]
    },
    {
      id: 'performance-geral',
      nome: 'Performance Geral',
      descricao: 'Métricas consolidadas do sistema',
      icon: TrendingDown,
      dados: [
        { metrica: 'Total de Alunos', valor: '10' },
        { metrica: 'Alunos em Risco', valor: '4 (40%)' },
        { metrica: 'Disciplinas Críticas', valor: '4' },
        { metrica: 'Taxa de Reprovação Média', valor: '42.3%' },
        { metrica: 'Alunos Ativos', valor: '9' },
        { metrica: 'Alunos Trancados', valor: '1' }
      ]
    }
  ];

  const gerarRelatorio = (relatorio: any) => {
    // Simular geração de PDF
    const conteudo = `RELATÓRIO: ${relatorio.nome.toUpperCase()}\n` +
                    `Gerado em: ${new Date().toLocaleDateString('pt-BR')}\n` +
                    `Período: ${periodo || 'Todos os períodos'}\n\n` +
                    `DADOS:\n` +
                    JSON.stringify(relatorio.dados, null, 2);
    
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${relatorio.id}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Relatórios</h1>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Gere relatórios acadêmicos em PDF</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className={`w-40 ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-300'}`}>
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent className={isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'}>
              <SelectItem value="2024.2">2024.2</SelectItem>
              <SelectItem value="2024.1">2024.1</SelectItem>
              <SelectItem value="2023.2">2023.2</SelectItem>
              <SelectItem value="2023.1">2023.1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatoriosDisponiveis.map((relatorio) => (
          <Card key={relatorio.id} className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <relatorio.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>{relatorio.nome}</CardTitle>
                  <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    {relatorio.descricao}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Prévia dos Dados:</h4>
                  <div className="space-y-2 text-sm">
                    {relatorio.dados.slice(0, 3).map((item: any, index: number) => (
                      <div key={index} className={`flex justify-between ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <span>{Object.values(item)[0] as string}</span>
                        <span className="font-medium">{Object.values(item)[1] as string}</span>
                      </div>
                    ))}
                    {relatorio.dados.length > 3 && (
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        +{relatorio.dados.length - 3} itens adicionais
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className={isDark ? 'bg-slate-600 text-slate-200' : 'bg-slate-200 text-slate-700'}>
                    {relatorio.dados.length} registros
                  </Badge>
                  <Button
                    onClick={() => gerarRelatorio(relatorio)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Instruções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              • Selecione um período específico ou deixe em branco para incluir todos os dados
            </p>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              • Os relatórios são gerados em formato PDF para facilitar o compartilhamento
            </p>
            <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              • Use os dados para identificar padrões e tomar decisões acadêmicas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}