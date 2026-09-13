import CardList from "../components/CardList";

function About(props) {     
        return(
        <div>
            <h3 className="flex-center-justify">Hi, this is @shgkshimizu!</h3>

<p>This is a small personal space I set up on the internet where I can freely express my thoughts and ideas. Instead of posting on my social media accounts, I intend to publish my entries here mainly for my own entertainment. Besides keeping this site as a personal life tracker, I believe this can also serve as a filter ensuring that only those who put in the effort to know more about me are able to access my content.
</p>
<p>If you have found yourself here by accident, please feel free to look around. We may still share some common interests.</p>

<p>If we have met in person and you are here for whatever reason (hopefully with no ill-intent lol), it’s a pleasure to see you here.</p>

<p>Welcome to my website.</p>

<h6 className="flex-center-justify">MENS. MANUS. COR.</h6>
        <div className="flex-center-justify">
            <iframe data-testid="embed-iframe" style={{borderRadius:'12px', margin: '5rem'}} src="https://open.spotify.com/embed/playlist/2lSDNmU6JbwrOWe4qRbo8i?utm_source=generator&theme=0&si=bebcb93ecc154dab" width="80%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

        </div>
        </div>
    );
}

export default About;