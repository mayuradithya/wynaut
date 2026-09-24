import Header from "../components/Header";

export const metadata = {
  title: "About — Wynaut",
  description: "Learn about Wynaut, a refined portfolio for photographers and videographers.",
};

export default function AboutPage() {
  return (
    <div className="page about-page">
      <Header />

      <main className="main about-main">
        <section className="about-hero">
          <div className="about-hero-top">
            <span className="about-label">About Us</span>
            <span className="about-year">Est. 2026</span>
          </div>

          <h1 className="about-title">
            <span className="about-line">We are a</span>
            <span className="about-line">visual studio</span>
            <span className="about-line about-line-muted">shaping light,</span>
            <span className="about-line about-line-muted">texture &amp; time.</span>
          </h1>
        </section>

        <section className="about-image-section">
          <div className="about-image-frame">
            <img
              src="/images/OvdPf9ABPxUWmjHjjPGtRcwszA.webp"
              alt="Wynaut studio atmosphere"
              loading="eager"
              decoding="async"
            />
          </div>
          <div className="about-caption">
            <span>Studio Notes</span>
            <span>No. 01</span>
          </div>
        </section>

        <section className="about-body">
          <div className="about-row">
            <p className="about-lead">
              Wynaut is a refined portfolio template crafted for photographers
              and filmmakers who believe in restraint, rhythm, and raw image
              making. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className="about-services">
              <h6>Services</h6>
              <ul>
                <li>Editorial Photography</li>
                <li>Fashion Film</li>
                <li>Art Direction</li>
                <li>Brand Campaigns</li>
                <li>Casting &amp; Production</li>
              </ul>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">12</span>
              <span className="stat-label">Years Active</span>
            </div>
            <div className="stat">
              <span className="stat-number">240+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">18</span>
              <span className="stat-label">Awards</span>
            </div>
            <div className="stat">
              <span className="stat-number">06</span>
              <span className="stat-label">Team Members</span>
            </div>
          </div>

          <div className="about-contact">
            <a href="mailto:hello@wynaut.studio" className="about-cta">
              Start a project
            </a>
            <span className="about-location">Based in Paris &amp; New York</span>
          </div>
        </section>
      </main>
    </div>
  );
}
