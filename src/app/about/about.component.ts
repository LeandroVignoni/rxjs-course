import { fromEvent, interval } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const interval$ = interval(1000)  // rxjs observable / simple definition of stream / blueprint of stream
    
    let subscription = interval$.subscribe(value => console.log("stream 1 : " + value))  //instance of stream
    // interval$.subscribe(value => console.log("stream 2 : " + value))
    setTimeout(() => subscription.unsubscribe(), 5000)

    const click$ = fromEvent(document, "click")
    
    click$.subscribe(
      event => console.log(event),
      error => console.log(error),
      () => console.log("completed")
    )
  }
}
