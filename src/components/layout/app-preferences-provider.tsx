"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Locale = "en" | "ar";
type Theme = "system" | "light" | "dark";
type MessageTable = Record<string, string>;

const messages: Record<Locale, MessageTable> = {
  en: {
    shipping: "Free Shipping on Orders 500 EGP",
    newArrivals: "New Arrivals",
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    searchProducts: "Search for products",
    search: "Search",
    account: "Account",
    signIn: "Sign in",
    wishlist: "Wishlist",
    cart: "Shopping cart",
    mainNavigation: "Main navigation",
    shopByCategory: "Shop by category",
    deliverTo: "Deliver to",
    yourAddress: "your address",
    home: "Home",
    shop: "Shop",
    categories: "Categories",
    brands: "Brands",
    language: "Switch language",
    theme: "Switch color theme",
    heroOffers: "FreshCart offers",
    themeLight: "Use light theme",
    themeDark: "Use dark theme",
    freshnessKicker: "FRESHNESS AT YOUR DOORSTEP",
    freshnessTitle: "Fresh Products Delivered to your Door",
    freshnessMessage: "Get 30% off your first order",
    offerKicker: "A LITTLE MORE FOR LESS",
    offerTitle: "Good food. Great prices.",
    offerMessage: "Discover this week's fresh deals",
    farmKicker: "FRESH FROM THE FARM",
    farmTitle: "Make every meal a little fresher",
    farmMessage: "Shop seasonal favourites today",
    shopNow: "Shop Now",
    previousBanner: "Previous banner",
    nextBanner: "Next banner",
    chooseBanner: "Choose a banner",
    bannerControls: "Banner controls",
    showBanner: "Show banner",
    viewProduct: "View",
    saveProduct: "Save",
    compareProduct: "Compare",
    addProductToCart: "Add",
    reviews: "reviews",
    currency: "EGP",
    breadcrumb: "Breadcrumb",
    productImages: "Product images",
    showProductImage: "Show product image",
    inStock: "In stock",
    outOfStock: "Out of stock",
    availableUnits: "available",
    quantity: "Quantity",
    decreaseQuantity: "Decrease quantity",
    increaseQuantity: "Increase quantity",
    addToCart: "Add to cart",
    brandLabel: "Brand",
    categoryLabel: "Category",
    subcategoryLabel: "Subcategory",
    productCode: "Product code",
    deliveryPromise: "Fast delivery",
    deliveryPromiseDetails: "Delivery to your door",
    secureShopping: "Secure shopping",
    secureShoppingDetails: "Safe and secure checkout",
    productInformation: "Product Information",
    productDetails: "Product Details",
    aboutThisProduct: "About this Product",
    unitsSold: "Units sold",
    customer: "Customer",
    showAllReviews: "Show all reviews",
    showFewerReviews: "Show fewer reviews",
    categoryEyebrow: "A LITTLE SOMETHING FOR EVERYONE",
    shopByCategoryTitle: "Shop by Category",
    viewAllCategories: "View all categories",
    productEyebrow: "HAND-PICKED FOR YOU",
    popularProducts: "Popular Products",
    shopAllProducts: "Shop all products",
    vegetables: "Vegetables",
    freshFromFarm: "Fresh from the farm",
    freshFruits: "Fresh fruits",
    sweetSeasonal: "Sweet & seasonal",
    dairyEggs: "Dairy & eggs",
    everydayEssentials: "Everyday essentials",
    meatSeafood: "Meat & seafood",
    qualityCuts: "Quality cuts",
    bakery: "Bakery",
    bakedDaily: "Baked fresh daily",
    footerTagline: "Fresh groceries, delivered with care.",
    productPageTitle: "Products",
    productPageDescription: "Product listing, filters, sorting, and pagination.",
    categoryPageTitle: "Categories",
    categoryPageDescription: "Browse grocery departments and category collections.",
    brandPageTitle: "Brands",
    brandPageDescription: "Explore trusted brands and their products.",
    cartPageTitle: "Cart",
    checkoutPageTitle: "Checkout",
    wishlistPageTitle: "Wishlist",
    ordersPageTitle: "Orders",
    addressesPageTitle: "Addresses",
    settingsPageTitle: "Profile settings",
    freshCart: "FreshCart",
    placeholderDescription: "Route scaffold created from the FreshCart Figma screen inventory. Implement the screen UI and data in this feature.",
    "Sign in": "Sign in",
    "Customer authentication screen.": "Customer authentication screen.",
    "Verify reset code": "Verify reset code",
    "Confirm the code sent to the customer.": "Confirm the code sent to the customer.",
    "Create account": "Create account",
    "New customer registration screen.": "New customer registration screen.",
    "Reset password": "Reset password",
    "Choose a new password after code verification.": "Choose a new password after code verification.",
    Orders: "Orders",
    "Order history and order status.": "Order history and order status.",
    Wishlist: "Wishlist",
    "Products saved for later.": "Products saved for later.",
    "Search products": "Search products",
    "Search results and product discovery.": "Search results and product discovery.",
    Checkout: "Checkout",
    "Delivery details, address selection, and order summary.": "Delivery details, address selection, and order summary.",
    "Shopping cart": "Shopping cart",
    "Review quantities, prices, and subtotal before checkout.": "Review quantities, prices, and subtotal before checkout.",
    "Profile settings": "Profile settings",
    "Update profile information and account preferences.": "Update profile information and account preferences.",
    Addresses: "Addresses",
    "Manage saved delivery addresses.": "Manage saved delivery addresses.",
    "Product details": "Product details",
    Category: "Category",
    Products: "Products",
    "Product listing, filters, sorting, and pagination.": "Product listing, filters, sorting, and pagination.",
    Categories: "Categories",
    "Browse grocery departments and category collections.": "Browse grocery departments and category collections.",
    Brands: "Brands",
    "Browse brands and their products.": "Browse brands and their products.",
    "Forgot password": "Forgot password",
    "Request a password reset code.": "Request a password reset code.",
    Brand: "Brand",
  },
  ar: {
    shipping: "شحن مجاني للطلبات بقيمة ٥٠٠ جنيه",
    newArrivals: "وصل حديثًا",
    openNavigation: "فتح القائمة",
    closeNavigation: "إغلاق القائمة",
    searchProducts: "ابحث عن المنتجات",
    search: "بحث",
    account: "الحساب",
    signIn: "تسجيل الدخول",
    wishlist: "المفضلة",
    cart: "سلة التسوق",
    mainNavigation: "القائمة الرئيسية",
    shopByCategory: "تسوق حسب الفئة",
    deliverTo: "التوصيل إلى",
    yourAddress: "عنوانك",
    home: "الرئيسية",
    shop: "تسوق",
    categories: "الفئات",
    brands: "العلامات التجارية",
    language: "تغيير اللغة إلى الإنجليزية",
    theme: "تغيير مظهر الألوان",
    heroOffers: "عروض فريش كارت",
    themeLight: "استخدام المظهر الفاتح",
    themeDark: "استخدام المظهر الداكن",
    freshnessKicker: "طازج لحد باب بيتك",
    freshnessTitle: "منتجات طازجة تصلك حتى باب المنزل",
    freshnessMessage: "خصم ٣٠٪ على أول طلب لك",
    offerKicker: "المزيد بسعر أقل",
    offerTitle: "طعام طيب. أسعار رائعة.",
    offerMessage: "اكتشف عروض هذا الأسبوع الطازجة",
    farmKicker: "طازج من المزرعة",
    farmTitle: "اجعل كل وجبة أكثر طزاجة",
    farmMessage: "تسوق منتجات الموسم اليوم",
    shopNow: "تسوق الآن",
    previousBanner: "العرض السابق",
    nextBanner: "العرض التالي",
    chooseBanner: "اختر عرضًا",
    bannerControls: "عناصر التحكم في العروض",
    showBanner: "عرض الشريحة",
    viewProduct: "عرض",
    saveProduct: "حفظ",
    compareProduct: "قارن",
    addProductToCart: "أضف",
    reviews: "تقييم",
    currency: "ج.م",
    breadcrumb: "مسار التنقل",
    productImages: "صور المنتج",
    showProductImage: "عرض صورة المنتج",
    inStock: "متوفر بالمخزون",
    outOfStock: "غير متوفر",
    availableUnits: "قطعة متاحة",
    quantity: "الكمية",
    decreaseQuantity: "تقليل الكمية",
    increaseQuantity: "زيادة الكمية",
    addToCart: "أضف إلى السلة",
    brandLabel: "العلامة التجارية",
    categoryLabel: "الفئة",
    subcategoryLabel: "الفئة الفرعية",
    productCode: "رقم المنتج",
    deliveryPromise: "توصيل سريع",
    deliveryPromiseDetails: "التوصيل حتى باب المنزل",
    secureShopping: "تسوق آمن",
    secureShoppingDetails: "دفع آمن ومحمي",
    productInformation: "معلومات المنتج",
    productDetails: "تفاصيل المنتج",
    aboutThisProduct: "عن هذا المنتج",
    unitsSold: "القطع المباعة",
    customer: "عميل",
    showAllReviews: "عرض كل التقييمات",
    showFewerReviews: "عرض تقييمات أقل",
    categoryEyebrow: "خيارات تناسب الجميع",
    shopByCategoryTitle: "تسوق حسب الفئة",
    viewAllCategories: "عرض كل الفئات",
    productEyebrow: "اختيارات مميزة لك",
    popularProducts: "المنتجات الأكثر رواجًا",
    shopAllProducts: "تسوق كل المنتجات",
    vegetables: "خضروات",
    freshFromFarm: "طازجة من المزرعة",
    freshFruits: "فواكه طازجة",
    sweetSeasonal: "حلوة وموسمية",
    dairyEggs: "ألبان وبيض",
    everydayEssentials: "أساسيات يومية",
    meatSeafood: "لحوم ومأكولات بحرية",
    qualityCuts: "قطع عالية الجودة",
    bakery: "مخبوزات",
    bakedDaily: "مخبوزة طازجة يوميًا",
    footerTagline: "بقالة طازجة تصلك بكل عناية.",
    productPageTitle: "المنتجات",
    productPageDescription: "قائمة المنتجات والفلاتر والترتيب وتقسيم الصفحات.",
    categoryPageTitle: "الفئات",
    categoryPageDescription: "تصفح أقسام البقالة ومجموعات المنتجات.",
    brandPageTitle: "العلامات التجارية",
    brandPageDescription: "استكشف العلامات التجارية الموثوقة ومنتجاتها.",
    cartPageTitle: "سلة التسوق",
    checkoutPageTitle: "إتمام الطلب",
    wishlistPageTitle: "المفضلة",
    ordersPageTitle: "الطلبات",
    addressesPageTitle: "العناوين",
    settingsPageTitle: "إعدادات الملف الشخصي",
    freshCart: "فريش كارت",
    placeholderDescription: "تم إنشاء المسار وفقًا لشاشات Figma. أضف واجهة الشاشة وبياناتها ضمن هذه الميزة.",
    "Sign in": "تسجيل الدخول",
    "Customer authentication screen.": "شاشة تسجيل دخول العملاء.",
    "Verify reset code": "تأكيد رمز إعادة التعيين",
    "Confirm the code sent to the customer.": "أدخل الرمز المرسل إلى حسابك.",
    "Create account": "إنشاء حساب",
    "New customer registration screen.": "شاشة تسجيل عميل جديد.",
    "Reset password": "إعادة تعيين كلمة المرور",
    "Choose a new password after code verification.": "اختر كلمة مرور جديدة بعد تأكيد الرمز.",
    Orders: "الطلبات",
    "Order history and order status.": "سجل الطلبات وحالتها.",
    Wishlist: "المفضلة",
    "Products saved for later.": "المنتجات المحفوظة للرجوع إليها لاحقًا.",
    "Search products": "ابحث عن المنتجات",
    "Search results and product discovery.": "نتائج البحث واكتشاف المنتجات.",
    Checkout: "إتمام الطلب",
    "Delivery details, address selection, and order summary.": "بيانات التوصيل واختيار العنوان وملخص الطلب.",
    "Shopping cart": "سلة التسوق",
    "Review quantities, prices, and subtotal before checkout.": "راجع الكميات والأسعار والإجمالي قبل إتمام الطلب.",
    "Profile settings": "إعدادات الملف الشخصي",
    "Update profile information and account preferences.": "حدّث بيانات الملف الشخصي وتفضيلات الحساب.",
    Addresses: "العناوين",
    "Manage saved delivery addresses.": "إدارة عناوين التوصيل المحفوظة.",
    "Product details": "تفاصيل المنتج",
    Category: "الفئة",
    Products: "المنتجات",
    "Product listing, filters, sorting, and pagination.": "قائمة المنتجات والفلاتر والترتيب وتقسيم الصفحات.",
    Categories: "الفئات",
    "Browse grocery departments and category collections.": "تصفح أقسام البقالة ومجموعات المنتجات.",
    Brands: "العلامات التجارية",
    "Browse brands and their products.": "تصفح العلامات التجارية ومنتجاتها.",
    "Forgot password": "نسيت كلمة المرور",
    "Request a password reset code.": "اطلب رمزًا لإعادة تعيين كلمة المرور.",
    Brand: "العلامة التجارية",
  },
};

