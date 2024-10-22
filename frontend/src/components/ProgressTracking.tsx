import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PlusCircle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface StudentProgress {
  id: string;
  name: string;
  scores: number[];
}

const ProgressTracking: React.FC = () => {
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);
  const [newScore, setNewScore] = useState('');

  useEffect(() => {
    // Simulating API call to fetch student progress data
    const fetchStudentProgress = async () => {
      // Replace with actual API call
      const mockStudents: StudentProgress[] = [
        { id: '1', name: 'Alice', scores: [75, 80, 85, 90, 88] },
        { id: '2', name: 'Bob', scores: [70, 72, 78, 82, 85] },
        { id: '3', name: 'Charlie', scores: [85, 88, 90, 92, 95] },
      ];
      setStudents(mockStudents);
      setSelectedStudent(mockStudents[0]);
    };

    fetchStudentProgress();
  }, []);

  const chartData = {
    labels: selectedStudent ? selectedStudent.scores.map((_, index) => `Week ${index + 1}`) : [],
    datasets: [
      {
        label: 'Score',
        data: selectedStudent ? selectedStudent.scores : [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: selectedStudent ? `${selectedStudent.name}'s Progress` : 'Student Progress',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const handleAddScore = () => {
    if (selectedStudent && newScore) {
      const score = parseInt(newScore);
      if (!isNaN(score) && score >= 0 && score <= 100) {
        const updatedStudent = {
          ...selectedStudent,
          scores: [...selectedStudent.scores, score],
        };
        setStudents(students.map(s => s.id === selectedStudent.id ? updatedStudent : s));
        setSelectedStudent(updatedStudent);
        setNewScore('');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Student Progress</h3>
        <div className="flex space-x-4 mb-4">
          <select
            className="p-2 border rounded flex-1"
            value={selectedStudent?.id || ''}
            onChange={(e) => setSelectedStudent(students.find(s => s.id === e.target.value) || null)}
          >
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="New Score"
            className="p-2 border rounded w-24"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            min="0"
            max="100"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
            onClick={handleAddScore}
          >
            <PlusCircle size={20} className="mr-2" />
            Add Score
          </button>
        </div>
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;