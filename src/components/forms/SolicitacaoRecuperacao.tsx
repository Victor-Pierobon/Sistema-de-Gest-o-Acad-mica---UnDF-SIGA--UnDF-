import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Progress } from '../ui/progress';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  X,
  Calendar,
  Clock
} from 'lucide-react';
import { toast } from "sonner";

interface FormData {
  disciplina: string;
  periodo: string;
  cargaHoraria: number;
  motivo: string;
  justificativa: string;
}

export function SolicitacaoRecuperacao() {
  const { isDark } = useTheme();
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>();

  const disciplinasDisponiveis = [
    'Algoritmos Avançados',
    'Estruturas de Dados',
    'Banco de Dados II',
    'Engenharia de Software',
    'Redes de Computadores',
    'Inteligência Artificial',
    'Compiladores',
    'Sistemas Operacionais'
  ];

  const motivosComuns = [
    'Problemas de saúde',
    'Questões familiares',
    'Dificuldades financeiras',
    'Incompatibilidade de horário com trabalho',
    'Problemas pedagógicos',
    'Outro'
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const isValidType = file.type === 'application/pdf' || file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== selectedFiles.length) {
      toast.error('Alguns arquivos foram rejeitados. Apenas PDF e imagens até 10MB são aceitos.');
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateUpload = () => {
    return new Promise<void>((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 200);
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      if (files.length > 0) {
        await simulateUpload();
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitSuccess(true);
      toast.success('Solicitação enviada com sucesso!');
    } catch (error) {
      toast.error('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h2 className={`text-2xl mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Solicitação Enviada!</h2>
          <p className={`text-center mb-6 max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Sua solicitação de recuperação foi enviada com sucesso. 
            Você receberá uma notificação quando ela for avaliada pelo professor.
          </p>
          <Button onClick={() => setSubmitSuccess(false)} className="bg-blue-600 hover:bg-blue-700">
            Nova Solicitação
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Solicitar Recuperação de Matéria</CardTitle>
          <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Preencha todos os campos obrigatórios e anexe a documentação necessária
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="disciplina" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                Disciplina *
              </Label>
              <Select onValueChange={(value) => setValue('disciplina', value)}>
                <SelectTrigger className={isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}>
                  <SelectValue placeholder="Selecione a disciplina" />
                </SelectTrigger>
                <SelectContent className={isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'}>
                  {disciplinasDisponiveis.map(disciplina => (
                    <SelectItem key={disciplina} value={disciplina}>
                      {disciplina}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.disciplina && (
                <p className="text-red-400 text-sm">Este campo é obrigatório</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="periodo" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                Período *
              </Label>
              <Input
                id="periodo"
                {...register('periodo', { required: true })}
                placeholder="Ex: 2023.2"
                className={isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}
              />
              {errors.periodo && (
                <p className="text-red-400 text-sm">Este campo é obrigatório</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargaHoraria" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              Carga Horária *
            </Label>
            <Input
              id="cargaHoraria"
              type="number"
              {...register('cargaHoraria', { required: true, min: 1 })}
              placeholder="Ex: 60"
              className={isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}
            />
            {errors.cargaHoraria && (
              <p className="text-red-400 text-sm">Informe uma carga horária válida</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              Motivo da Perda *
            </Label>
            <Select onValueChange={(value) => setValue('motivo', value)}>
              <SelectTrigger className={isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}>
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent className={isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'}>
                {motivosComuns.map(motivo => (
                  <SelectItem key={motivo} value={motivo}>
                    {motivo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.motivo && (
              <p className="text-red-400 text-sm">Este campo é obrigatório</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="justificativa" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              Justificativa Detalhada *
            </Label>
            <Textarea
              id="justificativa"
              {...register('justificativa', { required: true, minLength: 50 })}
              placeholder="Descreva detalhadamente os motivos que levaram à perda da matéria..."
              className={`min-h-[100px] ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'}`}
            />
            {errors.justificativa && (
              <p className="text-red-400 text-sm">
                A justificativa deve ter pelo menos 50 caracteres
              </p>
            )}
          </div>

          <div className="space-y-4">
            <Label className={isDark ? 'text-slate-300' : 'text-slate-700'}>Documentos Comprobatórios</Label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${isDark ? 'border-slate-600' : 'border-slate-300'}`}>
              <Upload className={`h-8 w-8 mx-auto mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
              <p className={`mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Arraste arquivos aqui ou clique para selecionar
              </p>
              <p className={`text-sm mb-4 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                PDF ou imagens até 10MB cada
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
              >
                Selecionar Arquivos
              </Button>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}
                  >
                    <div className="flex items-center">
                      <FileText className={`h-4 w-4 mr-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                      <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{file.name}</span>
                      <span className={`text-xs ml-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(index)}
                      className={`hover:text-red-400 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Enviando documentos...</span>
                <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <Alert className={isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'}>
            <AlertCircle className={`h-4 w-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <AlertDescription className={isDark ? 'text-blue-300' : 'text-blue-700'}>
              Sua solicitação será primeiro avaliada pelo professor da disciplina. 
              Após aprovação, será encaminhada para a secretaria para deferimento final.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Enviando...
            </>
          ) : (
            'Enviar Solicitação'
          )}
        </Button>
      </div>
    </form>
  );
}