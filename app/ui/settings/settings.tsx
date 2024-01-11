'use client';
import React, {ChangeEvent, FormEvent} from 'react';
import { useTheme } from '@/app/contexts/theme';
import { TOGGLE_THEME } from '@/app/actions/type';
import { DARK, LIGHT } from '@/app/constants/theme';


export default function Settings() {
  const { theme, dispatch } = useTheme();
  const [siteName, setSiteName] = React.useState<string>(''); // State for site name
  const [selectedMode, setSelectedMode] = React.useState<string>(theme);
  const [submittedData, setSubmittedData] = React.useState<{ siteName: string; selectedMode: string } | null>(
    null
  );

  function onThemeToggle() {
    dispatch({ type: TOGGLE_THEME });
  }

  const handleSiteNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSiteName(e.target.value);
  };

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMode(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., save site name)
    setSubmittedData({ siteName, selectedMode });
  };
  
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block w-1/2 align-middle"> {/* Adjust the width here */}
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <p>Current theme: {theme}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                Site Name
              </label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={siteName}
                onChange={handleSiteNameChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
                Mode
              </label>
              <select
                id="mode"
                name="mode"
                value={selectedMode}
                onChange={handleModeChange}
                className="mt-1 p-2 border rounded-md w-full"
              >
                {([DARK, LIGHT] as const).map((option, index) => (
                  <option key={index} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            >
              Save
            </button>
          </form>
          {/* <button
            type="button"
            onClick={onThemeToggle}
            className="mt-4 flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            Toggle theme
          </button> */}

          {submittedData && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold">Site Settings:</h2>
              <p>Site Name: {submittedData.siteName}</p>
              <p>Mode: {submittedData.selectedMode}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
    
}
