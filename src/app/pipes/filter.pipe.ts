import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(itemList: any, searchKeyword: string) {
        if (!itemList)
          return [];
        if (!searchKeyword)
          return itemList;
        let filteredList = [];
        if (itemList.length > 0) {
          searchKeyword = searchKeyword.toLowerCase();
          itemList.forEach(item => {
            //Object.values(item) => gives the list of all the property values of the 'item' object
            let propValueList = Object.values(item);
            propValueList.forEach(item2 => {
              let propValueList1 = Object.values(item2);
              for(let i=0;i<propValueList1.length;i++)
              {
                if (propValueList1[i]) {
                  if (propValueList1[i].toString().toLowerCase().indexOf(searchKeyword) > -1)
                  {
                    filteredList.push(item);
                    break;
                  }
                }
              }
            })
           
          });
        }
        return filteredList;
      }
}