import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import { ProductModule } from './components/ProductModules';

function App() {

  return (
    <div>
      {/* 3. Renderizas el componente pasándole las propiedades */}
      <ProductModule />
    </div>
  );
}

export default App
