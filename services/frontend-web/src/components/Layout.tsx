import { AppShell, SegmentedControl } from '@mantine/core';

import { ColorSchemeToggle } from './ColorSchemeToggle/ColorSchemeToggle';
import { NavigationControls } from './NavigationControls';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <AppShell padding="xl">
      <AppShell.Main h="svh100">
        {children}
        <NavigationControls />
        <ColorSchemeToggle
          style={{
            position: 'absolute',
            bottom: '0%',
            right: '0%',
            transform: 'translate(-50%, -50%)',
          }}
          size="input-md"
        />
      </AppShell.Main>
    </AppShell>
  );
}
