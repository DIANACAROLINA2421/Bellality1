import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LikesService {

    private key = 'likes_totales';

    constructor() {
        if (!localStorage.getItem(this.key)) {
            localStorage.setItem(this.key, '0');
        }
    }

    getLikes(): number {
        return Number(localStorage.getItem(this.key)) || 0;
    }

    addLike(): number {
        const actual = this.getLikes() + 1;
        localStorage.setItem(this.key, actual.toString());
        return actual;
    }
}
