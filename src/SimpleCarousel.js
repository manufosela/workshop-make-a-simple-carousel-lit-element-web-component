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
       * Carousel images string separated by commas
       * @property
       * @type { String }
       */
      imageList: {
        type: String,
        attribute:'image-list'
      },
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
       * Current Image Description
       * @property
       * @type { String }
       */
      description: {
        type: String,
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
    this.imagePath = './images/';
    this.description = '';
    this.descriptions = [];

    this._goToLeft = this._goToLeft.bind(this);
    this._goToRight = this._goToRight.bind(this);
  }  

  getDescriptions() {
    this.descriptions = this.querySelectorAll('ul[slot="descriptions"] li');
    this.description = this.descriptions[0];
  }

  connectedCallback() {
    super.connectedCallback();
    this.getDescriptions();
  }

  firstUpdated() {
    this.images = this.imageList.split(',').map((img)=>{
      return this.imagePath + img;
    });
    this.numImages = this.images.length;

    this.arrowLeft = this.shadowRoot.querySelector('.arrow-left');
    this.arrowRight = this.shadowRoot.querySelector('.arrow-right');
    this.imgCarousel = this.shadowRoot.querySelector('img');
    this.indicators = this.shadowRoot.querySelectorAll('.indicators > span');

    this.arrowLeft.addEventListener('click', this._goToLeft);
    this.arrowRight.addEventListener('click', this._goToRight);
  }

  getArrowLeftImageIndex() {
    this.currentIndex = this.currentIndex === 0 ? this.numImages - 1 : this.currentIndex - 1;
    return this.currentIndex;
  };
  getArrowRightImageIndex() {
    this.currentIndex = (this.currentIndex + 1) % this.numImages; // currentIndex === this.numImages - 1 ? 0 : this.currentIndex + 1;
    return this.currentIndex;
  };

  activateIndicator(index) {
    this.indicators.forEach((el, i) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active')
      };
      if (index === i) el.classList.add('active');
    });
  };

  _goToLeft(e) {
    this.getArrowLeftImageIndex();
    this.activateIndicator(this.currentIndex);
    this.imgCarousel.setAttribute('src', this.images[this.currentIndex]);
    this.description = this.descriptions[this.currentIndex];
  };

  _goToRight(e) {
    this.getArrowRightImageIndex();
    this.activateIndicator(this.currentIndex);
    this.imgCarousel.setAttribute('src', this.images[this.currentIndex]);
    this.description = this.descriptions[this.currentIndex];
  }

  _circleSpan() {
    const imgsHTML = this.imageList.split(',').map((img, index)=> {
      return html`<span class="${(index===0) ? 'active': ''}"></span>`;
    });
    return imgsHTML;
  }

  render() {
    return html`
      <div class="carousel">
        <div class="arrow-left">
          <span class="arrow">&#x2039;</span>
        </div>
        <img src="./images/1.jpg" alt="Carousel Image">
        <div class="arrow-right">
          <span class="arrow">&#x203A;</span>
        </div>
        <div class="indicators">
          ${this._circleSpan()}
        </div>
      </div>
      <div class="description">
        ${this.description}
      </div>
    `;
  }
}