import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { take, filter } from 'rxjs/operators';

import { Character } from '@app/shared/interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
type RequestInfo = {
  next: null
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  info: RequestInfo = {
    next: null
  }

  showGoUpButton = false;

  pageNum = 1;
  numPages: number;
  private query?: string;


  constructor(
    private characterSvc: CharacterService, 
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.onUrlChanged();
  }

  ngOnInit(): void {
    this.getCharactersByQuery();
  }
  async changePage(pSiguiente) {
    if (pSiguiente) {
      this.pageNum++;
    } else {
      this.pageNum--;
    }
    this.getCharactersByQuery();
  }

  private onUrlChanged(): void {
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(()=> {
      this.characters = [];
      this.pageNum = 1;
      this.getCharactersByQuery();
    });
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {     
      this.query = params['q'];
      this.getDataFromService();
    })
  }

  private getDataFromService(): void {
    this.characterSvc.searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if(res?.results?.length) {
          const {info, results} = res;
          this.characters = [... results].slice(0, 12);
          this.numPages = res['info'] ['pages']        
          this.info = info;
        } else {
          this.characters = [];
        }
      });
  }
}
