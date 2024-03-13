import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(values: any[]): any[] {
    return values && values.sort((a, b) => b.role.localeCompare(a.role));
  }

}
