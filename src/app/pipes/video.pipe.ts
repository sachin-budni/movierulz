import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'video',
    standalone: false
})
export class VideoPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: any): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
