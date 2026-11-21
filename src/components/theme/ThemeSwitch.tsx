import { useTheme } from 'next-themes';
import { SwitchButton } from './SwitchButton';

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <SwitchButton
      onThemeChange={setTheme}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  );
}
