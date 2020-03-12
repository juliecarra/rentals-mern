import React from "react";

const Footer = () => {
  return (
    <div>
      <hr className="hr" style={{ width: "100vw", marginLeft: "-130px" }} />
      <br />
      <div className="row">
        <div className="col-sm">
          {" "}
          <ul className="Footer__title">
            {" "}
            Rentals
            <li>
              <a href="#"> Careers</a>
            </li>
            <li>
              <a href="#"> News</a>
            </li>
            <li>
              <a href="#">Policies</a>{" "}
            </li>
            <li>
              <a href="#">Diversity & Belonging</a>{" "}
            </li>
            <li>
              <a href="#">Accessibility</a>{" "}
            </li>
          </ul>
        </div>
        <div className="col-sm">
          <ul className="Footer__title">
            {" "}
            Discover
            <li>
              <a href="#">Trust & Safety</a>{" "}
            </li>
            <li>
              <a href="#">Travel Credit</a>{" "}
            </li>
            <li>
              <a href="#">Gift Cards</a>{" "}
            </li>
            <li>
              <a href="#">Rentals Citizen</a>{" "}
            </li>
            <li>
              <a href="#">Business Travel</a>{" "}
            </li>
            <li>
              <a href="">Things To Do</a>{" "}
            </li>
            <li>
              <a href="#">Airbnbmag</a>{" "}
            </li>
          </ul>
        </div>
        <div className="col-sm">
          <ul className="Footer__title">
            Hosting
            <li>
              <a href="#">Why Host</a>{" "}
            </li>
            <li>
              <a href="#">Refer Hosts</a>{" "}
            </li>
            <li>
              <a href="#">Hospitality</a>{" "}
            </li>
            <li>
              <a href="#">Responsible Hosting</a>{" "}
            </li>
            <li>
              <a href="#">Community Center</a>{" "}
            </li>
            <li>
              <a href="#">Host an Experience</a>{" "}
            </li>
            <li>
              <a href="#">Open Homes</a>{" "}
            </li>
          </ul>
        </div>

        <div className="col-sm">
          <ul className="Footer__title">
            {" "}
            Support
            <li>
              <a href="#"></a> Help
            </li>
            <li>
              <a href="#"> Neighborhood Support</a>{" "}
              <span
                class="new"
                style={{
                  borderRadius: "4px",
                  backgroundColor: "#006A70",
                  color: "white",

                  fontSize: "12px"
                }}
              >
                New
              </span>
            </li>
          </ul>
        </div>
        <hr />
      </div>
      <hr />
      <div className="col-sm">
        <img src="" alt="" />
        <p style={{ color: "rgb(76, 76, 76)" }}>
          © 2020 Rentals, Inc. All rights reserved.{" "}
          <a href="#" style={{ color: "rgb(76, 76, 76)" }}>
            Terms
          </a>{" "}
          ·{" "}
          <a href="#" style={{ color: "rgb(76, 76, 76)" }}>
            Privacy
          </a>{" "}
          ·{" "}
          <a href="#" style={{ color: "rgb(76, 76, 76)" }}>
            Site Map
          </a>{" "}
          <a href="#">
            <i
              class="fab fa-facebook-f"
              style={{ marginLeft: "410px", color: "rgb(76, 76, 76)" }}
            ></i>
          </a>{" "}
          <a href="#">
            {" "}
            <i class="fab fa-twitter" style={{ color: "rgb(76, 76, 76)" }}></i>
          </a>{" "}
          <a href="#">
            {" "}
            <a href="#">
              {" "}
              <i
                class="fab fa-instagram-square"
                style={{ color: "rgb(76, 76, 76)" }}
              ></i>
            </a>
          </a>
        </p>
        {/* <div>
          <i class="fab fa-facebook-f"></i>
        </div> */}
      </div>
    </div>
  );
};

export default Footer;
