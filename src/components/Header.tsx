import React from 'react';
import { Monitor, Plus } from 'lucide-react';

interface HeaderProps {
  onAddComputer: () => void;
}

export function Header({ onAddComputer }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Monitor className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventario de Computadoras</h1>
            <p className="text-sm text-gray-600">Gestiona tu inventario y historial de cambios</p>
          </div>
        </div>
        
        <button
          onClick={onAddComputer}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Agregar Computadora</span>
        </button>
      </div>
    </header>
  );
}