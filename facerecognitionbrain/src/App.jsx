import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation/navigation.route'
import Home from './routes/home/home.route'
import Signin from './routes/signin/signin.route';
import Signup from './routes/signup/signup.route';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='signin' element={<Signin />}/>
        <Route path='signup' element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default App;
