import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
    @Input() selectedPlace: Place;
    constructor(private modalCtrl: ModalController) {}

    ngOnInit() {}

    onBookPlace() {
        this.modalCtrl.dismiss({ message: 'This is a message' }, 'confirm');
    }

    onCancel() {
        // dismiss the nearest modal it finds
        // you can also define the id of the modal as a third param,
        // you can pass null for the others if you do not need it
        this.modalCtrl.dismiss(null, 'cancel');
    }
}
