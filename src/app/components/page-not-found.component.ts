import { Component } from "@angular/core";

@Component({
    selector: 'page-not-found',
    template: `
        <div class="page-not-found">
            <img src="assets/404-page-not-found.png" alt="" srcset="">
            <!-- <img src="assets/page-not-found.svg" alt="" srcset=""> -->
        </div>
    `,
    styles: [`
        .page-not-found {
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(100vh - 146px);
        }
        .page-not-found > img {
            width: 100%; 
            height: 100%;
            object-fit: contain; 
        }
    `]
})

export class PageNotFoundComponent {}