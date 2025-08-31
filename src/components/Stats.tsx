import React from 'react';
import { Computer, ChangeRecord } from '../types';
import { Monitor, AlertTriangle, Archive, Activity } from 'lucide-react';

interface StatsProps {
  computers: Computer[];
  changes: ChangeRecord[];
}

export function Stats({ computers, changes }: StatsProps) {
  const activeComputers = computers.filter(c => c.status === 'Active').length;
  const maintenanceComputers = computers.filter(c => c.status === 'Maintenance').length;
  const retiredComputers = computers.filter(c => c.status === 'Retired').length;
  
  const recentChanges = changes.filter(c => {
    const changeDate = new Date(c.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return changeDate >= thirtyDaysAgo;
  }).length;

  const stats = [
    {
      label: 'Computadoras Activas',
      value: activeComputers,
      icon: Monitor,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      label: 'En Mantenimiento',
      value: maintenanceComputers,
      icon: AlertTriangle,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      label: 'Retiradas',
      value: retiredComputers,
      icon: Archive,
      color: 'bg-gray-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700'
    },
    {
      label: 'Cambios (30 días)',
      value: recentChanges,
      icon: Activity,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className={`${stat.bgColor} p-2 rounded-lg`}>
              <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}