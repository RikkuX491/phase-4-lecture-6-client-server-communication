#!/usr/bin/env python3

from app import app
from models import db, Hotel, Customer, Review

with app.app_context():
    
    Hotel.query.delete()
    Customer.query.delete()
    Review.query.delete()

    hotels = []
    hotels.append(Hotel(name="Marriott", image="https://www.travelandleisure.com/thmb/D-J3iY0h_IBxkZmTQldWUXAuHQg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/renaissance-new-york-midtown-hotel-NYCHOTELS0420-051ef9d668174c978edbb1ee8f6b93e4.jpg"))
    hotels.append(Hotel(name="Holiday Inn", image="https://www.ihgplc.com/en/-/media/newsrelease_placeholder/holiday-inn-johor-bahru-city-centre---deluxe-king.jpg"))
    hotels.append(Hotel(name="Hampton Inn", image="https://images.trvl-media.com/lodging/11000000/10970000/10961600/10961545/5b998347.jpg"))

    customers = []
    customers.append(Customer(first_name="Alice", last_name="Baker"))
    customers.append(Customer(first_name="Barry", last_name="Smith"))
    customers.append(Customer(first_name="Chris", last_name="Jones"))

    reviews = []
    reviews.append(Review(hotel_id=1, customer_id=1, rating=5))
    reviews.append(Review(hotel_id=2, customer_id=1, rating=5))
    reviews.append(Review(hotel_id=1, customer_id=2, rating=4))
    reviews.append(Review(hotel_id=1, customer_id=1, rating=3))

    db.session.add_all(hotels)
    db.session.add_all(customers)
    db.session.add_all(reviews)
    db.session.commit()
    print("🌱 Hotels, Customers, and Reviews successfully seeded! 🌱")
