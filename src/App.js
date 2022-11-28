import logo from './logo.svg';
import './App.css';
import NavPage from './Pages/NavPage';
import UserInfoContextComponent from './Components/Context/UserInfoContext';
import DarkModeContextComponent from './Components/Context/DarkModeContext';

function App() {
  return (
    <DarkModeContextComponent>
      <UserInfoContextComponent>
        <div className="App">
          <NavPage />
        </div>
      </UserInfoContextComponent>
    </DarkModeContextComponent>
  );
}

export default App;