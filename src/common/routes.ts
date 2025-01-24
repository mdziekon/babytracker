export const routes = {
    eventAdd: (eventType: string) => `/event/add/${eventType}`,
    eventView: (eventUid: string) => `/event/view/${eventUid}`,
    eventEdit: (eventUid: string) => `/event/edit/${eventUid}`,

    logsInProgress: '/log/in-progress',
};
