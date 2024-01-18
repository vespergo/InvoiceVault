'use client';
import { useTheme } from '@/app/contexts/theme';
import { TOGGLE_THEME } from '@/app/actions/type';

export default function Settings() {
  const { theme, dispatch } = useTheme();

  function onThemeToggle() {
    dispatch({ type: TOGGLE_THEME });
  }
  const onThemeChange = (selectedTheme: string) => {
    if (selectedTheme !== theme) {
      dispatch({ type: TOGGLE_THEME });
    }
  };
  return (
    <div className={`mt-6 flow-root bg-${theme === 'dark' ? 'gray-800' : 'gray-100'}`}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 text-black">
          <p>Current theme: {theme}</p>
          <div className="mt-2 flex items-center">
            <label className="mr-2">Select Theme:</label>
            <select
              value={theme}
              onChange={(e) => onThemeChange(e.target.value)}
              className="bg-white border border-gray-300 px-7 py-2 rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button
            type="button"
            onClick={onThemeToggle}
            className="mt-2 flex h-10
            items-center rounded-lg
            bg-blue-500 px-4 text-sm
            font-medium text-white
            transition-colors hover:bg-blue-400
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
            active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          >
            Toggle theme
          </button>
        </div>
      </div>
    </div>
  );
}
