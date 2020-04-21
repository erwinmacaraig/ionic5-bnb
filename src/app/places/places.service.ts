import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    private _places: Place[] = [
        new Place(
            'p1',
            'The Manhattan Mansion',
            'In the heart of New York City',
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            149.99
        ),
        new Place(
            'p2',
            'Catedral de Toledo',
            'La fachada principal de la Catedral de Toledo',
            'https://www.lugaresquevisitar.com/wp-content/uploads/Toledo-Catedral.jpg',
            189.99
        ),
        new Place(
            'p3',
            'Kanchanaburi',
            'Magnificent landscape and charming beauty',
            'https://www.neverstoptraveling.com/wp-content/uploads/2012/03/Krabi-TAT.jpg',
            99.99
        ),
    ];

    constructor() {}

    get places() {
        return [...this._places];
    }

    getPlace(id: string) {
        return { ...this._places.find((p) => p.id === id) };
    }
}
