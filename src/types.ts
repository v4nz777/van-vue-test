export type Welcome = {
    topics:  Topic[];
    persons: Person[];
}

export type Person = {
    first: string;
    last:  string;
    guid:  string;
    email: string;
}


export type Topic = {
    name:     string;
    guid:     string;
    comments: Comment[]|null;
}

export type Comment = {
    comment: string;
    date:    Date;
    by:      string;
}