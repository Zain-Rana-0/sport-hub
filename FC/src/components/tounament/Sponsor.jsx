
  import './Sponsor.css'; 

  const Sponsor = () => {
    const sponsors = [
      {
        name: "Sponsor A",
        logo: "logo.png", 
        description: "Leading brand in sports apparel.",
      },
      {
        name: "Sponsor B",
        logo: "logo.png",
        description: "Official sponsor of our cricket team.",
      }
    ];

    return (
      <div className="sponsor-section">
        <h2 className="tittle">Our Sponsors</h2>
        <div className="sponsor-cards">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="sponsor-card">
              <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
              <h3>{sponsor.name}</h3>
              <p>{sponsor.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  export default Sponsor;
