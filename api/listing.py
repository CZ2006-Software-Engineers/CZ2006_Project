from flask import Blueprint, jsonify, make_response, request
from flask_login import current_user, login_required

from .models.listing import Listing
from .schemas import ListingSchema
from . import db

listing = Blueprint('listing', __name__)


def normalize_query_param(value):
    return value if len(value) > 1 else value[0]


def normalize_query(params):
    params_non_flat = params.to_dict(flat=False)
    return {k: normalize_query_param(v) if k != "location" else v for k, v in params_non_flat.items()}


@listing.route("/listing/<int:listing_id>", methods=["GET"])
def get_listing(listing_id):
    listing = Listing.query.filter_by(id=listing_id).first()
    listing_schema = ListingSchema()

    return make_response(jsonify({"listing": listing_schema.dump(listing)}), 200)


@listing.route("/listing", methods=["GET"])
def get_all_listings():
    args = normalize_query(request.args)
    location = args.get("location")
    type = args.get("type")
    if type != "undefined":
        type = True if type == "room" else False
    number = args.get("number")
    minPrice = args.get("minPrice")
    maxPrice = args.get("maxPrice")
    print(args)
    listings = Listing.query
    if location is not None and location != "" and "undefined" not in location:
        listings = listings.filter(Listing.location.in_(location))
    if type is not None and type != "" and type != "undefined":
        listings = listings.filter(Listing.isRoom == type)
    if number is not None and number != "" and number != "undefined":
        listings = listings.filter(Listing.numRooms == number)
    if minPrice is not None and minPrice != "":
        listings = listings.filter(Listing.price >= minPrice)
    if maxPrice is not None and maxPrice != " ":
        listings = listings.filter(Listing.price <= maxPrice)
    listing_schema = ListingSchema(many=True)
    return make_response(jsonify({"listings": listing_schema.dump(listings.all())}), 200)


@listing.route("/listing", methods=["POST"])
@login_required
def post_listing():
    listing_data = request.get_json()
    postalCode = listing_data["postalCode"]
    location = listing_data["location"]
    isRoom = listing_data["isRoom"]
    title = listing_data["title"]
    description = listing_data["description"]
    price = listing_data["price"]
    numRooms = listing_data["numRooms"]
    seller_id = current_user.id

    new_listing = Listing(postalCode=postalCode, location=location, isRoom=isRoom, title=title,
                          description=description, price=price, numRooms=numRooms, seller_id=seller_id)

    db.session.add(new_listing)
    db.session.commit()
    return make_response(jsonify({"message": "Successfully created new listing", "id": new_listing.id}), 200)
