// Book reviews index data
const reviewsIndex = [
  {
    "slug": "a-christmas-carol",
    "title": "A Christmas Carol",
    "author": "Charles Dickens",
    "finished": "December 15, 2023",
    "rating": 4,
    "wordcount": "28944"
  },
  {
    "slug": "anna-karenina",
    "title": "Anna Karenina",
    "author": "Leo Tolstoy",
    "finished": "May 5, 2025",
    "rating": 5,
    "wordcount": "349736"
  },
  {
    "slug": "don-quixote",
    "title": "Don Quixote",
    "author": "Miguel de Cervantes",
    "finished": "June 27, 2024",
    "rating": 5,
    "wordcount": "381105"
  },
  {
    "slug": "far-from-the-madding-crowd",
    "title": "Far From The Madding Crowd",
    "author": "Thomas Hardy",
    "finished": "December 28, 2023",
    "rating": 5,
    "wordcount": "140193"
  },
  {
    "slug": "flush",
    "title": "Flush",
    "author": "Virginia Woolf",
    "finished": "March 7, 2025",
    "rating": 3,
    "wordcount": "40000"
  },
  {
    "slug": "huckleberry-finn",
    "title": "Huckleberry Finn",
    "author": "Mark Twain",
    "finished": "March 7, 2024",
    "rating": 5,
    "wordcount": "109571"
  },
  {
    "slug": "kafka-on-the-shore",
    "title": "Kafka On The Shore",
    "author": "Haruki Murakami",
    "finished": "December 12, 2023",
    "rating": 4,
    "wordcount": "173100"
  },
  {
    "slug": "moby-dick",
    "title": "Moby Dick",
    "author": "Herman Melville",
    "finished": "October 10, 2024",
    "rating": 5,
    "wordcount": "206052"
  },
  {
    "slug": "norwegian-wood",
    "title": "Norwegian Wood",
    "author": "Haruki Murakami",
    "finished": "October 10, 2023",
    "rating": 4,
    "wordcount": "118378"
  },
  {
    "slug": "notes-from-underground",
    "title": "Notes From the Underground",
    "author": "Fyodor Dostoevsky",
    "finished": "November 28, 2023",
    "rating": 5,
    "wordcount": "38500"
  },
  {
    "slug": "on-the-road",
    "title": "On The Road",
    "author": "Jack Kerouac",
    "finished": "April 15, 2024",
    "rating": 4,
    "wordcount": "92456"
  },
  {
    "slug": "one-hundred-years-of-solitude",
    "title": "One Hundred Years of Solitude",
    "author": "Gabriel Garc\u00eda M\u00e1rquez",
    "finished": "September 26, 2023",
    "rating": 5,
    "wordcount": "144523"
  },
  {
    "slug": "siddhartha",
    "title": "Siddhartha",
    "author": "Hermann Hesse",
    "finished": "October 22, 2024",
    "rating": 4,
    "wordcount": "42000"
  },
  {
    "slug": "stoner",
    "title": "Stoner",
    "author": "John Edward Williams",
    "finished": "May 30, 2024",
    "rating": 5,
    "wordcount": "72000"
  },
  {
    "slug": "tess-of-the-durbervilles",
    "title": "Tess of the d'Urbervilles",
    "author": "Thomas Hardy",
    "finished": "July 19, 2025",
    "rating": 5,
    "wordcount": "189000"
  },
  {
    "slug": "the-brothers-karamazov",
    "title": "The Brothers Karamazov",
    "author": "Fyodor Dostoevsky",
    "finished": "November 23, 2023",
    "rating": 5,
    "wordcount": "364153"
  },
  {
    "slug": "the-catcher-in-the-rye",
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "finished": "August 14, 2023",
    "rating": 4,
    "wordcount": "73404"
  },
  {
    "slug": "the-count-of-monte-cristo",
    "title": "The Count of Monte Cristo",
    "author": "Alexandre Dumas",
    "finished": "December 28, 2025",
    "rating": 5,
    "wordcount": "375695"
  },
  {
    "slug": "the-dead",
    "title": "The Dead",
    "author": "James Joyce",
    "finished": "January 2, 2026",
    "rating": 5,
    "wordcount": "16000"
  },
  {
    "slug": "the-dharma-bums",
    "title": "The Dharma Bums",
    "author": "Jack Kerouac",
    "finished": "May 2, 2024",
    "rating": 4,
    "wordcount": "61000"
  },
  {
    "slug": "the-hobbit",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "finished": "October 9, 2023",
    "rating": 4,
    "wordcount": "95022"
  },
  {
    "slug": "the-importance-of-being-earnest",
    "title": "The Importance of Being Earnest",
    "author": "Oscar Wilde",
    "finished": "July 22, 2025",
    "rating": 5,
    "wordcount": "20582"
  },
  {
    "slug": "the-master-and-margarita",
    "title": "The Master & Margarita",
    "author": "Mikhail Bulgakov",
    "finished": "January 6, 2024",
    "rating": 5,
    "wordcount": "149032"
  },
  {
    "slug": "the-old-man-and-the-sea",
    "title": "The Old Man and the Sea",
    "author": "Ernest Hemingway",
    "finished": "September 9, 2023",
    "rating": 4,
    "wordcount": "26500"
  },
  {
    "slug": "the-picture-of-dorian-gray",
    "title": "The Picture of Dorian Gray",
    "author": "Oscar Wilde",
    "finished": "October 18, 2023",
    "rating": 4,
    "wordcount": "78462"
  },
  {
    "slug": "the-prince",
    "title": "The Prince",
    "author": "Niccolo Machiavelli",
    "finished": "May 19, 2025",
    "rating": 4,
    "wordcount": "31026"
  },
  {
    "slug": "the-wind-up-bird-chronicle",
    "title": "The Wind-Up Bird Chronicle",
    "author": "Haruki Murakami",
    "finished": "March 24, 2024",
    "rating": 5,
    "wordcount": "220000"
  },
  {
    "slug": "to-the-lighthouse",
    "title": "To the Lighthouse",
    "author": "Virginia Woolf",
    "finished": "September 5, 2023",
    "rating": 5,
    "wordcount": "70000"
  },
  {
    "slug": "war-and-peace",
    "title": "War and Peace",
    "author": "Leo Tolstoy",
    "finished": "February 21, 2024",
    "rating": 5,
    "wordcount": "635623"
  },
  {
    "slug": "wuthering-heights",
    "title": "Wuthering Heights",
    "author": "Emily Bront\u00eb",
    "finished": "February 27, 2024",
    "rating": 5,
    "wordcount": "119572"
  }
];
