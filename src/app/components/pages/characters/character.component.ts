import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Character } from '@app/shared/interfaces/character.interface';

@Component({
    selector:'app-character',
    template:`
    <div class="card cardCustom">
        <div class="card cardSmall">
            <h6 class="text-light">#: <span class="{{character.status}}">{{character.id}}</span></h6>             
        </div>
        <div class="image">
            <a [routerLink]="['/character-details', character.id]">
                <img
                    [src]="character.image"
                    [alt]="character.name"
                    class="card-img-top"
                >
            </a>
        </div>
        <div class="card-inner">
            <div class="header">
                <a class="text-white" [routerLink]="['/character-details', character.id]">
                    <h2>{{character.name | slice: 0:16}}</h2>
                </a>
                <h4 class="text-light">Status: <span class="{{character.status}}">{{character.status}}</span></h4>                
                <h4 class="text-light">Gender: <span class="{{character.status}}">{{character.gender}}</span></h4>                
                <h4 class="text-light">Spacie: <span class="{{character.status}}">{{character.species}}</span></h4>                
            </div>
        </div>
    </div>`,
    changeDetection:ChangeDetectionStrategy.OnPush,
    styleUrls: ['./character.component.scss']
})
export class CharacterComponent {
    @Input() character: Character;
}
