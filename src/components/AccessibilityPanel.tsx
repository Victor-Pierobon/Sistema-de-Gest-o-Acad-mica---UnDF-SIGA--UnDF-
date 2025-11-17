import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Accessibility, 
  Eye, 
  MousePointer, 
  Type, 
  Contrast,
  Volume2,
  X,
  RotateCcw
} from 'lucide-react';

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    highContrast: false,
    largeCursor: false,
    largeText: false,
    readingGuide: false,
    soundEffects: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      const parsedSettings = JSON.parse(saved);
      setSettings(parsedSettings);
      applySettings(parsedSettings);
    }
  }, []);

  const applySettings = (newSettings: typeof settings) => {
    const root = document.documentElement;
    
    // Alto contraste
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Cursor grande
    if (newSettings.largeCursor) {
      root.classList.add('large-cursor');
    } else {
      root.classList.remove('large-cursor');
    }

    // Texto grande
    if (newSettings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Guia de leitura
    if (newSettings.readingGuide) {
      root.classList.add('reading-guide');
    } else {
      root.classList.remove('reading-guide');
    }
  };

  const updateSetting = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
    
    if (newSettings.soundEffects) {
      playClickSound();
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      highContrast: false,
      largeCursor: false,
      largeText: false,
      readingGuide: false,
      soundEffects: false
    };
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.removeItem('accessibility-settings');
  };

  const playClickSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.play().catch(() => {});
  };

  return (
    <>
      {/* Botão flutuante */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="accessibility-button bg-blue-600 hover:bg-blue-700 border-2 border-white"
        aria-label="Abrir painel de acessibilidade"
        title="Ferramentas de Acessibilidade"
      >
        <Accessibility className="h-8 w-8 text-white" />
      </Button>

      {/* Painel de acessibilidade */}
      {isOpen && (
        <Card className="accessibility-panel w-80 shadow-2xl border-2 border-blue-600" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-blue-600" />
                Acessibilidade
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar painel"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Alto Contraste */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <span className="text-sm font-medium">Alto Contraste</span>
              </div>
              <Button
                variant={settings.highContrast ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('highContrast')}
                aria-pressed={settings.highContrast}
                aria-label={`${settings.highContrast ? 'Desativar' : 'Ativar'} alto contraste`}
              >
                {settings.highContrast ? 'ON' : 'OFF'}
              </Button>
            </div>

            {/* Cursor Grande */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MousePointer className="h-4 w-4" />
                <span className="text-sm font-medium">Cursor Grande</span>
              </div>
              <Button
                variant={settings.largeCursor ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('largeCursor')}
                aria-pressed={settings.largeCursor}
                aria-label={`${settings.largeCursor ? 'Desativar' : 'Ativar'} cursor grande`}
              >
                {settings.largeCursor ? 'ON' : 'OFF'}
              </Button>
            </div>

            {/* Texto Grande */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span className="text-sm font-medium">Texto Grande</span>
              </div>
              <Button
                variant={settings.largeText ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('largeText')}
                aria-pressed={settings.largeText}
                aria-label={`${settings.largeText ? 'Desativar' : 'Ativar'} texto grande`}
              >
                {settings.largeText ? 'ON' : 'OFF'}
              </Button>
            </div>

            {/* Guia de Leitura */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">Guia de Leitura</span>
              </div>
              <Button
                variant={settings.readingGuide ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('readingGuide')}
                aria-pressed={settings.readingGuide}
                aria-label={`${settings.readingGuide ? 'Desativar' : 'Ativar'} guia de leitura`}
              >
                {settings.readingGuide ? 'ON' : 'OFF'}
              </Button>
            </div>

            {/* Efeitos Sonoros */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <span className="text-sm font-medium">Sons de Clique</span>
              </div>
              <Button
                variant={settings.soundEffects ? "default" : "outline"}
                size="sm"
                onClick={() => updateSetting('soundEffects')}
                aria-pressed={settings.soundEffects}
                aria-label={`${settings.soundEffects ? 'Desativar' : 'Ativar'} sons de clique`}
              >
                {settings.soundEffects ? 'ON' : 'OFF'}
              </Button>
            </div>

            {/* Botão Reset */}
            <div className="pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={resetSettings}
                className="w-full"
                aria-label="Restaurar configurações padrão"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restaurar Padrão
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}