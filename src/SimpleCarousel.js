import { LitElement, html } from "lit-element";
import { wcNameStyles } from "./simple-carousel-style";

/**
 * `simple-carousel`
 * SimpleCarousel
 *
 * @customElement simple-carousel
 * @litElement
 * @demo demo/index.html
 */

export class SimpleCarousel extends LitElement {
  static get is() {
    return "simple-carousel";
  }

  static get properties() {
    return {
      /**
       * Carousel images array
       * @property
       * @type { Array }
       */
      images: {
        type: Array,
        attribute: false
      },
      /**
       * Number of images of the carousel
       * @property
       * @type { Number }
       */
      numImages: {
        type: Number,
        attribute: false
      },
      /**
       * Images descriptions array
       * @property
       * @type { Array }
       */
      descriptions: {
        type: Array,
        attribute: false
      },
      /**
       * Current Image Description
       * @property
       * @type { String }
       */
      currentImage: {
        type: String,
        attribute: false
      },
      /**
       * Current Image Description
       * @property
       * @type { String }
       */
      currentDescription: {
        type: String,
        attribute: false
      },
      /**
       * Second delay to play images
       * @property
       * @type { Number }
       */
      secondsDelay: {
        type: Number,
        attribute: 'seconds-delay'
      }
    };
  }

  static get styles() {
    return [wcNameStyles];
  }

  constructor() {
    super();
    this.currentIndex = 0;
    this.left = null
    this.right = null;
    this.carouselData = [];
    this.images = [];
    this.currentImage = '';
    this.descriptions = [];
    this.currentDescription = '';

    this.secondsDelay = 0;
    this.interval = null;

    this._goToLeft = this._goToLeft.bind(this);
    this._goToRight = this._goToRight.bind(this);
  }  

  getCarouselData() {
    const carouselDataHTML = this.querySelectorAll('ul[slot="images-data"] li');
    Array.from(carouselDataHTML).reduce((acc, el) => {
      const imgHTML = el.querySelector('[name="imagen"]');
      const descHTML = el.querySelector('[name="description"');
      this.carouselData.push({
        'image': imgHTML.src,
        'description': descHTML.textContent
      });
    }, this.carouselData);

    this.numImages = this.carouselData.length;
    this.currentImage = this.carouselData[this.currentIndex].image;
    this.currentDescription = this.carouselData[this.currentIndex].description;
  }

  connectedCallback() {
    super.connectedCallback();
    this.getCarouselData();
  }

  firstUpdated() {
    this.arrowLeft = this.shadowRoot.querySelector('.arrow-left');
    this.arrowRight = this.shadowRoot.querySelector('.arrow-right');
    this.imgCarousel = this.shadowRoot.querySelector('img');
    this.indicators = this.shadowRoot.querySelectorAll('.indicators > button');

    this.arrowLeft.addEventListener('click', this._goToLeft);
    this.arrowRight.addEventListener('click', this._goToRight);

    this.onkeydown = function(e) {
      if(e.keyCode === 13 && this.activeElement) {
        this.activeElement.click();
      }
    };

    if (this.delay > 0) {
      this.toggleAutoPlay();
    }
  }

  getArrowLeftImageIndex() {
    this.currentIndex = this.currentIndex === 0 ? this.numImages - 1 : this.currentIndex - 1;
  };
  getArrowRightImageIndex() {
    this.currentIndex = (this.currentIndex + 1) % this.numImages; // currentIndex === this.numImages - 1 ? 0 : this.currentIndex + 1;
  };

  deactivateIndicator() {
    this.indicators[this.currentIndex].classList.remove('active');
  }

  activateIndicator() {
    this.indicators[this.currentIndex].classList.add('active');
  };

  _goToLeft(e) {
    this.deactivateIndicator();
    this.getArrowLeftImageIndex();
    this.activateIndicator();
    this.currentImage = this.carouselData[this.currentIndex].image;
    this.currentDescription = this.carouselData[this.currentIndex].description;
  };

  _goToRight(e) {
    this.deactivateIndicator();
    this.getArrowRightImageIndex();
    this.activateIndicator();
    this.currentImage = this.carouselData[this.currentIndex].image;
    this.currentDescription = this.carouselData[this.currentIndex].description;
  }

  goTo(e) {
    this.deactivateIndicator();
    this.currentIndex = e.target.dataset.position;
    this.activateIndicator();
    this.currentImage = this.carouselData[this.currentIndex].image;
    this.currentDescription = this.carouselData[this.currentIndex].description;
  }

  toggleAutoPlay() {
    if (this.secondsDelay === 0) {
      return;
    }
    const control = this.shadowRoot.querySelector('#control').classList
    if (Array.from(control).includes('play')) {
      control.remove('play')
      control.add('stop');
      this.interval = setInterval(this._goToRight, this.secondsDelay * 1000);
    } else {
      control.add('play')
      control.remove('stop');
      clearInterval(this.interval);
    }
  }

  _circleSpan() {
    const dotsHTML = this.carouselData.map((grp, index)=> {
      return html`<button data-position="${index}" tabindex="0" @click="${this.goTo}" class="${(index===0) ? 'active': ''}"></button>`;
    });
    return dotsHTML;
  }

  render() {
    return html`
      <div class="carousel">
        <div class="arrow-left">
          <button tabindex="0" class="arrow">&#x2039;</button>
        </div>
        <img src="${this.currentImage}" alt="Carousel Image ${this.currentImage}">
        <div class="arrow-right">
          <button tabindex="0" class="arrow">&#x203A;</button>
        </div>
        <nav class="indicators">
          ${this.secondsDelay && html`
            <button class="controls" tabindex="0" @click="${this.toggleAutoPlay}">
              <div id="control" class="play" role="button"></div>
            </button>
          `}
          ${this._circleSpan()}
        </nav>
      </div>
      <div class="description">
        ${this.currentDescription}
      </div>
    `;
  }
}