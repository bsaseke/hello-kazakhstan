/* =========================================================================
   Real client reviews (from Tripadvisor).
   These are shown in their ORIGINAL language (English) regardless of the
   site's UI language — testimonials are never machine-translated. Only the
   surrounding UI chrome (heading, summary, arrow labels) is localised.
   ========================================================================= */

export interface Review {
  name: string
  /** meta line under the name — location and/or contribution count */
  from: string
  title: string
  quote: string
  date: string
  rating: number
}

export const reviews: Review[] = [
  {
    name: 'Natalie M',
    from: 'Vienna, Austria',
    title: 'Great way of seeing the sights in a day',
    quote:
      "A wonderful day out seeing Charyn canyon, Kolsai and Kaindy lakes. Be prepared for a long day but this made so much easier thanks to Yernar's excellent organisation and transport — not to mention good company. Would highly recommend! It was one of the highlights of our trip to Kazakhstan.",
    date: 'September 2023',
    rating: 5,
  },
  {
    name: 'Mary Grace Roxanne Barz',
    from: '11 contributions',
    title: 'Best adventure ever 💯',
    quote:
      'The whole trip with 4 major tourist spots from 8:30am until 10:30pm was a once in a lifetime experience… over 380kms travelled ❣️ Thank you for this rare chance as I was a solo adventurer. Mr. Ruslan Yeldymbayev made the whole trip memorable as he explained the history of each place visited and led the best routes to complete the tours. Thank you to the primary contact person, Mr. Yernar, for this one-day trip 😊 …very highly recommended 👍',
    date: 'July 2023',
    rating: 5,
  },
  {
    name: 'Dora N',
    from: 'New York, USA · 93 contributions',
    title: 'Excellent private tour, highly recommended',
    quote:
      'We took his tour — one day Charyn canyon, lake, black canyon, including horse-back riding, off-road taxi and lunch. He picked us up at the hotel, his car was new, clean and comfortable, and his English was impeccable. We had enough time to enjoy each spot and the beauty of the Almaty area. Highly recommended.',
    date: 'April 2023',
    rating: 5,
  },
  {
    name: 'Leah K',
    from: '8 contributions',
    title: 'Great way to see natural beauty outside Almaty',
    quote:
      'We had an excellent time on this tour. We got a chance to get out of the city and see the natural beauty of Almaty, and to see each location at various different spots. Lunch was excellent and the view was fantastic. This tour is worth doing if you have a full day and want to enjoy the beauty of nature. Our tour guide was very friendly, knowledgeable, and timely. For everything we got, the price was very reasonable. Would recommend!',
    date: 'May 2023',
    rating: 5,
  },
  {
    name: 'J W',
    from: 'Tripadvisor review',
    title: 'Spectacular, well planned, adventurous, safe, a must do',
    quote:
      "My trip to Almaty was great due to the services provided by Yernar. Everything was planned carefully by him and the trip went as smooth as possible. I was able to see a good amount of Almaty's nature in one day. It was a breathtaking experience and I thoroughly enjoyed it. I would highly recommend anyone who wants to see the best of what Kazakhstan has to offer to contact Yernar.",
    date: 'September 2023',
    rating: 5,
  },
  {
    name: 'Rochelle_G',
    from: 'Tripadvisor review',
    title: 'Amazing day trip beyond my expectations',
    quote:
      'We organised this day trip at very short notice and Nurlan and his nephew were wonderful! They picked us up from our hotel, very nice comfortable car, and even gave us a welcome gift of local chocolate 😊 The places we visited were beyond my expectations! Also the lunch was exceptional, in a restaurant looking over the lake. It was a very long day but Nurlan made it a wonderful experience! I would highly recommend using this company if you only have a day to explore the area.',
    date: 'August 2023',
    rating: 5,
  },
  {
    name: 'Medea T',
    from: 'Business trip',
    title: 'Fantastic tour with fantastic guide',
    quote:
      'Fantastic day with our guide-driver Ernar. He provided lots of information on various locations throughout the day and was available to answer any questions. We stopped in 4 locations with breathtaking views. The tour includes lunch, which was fantastic. Very very recommended!',
    date: 'June 2023',
    rating: 5,
  },
  {
    name: 'Hamaad K',
    from: 'Tripadvisor review',
    title: 'Would 100% recommend',
    quote:
      "Really fantastic tour. Yernur and his father know what they're doing and, given the private nature of the tour, you get to experience it away from the large tourist buses and appreciate the scenery a lot more.",
    date: 'October 2023',
    rating: 5,
  },
  {
    name: 'Ute P',
    from: 'Hilden, Germany',
    title: 'Great trip',
    quote:
      'It was really a great experience — so many beautiful and different landscapes and places to see. We enjoyed every moment.',
    date: 'August 2023',
    rating: 5,
  },
  {
    name: 'AmirSadra M',
    from: 'Couples trip',
    title: 'Almaty tour',
    quote:
      'We saw amazing views. The tour guide spoke very good English. He also taught us a lot about Kazakhstan and its nature. He is very caring. Definitely recommend this tour 👍',
    date: 'August 2023',
    rating: 5,
  },
]
