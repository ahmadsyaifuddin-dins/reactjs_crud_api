import React, { useEffect, useState } from 'react';
import { PlusCircle, Edit2, Trash2, User } from 'lucide-react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    getAllData();
  }, []);

  async function getAllData() {
    const response = await axios.get(API_URL);
    setData(response.data);
  }

  async function addData() {
    if (!name || !email || !age) {
      alert('Please fill in all fields!');
      return;
    }
    const response = await axios.post(API_URL, {
      name,
      email,
      age
    });
    setName('');
    setEmail('');
    setAge('');
    getAllData();
  }

  async function editData(id) {
    setId(id);
    const response = await axios.get(`${API_URL}/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setAge(response.data.age);
  }

  async function updateData(id) {
    if (!name || !email || !age) {
      alert('Please fill in all fields!');
      return;
    }
    const response = await axios.put(`${API_URL}/${id}`, {
      name,
      email,
      age
    });
    setName('');
    setEmail('');
    setAge('');
    setId(null);
  }

  async function deleteData(id) {
    if (confirm('Are you sure you want to delete this user?')) {
      const response = await axios.delete(`${API_URL}/${id}`);
      getAllData();
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    if (id) {
      await updateData(id);
    } else {
      await addData();
    }
    getAllData();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
          Sistem Manajemen Pengguna
          </h1>
          <p className="mt-2 text-sm text-gray-600">
          Kelola pengguna Anda secara efisien dan efektif
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {id ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
          </h2>
          <form onSubmit={handleClick} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukan nama"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukan email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Usia
                </label>
                <input
                  type="number" min="0" max="200"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Masukan usia"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {id ? (
                  <>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Update Pengguna
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Tambah Pengguna
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Users List Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Daftar Pengguna</h2>
          </div>
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usia
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <User className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{item.age} Tahun</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => editData(item.id)}
                        className="inline-flex items-center p-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteData(item.id)}
                        className="inline-flex items-center p-2 text-sm font-medium text-red-600 hover:text-red-800 focus:outline-none"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;