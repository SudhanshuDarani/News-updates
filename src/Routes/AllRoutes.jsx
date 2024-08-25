import { Route, Routes } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import DetailsPage from '../Components/DetailsPage';


const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/detailsPage' element={<DetailsPage />} />
        </Routes>
    )
}
export default AllRoutes;