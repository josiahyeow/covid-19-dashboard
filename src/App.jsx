import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Dashboard from './Dashboard'
import darkTheme from './themes/dark'
import lightTheme from './themes/light'

const App = () => {
  const stored = localStorage.getItem('isLightMode')
  const [lightMode, setLightMode] = useState(stored === 'true' ? true : false)

  return (
    <ThemeProvider theme={lightMode ? lightTheme : darkTheme}>
      <Dashboard mode={lightMode} setMode={setLightMode} />
    </ThemeProvider>
  )
}

export default App
