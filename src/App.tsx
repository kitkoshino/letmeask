import { BrowserRouter,Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import {AuthContextProvider} from './contexts/AuthContext';
import './styles/global.scss';


function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        {/* tudo que está dentro do provider tem acesso ao valor do contexto */}
        <>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        </>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
