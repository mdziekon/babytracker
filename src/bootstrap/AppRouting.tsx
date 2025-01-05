import { Route, Routes } from 'react-router';
import { Home } from '../features/Home/Home';

export const AppRouting = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
};
