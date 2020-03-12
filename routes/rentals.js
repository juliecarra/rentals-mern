const express = require("express");
const { check, validationResult } = require("express-validator");

const router = new express.Router();

const middleware = require("./middlewares/jwt");
const uploader = require("../config/cloudinary");

const Rental = require("../models/Rental");
const User = require("../models/User");

/**
 @route    /api/rentals/manage
@method   GET
@desc     manage rentals
@access   private
*/

router.get("/manage", middleware, async (req, res) => {
  const user = req.user.id;

  try {
    await Rental.where({ user })
      .populate("bookings")
      .exec(function(error, foundRentals) {
        if (error) {
          return res.status(400).json({ msg: "rental not found" });
        }
        res.json(foundRentals);
      });
  } catch (error) {
    res.status(500).send("server error");
  }
});

/** 
@route    /api/rentals/:id
@method   GET
@desc     get rental by id
@access   public
*/

router.get("/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate("user", "username -_id")
      .populate("bookings", "startAt endAt  -_id");
    if (!rental) {
      return res.status(400).json({ msg: "rental not found" });
    }
    res.json(rental);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      res.status(404).json({ msg: "rental not found" });
    }
    res.status(500).send("server error");
  }
});

/** 
@route    /api/rentals
@method   GET
@desc     get rentals by query string
@access   public
*/

router.get("/", async (req, res) => {
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};

  try {
    await Rental.find(query)
      .sort({ date: -1 })
      .select("-bookings")
      .exec(function(error, foundRentals) {
        if (error) {
          res.status(500).send("server error");
        }
        if (city && foundRentals.length === 0) {
          return res.status(422).send({
            errors: [
              {
                title: "no rentals found!",
                detail: `there are no rentals for city ${city}`
              }
            ]
          });
        }
        return res.json(foundRentals);
      });
  } catch (error) {
    res.status(500).send("server error");
  }
});

/** 
@route    /api/rentals
@method   POST
@desc     add rentals
@access   public
*/
router.post(
  "/",
  [
    check("title", "title is required")
      .not()
      .isEmpty(),
    check("subtitle", "subtitle is required")
      .not()
      .isEmpty(),
    check("city", "city is required")
      .not()
      .isEmpty(),
    check("country", "country is required")
      .not()
      .isEmpty(),
    check("image", "image is required")
      .not()
      .isEmpty(),
    check("category", "category is required")
      .not()
      .isEmpty(),
    check("description", "description is required")
      .not()
      .isEmpty(),
    check("guests", "guests is required")
      .not()
      .isEmpty(),
    check("beds", "beds is required")
      .not()
      .isEmpty(),
    check("bedrooms", "bedrooms is required")
      .not()
      .isEmpty(),
    check("bathrooms", "bathrooms is required")
      .not()
      .isEmpty(),
    check("sleepingArrangements", "sleepingArrangements is required")
      .not()
      .isEmpty()
  ],
  middleware,
  uploader.single("image"),

  async (req, res) => {
    //express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      title,
      subtitle,
      street,
      city,
      country,
      image,
      category,
      checkInDetails,
      arrivalDetails,
      cleanDetails,
      checkInTitle,
      arrivalTitle,
      cleanTitle,
      bedrooms,
      beds,
      shared,
      bathrooms,
      guests,
      spaceDescription,
      guestsAccessDescription,
      description,
      amenities,
      sleepingArrangements,
      dailyRate
    } = req.body;

    //  const image = req.file;

    try {
      const newRental = new Rental({
        title,
        subtitle,
        street,
        city,
        country,
        image,
        category,
        spaceDescription,
        guestsAccessDescription,
        description,
        checkInDetails,
        arrivalDetails,
        cleanDetails,
        checkInTitle,
        arrivalTitle,
        cleanTitle,
        shared,
        bedrooms,
        beds,
        bathrooms,
        guests,
        amenities,
        sleepingArrangements,
        dailyRate,
        user: req.user.id
      });

      // if (req.file) newRental.image = req.file.secure_url;

      User.updateOne(
        { _id: req.user.id },
        { $push: { rentals: newRental } },
        function() {}
      );
      const rental = await newRental.save();
      res.status(200).json(rental);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

/** 
@route    /api/rentals/:id
@method   PATCH
@desc     update a rental
@access   private
*/

router.patch("/:id", middleware, async (req, res) => {
  const rentalData = req.body;
  const user = req.user.id;

  try {
    let rental = await Rental.findById(req.params.id).where({ user });

    if (!rental) return res.status(404).json({ message: "rental not found" });
    else {
      rental = await Rental.findByIdAndUpdate(
        req.params.id,
        { $set: rentalData },
        { new: true }
      );

      res.json(rental);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

/** 
@route    /api/rentals/:id
@method   DELETE
@desc     delete rentals
@access   public
*/

router.delete("/:id", middleware, async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    //If rental doesn't exist
    if (!rental) {
      res.status(404).json({ msg: "rental not found" });
    }
    //Check user
    if (rental.user.toString() !== req.user.id) {
      res.status(404).json({ msg: "user not authorized" });
    }

    //Check booking on this rental
    if (rental.bookings.length > 0) {
      res
        .status(404)
        .json({ msg: "cannot delete rental with active bookings!" });
    }
    await rental.remove();
    res.json({ msg: "rental removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      res.status(404).json({ msg: "rental not found" });
    }
    res.status(500).send("server error");
  }
});

module.exports = router;
