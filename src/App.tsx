import {ConsentProvider} from './context/ConsentContext';
import {ThemeProvider} from './context/ThemeContext';
import {AppRoutes} from './routes';

export default function App() {
  return (
    <ThemeProvider>
      <ConsentProvider>
        <AppRoutes />
      </ConsentProvider>
    </ThemeProvider>
  );
}
