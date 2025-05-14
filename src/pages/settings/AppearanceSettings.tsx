
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const AppearanceSettings = () => {
  const { theme, toggleTheme, fontSize, setFontSize } = useTheme();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tema</CardTitle>
          <CardDescription>
            Personalize a aparência da aplicação com tema claro ou escuro.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              <Label htmlFor="theme-toggle">Alternar Tema</Label>
              <Moon className="h-5 w-5 text-blue-500" />
            </div>
            <Switch 
              id="theme-toggle" 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme} 
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Escolha um Tema</Label>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => theme !== 'light' && toggleTheme()}
              >
                <Sun className="mr-2 h-4 w-4" />
                <span>Claro</span>
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => theme !== 'dark' && toggleTheme()}
              >
                <Moon className="mr-2 h-4 w-4" />
                <span>Escuro</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tamanho da Fonte</CardTitle>
          <CardDescription>
            Ajuste o tamanho da fonte para melhorar a legibilidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={fontSize} 
            onValueChange={setFontSize}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem 
                value="small" 
                id="font-small" 
                className="sr-only" 
              />
              <Label
                htmlFor="font-small"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent ${
                  fontSize === 'small' ? 'border-primary' : 'border-transparent'
                }`}
              >
                <span className="text-sm">A</span>
                <span className="text-xs mt-1">Pequeno</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem 
                value="medium" 
                id="font-medium" 
                className="sr-only" 
              />
              <Label
                htmlFor="font-medium"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent ${
                  fontSize === 'medium' ? 'border-primary' : 'border-transparent'
                }`}
              >
                <span className="text-base">A</span>
                <span className="text-xs mt-1">Médio</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem 
                value="large" 
                id="font-large" 
                className="sr-only" 
              />
              <Label
                htmlFor="font-large"
                className={`flex flex-col items-center justify-between rounded-md border-2 p-4 hover:bg-accent ${
                  fontSize === 'large' ? 'border-primary' : 'border-transparent'
                }`}
              >
                <span className="text-lg">A</span>
                <span className="text-xs mt-1">Grande</span>
              </Label>
            </div>
          </RadioGroup>
          
          <div className="mt-6 rounded-md border p-4">
            <p className="mb-2 font-medium">Visualização:</p>
            <p>Este é um texto de exemplo para demonstrar o tamanho da fonte selecionado.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
