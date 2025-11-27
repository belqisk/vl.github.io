
import React from 'react';
import { Switch } from "@headlessui/react";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
}

/**
 * ToggleSwitch Component
 * 
 * Purpose: A reusable toggle switch for settings (e.g., Dark Mode, Auto-play).
 * Styling: Uses Headless UI for accessibility and Tailwind for styling. Orange accent when active.
 */
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ enabled, onChange, label }) => {
  return (
    <div className="flex items-center justify-between py-3">
      {label && <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>}
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? 'bg-orange-500' : 'bg-zinc-200 dark:bg-zinc-700'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  );
};
