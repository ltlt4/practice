import { range,Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
let count = 0;
let rate = 1000;
let lastClick = Date.now() - rate;
let button = document.querySelector('button');
button.addEventListener('click', () => {
  if (Date.now() - lastClick >= rate) {
    console.log(`Clicked ${++count} times`);
    lastClick = Date.now();
  }
});
fromEvent(document, 'click').subscribe(() => console.log('Clicked!'))
range(1, 200).pipe(
  filter(x => x % 2 === 1),
  map(x => x + x)
).subscribe(x =>{return x+1});