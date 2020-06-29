import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {
    private _places = new BehaviorSubject<Place[]>([
        new Place(
            'p1',
            'The Manhattan Mansion',
            'In the heart of New York City',
            'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg',
            149.99,
            new Date('2020-01-01'),
            new Date('2020-12-31'),
            'abc'
        ),
        new Place(
            'p2',
            'Catedral de Toledo',
            'La fachada principal de la Catedral de Toledo',
            'https://www.lugaresquevisitar.com/wp-content/uploads/Toledo-Catedral.jpg',
            189.99,
            new Date('2020-01-01'),
            new Date('2020-12-31'),
            'abc'
        ),
        new Place(
            'p3',
            'Kanchanaburi',
            'Magnificent landscape and charming beauty',
            'https://www.neverstoptraveling.com/wp-content/uploads/2012/03/Krabi-TAT.jpg',
            99.99,
            new Date('2020-01-01'),
            new Date('2020-12-31'),
            'abc'
        ),
    ]);

    constructor(private authService: AuthService) {}

    get places() {
        // return [...this._places];
        return this._places.asObservable();
    }

    getPlace(id: string) {
        return this.places.pipe(
            take(1),
            map((places) => {
                return { ...places.find((p) => p.id === id) };
            })
        );
        // return { ...this._places.find((p) => p.id === id) };
    }

    addPlace(
        title: string,
        description: string,
        price: number,
        dateFrom: Date,
        dateTo: Date
    ) {
        const newPlace = new Place(
            Math.random().toString(),
            title,
            description,
            'http://i0.wp.com/www.lovevisalife.com/wp-content/uploads/Manila-Intramuros-780.jpg',
            price,
            dateFrom,
            dateTo,
            this.authService.userId
        );
        //this._places.push(newPlace);
        return this.places.pipe(
            take(1),
            delay(1000),
            tap((places) => {
                this._places.next(places.concat(newPlace));
            })
        );
    }

    updatePlace(placeId: string, title: string, description: string) {
        return this.places.pipe(
            take(1),
            delay(1000),
            tap((places) => {
                const updatedPlaceIndex = places.findIndex(
                    (pl) => pl.id === placeId
                );
                const updatedPlaces = [...places];
                const oldPlace = updatedPlaces[updatedPlaceIndex];
                updatedPlaces[updatedPlaceIndex] = new Place(
                    oldPlace.id,
                    title,
                    description,
                    oldPlace.imageUrl,
                    oldPlace.price,
                    oldPlace.availableFrom,
                    oldPlace.availableTo,
                    oldPlace.userId
                );
                this._places.next(updatedPlaces);
            })
        );
    }
}
