import { useState } from "react";
import Register from "../components/home/Register";
import Login from "../components/home/Login";

const Home = () => {
  const [login, setLogin] = useState(true)
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      
      {login ?(
        <Login login={login} setLogin={setLogin}/>
        
      ):(
        <Register login={login} setLogin={setLogin}/>
      )}
    </div>
  );
};

export default Home;
