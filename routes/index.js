var express = require('express');
var router = express.Router();

// Dữ liệu mẫu để render trong template Handlebars
const carouselImages = [
  { src: '/images/carousel1.jpg', alt: 'Carousel Image 1' },
  { src: '/images/carousel2.jpg', alt: 'Carousel Image 2' },
  { src: '/images/carousel3.jpg', alt: 'Carousel Image 3' }
];

const products = [
  { name: 'Product 1', price: '$10', image: '/images/product1.jpg', alt: 'Product 1' },
  { name: 'Product 2', price: '$20', image: '/images/product2.jpg', alt: 'Product 2' },
  { name: 'Product 3', price: '$30', image: '/images/product3.jpg', alt: 'Product 3' },
  { name: 'Product 4', price: '$40', image: '/images/product4.jpg', alt: 'Product 4' }
];

// Route chính cho trang index
router.get('/', (req, res) => {
   // Render template index.hbs với dữ liệu động
   res.render('index', { 
      title: "Product", 
      logoutButtonText: "Logout",
      addToCartButtonText: "Add to Cart",
      carouselImages: carouselImages,
      products: products,
      layout: false  // Tắt layout cho route này
   });
});

// Route cho trang page để hiển thị sản phẩm
router.get('/page', (req, res) => {
   // Render template page.hbs với danh sách sản phẩm
   res.render('page', {
      title: "Product Page",
      products: products,
      layout: false  // Tắt layout cho route này
   });
});

// Xử lý POST yêu cầu đăng nhập
router.post('/index', (req, res) => {
   // Lấy dữ liệu từ form đăng nhập
   let username = req.body.username;
   let password = req.body.password;

   // Kiểm tra thông tin đăng nhập và chuyển hướng dựa trên tài khoản
   if (username === "admin" && password === "admin") {
      // Chuyển hướng tới trang admin
      res.redirect('/product/admin');
   } else if (username === "customer" && password === "customer") {
      // Chuyển hướng tới trang khách hàng
      res.redirect('/product/customer');
   } else {
      // Đăng nhập thất bại => chuyển hướng lại trang login
      res.redirect('/');
   }
});

module.exports = router;
