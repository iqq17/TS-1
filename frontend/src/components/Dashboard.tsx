import React, { useState, useEffect } from 'react';
import { VideoCall } from './VideoCall';
import Calendar from './Calendar';
import ClassroomManagement from './ClassroomManagement';
import ProgressTracking from './ProgressTracking';
import Chat from './Chat';
import Participants from './Participants';
import Settings from './Settings';
import { Users, Video, MessageSquare, Settings as SettingsIcon, LogOut, Calendar as CalendarIcon, BookOpen, TrendingUp, Bell } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('video');
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Simulating real-time notifications
    const notificationInterval = setInterval(() => {
      const newNotification = `New notification ${Date.now()}`;
      setNotifications(prev => [...prev, newNotification]);
    }, 30000);

    return () => clearInterval(notificationInterval);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">TutorConnect</h1>
        </div>
        <nav className="mt-6">
          <NavItem icon={<Video size={20} />} label="Video Call" tab="video" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<Users size={20} />} label="Participants" tab="users" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<MessageSquare size={20} />} label="Chat" tab="chat" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<CalendarIcon size={20} />} label="Calendar" tab="calendar" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<BookOpen size={20} />} label="Classrooms" tab="classrooms" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<TrendingUp size={20} />} label="Progress" tab="progress" activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavItem icon={<SettingsIcon size={20} />} label="Settings" tab="settings" activeTab={activeTab} setActiveTab={setActiveTab} />
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <LogOut className="mr-3" size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {activeTab === 'video' && 'Video Call'}
              {activeTab === 'users' && 'Participants'}
              {activeTab === 'chat' && 'Chat'}
              {activeTab === 'calendar' && 'Calendar'}
              {activeTab === 'classrooms' && 'Classroom Management'}
              {activeTab === 'progress' && 'Progress Tracking'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
            <div className="relative">
              <Bell size={24} className="text-gray-600 cursor-pointer" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'video' && <VideoCall token="your_token_here" groupId="your_group_id_here" />}
            {activeTab === 'users' && <Participants />}
            {activeTab === 'chat' && <Chat />}
            {activeTab === 'calendar' && <Calendar />}
            {activeTab === 'classrooms' && <ClassroomManagement />}
            {activeTab === 'progress' && <ProgressTracking />}
            {activeTab === 'settings' && <Settings />}
          </div>
        </main>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; tab: string; activeTab: string; setActiveTab: (tab: string) => void }> = ({ icon, label, tab, activeTab, setActiveTab }) => (
  <a
    className={`flex items-center py-3 px-6 ${
      activeTab === tab ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
    } cursor-pointer`}
    onClick={() => setActiveTab(tab)}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </a>
);

export default Dashboard;