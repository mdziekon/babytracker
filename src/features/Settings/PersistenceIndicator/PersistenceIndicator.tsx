import { use, useState } from 'react';

export const PersistenceIndicator = () => {
    const [isPersistedPromise] = useState(() => navigator.storage.persisted());
    const isPersisted = use(isPersistedPromise);

    return isPersisted ? 'Yes' : 'No';
};
