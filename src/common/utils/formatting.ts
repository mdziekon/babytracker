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
