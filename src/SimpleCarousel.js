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
       * Example of property
       * @property
       * @type { String }
       */
      images: {
        type: Array
      }
    };
  }

  static get styles() {
    return [wcNameStyles];
  }

  constructor() {
    super();
    this.images = ['./images/1.jpg', './images/2.webp', './images/3.webp', './images/4.jpg', './images/5.webp', './images/6.webp'];
    this.numImages = this.images.length - 1;
    this.currentIndex = 0;
    this.left = null
    this.right = null;

    this._goToLeft = this._goToLeft.bind(this);
    this._goToRight = this._goToRight.bind(this);
  }  

  _goToLeft(e) {
    const newIndex = this.getArrowLeftImageIndex(this.getCurrentImageIndex());
    this.activateIndicator(newIndex);
    if (!this.left) {
      this.left = this.intervalSlider('left');
    }
    this.setAttr(this.imgCarousel, 'src', this.images[newIndex]);
  };

  _goToRight(e) {
    const newIndex = this.getArrowRightImageIndex(this.getCurrentImageIndex());
    this.activateIndicator(newIndex);
    if (!this.right) {
      this.right = this.intervalSlider('right');
    }
    this.setAttr(this.imgCarousel, 'src', this.images[newIndex]);
  }

  firstUpdated() {
    this.arrowLeft = this.shadowRoot.querySelector('.arrow-left');
    this.arrowRight = this.shadowRoot.querySelector('.arrow-right');
    this.imgCarousel = this.shadowRoot.querySelector('img');
    this.indicators = this.shadowRoot.querySelectorAll('.indicators > span');

    this.arrowLeft.addEventListener('click', this._goToLeft);
    this.arrowRight.addEventListener('click', this._goToRight);
  }

  setAttr(el, attr, value) {
    return el.setAttribute(attr, value);
  }
  getAttr(el, attr) {
    return el.getAttribute(attr);
  }
  getImageIndex(image) {
    return this.images.indexOf(image);
  }

  getCurrentImageIndex() {
    const currentImage = this.getAttr(this.imgCarousel, 'src');
    return this.getImageIndex(currentImage);
  };

  getArrowLeftImageIndex(currentIndex) {
    return currentIndex === 0 ? this.numImages : currentIndex - 1;
  };
  getArrowRightImageIndex(currentIndex) {
    return currentIndex === this.numImages ? 0 : currentIndex + 1;
  };

  activateIndicator(index) {
    this.indicators.forEach((el, i) => {
      if (el.classList.contains('active')) {
        el.classList.remove('active')
      };
      if (index === i) el.classList.add('active');
    });
  };

  intervalSlider(direction) {
    let callback = null;
    let getNewIndexFunc = null;
    if (direction === 'left') {
      getNewIndexFunc = () => this.getArrowLeftImageIndex(this.getCurrentImageIndex());
    } else {
      getNewIndexFunc = () => this.getArrowRightImageIndex(this.getCurrentImageIndex());
    }
  
    callback = () => {
      let newIndex = getNewIndexFunc();
      this.activateIndicator(newIndex);
      this.setAttr(this.imgCarousel, 'src', this.images[newIndex]);
    }
    return callback;
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
          <span class="active"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
  }
}