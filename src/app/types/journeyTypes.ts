export type IInitJourney = {
    loading: boolean;
    error: any;
    journeys: IJourneys[];
};
export interface IJourneys {
    id: number;
    "partner-id": number;
    "partner-name": string;
    "route-id": number;
    "bus-type": string;
    "bus-type-name": string;
    "total-seats": number;
    "available-seats": number;
    journey: IJourney;
    features: IFeature[];
    "origin-location": string;
    "destination-location": string;
    "is-active": boolean;
    "origin-location-id": number;
    "destination-location-id": number;
    "is-promoted": boolean;
    "cancellation-offset": number;
    "has-bus-shuttle": boolean;
    "disable-sales-without-gov-id": boolean;
    "display-offset": string;
    "partner-rating": number;
    "has-dynamic-pricing": boolean;
    "disable-sales-without-hes-code": boolean;
    "disable-single-seat-selection": boolean;
    "change-offset": number;
    rank: number;
    "display-coupon-code-input": boolean;
    "disable-sales-without-date-of-birth": boolean;
    "open-offset": number;
    "display-buffer": any;
    "allow-sales-foreign-passenger": boolean;
    "has-seat-selection": boolean;
    "branded-fares": any[];
    "has-gender-selection": boolean;
    "has-dynamic-cancellation": boolean;
    "partner-terms-and-conditions": any;
    "partner-available-alphabets": string;
    "provider-id": number;
    "partner-code": string;
    "enable-full-journey-display": boolean;
    "provider-name": string;
    "enable-all-stops-display": boolean;
    "is-destination-domestic": boolean;
    "min-len-gov-id": any;
    "max-len-gov-id": any;
    "require-foreign-gov-id": boolean;
    "is-cancellation-info-text": boolean;
    "cancellation-offset-info-text": any;
    "is-time-zone-not-equal": boolean;
    "markup-rate": number;
    "is-print-ticket-before-journey": boolean;
    "is-extended-journey-detail": boolean;
    "is-payment-select-gender": boolean;
    "should-turkey-on-the-nationality-list": boolean;
    "markup-fee": number;
    "partner-nationality": any;
    "generate-barcode": boolean;
    "is-print-ticket-before-journey-badge": boolean;
    "is-print-ticket-before-journey-mail": boolean;
    "is-show-fare-rules": boolean;
    "is-different-seat-price": boolean;
    "redirect-to-checkout": boolean;
    "is-show-rating-avarage": boolean;
    "partner-route-rating": number;
    "partner-route-rating-vote-count": number;
    "partner-rating-vote-count": number;
    "included-station-fee": boolean;
    "is-domestic-route": boolean;
    "disable-sales-without-passport-expiration-date": boolean;
    "transfer-count": number;
    "is-national-identity-number-validator": boolean;
    "national-identity-validation-rules": any;
}

export interface IJourney {
    kind: string;
    code: string;
    stops: IStop[];
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    currency: string;
    duration: string;
    "original-price": number;
    "internet-price": number;
    "provider-internet-price": number;
    booking: any;
    "bus-name": string;
    policy: IPolicy;
    features: string[];
    "features-description": any;
    description: string;
    available: any;
    "partner-provider-code": any;
    "peron-no": any;
    "partner-provider-id": any;
    "is-segmented": boolean;
    "partner-name": any;
    "provider-code": any;
    "sorting-price": number;
}

export interface IStop {
    id: number;
    kolayCarLocationId?: number;
    name: string;
    station: string;
    time: string;
    "is-origin": boolean;
    "is-destination": boolean;
    "is-segment-stop": boolean;
    index: number;
    "obilet-station-id": any;
    "map-url": any;
    "station-phone": any;
    "station-address": any;
}

export interface IPolicy {
    "max-seats": any;
    "max-single": number;
    "max-single-males": any;
    "max-single-females": number;
    "mixed-genders": boolean;
    "gov-id": boolean;
    lht: boolean;
}

export interface IFeature {
    id: number;
    priority: number;
    name: string;
    description: any;
    "is-promoted": boolean;
    "back-color": any;
    "fore-color": any;
    "partner-notes": any;
}
