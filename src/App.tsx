import React, { useState } from 'react';
import { Computer, ChangeRecord, ComputerFormData, ChangeFormData } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { SearchAndFilter } from './components/SearchAndFilter';
import { ComputerCard } from './components/ComputerCard';
import { ComputerForm } from './components/ComputerForm';
import { ChangeForm } from './components/ChangeForm';
import { ComputerDetails } from './components/ComputerDetails';

function App() {
  const [computers, setComputers] = useLocalStorage<Computer[]>('computers', []);
  const [changes, setChanges] = useLocalStorage<ChangeRecord[]>('changes', []);
  
  const [showComputerForm, setShowComputerForm] = useState(false);
  const [showChangeForm, setShowChangeForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedComputer, setSelectedComputer] = useState<Computer | null>(null);
  const [selectedComputerId, setSelectedComputerId] = useState<string>('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleAddComputer = (data: ComputerFormData) => {
    const newComputer: Computer = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setComputers(prev => [...prev, newComputer]);
    setShowComputerForm(false);
  };

  const handleAddChange = (computerId: string) => {
    setSelectedComputerId(computerId);
    setShowChangeForm(true);
  };

  const handleSubmitChange = (data: ChangeFormData) => {
    const newChange: ChangeRecord = {
      ...data,
      id: generateId(),
      computerId: selectedComputerId,
      createdAt: new Date().toISOString(),
    };
    setChanges(prev => [...prev, newChange]);
    setShowChangeForm(false);
    setSelectedComputerId('');
  };

  const handleViewDetails = (computer: Computer) => {
    setSelectedComputer(computer);
    setShowDetails(true);
  };

  const handleDetailsAddChange = () => {
    if (selectedComputer) {
      setSelectedComputerId(selectedComputer.id);
      setShowChangeForm(true);
    }
  };

  const filteredComputers = computers.filter(computer => {
    const matchesSearch = searchTerm === '' || 
      computer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      computer.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      computer.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      computer.operatingSystem.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || computer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const selectedComputerChanges = selectedComputer 
    ? changes.filter(change => change.computerId === selectedComputer.id)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddComputer={() => setShowComputerForm(true)} />
      
      <main className="max-w-7xl mx-auto px-6 py-6">
        <Stats computers={computers} changes={changes} />
        
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />

        {filteredComputers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Monitor className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {computers.length === 0 ? 'No hay computadoras registradas' : 'No se encontraron resultados'}
            </h3>
            <p className="text-gray-600 mb-4">
              {computers.length === 0 
                ? 'Comienza agregando tu primera computadora al inventario' 
                : 'Intenta ajustar los filtros de búsqueda'
              }
            </p>
            {computers.length === 0 && (
              <button
                onClick={() => setShowComputerForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Agregar Primera Computadora
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComputers.map(computer => (
              <ComputerCard
                key={computer.id}
                computer={computer}
                onViewDetails={handleViewDetails}
                onAddChange={handleAddChange}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {showComputerForm && (
        <ComputerForm
          onSubmit={handleAddComputer}
          onClose={() => setShowComputerForm(false)}
        />
      )}

      {showChangeForm && (
        <ChangeForm
          onSubmit={handleSubmitChange}
          onClose={() => {
            setShowChangeForm(false);
            setSelectedComputerId('');
          }}
          computerName={
            selectedComputer?.name || 
            computers.find(c => c.id === selectedComputerId)?.name || 
            'Computadora'
          }
        />
      )}

      {showDetails && selectedComputer && (
        <ComputerDetails
          computer={selectedComputer}
          changes={selectedComputerChanges}
          onClose={() => {
            setShowDetails(false);
            setSelectedComputer(null);
          }}
          onAddChange={handleDetailsAddChange}
        />
      )}
    </div>
  );
}

export default App;