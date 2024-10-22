import React, { useState, useEffect } from 'react';
import { User, UserPlus } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role: 'student' | 'tutor';
  status: 'online' | 'offline';
}

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipantName, setNewParticipantName] = useState('');

  useEffect(() => {
    // Simulating API call to fetch participants
    const fetchParticipants = async () => {
      // Replace with actual API call
      const mockParticipants: Participant[] = [
        { id: '1', name: 'Alice Smith', role: 'tutor', status: 'online' },
        { id: '2', name: 'Bob Johnson', role: 'student', status: 'online' },
        { id: '3', name: 'Charlie Brown', role: 'student', status: 'offline' },
      ];
      setParticipants(mockParticipants);
    };

    fetchParticipants();
  }, []);

  const addParticipant = () => {
    if (newParticipantName.trim()) {
      const newParticipant: Participant = {
        id: Date.now().toString(),
        name: newParticipantName.trim(),
        role: 'student',
        status: 'online',
      };
      setParticipants([...participants, newParticipant]);
      setNewParticipantName('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Participants</h3>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Add new participant"
          className="flex-1 p-2 border rounded-l"
          value={newParticipantName}
          onChange={(e) => setNewParticipantName(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={addParticipant}
        >
          <UserPlus size={20} />
        </button>
      </div>
      <ul className="space-y-2">
        {participants.map((participant) => (
          <li key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center">
              <User size={20} className="mr-3 text-gray-500" />
              <span>{participant.name}</span>
            </div>
            <div className="flex items-center">
              <span className={`mr-2 px-2 py-1 rounded text-xs ${participant.role === 'tutor' ? 'bg-purple-200 text-purple-800' : 'bg-green-200 text-green-800'}`}>
                {participant.role}
              </span>
              <span className={`px-2 py-1 rounded text-xs ${participant.status === 'online' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                {participant.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;