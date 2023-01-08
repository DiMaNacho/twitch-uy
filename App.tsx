import * as React from 'react';
import { useState } from 'react';
import './App.css';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Button,
  Code,
} from '@mantine/core';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-stackblitz-theme',
    defaultValue: 'light',
  });

  // const preferredColorScheme = useColorScheme();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <div className="App">
          <header className="App-header">
            <p>
              Edit{' '}
              <Code className="App-code" color="blue">
                src/App.tsx
              </Code>{' '}
              and save to reload.a 
            </p>
            <Button
              component="a"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </Button>
          </header>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
