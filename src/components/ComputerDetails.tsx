import React from 'react';
import { Computer, ChangeRecord } from '../types';
import { X, Calendar, MapPin, Settings, Monitor, Plus } from 'lucide-react';
import { formatDate, formatDateTime, getRelativeTime } from '../utils/dateUtils';

interface ComputerDetailsProps {
  computer: Computer;
  changes: ChangeRecord[];
  onClose: () => void;
  onAddChange: () => void;
}

export function ComputerDetails({ computer, changes, onClose, onAddChange }: ComputerDetailsProps) {
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

  const getChangeTypeColor = (type: ChangeRecord['type']) => {
    switch (type) {
      case 'Hardware':
        return 'bg-blue-100 text-blue-800';
      case 'Software':
        return 'bg-purple-100 text-purple-800';
      case 'Operating System':
        return 'bg-orange-100 text-orange-800';
      case 'Maintenance':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedChanges = [...changes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Monitor className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{computer.name}</h2>
              <p className="text-sm text-gray-600">{computer.brand} {computer.model}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Computer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Información del Equipo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Estado:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(computer.status)}`}>
                  {getStatusText(computer.status)}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Serie:</span>
                <span className="ml-2 text-sm text-gray-900">{computer.serialNumber || 'N/A'}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">OS:</span>
                <span className="ml-2 text-sm text-gray-900">{computer.operatingSystem}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">CPU:</span>
                <span className="ml-2 text-sm text-gray-900">{computer.processor}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">RAM:</span>
                <span className="ml-2 text-sm text-gray-900">{computer.ram}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Storage:</span>
                <span className="ml-2 text-sm text-gray-900">{computer.storage}</span>
              </div>
              {computer.graphics && (
                <div>
                  <span className="text-sm font-medium text-gray-700">GPU:</span>
                  <span className="ml-2 text-sm text-gray-900">{computer.graphics}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="h-3 w-3 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">{formatDate(computer.purchaseDate)}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-3 w-3 text-gray-500 mr-1" />
                <span className="text-sm text-gray-600">{computer.location}</span>
              </div>
            </div>
          </div>

          {/* Change History */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Historial de Cambios</h3>
              <button
                onClick={onAddChange}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 text-sm transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Registrar Cambio</span>
              </button>
            </div>

            {sortedChanges.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Settings className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No hay cambios registrados para esta computadora</p>
                <p className="text-sm">Haz clic en "Registrar Cambio" para agregar el primer registro</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedChanges.map((change) => (
                  <div key={change.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getChangeTypeColor(change.type)}`}>
                          {change.type}
                        </span>
                        <h4 className="font-medium text-gray-900">{change.description}</h4>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div>{formatDateTime(change.date)}</div>
                        <div className="text-xs">{getRelativeTime(change.date)}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">Componente:</span>
                        <span className="text-sm text-gray-900">{change.component}</span>
                      </div>
                      
                      {(change.previousValue || change.newValue) && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Cambio:</span>
                          <div className="flex items-center space-x-2 text-sm">
                            {change.previousValue && (
                              <>
                                <span className="bg-red-50 text-red-700 px-2 py-1 rounded">{change.previousValue}</span>
                                <span className="text-gray-400">→</span>
                              </>
                            )}
                            <span className="bg-green-50 text-green-700 px-2 py-1 rounded">{change.newValue}</span>
                          </div>
                        </div>
                      )}
                      
                      {change.notes && (
                        <div className="flex items-start space-x-2">
                          <span className="text-sm font-medium text-gray-700">Notas:</span>
                          <span className="text-sm text-gray-600">{change.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}