import { Pipe, PipeTransform } from '@angular/core';
import { Film } from './interfaces';

@Pipe({
  name: 'ricerca',
  pure: false
})
export class RicercaPipe implements PipeTransform {

  transform(value: Film[], ...args: string[]): Film[] {
    const keyword = args[0];
    return value.filter(film => {
      return film.fullTitle.toLowerCase().includes(keyword);
    }
  )}

}
