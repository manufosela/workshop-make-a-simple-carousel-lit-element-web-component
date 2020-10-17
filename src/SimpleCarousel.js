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

    this._goToLeft = this._goToLeft.bind(this);
    this._goToRight = this._goToRight.bind(this);
  }  

  getCarouselData() {
    const carouselDataHTML = this.querySelectorAll('ul[slot="images-data"] li');
    console.log(carouselDataHTML);
    Array.from(carouselDataHTML).reduce((acc, el) => {
      const imgHTML = el.querySelector('img');
      const descHTML = el.querySelector('span');
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
    this.indicators = this.shadowRoot.querySelectorAll('.indicators > span');

    this.arrowLeft.addEventListener('click', this._goToLeft);
    this.arrowRight.addEventListener('click', this._goToRight);
  }

  getArrowLeftImageIndex() {
    this.currentIndex = this.currentIndex === 0 ? this.numImages - 1 : this.currentIndex - 1;
  };
  getArrowRightImageIndex() {
    this.currentIndex = (this.currentIndex + 1) % this.numImages; // currentIndex === this.numImages - 1 ? 0 : this.currentIndex + 1;
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
    this.currentImage = this.carouselData[this.currentIndex].image;
    this.currentDescription = this.carouselData[this.currentIndex].description;
  };

  _goToRight(e) {
    this.getArrowRightImageIndex();
    this.activateIndicator(this.currentIndex);
    this.currentImage = this.carouselData[this.currentIndex].image;
    this.currentDescription = this.carouselData[this.currentIndex].description;
  }

  _circleSpan() {
    return ``;
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
        <img src="${this.currentImage}" alt="Carousel Image ${this.currentImage}">
        <div class="arrow-right">
          <span class="arrow">&#x203A;</span>
        </div>
        <div class="indicators">
          ${this._circleSpan()}
        </div>
      </div>
      <div class="description">
        ${this.currentDescription}
      </div>
    `;
  }
}