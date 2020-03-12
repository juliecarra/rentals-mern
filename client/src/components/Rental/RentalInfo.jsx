import React from "react";
import RentalAmenitie from "./RentalAmenitie";

const RentalInfo = ({ rental }) => {
  const {} = rental;
  return (
    <div className="RentalInfos">
      <div className="rental-owner">
        <img src="/images/avatar.png" alt="owner" />
        <span>{rental.user && rental.user.username}</span>
      </div>

      <h2 className="RentalInfos__subtitle">{rental.subtitle}</h2>
      <p className="RentalInfos__infos">
        {rental.guests} {rental.guests === 1 ? "guest" : "guests"} •{" "}
        {rental.bedrooms} {rental.bedrooms === 1 ? "bedroom" : "bedrooms"} •{" "}
        {rental.beds}
        {rental.beds === 1 ? "bed" : "beds"} •{rental.bathrooms}{" "}
        {rental.bathrooms === 1 ? "bathroom" : "bathrooms"}
      </p>
      <br />
      <hr />
      {rental.arrivalTitle ? (
        <h2 className="RentalInfos__title">
          <strong>{rental.arrivalTitle}</strong>
        </h2>
      ) : (
        ""
      )}
      {rental.arrivalDetails ? (
        <h2 className="RentalInfos__details">{rental.arrivalDetails}</h2>
      ) : (
        ""
      )}
      <br />
      {rental.cleanTitle ? (
        <h2 className="RentalInfos__title">
          <strong>{rental.cleanTitle}</strong>
        </h2>
      ) : (
        ""
      )}
      {rental.cleanDetails ? (
        <h2 className="RentalInfos__details"> {rental.cleanDetails}</h2>
      ) : (
        ""
      )}
      <br />
      {rental.checkInTitle ? (
        <h2 className="RentalInfos__title">
          <strong>{rental.checkInTitle}</strong>
        </h2>
      ) : (
        ""
      )}
      {rental.checkInDetails ? (
        <h2 className="RentalInfos__details">{rental.checkInDetails}</h2>
      ) : (
        ""
      )}
      <br />
      {/* <hr /> */}
      <br />
      <h3 className="RentalInfos__description">{rental.description}</h3>
      <br />
      {rental.spaceDescription ? (
        <h3 className="RentalInfos__description">
          <strong className="strong">The space</strong>
          <br />
          <div> {rental.spaceDescription}</div>
        </h3>
      ) : (
        ""
      )}
      <br />
      {rental.guestsAccessDescription ? (
        <h3 className="RentalInfos__description">
          <strong className="strong">Guest access</strong>
          <br />
          <div>{rental.guestsAccessDescription}</div>
        </h3>
      ) : (
        ""
      )}
      <br />
      <hr />
      <br />

      <h4 className="RentalInfos__sleeping">Sleeping arrangements</h4>
      <br />
      <div className="RentalInfos__sleepingArrangements">
        <br />
        <svg
          viewBox="0 0 24 24"
          role="presentation"
          aria-hidden="true"
          focusable="false"
          style={{
            height: "24px",
            width: "24px",
            fill: "currentcolor",
            marginBottom: "20px"
          }}
        >
          <path
            d="m23.96 14.81-2.96-7.41v-5.02a1.39 1.39 0 0 0 -1.39-1.38h-15.22c-.77 0-1.39.62-1.39 1.38v5.02l-2.96 7.41-.04.19v5.61c0 .64.43 1.17 1.01 1.33 0 .02-.01.04-.01.06v1.5a.5.5 0 0 0 1 0v-1.5h20v1.5a.5.5 0 0 0 1 0v-1.5c0-.02-.01-.04-.01-.06a1.39 1.39 0 0 0 1.01-1.33v-5.61zm-19.96-12.43c0-.21.17-.38.39-.38h15.22a.39.39 0 0 1 .39.39v4.61h-1v-1.61c0-.77-.62-1.39-1.39-1.39h-3.21c-.78 0-1.4.62-1.4 1.39v1.61h-2v-1.61c0-.77-.62-1.39-1.39-1.39h-3.22c-.77 0-1.39.62-1.39 1.39v1.61h-1zm14 3.01v3.21a.39.39 0 0 1 -.39.39h-3.21a.39.39 0 0 1 -.4-.38v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-8 0v3.21a.39.39 0 0 1 -.39.4h-3.22a.39.39 0 0 1 -.39-.39v-3.22a.39.39 0 0 1 .39-.39h3.21a.39.39 0 0 1 .39.39zm-6.16 2.61h1.16v.61c0 .77.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h2v .61c0 .78.62 1.39 1.39 1.39h3.21c.78 0 1.4-.62 1.4-1.39v-.61h1.16l2.8 7h-21.92zm19.16 12.61c0 .21-.18.39-.39.39h-21.22a.39.39 0 0 1 -.39-.39v-4.61h22z"
            fill-rule="evenodd"
          ></path>
        </svg>
        <p style={{ fontWeight: "bold" }}>Bedroom 1</p>
        <p className="RentalInfos__arrangements">
          {rental.sleepingArrangements}
        </p>
      </div>
      <br />
      <hr />
      <br />
      <RentalAmenitie />
    </div>
  );
};

export default RentalInfo;
