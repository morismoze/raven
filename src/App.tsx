import { AppProvider } from './providers';
import { Routes } from './router';
import './App.scss';

export const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};
