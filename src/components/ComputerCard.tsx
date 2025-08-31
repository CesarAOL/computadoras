import React from 'react';
import { Computer } from '../types';
import { Monitor, Calendar, MapPin, Settings, Eye } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

interface ComputerCardProps {
  computer: Computer;
  onViewDetails: (computer: Computer) => void;
  onAddChange: (computerId: string) => void;
}

export function ComputerCard({ computer, onViewDetails, onAddChange }: ComputerCardProps) {
  const getStatusColor = (status: Computer['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Retired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Computer['status']) => {
    switch (status) {
      case 'Active':
        return 'Activa';
      case 'Maintenance':
        return 'Mantenimiento';
      case 'Retired':
        return 'Retirada';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Monitor className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{computer.name}</h3>
              <p className="text-sm text-gray-600">{computer.brand} {computer.model}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(computer.status)}`}>
            {getStatusText(computer.status)}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium w-24">OS:</span>
            <span>{computer.operatingSystem}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium w-24">CPU:</span>
            <span className="truncate">{computer.processor}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium w-24">RAM:</span>
            <span>{computer.ram}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium w-24">Storage:</span>
            <span>{computer.storage}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(computer.purchaseDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{computer.location}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails(computer)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg flex items-center space-x-1 text-sm transition-colors duration-200"
            >
              <Eye className="h-3 w-3" />
              <span>Ver</span>
            </button>
            <button
              onClick={() => onAddChange(computer.id)}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-lg flex items-center space-x-1 text-sm transition-colors duration-200"
            >
              <Settings className="h-3 w-3" />
              <span>Cambio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}