import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Show from './containers/Show/Show';



const App = () => {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<></>)}/>
          <Route path="/shows/:id" element={(<Show/>)}/>
          <Route path="*" element={<h3>Oops! Page not found...</h3>} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
