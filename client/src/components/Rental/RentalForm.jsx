import React, { Component } from "react";
import { connect } from "react-redux";

import { createRental } from "../../actions/";
import TextFieldGroup from "../common/TextFieldGroup";

import { Redirect } from "react-router-dom";
export class RentalForm extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      subtitle: "",
      street: "",
      city: "",
      country: "",
      image:
        "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg",
      category: "",
      bedrooms: 0,
      guests: 0,
      beds: 0,
      bathrooms: 0,
      shared: true,
      cleanTitle: "",
      cleanDetails: "",
      checkInTitle: "",
      checkInDetails: "",
      description: "",
      spaceDescription: "",
      guestsAccessDescription: "",
      amenities: [],
      sleepingArrangements: "",
      dailyRate: 0,
      errors: {},
      redirect: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  componentDidMount() {
    if (this.state.redirect) {
      this.props.history.push("/");
    }
  }

  onSubmit = async e => {
    try {
      this.setState({ errors: {} });
      const {
        title,
        subtitle,
        street,
        city,
        country,
        image,
        category,
        bedrooms,
        guests,
        beds,
        bathrooms,
        shared,
        cleanTitle,
        cleanDetails,
        checkInTitle,
        checkInDetails,
        description,
        spaceDescription,
        guestsAccessDescription,
        amenities,
        sleepingArrangements,
        dailyRate
      } = this.state;
      e.preventDefault();

      const rentalData = {
        title,
        subtitle,
        street,
        city,
        country,
        image,
        category,
        bedrooms,
        guests,
        beds,
        bathrooms,
        shared,
        cleanTitle,
        cleanDetails,
        checkInTitle,
        checkInDetails,
        description,
        spaceDescription,
        guestsAccessDescription,
        amenities,
        sleepingArrangements,
        dailyRate
      };

      await this.props.createRental(rentalData, this.props.history);
      this.setState({ redirect: true });

      console.log(rentalData);
    } catch (error) {
      this.setState({ errors: this.state.errors });
    }
  };

  // handleImageUpload(e) {
  //   const image = e.target.files[0];
  //   this.setState({ image });
  // }

  // async onSubmit(e) {
  //   e.preventDefault();
  //   try {
  //     // Initialize the form data
  //     let formData = new FormData();

  //     // Add the form data we need to submit

  //     formData.append("title", this.state.title);
  //     formData.append("description", this.state.description);
  //     formData.append("image", this.state.image);
  //     formData.append("city", this.state.city);
  //     formData.append("country", this.state.country);
  //     formData.append("subtitle", this.state.subtitle);
  //     formData.append("category", this.state.category);
  //     formData.append("bedrooms", this.state.bedrooms);
  //     formData.append("guests", parseInt(this.state.guests));
  //     formData.append("beds", this.state.beds);
  //     formData.append("bathrooms", this.state.bathrooms);
  //     formData.append("guests", this.state.guests);
  //     formData.append("sleepingArrangements", this.state.sleepingArrangements);
  //     formData.append("dailyRate", this.state.dailyRate);

  //     debugger;
  //     await this.props.createRental(formData);
  //     console.log(formData);
  //     this.setState({ redirect: true });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const {
      title,
      subtitle,
      street,
      city,
      country,
      image,
      imageName,
      category,
      bedrooms,
      guests,
      beds,
      bathrooms,
      shared,
      cleanTitle,
      cleanDetails,
      checkInTitle,
      checkInDetails,
      description,
      spaceDescription,
      guestsAccessDescription,
      amenities,
      sleepingArrangements,
      dailyRate,
      errors,
      redirect
    } = this.state;

    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/rentals" }} />;
    }

    return (
      <div className="Login">
        <div className="Login__form">
          <div className="row">
            <div className="col-md-5">
              <br />

              <form onSubmit={this.onSubmit}>
                <label htmlFor="title">Title</label>
                <TextFieldGroup
                  placeholder="Title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={this.onChange}
                  required
                />
                <label htmlFor="subtitle">Subtitle</label>
                <TextFieldGroup
                  placeholder="E.g. Room In Hostel"
                  name="subtitle"
                  type="text"
                  value={subtitle}
                  onChange={this.onChange}
                  required
                />
                <label htmlFor="subtitle">City</label>
                <TextFieldGroup
                  placeholder="City"
                  name="city"
                  type="text"
                  value={city}
                  onChange={this.onChange}
                  required
                />
                <label htmlFor="subtitle">Country</label>
                <TextFieldGroup
                  placeholder="Country"
                  name="country"
                  type="text"
                  value={country}
                  onChange={this.onChange}
                  required
                />

                {/* <label htmlFor="image">Image</label>
                <input
                  placeholder="Image"
                  name="image"
                  type="file"
                  onChange={this.onChange}
                /> */}

                <label htmlFor="subtitle">Category</label>
                <TextFieldGroup
                  placeholder="E.g. Standard Room"
                  name="category"
                  type="text"
                  value={category}
                  onChange={this.onChange}
                  required
                />

                <label htmlFor="subtitle">Bedrooms</label>
                <input
                  className="form-control form-control-lg"
                  placeholder="Bedrooms"
                  name="bedrooms"
                  type="number"
                  min="1"
                  max="100"
                  value={bedrooms}
                  onChange={this.onChange}
                  required
                />

                <label htmlFor="subtitle">Guests</label>
                <input
                  className="form-control form-control-lg"
                  placeholder="Guests"
                  name="guests"
                  min="1"
                  max="100"
                  type="number"
                  value={guests}
                  onChange={this.onChange}
                  required
                />
                <label htmlFor="subtitle">Beds</label>
                <input
                  className="form-control form-control-lg"
                  placeholder="Beds"
                  name="beds"
                  min="1"
                  max="100"
                  type="number"
                  value={beds}
                  onChange={this.onChange}
                  required
                />
                <label>Bathrooms</label>
                <input
                  className="form-control form-control-lg"
                  placeholder="Bathrooms"
                  name="bathrooms"
                  type="number"
                  min="1"
                  max="100"
                  value={bathrooms}
                  onChange={this.onChange}
                  required
                />
                <label>Description</label>
                <TextFieldGroup
                  placeholder="Description"
                  name="description"
                  type="textarea"
                  value={description}
                  onChange={this.onChange}
                  required
                />
                <label>Sleeping Arrangements</label>
                <TextFieldGroup
                  placeholder="E.g. 1 double bed"
                  name="sleepingArrangements"
                  type="text"
                  value={sleepingArrangements}
                  onChange={this.onChange}
                  required
                />

                <label>Daily Rate</label>
                <input
                  className="form-control form-control-lg"
                  placeholder="Daily Rate"
                  name="dailyRate"
                  type="number"
                  min="1"
                  max="5000"
                  value={dailyRate}
                  onChange={this.onChange}
                  required
                />
                <input
                  type="submit"
                  className="btn btn-submit btn-block mt-4"
                  value="Create"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createRental })(RentalForm);
