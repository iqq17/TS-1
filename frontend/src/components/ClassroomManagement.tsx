import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Classroom {
  id: string;
  name: string;
  subject: string;
  students: string[];
}

const ClassroomManagement: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [newClassroom, setNewClassroom] = useState({ name: '', subject: '' });
  const [editingClassroom, setEditingClassroom] = useState<Classroom | null>(null);

  useEffect(() => {
    // Simulating API call to fetch classrooms
    const fetchClassrooms = async () => {
      // Replace with actual API call
      const mockClassrooms: Classroom[] = [
        { id: '1', name: 'Math 101', subject: 'Mathematics', students: ['Alice', 'Bob', 'Charlie'] },
        { id: '2', name: 'Physics 202', subject: 'Physics', students: ['David', 'Eve', 'Frank'] },
      ];
      setClassrooms(mockClassrooms);
    };

    fetchClassrooms();
  }, []);

  const handleAddClassroom = () => {
    if (newClassroom.name && newClassroom.subject) {
      const classroom: Classroom = {
        ...newClassroom,
        id: Date.now().toString(),
        students: [],
      };
      setClassrooms([...classrooms, classroom]);
      setNewClassroom({ name: '', subject: '' });
    }
  };

  const handleEditClassroom = (classroom: Classroom) => {
    setEditingClassroom(classroom);
  };

  const handleUpdateClassroom = () => {
    if (editingClassroom) {
      setClassrooms(classrooms.map(c => c.id === editingClassroom.id ? editingClassroom : c));
      setEditingClassroom(null);
    }
  };

  const handleDeleteClassroom = (id: string) => {
    setClassrooms(classrooms.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Classroom</h3>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Classroom Name"
            className="flex-1 p-2 border rounded"
            value={newClassroom.name}
            onChange={(e) => setNewClassroom({ ...newClassroom, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Subject"
            className="flex-1 p-2 border rounded"
            value={newClassroom.subject}
            onChange={(e) => setNewClassroom({ ...newClassroom, subject: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            onClick={handleAddClassroom}
          >
            <Plus size={20} className="mr-2" />
            Add Classroom
          </button>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Existing Classrooms</h3>
        <div className="space-y-4">
          {classrooms.map((classroom) => (
            <div key={classroom.id} className="border p-4 rounded">
              {editingClassroom && editingClassroom.id === classroom.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingClassroom.name}
                    onChange={(e) => setEditingClassroom({ ...editingClassroom, name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    value={editingClassroom.subject}
                    onChange={(e) => setEditingClassroom({ ...editingClassroom, subject: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={handleUpdateClassroom}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <>
                  <h4 className="font-semibold">{classroom.name}</h4>
                  <p>Subject: {classroom.subject}</p>
                  <p>Students: {classroom.students.join(', ')}</p>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleEditClassroom(classroom)}
                      className="text-blue-500"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClassroom(classroom.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassroomManagement;