type Theme = 'light' | 'dark';

// Local Storage key name for storing the user's theme preference
const themeKeyForLocalStorage = 'theme_preference';

// Returns the user's system theme preference
const systemTheme = (): Theme => {
  const darkValue = '(prefers-color-scheme: dark)';
  const isDark = window.matchMedia(darkValue).matches;
  return isDark ? 'dark' : 'light';
};

// Return the user's theme preference
export const userTheme = (): string => {
  const localStorageThemePreference = window.localStorage.getItem(themeKeyForLocalStorage) as Theme;
  const systemThemePreference = systemTheme();
  const userThemePreference = localStorageThemePreference || systemThemePreference;

  /**
   * Since Xstate is responsible for managing our theme state,
   * the setThemeForTailWind function will ensure the correct
   * class gets added to the html tag.
   * https://tailwindcss.com/docs/dark-mode
   */
  setThemeForTailWind(userThemePreference);
  return userThemePreference;
};

// Updates the html tag's class value based on Tailwind's Dark mode approach
const setThemeForTailWind = (theme: Theme) => {
  const htmlTag = document.getElementsByTagName('html')[0];
  if (theme === 'dark') {
    htmlTag?.setAttribute('class', 'dark');
  } else {
    htmlTag?.setAttribute('class', '');
  }
};

// Updates the local storage key with the user's new theme preference
export const setThemeToLocalStorage = (theme: Theme): undefined => {
  setThemeForTailWind(theme);
  window.localStorage.setItem(themeKeyForLocalStorage, theme);
  return;
};
