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
      price: 899,
      category: "new"
    },
    {
      id: 2,
      title: "Сотрудник как клиент",
      author: "Кожевникова Т.",
      image: "/project11a-web-the-seal-division/assets/images/books/new2.png",
      rating: 4,
      price: 759,
      category: "new"
    },
    {
      id: 3,
      title: "Новая книга 1",
      author: "Автор 1",
      image: "/project11a-web-the-seal-division/assets/images/books/new1.png",
      rating: 4,
      price: 650,
      category: "new"
    },
    {
      id: 4,
      title: "Новая книга 2",
      author: "Автор 2",
      image: "/project11a-web-the-seal-division/assets/images/books/new2.png",
      rating: 5,
      price: 820,
      category: "new"
    },
    {
      id: 13,
      title: "Новая книга 1",
      author: "Автор 1",
      image: "/project11a-web-the-seal-division/assets/images/books/new1.png",
      rating: 4,
      price: 650,
      category: "new"
    },
    {
      id: 14,
      title: "Новая книга 2",
      author: "Автор 2",
      image: "/project11a-web-the-seal-division/assets/images/books/new2.png",
      rating: 5,
      price: 820,
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
      price: 450,
      category: "classic"
    },
    {
      id: 6,
      title: "Отцы и дети",
      author: "Тургенев И. С.",
      image: "/project11a-web-the-seal-division/assets/images/books/classic2.png",
      rating: 5,
      price: 380,
      category: "classic"
    },
    {
      id: 7,
      title: "Война и мир",
      author: "Толстой Л. Н.",
      image: "/project11a-web-the-seal-division/assets/images/books/classic1.png",
      rating: 5,
      price: 520,
      category: "classic"
    },
    {
      id: 8,
      title: "Преступление и наказание",
      author: "Достоевский Ф. М.",
      image: "/project11a-web-the-seal-division/assets/images/books/classic2.png",
      rating: 5,
      price: 410,
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
      price: 990,
      category: "fantasy"
    },
    {
      id: 10,
      title: "Властелин Колец",
      author: "Дж. Р. Р. Толкин",
      image: "/project11a-web-the-seal-division/assets/images/books/fantasy2.png",
      rating: 5,
      price: 1200,
      category: "fantasy"
    },
    {
      id: 11,
      title: "Гарри Поттер",
      author: "Дж. К. Роулинг",
      image: "/project11a-web-the-seal-division/assets/images/books/fantasy1.png",
      rating: 5,
      price: 890,
      category: "fantasy"
    },
    {
      id: 12,
      title: "Игра престолов",
      author: "Джордж Мартин",
      image: "/project11a-web-the-seal-division/assets/images/books/fantasy2.png",
      rating: 4,
      price: 950,
      category: "fantasy"
    }
  ]
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