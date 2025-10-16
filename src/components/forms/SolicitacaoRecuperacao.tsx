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
      // Simular upload de arquivos
      if (files.length > 0) {
        await simulateUpload();
      }

      // Simular envio da solicitação
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
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl text-white mb-2">Solicitação Enviada!</h2>
          <p className="text-slate-400 text-center mb-6 max-w-md">
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
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Solicitar Recuperação de Matéria</CardTitle>
          <CardDescription className="text-slate-400">
            Preencha todos os campos obrigatórios e anexe a documentação necessária
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Informações da disciplina */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="disciplina" className="text-slate-300">
                Disciplina *
              </Label>
              <Select onValueChange={(value) => setValue('disciplina', value)}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Selecione a disciplina" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
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
              <Label htmlFor="periodo" className="text-slate-300">
                Período *
              </Label>
              <Input
                id="periodo"
                {...register('periodo', { required: true })}
                placeholder="Ex: 2023.2"
                className="bg-slate-700 border-slate-600 text-white"
              />
              {errors.periodo && (
                <p className="text-red-400 text-sm">Este campo é obrigatório</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargaHoraria" className="text-slate-300">
              Carga Horária *
            </Label>
            <Input
              id="cargaHoraria"
              type="number"
              {...register('cargaHoraria', { required: true, min: 1 })}
              placeholder="Ex: 60"
              className="bg-slate-700 border-slate-600 text-white"
            />
            {errors.cargaHoraria && (
              <p className="text-red-400 text-sm">Informe uma carga horária válida</p>
            )}
          </div>

          {/* Motivo */}
          <div className="space-y-2">
            <Label htmlFor="motivo" className="text-slate-300">
              Motivo da Perda *
            </Label>
            <Select onValueChange={(value) => setValue('motivo', value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
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

          {/* Justificativa */}
          <div className="space-y-2">
            <Label htmlFor="justificativa" className="text-slate-300">
              Justificativa Detalhada *
            </Label>
            <Textarea
              id="justificativa"
              {...register('justificativa', { required: true, minLength: 50 })}
              placeholder="Descreva detalhadamente os motivos que levaram à perda da matéria..."
              className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
            />
            {errors.justificativa && (
              <p className="text-red-400 text-sm">
                A justificativa deve ter pelo menos 50 caracteres
              </p>
            )}
          </div>

          {/* Upload de documentos */}
          <div className="space-y-4">
            <Label className="text-slate-300">Documentos Comprobatórios</Label>
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-400 mb-2">
                Arraste arquivos aqui ou clique para selecionar
              </p>
              <p className="text-slate-500 text-sm mb-4">
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
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Selecionar Arquivos
              </Button>
            </div>

            {/* Lista de arquivos */}
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-700 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-slate-400 mr-2" />
                      <span className="text-slate-300 text-sm">{file.name}</span>
                      <span className="text-slate-500 text-xs ml-2">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(index)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Progress bar durante upload */}
          {isSubmitting && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Enviando documentos...</span>
                <span className="text-slate-400">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Informações importantes */}
          <Alert className="bg-blue-900/20 border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-300">
              Sua solicitação será primeiro avaliada pelo professor da disciplina. 
              Após aprovação, será encaminhada para a secretaria para deferimento final.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Botões de ação */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
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
