'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Header
    'nav.products': 'Products',
    'nav.cart': 'Cart',

    // Home page
    'home.hero.title': 'Quality Used Products',
    'home.hero.subtitle': 'For International Buyers',
    'home.hero.description': 'Verified used electronics and furniture trading platform for foreign buyers',
    'home.hero.browse': 'Browse Products',
    'home.hero.electronics': 'View Electronics',
    'home.stats.products': 'Products',
    'home.stats.categories': 'Categories',
    'home.stats.tested': 'Tested',
    'home.stats.support': 'Support',
    'home.featured.title': 'Featured Products',
    'home.featured.subtitle': 'Verified popular used products',
    'home.categories.title': 'Shop by Category',
    'home.categories.subtitle': 'Browse products by category',
    'home.category.electronics': 'Electronics',
    'home.category.furniture': 'Furniture',
    'home.category.kitchen': 'Kitchen',
    'home.category.baby': 'Baby',
    'home.features.title': 'Why E-Market',
    'home.features.subtitle': 'Reliable trading platform',
    'home.feature.quality': 'Quality Tested',
    'home.feature.quality.desc': 'All products tested',
    'home.feature.delivery': 'Fast Delivery',
    'home.feature.delivery.desc': 'Quick shipping',
    'home.feature.support': '24/7 Support',
    'home.feature.support.desc': 'Always here to help',
    'home.feature.pricing': 'Fair Pricing',
    'home.feature.pricing.desc': 'Competitive prices',
    'home.feature.payment': 'Secure Payment',
    'home.feature.payment.desc': 'Multiple secure options',
    'home.feature.multilang': 'Multi-language',
    'home.feature.multilang.desc': 'English & French available',
    'home.cta.title': 'Ready to Start Shopping?',
    'home.cta.subtitle': 'Start now',
    'home.cta.description': 'Browse our collection of quality used products',
    'home.cta.button': 'Shop Now',

    // Products page
    'products.title': 'Our Products',
    'products.description': 'Discover quality used electronics and furniture',
    'products.subtitle': 'Discover quality used electronics and furniture',
    'products.all': 'All Products',
    'products.filter.all': 'All Categories',
    'products.tested': 'Tested & Working',
    'products.condition': 'Condition',
    'products.brand': 'Brand',
    'products.year': 'Year',
    'products.view.details': 'View Details',
    'products.no.found': 'No products found',
    'products.no.results': 'No products found in this category',
    'products.view.all': 'View all products',
    'products.sale': 'Sale',
    'products.condition.excellent': 'Excellent',
    'products.condition.good': 'Good',
    'products.condition.fair': 'Fair',

    // Product detail
    'product.brand': 'Brand',
    'product.year': 'Year',
    'product.condition': 'Condition',
    'product.tested': 'Tested',
    'product.add.cart': 'Add to Cart',
    'product.buy.now': 'Buy Now',
    'product.quantity': 'Quantity',
    'product.shipping': 'Free shipping on orders over ₩100,000',
    'product.return': '7-day return policy',

    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.empty.message': 'Start adding some items to get started!',
    'cart.continue': 'Continue Shopping',
    'cart.continue.shopping': 'Continue Shopping',
    'cart.item': 'Item',
    'cart.price': 'Price',
    'cart.quantity': 'Quantity',
    'cart.total': 'Total',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.shipping.free': 'FREE',
    'cart.calculated.checkout': 'Calculated at checkout',
    'cart.grand.total': 'Grand Total',
    'cart.proceed': 'Proceed to Checkout',
    'cart.proceed.checkout': 'Proceed to Checkout',
    'cart.clear': 'Clear Cart',
    'cart.clear.all': 'Clear All Items',
    'cart.clear.confirm': 'Are you sure you want to clear all items?',
    'cart.remove.confirm': 'Are you sure you want to remove this item?',
    'cart.summary': 'Order Summary',

    // Checkout
    'checkout.title': 'Checkout',
    'checkout.shipping.info': 'Shipping Information',
    'checkout.name': 'Full Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.address': 'Address',
    'checkout.delivery.date': 'Delivery Date',
    'checkout.payment.method': 'Payment Method',
    'checkout.payment.transfer': 'Bank Transfer',
    'checkout.payment.cod': 'Cash on Delivery',
    'checkout.order.notes': 'Order Notes (Optional)',
    'checkout.order.summary': 'Order Summary',
    'checkout.place.order': 'Place Order',
    'checkout.processing': 'Processing...',
    'checkout.success': 'Order placed successfully! Order ID:',
    'checkout.error': 'Failed to place order. Please try again.',

    // Footer
    'footer.company': 'Quality used products for international buyers',
    'footer.products': 'Products',
    'footer.support': 'Support',
    'footer.payment': 'Payment',
    'footer.copyright': 'All rights reserved',
    'footer.powered': 'Powered by WordPress & Next.js',

    // Common
    'common.browse': 'Browse',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  fr: {
    // Header
    'nav.products': 'Produits',
    'nav.cart': 'Panier',

    // Home page
    'home.hero.title': 'Produits d\'Occasion de Qualité',
    'home.hero.subtitle': 'Pour les Acheteurs Internationaux',
    'home.hero.description': 'Plateforme de commerce de produits électroniques et de meubles d\'occasion vérifiés pour les acheteurs étrangers',
    'home.hero.browse': 'Parcourir les Produits',
    'home.hero.electronics': 'Voir Électronique',
    'home.stats.products': 'Produits',
    'home.stats.categories': 'Catégories',
    'home.stats.tested': 'Testé',
    'home.stats.support': 'Assistance',
    'home.featured.title': 'Produits Vedettes',
    'home.featured.subtitle': 'Produits d\'occasion populaires vérifiés',
    'home.categories.title': 'Acheter par Catégorie',
    'home.categories.subtitle': 'Parcourir les produits par catégorie',
    'home.category.electronics': 'Électronique',
    'home.category.furniture': 'Meubles',
    'home.category.kitchen': 'Cuisine',
    'home.category.baby': 'Bébé',
    'home.features.title': 'Pourquoi E-Market',
    'home.features.subtitle': 'Plateforme de commerce fiable',
    'home.feature.quality': 'Qualité Testée',
    'home.feature.quality.desc': 'Tous les produits testés',
    'home.feature.delivery': 'Livraison Rapide',
    'home.feature.delivery.desc': 'Expédition rapide',
    'home.feature.support': 'Assistance 24/7',
    'home.feature.support.desc': 'Toujours là pour aider',
    'home.feature.pricing': 'Prix Équitables',
    'home.feature.pricing.desc': 'Prix compétitifs',
    'home.feature.payment': 'Paiement Sécurisé',
    'home.feature.payment.desc': 'Options sécurisées multiples',
    'home.feature.multilang': 'Multilingue',
    'home.feature.multilang.desc': 'Anglais et français disponibles',
    'home.cta.title': 'Prêt à Commencer vos Achats?',
    'home.cta.subtitle': 'Commencez maintenant',
    'home.cta.description': 'Parcourez notre collection de produits d\'occasion de qualité',
    'home.cta.button': 'Acheter Maintenant',

    // Products page
    'products.title': 'Nos Produits',
    'products.description': 'Découvrez des produits électroniques et meubles d\'occasion de qualité',
    'products.subtitle': 'Découvrez des produits électroniques et meubles d\'occasion de qualité',
    'products.all': 'Tous les Produits',
    'products.filter.all': 'Toutes les Catégories',
    'products.tested': 'Testé et Fonctionnel',
    'products.condition': 'État',
    'products.brand': 'Marque',
    'products.year': 'Année',
    'products.view.details': 'Voir Détails',
    'products.no.found': 'Aucun produit trouvé',
    'products.no.results': 'Aucun produit trouvé dans cette catégorie',
    'products.view.all': 'Voir tous les produits',
    'products.sale': 'Solde',
    'products.condition.excellent': 'Excellent',
    'products.condition.good': 'Bon',
    'products.condition.fair': 'Acceptable',

    // Product detail
    'product.brand': 'Marque',
    'product.year': 'Année',
    'product.condition': 'État',
    'product.tested': 'Testé',
    'product.add.cart': 'Ajouter au Panier',
    'product.buy.now': 'Acheter Maintenant',
    'product.quantity': 'Quantité',
    'product.shipping': 'Livraison gratuite pour les commandes de plus de ₩100,000',
    'product.return': 'Politique de retour de 7 jours',

    // Cart
    'cart.title': 'Panier d\'Achat',
    'cart.empty': 'Votre panier est vide',
    'cart.empty.message': 'Commencez à ajouter des articles pour commencer!',
    'cart.continue': 'Continuer les Achats',
    'cart.continue.shopping': 'Continuer les Achats',
    'cart.item': 'Article',
    'cart.price': 'Prix',
    'cart.quantity': 'Quantité',
    'cart.total': 'Total',
    'cart.subtotal': 'Sous-total',
    'cart.shipping': 'Livraison',
    'cart.shipping.free': 'GRATUITE',
    'cart.calculated.checkout': 'Calculé au paiement',
    'cart.grand.total': 'Total Général',
    'cart.proceed': 'Procéder au Paiement',
    'cart.proceed.checkout': 'Procéder au Paiement',
    'cart.clear': 'Vider le Panier',
    'cart.clear.all': 'Vider Tous les Articles',
    'cart.clear.confirm': 'Êtes-vous sûr de vouloir vider tous les articles?',
    'cart.remove.confirm': 'Êtes-vous sûr de vouloir supprimer cet article?',
    'cart.summary': 'Résumé de la Commande',

    // Checkout
    'checkout.title': 'Commander',
    'checkout.shipping.info': 'Informations de Livraison',
    'checkout.name': 'Nom Complet',
    'checkout.email': 'Email',
    'checkout.phone': 'Téléphone',
    'checkout.address': 'Adresse',
    'checkout.delivery.date': 'Date de Livraison',
    'checkout.payment.method': 'Méthode de Paiement',
    'checkout.payment.transfer': 'Virement Bancaire',
    'checkout.payment.cod': 'Paiement à la Livraison',
    'checkout.order.notes': 'Notes de Commande (Optionnel)',
    'checkout.order.summary': 'Résumé de la Commande',
    'checkout.place.order': 'Passer la Commande',
    'checkout.processing': 'Traitement en cours...',
    'checkout.success': 'Commande passée avec succès! ID de commande:',
    'checkout.error': 'Échec de la commande. Veuillez réessayer.',

    // Footer
    'footer.company': 'Produits d\'occasion de qualité pour les acheteurs internationaux',
    'footer.products': 'Produits',
    'footer.support': 'Assistance',
    'footer.payment': 'Paiement',
    'footer.copyright': 'Tous droits réservés',
    'footer.powered': 'Propulsé par WordPress & Next.js',

    // Common
    'common.browse': 'Parcourir',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
  },
  ko: {
    // Header
    'nav.products': '상품',
    'nav.cart': '장바구니',

    // Home page
    'home.hero.title': '검증된 중고 상품',
    'home.hero.subtitle': '외국인 바이어를 위한',
    'home.hero.description': '외국인 바이어를 위한 검증된 중고 가전제품 및 가구 거래 플랫폼',
    'home.hero.browse': '상품 보기',
    'home.hero.electronics': '가전제품 보기',
    'home.stats.products': '상품',
    'home.stats.categories': '카테고리',
    'home.stats.tested': '테스트 완료',
    'home.stats.support': '고객지원',
    'home.featured.title': '추천 상품',
    'home.featured.subtitle': '검증된 인기 중고 상품',
    'home.categories.title': '카테고리별 쇼핑',
    'home.categories.subtitle': '카테고리별 상품 보기',
    'home.category.electronics': '가전제품',
    'home.category.furniture': '가구',
    'home.category.kitchen': '주방용품',
    'home.category.baby': '유아용품',
    'home.features.title': 'E-Market를 선택하는 이유',
    'home.features.subtitle': '신뢰할 수 있는 거래 플랫폼',
    'home.feature.quality': '품질 테스트',
    'home.feature.quality.desc': '모든 제품 테스트 완료',
    'home.feature.delivery': '빠른 배송',
    'home.feature.delivery.desc': '신속한 배송',
    'home.feature.support': '24/7 고객지원',
    'home.feature.support.desc': '언제나 도와드립니다',
    'home.feature.pricing': '합리적인 가격',
    'home.feature.pricing.desc': '경쟁력 있는 가격',
    'home.feature.payment': '안전한 결제',
    'home.feature.payment.desc': '다양한 안전한 옵션',
    'home.feature.multilang': '다국어',
    'home.feature.multilang.desc': '영어 및 불어 가능',
    'home.cta.title': '쇼핑을 시작할 준비가 되셨나요?',
    'home.cta.subtitle': '지금 바로 시작하세요',
    'home.cta.description': '품질 좋은 중고 상품 컬렉션을 둘러보세요',
    'home.cta.button': '지금 쇼핑하기',

    // Products page
    'products.title': '우리의 상품',
    'products.description': '고품질 중고 가전제품 및 가구를 만나보세요',
    'products.subtitle': '고품질 중고 가전제품 및 가구를 만나보세요',
    'products.all': '전체 상품',
    'products.filter.all': '전체 카테고리',
    'products.tested': '테스트 및 작동 확인',
    'products.condition': '상태',
    'products.brand': '브랜드',
    'products.year': '연식',
    'products.view.details': '상세보기',
    'products.no.found': '상품을 찾을 수 없습니다',
    'products.no.results': '이 카테고리에서 상품을 찾을 수 없습니다',
    'products.view.all': '전체 상품 보기',
    'products.sale': '세일',
    'products.condition.excellent': '최상',
    'products.condition.good': '양호',
    'products.condition.fair': '보통',

    // Product detail
    'product.brand': '브랜드',
    'product.year': '연식',
    'product.condition': '상태',
    'product.tested': '테스트 완료',
    'product.add.cart': '장바구니에 추가',
    'product.buy.now': '바로 구매',
    'product.quantity': '수량',
    'product.shipping': '₩100,000 이상 주문 시 무료 배송',
    'product.return': '7일 반품 정책',

    // Cart
    'cart.title': '장바구니',
    'cart.empty': '장바구니가 비어있습니다',
    'cart.empty.message': '상품을 추가하여 시작하세요!',
    'cart.continue': '쇼핑 계속하기',
    'cart.continue.shopping': '쇼핑 계속하기',
    'cart.item': '상품',
    'cart.price': '가격',
    'cart.quantity': '수량',
    'cart.total': '합계',
    'cart.subtotal': '소계',
    'cart.shipping': '배송비',
    'cart.shipping.free': '무료',
    'cart.calculated.checkout': '결제 시 계산',
    'cart.grand.total': '총 합계',
    'cart.proceed': '결제하기',
    'cart.proceed.checkout': '결제하기',
    'cart.clear': '장바구니 비우기',
    'cart.clear.all': '모두 삭제',
    'cart.clear.confirm': '모든 상품을 삭제하시겠습니까?',
    'cart.remove.confirm': '이 상품을 삭제하시겠습니까?',
    'cart.summary': '주문 요약',

    // Checkout
    'checkout.title': '주문/결제',
    'checkout.shipping.info': '배송 정보',
    'checkout.name': '이름',
    'checkout.email': '이메일',
    'checkout.phone': '전화번호',
    'checkout.address': '주소',
    'checkout.delivery.date': '배송일',
    'checkout.payment.method': '결제 방법',
    'checkout.payment.transfer': '무통장입금',
    'checkout.payment.cod': '착불',
    'checkout.order.notes': '주문 메모 (선택사항)',
    'checkout.order.summary': '주문 요약',
    'checkout.place.order': '주문하기',
    'checkout.processing': '처리 중...',
    'checkout.success': '주문이 성공적으로 완료되었습니다! 주문 번호:',
    'checkout.error': '주문 실패. 다시 시도해주세요.',

    // Footer
    'footer.company': '외국인 바이어를 위한 중고 거래 플랫폼',
    'footer.products': '상품',
    'footer.support': '고객지원',
    'footer.payment': '결제',
    'footer.copyright': '모든 권리 보유',
    'footer.powered': 'WordPress & Next.js 제공',

    // Common
    'common.browse': '둘러보기',
    'common.loading': '로딩 중...',
    'common.error': '오류',
    'common.success': '성공',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('e-market-language') as Language;
    if (stored && ['en', 'fr', 'ko'].includes(stored)) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (mounted) {
      localStorage.setItem('e-market-language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
