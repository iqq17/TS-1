import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'en',
    timezone: 'UTC',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const saveSettings = () => {
    // Here you would typically save the settings to the backend
    console.log('Saving settings:', settings);
    // Show a success message to the user
    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Settings</h3>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            Enable notifications
          </label>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
              className="mr-2"
            />
            Dark mode
          </label>
        </div>
        <div>
          <label className="block mb-2">Language</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
        <div>
          <label className="block mb-2">Timezone</label>
          <select
            name="timezone"
            value={settings.timezone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time</option>
            <option value="PST">Pacific Time</option>
          </select>
        </div>
        <button
          type="button"
          onClick={saveSettings}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        >
          <Save size={20} className="mr-2" />
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;