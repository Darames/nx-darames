import { Component, ViewEncapsulation, inject, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'ui-proximity-glow-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proximity-glow-cards.component.html',
  styleUrl: './proximity-glow-cards.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProximityGlowCardsComponent {

    protected readonly document = inject(DOCUMENT);

    @ViewChild('card') card!: ElementRef<HTMLElement>;

    @HostListener('document:pointermove', ['$event'])
    handlePointerMove(event: PointerEvent) {
      this.update(event);
    }

    config = {
      proximity: 40,
      spread: 80,
      blur: 20,
      gap: 32,
      opacity: 0,
    }
    start = 0;
    active = 0;

    update(event: PointerEvent):void  {
      if (!this.card) {
        return;
      }
      // get the angle based on the center point of the card and pointer position
      // Check the card against the proximity and then start updating
      const card_bounds = this.card.nativeElement.getBoundingClientRect()
      // Get distance between pointer and outerbounds of card
      if (
        event.x > card_bounds.left - this.config.proximity &&
        event.x < card_bounds.left + card_bounds.width + this.config.proximity &&
        event.y > card_bounds.top - this.config.proximity &&
        event.y < card_bounds.top + card_bounds.height + this.config.proximity) {
        // If within proximity set the active opacity
        this.active = 1;
      } else {
        this.active = this.config.opacity;
      }
      const card_center = {
        x: card_bounds.left + card_bounds.width * 0.5,
        y: card_bounds.top + card_bounds.height * 0.5
      };
      let angle = Math.atan2(event.y - card_center.y, event?.x - card_center.x) * 180 / Math.PI
      angle = angle < 0 ? angle + 360 : angle;
      this.start = angle + 90;
    }
}

