const products = [
  {
    asin: 'B08N5WRWNW',
    title: 'Wireless Bluetooth Headphones Over Ear, Hi-Fi Stereo Foldable Wireless Headset with Microphone',
    brand: 'SoundMaster',
    category: 'Electronics > Audio > Headphones',
    price: 59.99,
    sales: 12580,
    rating: 4.5,
    reviews: 8956,
    bsr: 1234,
    growth_rate: 15.5,
    launch_date: '2023-06-15',
    fba_fee: 12.50,
    image: 'https://m.media-amazon.com/images/I/61V7xOqK1BL._AC_SL1000_.jpg'
  },
  {
    asin: 'B09X6Z7Y8W',
    title: 'Portable Power Bank 20000mAh, Fast Charging USB-C Battery Pack',
    brand: 'PowerGo',
    category: 'Electronics > Portable Power > Power Banks',
    price: 39.99,
    sales: 8920,
    rating: 4.7,
    reviews: 12340,
    bsr: 856,
    growth_rate: 22.3,
    launch_date: '2023-08-20',
    fba_fee: 8.90,
    image: 'https://m.media-amazon.com/images/I/71k3XJ6r9gL._AC_SL1500_.jpg'
  },
  {
    asin: 'B08K7J3M9N',
    title: 'LED Desk Lamp with USB Charging Port, Dimmable Eye-Caring Table Lamp',
    brand: 'LightPro',
    category: 'Home & Kitchen > Lighting > Desk Lamps',
    price: 29.99,
    sales: 6750,
    rating: 4.4,
    reviews: 5678,
    bsr: 2345,
    growth_rate: 8.7,
    launch_date: '2023-03-10',
    fba_fee: 6.50,
    image: 'https://m.media-amazon.com/images/I/61m+Z5aFjKL._AC_SL1000_.jpg'
  },
  {
    asin: 'B07X3L8Q2R',
    title: 'Silicone Food Storage Bags, Reusable Freezer Bags for Sandwich Snack Lunch',
    brand: 'EcoFresh',
    category: 'Home & Kitchen > Kitchen Storage & Organization > Food Storage',
    price: 19.99,
    sales: 15680,
    rating: 4.6,
    reviews: 9876,
    bsr: 567,
    growth_rate: 18.2,
    launch_date: '2023-01-25',
    fba_fee: 4.20,
    image: 'https://m.media-amazon.com/images/I/71f2tX7aBxL._AC_SL1500_.jpg'
  },
  {
    asin: 'B09Y4H6K8M',
    title: 'Adjustable Laptop Stand, Ergonomic Aluminum Notebook Stand Riser',
    brand: 'ErgoTech',
    category: 'Electronics > Computer Accessories > Laptop Stands',
    price: 34.99,
    sales: 7890,
    rating: 4.5,
    reviews: 6543,
    bsr: 1567,
    growth_rate: 12.8,
    launch_date: '2023-05-18',
    fba_fee: 7.80,
    image: 'https://m.media-amazon.com/images/I/61cG6u6vYKL._AC_SL1000_.jpg'
  },
  {
    asin: 'B08F2D4G6H',
    title: 'Waterproof Phone Pouch, Floating Dry Bag for iPhone Samsung',
    brand: 'AquaShield',
    category: 'Electronics > Cell Phones & Accessories > Phone Cases',
    price: 12.99,
    sales: 23450,
    rating: 4.3,
    reviews: 15432,
    bsr: 345,
    growth_rate: 5.6,
    launch_date: '2022-12-10',
    fba_fee: 3.10,
    image: 'https://m.media-amazon.com/images/I/61bJ4aF5Z4L._AC_SL1000_.jpg'
  },
  {
    asin: 'B09V1N3P5Q',
    title: 'Car Phone Mount Holder, Universal Dashboard Windshield Phone Holder',
    brand: 'DriveSafe',
    category: 'Automotive > Interior Accessories > Phone Mounts',
    price: 24.99,
    sales: 11230,
    rating: 4.4,
    reviews: 8765,
    bsr: 1890,
    growth_rate: -2.3,
    launch_date: '2023-04-05',
    fba_fee: 5.20,
    image: 'https://m.media-amazon.com/images/I/61R7x8bHkQL._AC_SL1000_.jpg'
  },
  {
    asin: 'B08Q9E7R2T',
    title: 'Reusable Silicone Baking Mats, Non-Stick Pastry Mat for Rolling Dough',
    brand: 'BakePro',
    category: 'Home & Kitchen > Kitchen & Dining > Baking Tools',
    price: 18.99,
    sales: 9870,
    rating: 4.7,
    reviews: 7654,
    bsr: 1234,
    growth_rate: 14.5,
    launch_date: '2023-02-14',
    fba_fee: 4.50,
    image: 'https://m.media-amazon.com/images/I/61S9y2aB7YL._AC_SL1000_.jpg'
  }
];

