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
        const neverEnd$ = interval(1000)
        const source1$ = of(1, 2, 3) 
        const source2$ = of(4, 5, 6)
        

        const result$ = concat(source1$, source2$)
        const result2$ = concat(neverEnd$ ,source1$, source2$)     // this observable never subscribes to source1 or source2 because neverEnd$ nevers get completed 

        result$.subscribe(val => console.log(val))
        // result$.subscribe(console.log) reference
    }

}
