import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { ExplorePage } from './Pages/ExplorePage';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/explore" element={<ExplorePage/>}/>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
