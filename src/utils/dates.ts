import { formatDistanceToNow, format } from 'date-fns';

export function formatDate(dateString:string) {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
}

export function nowString(){
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
} 