import { useState } from 'react'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [parcels, setParcels] = useState([
    { id: 'P001', status: 'In Transit', destination: 'Station A', priority: 'High', timestamp: '2024-02-03 14:30' },
    { id: 'P002', status: 'Delivered', destination: 'Station B', priority: 'Normal', timestamp: '2024-02-03 13:45' },
    { id: 'P003', status: 'Processing', destination: 'Station C', priority: 'Low', timestamp: '2024-02-03 15:20' },
    { id: 'P004', status: 'In Transit', destination: 'Station D', priority: 'High', timestamp: '2024-02-03 16:10' },
  ])

  const stats = {
    totalParcels: 1247,
    inTransit: 89,
    delivered: 1134,
    processing: 24
  }

  const systemStatus = [
    { name: 'Conveyor Belt A', status: 'active', uptime: '99.9%' },
    { name: 'Conveyor Belt B', status: 'active', uptime: '98.7%' },
    { name: 'Sorting System', status: 'maintenance', uptime: '95.2%' },
    { name: 'RFID Scanner', status: 'active', uptime: '100%' },
  ]

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">System Online</span>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium opacity-90">Total Parcels</h3>
                    <p className="text-3xl font-bold">{stats.totalParcels.toLocaleString()}</p>
                  </div>
                  <div className="text-4xl opacity-80">📦</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium opacity-90">In Transit</h3>
                    <p className="text-3xl font-bold">{stats.inTransit}</p>
                  </div>
                  <div className="text-4xl opacity-80">🚛</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium opacity-90">Delivered</h3>
                    <p className="text-3xl font-bold">{stats.delivered.toLocaleString()}</p>
                  </div>
                  <div className="text-4xl opacity-80">✅</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium opacity-90">Processing</h3>
                    <p className="text-3xl font-bold">{stats.processing}</p>
                  </div>
                  <div className="text-4xl opacity-80">⚡</div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <span className="mr-3">🖥️</span>
                System Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {systemStatus.map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${
                        system.status === 'active' ? 'bg-green-400' : 
                        system.status === 'maintenance' ? 'bg-yellow-400' : 'bg-red-400'
                      } ${system.status === 'active' ? 'animate-pulse' : ''}`}></div>
                      <div>
                        <span className="font-medium text-gray-900">{system.name}</span>
                        <p className="text-sm text-gray-500">Uptime: {system.uptime}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      system.status === 'active' ? 'bg-green-100 text-green-800' :
                      system.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {system.status === 'active' ? 'Active' : 
                       system.status === 'maintenance' ? 'Maintenance' : 'Offline'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case 'parcels':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Parcel Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 shadow-lg">
                + Add Parcel
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Parcel ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Destination</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parcels.map((parcel) => (
                      <tr key={parcel.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono font-medium text-gray-900">{parcel.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            parcel.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            parcel.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {parcel.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcel.destination}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            parcel.priority === 'High' ? 'bg-red-100 text-red-800' :
                            parcel.priority === 'Normal' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {parcel.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcel.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 hover:bg-blue-50 px-2 py-1 rounded transition-colors">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900 hover:bg-red-50 px-2 py-1 rounded transition-colors">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">System Settings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Conveyor Configuration</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Conveyor Speed</label>
                    <input type="range" min="1" max="10" defaultValue="5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Slow</span>
                      <span>Fast</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Queue Size</label>
                    <input type="number" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" defaultValue="100" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-semibold mb-6 text-gray-800">Processing Rules</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority Processing</label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>High Priority First</option>
                      <option>FIFO (First In First Out)</option>
                      <option>LIFO (Last In First Out)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Auto Sort</label>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" defaultChecked />
                      <span className="text-sm text-gray-600">Enable automatic sorting</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg">
                Save All Settings
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PC</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Parcel Conveyor Admin</h1>
                <p className="text-sm text-gray-500">Automated Parcel Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-700 font-medium">Admin User</span>
              </div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 shadow-md">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-xl shadow-lg border border-gray-100">
            <nav className="p-4">
              <div className="space-y-2">
                {[
                  { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                  { id: 'parcels', name: 'Parcel Management', icon: '📦' },
                  { id: 'settings', name: 'Settings', icon: '⚙️' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } group flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full transition-all duration-200`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App