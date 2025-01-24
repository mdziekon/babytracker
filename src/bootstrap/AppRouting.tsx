import { Route, Routes } from 'react-router';
import { Home } from '../features/Home/Home';
import { MainLayout } from './layouts/MainLayout';
import { Log } from '../features/Log/Log';
import { EventEditor } from '../features/EventEditor/EventEditor';
import { Settings } from '../features/Settings/Settings';
import { routes } from '../common/routes';

export const AppRouting = () => {
    return (
        <Routes>
            <Route path="" element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/log" element={<Log />} />
                <Route
                    path={routes.logsInProgress}
                    element={<Log filterInProgress />}
                />
                <Route
                    path={routes.eventAdd(':eventType')}
                    element={<EventEditor mode="add" />}
                />
                <Route
                    path={routes.eventView(':eventUid')}
                    element={<EventEditor mode="view" />}
                />
                <Route
                    path={routes.eventEdit(':eventUid')}
                    element={<EventEditor mode="edit" />}
                />
                <Route path="/settings" element={<Settings />} />
            </Route>
        </Routes>
    );
};