type AppPreferences = {
  locale: Locale;
  theme: Theme;
  isDark: boolean;
  t: (key: string) => string;
  toggleLocale: () => void;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<AppPreferences | null>(null);

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [theme, setTheme] = useState<Theme>("system");
  const [isDark, setIsDark] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem("freshcart-locale");
    const savedTheme = localStorage.getItem("freshcart-theme");
    if (savedLocale === "ar" || savedLocale === "en") setLocale(savedLocale);
    if (savedTheme === "system" || savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    localStorage.setItem("freshcart-locale", locale);
  }, [locale, preferencesLoaded]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const isDark = theme === "dark" || (theme === "system" && media.matches);
      root.classList.toggle("dark", isDark);
      root.style.colorScheme = isDark ? "dark" : "light";
      setIsDark(isDark);
    };
    applyTheme();
    localStorage.setItem("freshcart-theme", theme);
    if (theme === "system") {
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }
  }, [theme, preferencesLoaded]);

  const value = useMemo<AppPreferences>(() => ({
    locale,
    theme,
    isDark,
    t: (key) => messages[locale][key] ?? key,
    toggleLocale: () => setLocale((current) => current === "en" ? "ar" : "en"),
    toggleTheme: () => setTheme((current) => {
      const activeDark = current === "dark" || (current === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      return activeDark ? "light" : "dark";
    }),
  }), [locale, theme, isDark]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useAppPreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  return context;
}
