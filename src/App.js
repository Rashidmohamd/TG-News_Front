import { RouterProvider } from 'react-router-dom';
import RootPage from './pages/Root';
import useRoute from './hooks/useRoute';
const App = () => {
    const router = useRoute();
    return ( 
         <RouterProvider router={router}>
          <RootPage/>
        </RouterProvider>
     );
}
 
export default App;