import { Component, OnInit, ViewEncapsulation, inject, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
// import { GUI } from 'https://cdn.skypack.dev/dat.gui'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'proximity-glow-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proximity-glow-cards.component.html',
  styleUrl: './proximity-glow-cards.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProximityGlowCardsComponent implements OnInit {
    document = inject(DOCUMENT);

    @ViewChild('container') container: ElementRef;
    @ViewChildren('card') cards: QueryList<ElementRef>;

    CONTAINER = this.document.querySelector('.container');
    CARDS = this.document.querySelectorAll('article');

    config = {
      proximity: 40,
      spread: 80,
      blur: 20,
      gap: 32,
      vertical: false,
      opacity: 0,
    }

    PROXIMITY = 10

    UPDATE = (event: PointerEvent) => {
      // get the angle based on the center point of the card and pointer position
      for (const key in this.CARDS) {
        const CARD = this.CARDS[key]
        // Check the card against the proximity and then start updating
        const card_bounds = CARD.getBoundingClientRect()
        // Get distance between pointer and outerbounds of card
        if (
          event?.x > card_bounds.left - this.config.proximity &&
          event?.x < card_bounds.left + card_bounds.width + this.config.proximity &&
          event?.y > card_bounds.top - this.config.proximity &&
          event?.y < card_bounds.top + card_bounds.height + this.config.proximity) {
          // If within proximity set the active opacity
          CARD.style.setProperty('--active', '1')
        } else {
          CARD.style.setProperty('--active', `${this.config.opacity}`)
        }
        const card_center = [
          card_bounds.left + card_bounds.width * 0.5,
          card_bounds.top + card_bounds.height * 0.5
        ]
        let angle = Math.atan2(event?.y - card_center[1], event?.x - card_center[0]) * 180 / Math.PI
        angle = angle < 0 ? angle + 360 : angle;
        CARD.style.setProperty('--start', `${angle + 90}`)
      }

    }

    RESTYLE = () => {
      if (!this.CONTAINER) {return}
      (this.CONTAINER as HTMLElement).style.setProperty('--gap', `${this.config.gap}`);
      (this.CONTAINER as HTMLElement).style.setProperty('--blur', `${this.config.blur}`);
      (this.CONTAINER as HTMLElement).style.setProperty('--spread', `${this.config.spread}`);
      (this.CONTAINER as HTMLElement).style.setProperty('--direction', this.config.vertical ? 'column' : 'row');
    }


    ngOnInit(): void {
      this.document.body.addEventListener('pointermove', this.UPDATE);
      this.RESTYLE()
    }
}
function ViewChild(Element: { new(): Element; prototype: Element; }): (target: ProximityGlowCardsComponent, propertyKey: "primarySampleComponent") => void {
  throw new Error('Function not implemented.');
}

