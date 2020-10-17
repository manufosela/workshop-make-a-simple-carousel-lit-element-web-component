import { css } from 'lit-element';

export const wcNameStyles = css`
  :host {
    display: block;
    --default-main-color: #ff7900;
  }
  .simple-carousel {
    background-color: inherit;
    color: var(--main-color, var(--default-main-color));
  }
  .arrow {
  font-size: 51px;
  font-weight: bold;
  border-radius: 50%;
  width: 50px;
  height: 65px;
  color: white;
  text-align: center;
  display: inline-block;
  transition: all 0.3s ease;
}

.arrow:hover {
  color: #121212;
  background: white;
  cursor: pointer;
}


.carousel {
  position: relative;
  display: block;
  width: 600px;
  margin: 0 auto;
  margin-top: 5%;
}

.arrow-left {
  position: absolute;
  left: 0;
  top: 50%;
  margin-left: 5px;
  transform: translateY(-50%);
  font-size: 4rem;
}

.arrow-right {
  position: absolute;
  right: 0;
  top: 50%;
  margin-right: 5px;
  transform: translateY(-50%);
  font-size: 4rem;
}

.carousel>img {
  width: 100%;
  height: 450px;
  border-radius: 4px;
}

.d-none {
  display: none;
}

.indicators {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  margin-bottom: 2rem;
}

.indicators>span {
  display: inline-block;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background: white;
  margin: 0 3px;
}

.indicators>span.active {
  background: #4fc355;
}

.description {
  display:flex;
  justify-content: center;
  font-size: 1.3rem;
}
.description li {
  list-style: none;
}

`;
