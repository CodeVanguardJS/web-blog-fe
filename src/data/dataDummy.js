const articles = [
  {
    id: 1,
    title: "Chocolate Cake",
    total_like: 20,
    category_id: 1, 
    photo_url: "https://images.pexels.com/photos/3740197/pexels-photo-3740197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    description: "A rich and moist chocolate cake made with premium cocoa and layered with smooth, velvety ganache. This decadent dessert is perfect for celebrations or simply indulging in a sweet craving. Top it with whipped cream or fresh berries for an extra delightful experience.",
    Category: {
      id: 1,
      name: "Dessert",
    },
    is_bookmark: true,
  },
  {
    id: 2,
    title: "Strawberry Cheesecake",
    total_like: 15,
    category_id: 1, 
    photo_url: "https://images.pexels.com/photos/4110006/pexels-photo-4110006.jpeg", 
    description: "A creamy and smooth cheesecake topped with fresh, juicy strawberries and a luscious strawberry glaze. The crunchy biscuit crust provides the perfect balance to the rich and tangy cream cheese filling. Best served chilled for a refreshing and satisfying dessert.",
    Category: {
      id: 1,
      name: "Dessert",
    },
    is_bookmark: false,
  },
  {
    id: 3,
    title: "Vanilla Ice Cream",
    total_like: 10,
    category_id: 1, 
    photo_url: "https://images.pexels.com/photos/1352297/pexels-photo-1352297.jpeg", 
    description: "Homemade vanilla ice cream with a creamy, smooth texture and a perfectly balanced sweetness. Made with fresh milk, cream, and pure vanilla extract, this classic treat is the perfect companion for warm summer days or as a topping for your favorite desserts.",
    Category: {
      id: 1,
      name: "Dessert",
    },
    is_bookmark: true,
  },
  {
    id: 4,
    title: "Grilled Salmon",
    total_like: 25,
    category_id: 2, 
    photo_url: "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "A perfectly grilled salmon fillet infused with the flavors of fresh lemon, garlic, and aromatic herbs. The crispy outer layer and tender, flaky inside make this dish both delicious and healthy. Serve with roasted vegetables or mashed potatoes for a complete meal.",
    Category: {
      id: 2,
      name: "Main Course",
    },
    is_bookmark: false,
  },
  {
    id: 5,
    title: "Pasta Carbonara",
    total_like: 18,
    category_id: 2, 
    photo_url: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
    description: "A classic Italian pasta dish featuring creamy carbonara sauce made with egg yolks, parmesan cheese, and crispy bacon. Every bite delivers a perfect combination of rich, savory, and cheesy flavors. Best enjoyed with freshly cracked black pepper and a sprinkle of extra parmesan.",
    Category: {
      id: 2,
      name: "Main Course",
    },
    is_bookmark: true,
  },
];

export default articles;
