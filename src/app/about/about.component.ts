import { concat, noop, Observable, of, interval } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { createHttpObservable } from "../common/util"
import { map } from 'rxjs/operators';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        const http$ = createHttpObservable("/api/courses")
        const subscription = http$.subscribe(console.log)

        setTimeout(() => subscription.unsubscribe(), 0)
    }

}
