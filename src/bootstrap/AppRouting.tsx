import { Route, Routes } from 'react-router';
import { Home } from '../features/Home/Home';
import { MainLayout } from './layouts/MainLayout';
import { Log } from '../features/Log/Log';
import { EventEditor } from '../features/EventEditor/EventEditor';
import { Settings } from '../features/Settings/Settings';
import { routes } from '../common/routes';
import { StatisticsHome } from '../features/Statistics/StatisticsHome';
import { WeightStatistics } from '../features/Statistics/WeightStatistics';
import { EditBabyInfo } from '../features/Settings/EditBabyInfo/EditBabyInfo';
import { RoutineStatistics } from '../features/Statistics/RoutineStatistics';

export const AppRouting = () => {
    return (
        <Routes>
            <Route path="" element={<MainLayout />}>
                <Route path={routes.home} element={<Home />} />
                <Route path={routes.logs} element={<Log />} />
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
                <Route path={routes.settings} element={<Settings />} />
                <Route
                    path={routes.settingsBabyInfo}
                    element={<EditBabyInfo />}
                />
                <Route path={routes.statistics} element={<StatisticsHome />} />
                <Route
                    path={routes.statisticsWeight}
                    element={<WeightStatistics />}
                />
                <Route
                    path={routes.statisticsRoutine}
                    element={<RoutineStatistics />}
                />
            </Route>
        </Routes>
    );
};
