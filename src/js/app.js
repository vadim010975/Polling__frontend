
import { ajax } from 'rxjs/ajax';
import { map, catchError, of } from 'rxjs';

const obs$ = ajax.getJSON('http://localhost:7070/messages/unread');

obs$.subscribe({
  next: value => console.log(value)
});
