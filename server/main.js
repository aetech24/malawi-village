import express from 'express';
const router = express.Router()
import { products } from '../data/products.js';

router.get('/', (req, res) => {
  const locals = {
    title: 'Malawi village',
    description: 'this is malawi village official website'
  }
  res.render('shop',locals, products);
  
})

router.get('/about', (req, res) => {
  res.render('about')
})

router.get('/testimonial', (req, res) => {
  res.render('testimonial')
})

router.get('/contact', (req, res) => {
  res.render('contact')
})

router.get('/index', (req, res) => {
  res.render('home')
})

router.get('/shop/juice', (req, res) => {
  res.render('juice')
})

router.get('/tea', (req, res) => {
  res.render('tea')
})

export default router