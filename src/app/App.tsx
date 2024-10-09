import './styles/index';
import { Main } from '@/pages/Main';
import { Toaster } from 'react-hot-toast';
import { ServicesProvider } from '@/app/providers/ServicesProvider';

function App() {
  return (
    <>
      <ServicesProvider>
        <Main />
      </ServicesProvider>
      <Toaster position={'bottom-right'} />
    </>
  );
}

export default App;
