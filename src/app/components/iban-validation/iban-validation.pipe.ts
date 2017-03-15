import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'showErrors'})
export class ShowErrorsPipe implements PipeTransform {
  transform(validation): any {
    if (!validation) {
      return validation;
    };

    if(validation.code >= 200) {
      return validation.message;
    }
  }
}
