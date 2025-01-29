export const routes = {
    home: '/',

    eventAdd: (eventType: string) => `/log/event/add/${eventType}`,
    eventView: (eventUid: string) => `/log/event/view/${eventUid}`,
    eventEdit: (eventUid: string) => `/log/event/edit/${eventUid}`,

    logs: '/log',
    logsInProgress: '/log/in-progress',

    settings: '/settings',
};
