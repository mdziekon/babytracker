export const routes = {
    home: '/',

    eventAdd: (eventType: string) => `/event/add/${eventType}`,
    eventView: (eventUid: string) => `/event/view/${eventUid}`,
    eventEdit: (eventUid: string) => `/event/edit/${eventUid}`,

    logs: '/log',
    logsInProgress: '/log/in-progress',

    settings: '/settings',
};
