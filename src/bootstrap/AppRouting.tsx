import { Route, Routes } from 'react-router';
import { Home } from '../features/Home/Home';
import { MainLayout } from './layouts/MainLayout';
import { Log } from '../features/Log/Log';
import { EventEditor } from '../features/EventEditor/EventEditor';

export const AppRouting = () => {
    return (
        <Routes>
            <Route path="" element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/log" element={<Log />} />
                <Route
                    path="/event/add/:eventType"
                    element={<EventEditor mode="add" />}
                />
                <Route
                    path="/event/edit/:eventUid"
                    element={<EventEditor mode="edit" />}
                />
            </Route>
        </Routes>
    );
};
