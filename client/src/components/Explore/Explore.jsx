import React from "react";

const Explore = () => {
  const url = "/images/explore.jpg";

  return (
    <div className="container">
      <h1 className="container__title">Explore Rentals</h1>
      <br />
      <div
        className="box"
        style={{
          width: "389.33px",
          height: "84px",
          backgroundColor: "white",
          borderRadius: "4px",
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px "
        }}
      >
        <a href="#rentals" style={{ color: "#212529", textDecoration: "none" }}>
          <div
            className="bg__container"
            style={{
              width: "126px",
              height: "84px",
              backgroundImage: `url(${url})`,
              backgroundSize: "cover"
            }}
          >
            <div style={{ padding: "0px 16px 0px 24px" }}>
              <h2
                className="heading2"
                style={{
                  padding: "35px 120px",
                  fontSize: "16px",
                  fontWeight: "bold"
                }}
              >
                Stays
              </h2>
            </div>
          </div>
        </a>
      </div>
      <br />
    </div>
  );
};

export default Explore;
