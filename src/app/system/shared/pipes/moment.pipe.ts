import {Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment';

@Pipe({
  name: 'ekMoment'
})
export class MomentPipe implements PipeTransform {

  transform(value: string, formatFrom: string, formatTo: string = 'dd.MM.YYYY'): string {
    return moment(value, formatFrom).format(formatTo);
  }
}
