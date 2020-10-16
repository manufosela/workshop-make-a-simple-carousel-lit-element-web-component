/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, expect } from "@open-wc/testing";
import "../simple-carousel";

describe("SimpleCarousel", () => {
  it("should have the basic template", async () => {
    const el = await fixture(
      html`
        <simple-carousel></simple-carousel>
      `
    );
    const base = el.shadowRoot.querySelector(".simple-carousel");

    expect(base).not.to.be.null;
    expect(el).dom.to.equalSnapshot();
  });
});
