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

const obtenerSheet = async () => {
  try {
    const url =
      'https://docs.google.com/spreadsheets/d/1SB5UeZhWdpNnlHS86AQCOfTZlTDY1-3fZBPSGCtJMdg/gviz/tq?tqx=out:json&tq&gid=0';

    const req = await fetch(url);
    const data = await req.text();
    const json = JSON.parse(data.substr(47).slice(0, -2));
    const tabla = json.table;
    const header = tabla.rows[0].c.map(({ v }) => v);
    tabla.rows.shift();
    const datosFiltrados = tabla.rows.map(({ c }) => {
      const newItem = {};

      c.forEach((i, k) => {
        newItem[keysAmigables(header[k])] = i?.v;
      });

      return newItem;
    });

    return datosFiltrados;
  } catch (e) {
    console.error('obtenerSheet', e);
  }
};

const keysAmigables = (str) => {
  try {
    console.log('str', str);
    // Primero saco tíldes y caracteres especiales
    /* if (str.search(/[\xC0-\xFF]/g) > -1) {
      str = str
        .replace(/[\xC0-\xC5]/g, 'A')
        .replace(/[\xC6]/g, 'AE')
        .replace(/[\xC7]/g, 'C')
        .replace(/[\xC8-\xCB]/g, 'E')
        .replace(/[\xCC-\xCF]/g, 'I')
        .replace(/[\xD0]/g, 'D')
        .replace(/[\xD1]/g, 'N')
        .replace(/[\xD2-\xD6\xD8]/g, 'O')
        .replace(/[\xD9-\xDC]/g, 'U')
        .replace(/[\xDD]/g, 'Y')
        .replace(/[\xDE]/g, 'P')
        .replace(/[\xE0-\xE5]/g, 'a')
        .replace(/[\xE6]/g, 'ae')
        .replace(/[\xE7]/g, 'c')
        .replace(/[\xE8-\xEB]/g, 'e')
        .replace(/[\xEC-\xEF]/g, 'i')
        .replace(/[\xF1]/g, 'n')
        .replace(/[\xF2-\xF6\xF8]/g, 'o')
        .replace(/[\xF9-\xFC]/g, 'u')
        .replace(/[\xFE]/g, 'p')
        .replace(/[\xFD\xFF]/g, 'y');
    }
    // Ahora paso a minús y luego capturo espacios y paso a mayús el sig. caracter
    str = str.toLowerCase().replace(/\s+(\w)?/gi, (m, l) => l.toUpperCase());

    return str;*/
  } catch (e) {
    console.error('keysAmigables', e);
  }
};

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-stackblitz-theme',
    defaultValue: 'light',
  });

  // const preferredColorScheme = useColorScheme();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  React.useEffect(() => {
    const obtenerPorApiTwitch = () => {
      const API_CLIENT = 'rd85f8g3bwqlgdt6g5i871pqbkl1rl';
      // const API_SECRET = 'pij5olz4kwrjbv5u8wnxzozj1ymo65';
      fetch(
        `https://api.twitch.tv/helix/streams?first=100&language=es&country_code=UY`,
        {
          headers: {
            'Client-ID': API_CLIENT,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // data contiene la lista de streamers
          console.log(data);
        });
    };

    const obtenerPorGoogleSheet = async () => {
      // const datos = await obtenerSheet();
      // console.log('datos', datos);
    };

    obtenerPorGoogleSheet();
  });

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
