import {Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment';
@Pipe({
  name: "ekFilter"
})
export class FilterPipe implements PipeTransform {

  transform(items: any, value: string, field: string): any {

    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter((i) => {
      const t = Object.assign({}, i);
      if (field === 'type') {
        t[field] = t[field] === 'income' ? "доход" : 'расход';
      }
      if (field === 'category') {
        t[field] = t['catName'];
      }
      console.log(field);
      if (field === 'createdAt') {
        t[field] = moment(t[field]).format('DD.MM.YYYY');
      }
      return t[field].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }

}
