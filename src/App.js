import './App.css';

//Components
import List from "./Components/List/List";
import Form from "./Components/Header/Form";
import SideBar from "./Components/SideBar/SideBar";
import DeletePortal from './Components/Portals/DeletePortal';
import CategoryPortal from './Components/Portals/CategoryPortal';

function App() {
  return (
    <div className="App">
      <div className="container">
          <Form />
          <div className="bodyContainer" >
            <SideBar />
            <List />
          </div>
      </div>
      <DeletePortal />
      <CategoryPortal />
    </div>
  );
}

export default App;
