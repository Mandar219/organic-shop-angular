import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'name'
})
export class NamePipe implements PipeTransform {
    transform(value: string) {
        if(value == null) 
            return null;
        
        let limit = value.indexOf(' ');
        return value.substr(0, limit);
    }
}