const keywords = [
  { keyword: 'bluetooth headphones', search_volume: 250000, competition: 0.78, conversion_rate: 0.085, trend: 12.5, asin: 'B08N5WRWNW', rank: 1 },
  { keyword: 'wireless headphones', search_volume: 180000, competition: 0.82, conversion_rate: 0.072, trend: 8.3, asin: 'B08N5WRWNW', rank: 2 },
  { keyword: 'over ear headphones', search_volume: 95000, competition: 0.65, conversion_rate: 0.091, trend: 15.2, asin: 'B08N5WRWNW', rank: 3 },
  { keyword: 'hi-fi stereo headset', search_volume: 45000, competition: 0.45, conversion_rate: 0.120, trend: 22.1, asin: 'B08N5WRWNW', rank: 4 },
  { keyword: 'power bank 20000mah', search_volume: 150000, competition: 0.72, conversion_rate: 0.068, trend: -3.2, asin: 'B09X6Z7Y8W', rank: 1 },
  { keyword: 'portable charger', search_volume: 220000, competition: 0.85, conversion_rate: 0.055, trend: 5.6, asin: 'B09X6Z7Y8W', rank: 2 },
  { keyword: 'usb c power bank', search_volume: 85000, competition: 0.58, conversion_rate: 0.095, trend: 18.7, asin: 'B09X6Z7Y8W', rank: 3 },
  { keyword: 'fast charging battery pack', search_volume: 65000, competition: 0.48, conversion_rate: 0.112, trend: 25.3, asin: 'B09X6Z7Y8W', rank: 4 },
  { keyword: 'led desk lamp', search_volume: 120000, competition: 0.68, conversion_rate: 0.078, trend: 8.9, asin: 'B08K7J3M9N', rank: 1 },
  { keyword: 'eye care lamp', search_volume: 75000, competition: 0.52, conversion_rate: 0.105, trend: 16.4, asin: 'B08K7J3M9N', rank: 2 },
  { keyword: 'dimmable desk lamp', search_volume: 55000, competition: 0.42, conversion_rate: 0.125, trend: 14.2, asin: 'B08K7J3M9N', rank: 3 },
  { keyword: 'desk lamp with usb', search_volume: 42000, competition: 0.38, conversion_rate: 0.135, trend: 19.8, asin: 'B08K7J3M9N', rank: 4 },
  { keyword: 'reusable food storage bags', search_volume: 98000, competition: 0.62, conversion_rate: 0.088, trend: 11.3, asin: 'B07X3L8Q2R', rank: 1 },
  { keyword: 'silicone food bags', search_volume: 68000, competition: 0.48, conversion_rate: 0.110, trend: 17.6, asin: 'B07X3L8Q2R', rank: 2 },
  { keyword: 'freezer bags reusable', search_volume: 48000, competition: 0.45, conversion_rate: 0.122, trend: 14.8, asin: 'B07X3L8Q2R', rank: 3 },
  { keyword: 'eco friendly food storage', search_volume: 35000, competition: 0.35, conversion_rate: 0.145, trend: 28.5, asin: 'B07X3L8Q2R', rank: 4 }
];

const reviews = [
  { asin: 'B08N5WRWNW', rating: 5, content: 'Excellent sound quality! The bass is deep and clear. Very comfortable for long listening sessions.', date: '2024-01-15', variant: 'Black', verified: true, helpful: 234, sentiment: 'positive' },
  { asin: 'B08N5WRWNW', rating: 4, content: 'Good headphones for the price. Battery life is great, lasts about 30 hours.', date: '2024-01-14', variant: 'White', verified: true, helpful: 156, sentiment: 'positive' },
  { asin: 'B08N5WRWNW', rating: 3, content: 'Sound is okay, but the ear cups could be more comfortable. Overall decent product.', date: '2024-01-13', variant: 'Black', verified: false, helpful: 45, sentiment: 'neutral' },
  { asin: 'B08N5WRWNW', rating: 5, content: 'Love these headphones! Perfect for work from home. Noise cancellation works well.', date: '2024-01-12', variant: 'Blue', verified: true, helpful: 312, sentiment: 'positive' },
  { asin: 'B08N5WRWNW', rating: 2, content: 'Disappointed with the build quality. The plastic feels cheap and the headband broke after 2 weeks.', date: '2024-01-11', variant: 'Black', verified: true, helpful: 89, sentiment: 'negative' },
  { asin: 'B09X6Z7Y8W', rating: 5, content: 'Amazing power bank! Charges my phone 5 times. Fast charging works great.', date: '2024-01-10', variant: '20000mAh', verified: true, helpful: 445, sentiment: 'positive' },
  { asin: 'B09X6Z7Y8W', rating: 4, content: 'Good capacity for the price. Compact design, easy to carry.', date: '2024-01-09', variant: '20000mAh', verified: true, helpful: 234, sentiment: 'positive' },
  { asin: 'B09X6Z7Y8W', rating: 5, content: 'Best power bank I have ever owned. Highly recommend!', date: '2024-01-08', variant: '10000mAh', verified: true, helpful: 567, sentiment: 'positive' },
  { asin: 'B08K7J3M9N', rating: 4, content: 'Nice desk lamp with multiple brightness levels. USB port is convenient.', date: '2024-01-07', variant: 'White', verified: true, helpful: 123, sentiment: 'positive' },
  { asin: 'B08K7J3M9N', rating: 5, content: 'Eye-friendly light, perfect for working long hours. Love the design.', date: '2024-01-06', variant: 'Black', verified: true, helpful: 267, sentiment: 'positive' }
];

const stores = [
  { store_name: 'TechGear Store', url: 'https://www.amazon.com/s?me=A1BC2DEF3GHIJ', rating: 4.7, review_count: 12500, product_count: 256 },
  { store_name: 'Home Essentials', url: 'https://www.amazon.com/s?me=KLMN4OPQ5RSTU', rating: 4.5, review_count: 8900, product_count: 189 },
  { store_name: 'EcoLiving Co', url: 'https://www.amazon.com/s?me=VWXYZ6789ABC', rating: 4.8, review_count: 6700, product_count: 145 }
];

module.exports = { products, keywords, reviews, stores };