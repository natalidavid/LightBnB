
INSERT INTO users (name, email, password) 
VALUES ('Eva Stanley', 'evast@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Luisa Meyer', 'luisa@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
  ('Dominic Parks', 'dparks@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url,
  cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms,
  country, street, city, province, post_code, active)
VALUES (1, 'Beach House', 'description', 'https://media-cdn.tripadvisor.com/media/photo-s/11/4c/79/49/mar-playa-y-cormorant.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-s/11/4c/79/49/mar-playa-y-cormorant.jpg', 300, 1, 1, 2, 'Ecuador', 'Beach 1', 'Isabela', 'Province1', '356H5', true),
  (2, 'Swiss House', 'description', 'https://media-cdn.tripadvisor.com/media/photo-s/11/4c/79/49/mar-playa-y-cormorant.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-s/11/4c/79/49/mar-playa-y-cormorant.jpg', 400, 2, 2, 5, 'Switzerland', 'Hill 102', 'Interlaken', 'Province2', '656H5', true),
  (1, 'Desert House', 'description', 'https://media-cdn.tripadvisor.com/media/photo-s/11/4c/79/49/mar-playa-y-cormorant.jpg',
'https://media-cdn.tripadvisor.com/media/photo-s/11/4c/79/49/mar-playa-y-cormorant.jpg', 500, 1, 1, 3, 'Morocco', 'Dessert 101', 'Marrakesh', 'Province3', '76H5', true);


INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
  (2, 2, '2019-01-04', '2019-02-01'),
  (3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 3, 'message'),
  (2, 3, 2, 4, 'message'),
  (3, 3, 3, 5, 'message');