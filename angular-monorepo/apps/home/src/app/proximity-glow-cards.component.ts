import { Component, OnInit, ViewEncapsulation, inject, QueryList, ViewChildren, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'proximity-glow-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proximity-glow-cards.component.html',
  styleUrl: './proximity-glow-cards.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProximityGlowCardsComponent implements AfterViewInit {
    document = inject(DOCUMENT);

    @ViewChild('container') container!: ElementRef<HTMLElement>;
    @ViewChildren('card') cards!: QueryList<ElementRef<HTMLElement>>;

    @HostListener('document:pointermove', ['$event'])
    handlePointerMove(event: PointerEvent) {
      this.update(event);
    }

    config = {
      proximity: 40,
      spread: 80,
      blur: 20,
      gap: 32,
      vertical: false,
      opacity: 0,
    }

    update(event: PointerEvent):void  {
      if (!this.cards) {
        return;
      }
      // get the angle based on the center point of the card and pointer position
      for (const card of this.cards) {
        // Check the card against the proximity and then start updating
        const card_bounds = card.nativeElement.getBoundingClientRect()
        // Get distance between pointer and outerbounds of card
        if (
          event.x > card_bounds.left - this.config.proximity &&
          event.x < card_bounds.left + card_bounds.width + this.config.proximity &&
          event.y > card_bounds.top - this.config.proximity &&
          event.y < card_bounds.top + card_bounds.height + this.config.proximity) {
          // If within proximity set the active opacity
          card.nativeElement.style.setProperty('--active', '1')
        } else {
          card.nativeElement.style.setProperty('--active', `${this.config.opacity}`)
        }
        const card_center = [
          card_bounds.left + card_bounds.width * 0.5,
          card_bounds.top + card_bounds.height * 0.5
        ]
        let angle = Math.atan2(event.y - card_center[1], event?.x - card_center[0]) * 180 / Math.PI
        angle = angle < 0 ? angle + 360 : angle;
        card.nativeElement.style.setProperty('--start', `${angle + 90}`)
      }

    }

    restyle():void{
      if (!this.container) {return}
      this.container.nativeElement.style.setProperty('--gap', `${this.config.gap}`);
      this.container.nativeElement.style.setProperty('--blur', `${this.config.blur}`);
      this.container.nativeElement.style.setProperty('--spread', `${this.config.spread}`);
      this.container.nativeElement.style.setProperty('--direction', this.config.vertical ? 'column' : 'row');
    }


    ngAfterViewInit(): void {
      this.restyle()
    }
}

