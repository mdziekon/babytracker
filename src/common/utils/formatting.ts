import dayjs from 'dayjs';

/**
 * Formats date to relative, human friendly label - today or yesterday.
 * If the date is before yesterday, return nothing to allow for further customizations.
 */
// TODO: Apply localizations
export const formatDateToRelativeLabel = (date: dayjs.Dayjs) => {
    if (date.isToday()) {
        return 'Today';
    }
    if (date.isYesterday()) {
        return 'Yesterday';
    }
};

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
export const DEFAULT_TIME_FORMAT = 'HH:mm';
export const DEFAULT_DATETIME_FORMAT = `${DEFAULT_DATE_FORMAT} ${DEFAULT_TIME_FORMAT}`;
