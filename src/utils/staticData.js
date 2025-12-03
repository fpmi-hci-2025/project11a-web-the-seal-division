export const staticData = {
  sales: [
    {
      id: 1,
      title: "Скидка 15% на все произведения",
      image: "/project11a-web-the-seal-division/assets/images/sales/sale1.jpg",
      description: "Только 14.02 в честь дня книгодарения скидка 15% на все книги. Сделай подарок своим близким!"
    },
    {
      id: 2,
      title: "Скидка 30% на весь ассортимент",
      image: "/project11a-web-the-seal-division/assets/images/sales/sale2.jpg",
      description: "Зарегистрируйся на сайте и в мобильном приложении и получи скидку 30% на весь ассортимент в течение 5 дней после регистрации!"
    }
  ],
  newBooks: [
    {
      id: 1,
      title: "Зов глубины",
      author: "Брандис К. Цимек Х.-П.",
      image: "/project11a-web-the-seal-division/assets/images/books/new1.png",
      rating: 5,
      price: 39,
      category: "new"
    },
    {
      id: 2,
      title: "Сотрудник как клиент",
      author: "Кожевникова Т.",
      image: "/project11a-web-the-seal-division/assets/images/books/new2.png",
      rating: 4,
      price: 49,
      category: "new"
    },
    {
      id: 3,
      title: "Новая книга 1",
      author: "Автор 1",
      image: "/project11a-web-the-seal-division/assets/images/books/new1.png",
      rating: 4,
      price: 50,
      category: "new"
    },
    {
      id: 4,
      title: "Новая книга 2",
      author: "Автор 2",
      image: "/project11a-web-the-seal-division/assets/images/books/new2.png",
      rating: 5,
      price: 25,
      category: "new"
    },
    {
      id: 13,
      title: "Новая книга 1",
      author: "Автор 1",
      image: "/project11a-web-the-seal-division/assets/images/books/new1.png",
      rating: 4,
      price: 35,
      category: "new"
    },
    {
      id: 14,
      title: "Новая книга 2",
      author: "Автор 2",
      image: "/project11a-web-the-seal-division/assets/images/books/new2.png",
      rating: 5,
      price: 20,
      category: "new"
    }
  ],
  classicBooks: [
    {
      id: 5,
      title: "Мастер и Маргарита",
      author: "Булгаков М. А.",
      image: "/project11a-web-the-seal-division/assets/images/books/classic1.png",
      rating: 5,
      price: 40,
      category: "classic"
    },
    {
      id: 6,
      title: "Отцы и дети",
      author: "Тургенев И. С.",
      image: "/project11a-web-the-seal-division/assets/images/books/classic2.png",
      rating: 5,
      price: 38,
      category: "classic"
    },
    {
      id: 7,
      title: "Война и мир",
      author: "Толстой Л. Н.",
      image: "/project11a-web-the-seal-division/assets/images/books/classic1.png",
      rating: 5,
      price: 40,
      category: "classic"
    },
    {
      id: 8,
      title: "Преступление и наказание",
      author: "Достоевский Ф. М.",
      image: "/project11a-web-the-seal-division/assets/images/books/classic2.png",
      rating: 5,
      price: 30,
      category: "classic"
    }
  ],
  fantasyBooks: [
    {
      id: 9,
      title: "Дюна",
      author: "Фрэнк Герберт",
      image: "/project11a-web-the-seal-division/assets/images/books/fantasy1.png",
      rating: 5,
      price: 42,
      category: "fantasy"
    },
    {
      id: 10,
      title: "Властелин Колец",
      author: "Дж. Р. Р. Толкин",
      image: "/project11a-web-the-seal-division/assets/images/books/fantasy2.png",
      rating: 5,
      price: 50,
      category: "fantasy"
    },
    {
      id: 11,
      title: "Гарри Поттер",
      author: "Дж. К. Роулинг",
      image: "/project11a-web-the-seal-division/assets/images/books/fantasy1.png",
      rating: 5,
      price: 45,
      category: "fantasy"
    },
    {
      id: 12,
      title: "Игра престолов",
      author: "Джордж Мартин",
      image: "/project11a-web-the-seal-division/assets/images/books/fantasy2.png",
      rating: 4,
      price: 30,
      category: "fantasy"
    }
  ]
};

const bookMetaById = {
  1: { publisher: 'АСТ', topic: 'Фантастика', preorder: false, inStock: true },
  2: { publisher: 'Эксмо', topic: 'Бизнес', preorder: false, inStock: true },
  3: { publisher: 'Мир Книги', topic: 'Новинки', preorder: true, inStock: false },
  4: { publisher: 'Мир Книги', topic: 'Новинки', preorder: true, inStock: false },
  5: { publisher: 'Азбука', topic: 'Классика', preorder: false, inStock: true },
  6: { publisher: 'Азбука', topic: 'Классика', preorder: false, inStock: true },
  7: { publisher: 'Азбука', topic: 'Классика', preorder: false, inStock: true },
  8: { publisher: 'Азбука', topic: 'Классика', preorder: false, inStock: true },
  9: { publisher: 'ACT', topic: 'Фантастика', preorder: false, inStock: true },
  10: { publisher: 'ACT', topic: 'Фэнтези', preorder: false, inStock: true },
  11: { publisher: 'Росмэн', topic: 'Фэнтези', preorder: false, inStock: true },
  12: { publisher: 'Эксмо', topic: 'Фэнтези', preorder: false, inStock: true },
  13: { publisher: 'Мир Книги', topic: 'Новинки', preorder: true, inStock: false },
  14: { publisher: 'Мир Книги', topic: 'Новинки', preorder: true, inStock: false }
};

export const getBooksByCategory = (category) => {
  switch (category) {
    case 'new':
      return staticData.newBooks;
    case 'classic':
      return staticData.classicBooks;
    case 'fantasy':
      return staticData.fantasyBooks;
    default:
      return [...staticData.newBooks, ...staticData.classicBooks, ...staticData.fantasyBooks];
  }
};

export const getAllBooks = () => {
  const all = [
    ...staticData.newBooks,
    ...staticData.classicBooks,
    ...staticData.fantasyBooks
  ];

  return all.map((book) => {
    const meta = bookMetaById[book.id] || {};
    return {
      ...book,
      publisher: meta.publisher || 'Мир Книг',
      topic: meta.topic || 'Разное',
      preorder: Boolean(meta.preorder),
      inStock: meta.inStock !== undefined ? meta.inStock : true
    };
  });
};