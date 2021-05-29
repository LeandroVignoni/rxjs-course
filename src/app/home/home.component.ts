import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';
import { Store } from '../common/store.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;


    constructor(private store: Store) {}

    ngOnInit() {
        const http$ = createHttpObservable("/api/courses")

        const courses$: Observable<Course[]> = http$
            .pipe(
                tap(() => console.log("http")),  //cause side effects outside the observable
                map(res => Object.values(res["payload"])),
                shareReplay()  //shared the execution of the stream across multiple subscribers
            )
            // default behaviour of observables is to create a complete new stream by subscription

        this.beginnerCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category == "BEGINNER"))
        )

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category == "ADVANCED"))
        )



        // const courses$ = this.store.courses$;
        // this.beginnerCourses$ = this.store.selectBeginnerCourses();
        // this.advancedCourses$ = this.store.selectAdvancedCourses();

    }

}
