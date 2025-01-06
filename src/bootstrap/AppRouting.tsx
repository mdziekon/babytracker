import { Route, Routes } from 'react-router';
import { Home } from '../features/Home/Home';
import { MainLayout } from './layouts/MainLayout';
import { Log } from '../features/Log/Log';

export const AppRouting = () => {
    return (
        <Routes>
            <Route path="" element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/log" element={<Log />} />
            </Route>
        </Routes>
    );
};
