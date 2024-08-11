import { BookInfo, BooksResponse } from "../redux/books";

export const mockBook: BookInfo = {
  author_name: ["J.R.R. Tolkien"],
  cover_edition_key: "OL51694024M",
  edition_key: ["OL25175074M"],
  first_publish_year: 1900,
  first_sentence: [
    "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.",
  ],
  title: "The lord of the rings",
  key: "OL25175074M",
};

export const mockData: BooksResponse = {
  numFound: 741,
  start: 0,
  numFoundExact: true,
  docs: [
    {
      author_name: ["Brian Sibley"],
      cover_edition_key: "OL3953584M",
      edition_key: ["OL11759646M", "OL23247000M", "OL3953584M"],
      first_publish_year: 2001,
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL3062799W",
      title: "The lord of the rings",
    },
    {
      author_name: ["Phil Anderson", "Philip A. Anderson"],
      cover_edition_key: "OL8184572M",
      edition_key: ["OL40208842M", "OL8184572M", "OL36254613M"],
      first_publish_year: 2006,
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL2089932W",
      title: "The Lord of the Ring",
    },
    {
      author_name: ["Cedco Publishing"],
      cover_edition_key: "OL8065495M",
      edition_key: ["OL8065495M"],
      first_publish_year: 2004,
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL34315353W",
      title: "The Lord of the Rings Trilogy",
    },
    {
      edition_key: ["OL45871040M"],
      first_publish_year: 2003,
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL33887017W",
      title: "THE LORD OF THE RINGS",
      author_name: [],
      cover_edition_key: "3467",
    },
    {
      cover_edition_key: "OL47380577M",
      edition_key: ["OL47380577M"],
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL35013811W",
      title: "The Lord of the Rings",
      author_name: [],
      first_publish_year: 0,
    },
    {
      author_name: ["Alessio Cavatore", "Rick Priestley"],
      cover_edition_key: "OL8920312M",
      edition_key: ["OL8920312M"],
      first_publish_year: 2003,
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL16287785W",
      title: "The Lord of the Rings - The Two Towers",
    },
    {
      edition_key: ["OL45700825M"],
      first_publish_year: 2012,
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL33733658W",
      title: "The Lord of the Rings",
      author_name: [],
      cover_edition_key: "e734",
    },
    {
      author_name: ["Elijah Wood"],
      edition_key: ["OL45904953M"],
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL33918153W",
      title: "The Lord of the Rings",
      cover_edition_key: "",
      first_publish_year: 0,
    },
    {
      author_name: ["Liv Tyler", "Cate Blanchett", "Jackson, Peter"],
      edition_key: ["OL39470022M"],
      first_publish_year: 2002,
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL28758970W",
      title: "The Lord of the Rings",
      cover_edition_key: "ey547",
    },
    {
      author_name: ["Wayne G. Hammond", "Christina Scull"],
      cover_edition_key: "OL3410671M",
      edition_key: ["OL26236284M", "OL26236285M", "OL21363237M", "OL3410671M"],
      first_publish_year: 2005,
      first_sentence: ["When Mr. Bilbo Baggins in Hobbiton."],
      key: "/works/OL548432W",
      title: "The lord of the rings",
    },
  ],
  q: "the lord of the rings",
  offset: false,
};
