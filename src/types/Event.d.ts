interface IRegency {
    id: string;
    name: string;
}

interface IEvent {
    _id?: string;
    name?: string;
    slug?: string;
    category?: string;
    isFeatured?: boolean | string;
    isPublished?: boolean | string;
    isOnline?: boolean | string;
    description?: string;
    startDate?: string;
    endDate?: string;
    location?: {
        region: string;
        coordinates: number[];
    };
    banner?: string | FileList
};

interface IEventForm extends IEvent {
    region?: string;
    startDate?: DateValue;
    endDate?: DateValue;
    latitude?: number | string;
    longitude?: number | string;
}

export {IEvent, IRegency, IEventForm}