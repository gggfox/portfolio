import './App.css'
import '@mantine/core/styles.css';
import { AppShell, MantineProvider } from '@mantine/core';
import { Outlet } from '@tanstack/react-router';
import { Header } from '../common-components/Header.component';

export default function App() {
  return (
    <MantineProvider>
      <AppShell
        header={{ height: 30 }}
        padding="0px"
      >
        <Header />
        <AppShell.Main h='100%'>        
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}
