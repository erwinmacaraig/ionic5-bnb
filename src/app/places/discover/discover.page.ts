import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
    loadedPlaces: Place[];
    listedLoadedPlaces: Place[];
    private filter = 'all';
    relevantPlaces: Place[];
    private placesSub: Subscription;
    constructor(
        private placesService: PlacesService,
        private menuCtrl: MenuController,
        private authService: AuthService
    ) {}

    ngOnInit() {
        // this.loadedPlaces = this.placesService.places;
        this.placesSub = this.placesService.places.subscribe((places) => {
            this.loadedPlaces = places;
            this.relevantPlaces = this.loadedPlaces;
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
            // this.onFilterUpdate(this.filter);
        });
    }

    onOpenMenu() {
        this.menuCtrl.toggle();
    }

    onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
        console.log(event.detail);
        if (event.detail.value === 'all') {
            this.relevantPlaces = this.loadedPlaces;
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        } else {
            this.relevantPlaces = this.loadedPlaces.filter(
                (place) => place.userId !== this.authService.userId
            );
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        }
    }

    /* onFilterUpdate(filter: string) {
        const isShown = (place) =>
            filter === 'all' || place.userId !== this.authService.userId;
        this.relevantPlaces = this.loadedPlaces.filter(isShown);
        this.filter = filter;
    } */

    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }
}
