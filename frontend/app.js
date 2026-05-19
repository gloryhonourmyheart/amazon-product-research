const { createApp, ref, computed, watch, onMounted } = Vue

const app = createApp({
  setup() {
    const currentTab = ref('dashboard')
    const sidebarOpen = ref(false)

    const pageTitle = computed(() => {
      const titles = {
        dashboard: '数据看板',
        product: '产品搜索',
        market: '市场分析',
        keyword: '关键词研究',
        competitor: '竞品分析',
        review: '评论分析',
        store: '店铺监控',
        profit: '利润计算',
        listing: 'Listing优化',
        library: '产品库',
        wordbank: '关键词库'
      }
      return titles[currentTab.value] || '数据看板'
    })

    function switchTab(tab) {
      currentTab.value = tab
      sidebarOpen.value = false
      setTimeout(() => {
        if (tab === 'dashboard') initDashboardChart()
        if (tab === 'competitor' && selectedCompetitor.value) initSalesTrendChart()
        if (tab === 'review' && reviewAnalysis.value) initReviewCharts()
        if (tab === 'profit') initProfitChart()
        if (tab === 'library') renderProductLibrary()
        if (tab === 'wordbank') renderWordBank()
      }, 100)
    }

    const stats = ref({
      productsAnalyzed: 0,
      potentialProducts: 0,
      keywords: 0,
      competitors: 0
    })

    function loadStats() {
      const productLibrary = JSON.parse(localStorage.getItem('sj_productLibrary') || '[]')
      const keywordBank = JSON.parse(localStorage.getItem('sj_keywordBank') || '[]')
      const competitorList = JSON.parse(localStorage.getItem('sj_competitorList') || '[]')
      const analyzedCount = parseInt(localStorage.getItem('sj_analyzedCount') || '0')

      stats.value.productsAnalyzed = analyzedCount
      stats.value.potentialProducts = productLibrary.filter(p => p.growthRate > 30).length
      stats.value.keywords = keywordBank.length
      stats.value.competitors = competitorList.length
    }

    function incrementAnalyzed() {
      stats.value.productsAnalyzed++
      localStorage.setItem('sj_analyzedCount', stats.value.productsAnalyzed.toString())
    }

    const categories = [
      'Electronics',
      'Home & Kitchen',
      'Beauty & Personal Care',
      'Sports & Outdoors',
      'Toys & Games',
      'Health & Household',
      'Clothing, Shoes & Jewelry',
      'Baby Products',
      'Automotive',
      'Pet Supplies'
    ]

    const selectedMarket = ref('US')

    const mockProducts = ref([
      { asin: 'B08N5WRWNW', title: 'Silicone Food Storage Bags - Reusable Freezer Bags for Home', category: 'Home & Kitchen', price: 19.99, sales: 12500, rating: 4.7, reviews: 8923, bsr: 123, image: 'https://placehold.co/120x120/FF6900/white?text=Food+Bags', growthRate: 45, launchDate: '2024-03-15', brand: 'EcoLife', seller: 'Amazon.com', fbaFee: 4.50, weight: 0.8, dimensions: '10x8x2 inches', variations: ['Black', 'White', 'Green'], isFavorite: false, isMonitored: false },
      { asin: 'B07V3F1ZJQ', title: 'Wireless Bluetooth Headphones with Noise Cancelling Active', category: 'Electronics', price: 59.99, sales: 8900, rating: 4.5, reviews: 12450, bsr: 89, image: 'https://placehold.co/120x120/232F3E/white?text=Headphones', growthRate: 23, launchDate: '2024-01-20', brand: 'SoundMax', seller: 'SoundMax Official', fbaFee: 6.50, weight: 1.2, dimensions: '8x6x3 inches', variations: ['Black', 'White', 'Blue', 'Red'], isFavorite: false, isMonitored: false },
      { asin: 'B098XK1W5J', title: 'Adjustable Dumbbell Set 5-52.5 lbs for Home Gym', category: 'Sports & Outdoors', price: 299.99, sales: 3200, rating: 4.8, reviews: 4521, bsr: 45, image: 'https://placehold.co/120x120/00A86B/white?text=Dumbbells', growthRate: 67, launchDate: '2023-11-10', brand: 'FitPower', seller: 'FitPower Official', fbaFee: 12.50, weight: 5.5, dimensions: '20x10x10 inches', variations: ['5-25 lbs', '5-52.5 lbs'], isFavorite: false, isMonitored: false },
      { asin: 'B08G9VZ8X7', title: 'LED Strip Lights 5050 RGB 16.4ft with Remote Control', category: 'Electronics', price: 24.99, sales: 25600, rating: 4.4, reviews: 18932, bsr: 67, image: 'https://placehold.co/120x120/007185/white?text=LED+Strips', growthRate: 12, launchDate: '2023-08-05', brand: 'LumiFlex', seller: 'LumiFlex Official', fbaFee: 4.00, weight: 0.5, dimensions: '6x6x2 inches', variations: ['16.4ft', '32.8ft', '65.6ft'], isFavorite: false, isMonitored: false },
      { asin: 'B08D4Y7Q2Z', title: 'Natural Bamboo Toothbrush 4 Pack Eco Friendly Biodegradable', category: 'Beauty & Personal Care', price: 8.99, sales: 18200, rating: 4.6, reviews: 7834, bsr: 234, image: 'https://placehold.co/120x120/00A86B/white?text=Toothbrush', growthRate: 34, launchDate: '2024-02-28', brand: 'GreenSmile', seller: 'GreenSmile Official', fbaFee: 3.00, weight: 0.2, dimensions: '8x4x1 inches', variations: ['4 Pack', '8 Pack', '12 Pack'], isFavorite: false, isMonitored: false },
      { asin: 'B07ZXY9W8V', title: 'Waterproof Phone Pouch Dry Bag for Beach Kayak Boating', category: 'Sports & Outdoors', price: 12.99, sales: 9800, rating: 4.3, reviews: 5621, bsr: 345, image: 'https://placehold.co/120x120/007185/white?text=Phone+Pouch', growthRate: 89, launchDate: '2024-04-12', brand: 'AquaGuard', seller: 'AquaGuard Official', fbaFee: 3.50, weight: 0.3, dimensions: '5x3x0.5 inches', variations: ['Single', '2 Pack', '4 Pack'], isFavorite: false, isMonitored: false },
      { asin: 'B092345678', title: 'Baby Safety Gates for Stairs Pressure Mounted Easy Install', category: 'Baby Products', price: 79.99, sales: 4500, rating: 4.9, reviews: 3245, bsr: 78, image: 'https://placehold.co/120x120/FF6900/white?text=Safety+Gate', growthRate: 28, launchDate: '2023-09-15', brand: 'SafeBaby', seller: 'SafeBaby Official', fbaFee: 8.50, weight: 2.5, dimensions: '30x28x3 inches', variations: ['White', 'Wood', 'Metal'], isFavorite: false, isMonitored: false },
      { asin: 'B08KL1M2N3', title: 'Premium Dog Bed Memory Foam Orthopedic Waterproof L', category: 'Pet Supplies', price: 89.99, sales: 6700, rating: 4.7, reviews: 4523, bsr: 156, image: 'https://placehold.co/120x120/8B4513/white?text=Dog+Bed', growthRate: 15, launchDate: '2023-07-20', brand: 'PetComfort', seller: 'PetComfort Official', fbaFee: 10.00, weight: 4.0, dimensions: '36x28x5 inches', variations: ['Small', 'Medium', 'Large', 'X-Large'], isFavorite: false, isMonitored: false },
      { asin: 'B07F8G9H0J', title: 'Portable Blender Smoothie Maker USB Rechargeable 380ml', category: 'Home & Kitchen', price: 39.99, sales: 15600, rating: 4.2, reviews: 9876, bsr: 189, image: 'https://placehold.co/120x120/FF69B4/white?text=Blender', growthRate: -5, launchDate: '2023-05-10', brand: 'BlendGo', seller: 'BlendGo Official', fbaFee: 5.00, weight: 1.0, dimensions: '9x3x3 inches', variations: ['Pink', 'White', 'Green', 'Blue'], isFavorite: false, isMonitored: false },
      { asin: 'B09MNOPQRS', title: 'Car Phone Mount Holder 360 Rotation Dashboard Windshield', category: 'Automotive', price: 17.99, sales: 11200, rating: 4.5, reviews: 6789, bsr: 267, image: 'https://placehold.co/120x120/232F3E/white?text=Phone+Mount', growthRate: 41, launchDate: '2024-01-05', brand: 'AutoGrip', seller: 'AutoGrip Official', fbaFee: 3.50, weight: 0.4, dimensions: '4x3x2 inches', variations: ['Magnetic', 'Clamp', 'Vent'], isFavorite: false, isMonitored: false },
      { asin: 'B08XYZ1234', title: 'Yoga Mat Non Slip Exercise Mat 6mm Thick Premium', category: 'Sports & Outdoors', price: 29.99, sales: 7800, rating: 4.6, reviews: 5432, bsr: 198, image: 'https://placehold.co/120x120/9B59B6/white?text=Yoga+Mat', growthRate: 56, launchDate: '2024-03-01', brand: 'ZenFlow', seller: 'ZenFlow Official', fbaFee: 4.50, weight: 2.0, dimensions: '72x24x0.6 inches', variations: ['Purple', 'Blue', 'Pink', 'Black'], isFavorite: false, isMonitored: false },
      { asin: 'B07ABCDEFG', title: 'Stainless Steel Water Bottle 32oz insulated 24hrs', category: 'Sports & Outdoors', price: 24.99, sales: 14500, rating: 4.8, reviews: 11234, bsr: 56, image: 'https://placehold.co/120x120/3498DB/white?text=Water+Bottle', growthRate: 22, launchDate: '2023-10-15', brand: 'HydroPeak', seller: 'HydroPeak Official', fbaFee: 4.50, weight: 1.0, dimensions: '10x3x3 inches', variations: ['32oz', '40oz', '64oz'], isFavorite: false, isMonitored: false }
    ])

    const latestProducts = computed(() => {
      return [...mockProducts.value]
        .sort((a, b) => new Date(b.launchDate) - new Date(a.launchDate))
        .slice(0, 5)
    })

    const risingProducts = computed(() => {
      return [...mockProducts.value]
        .sort((a, b) => b.growthRate - a.growthRate)
        .slice(0, 5)
    })

    const newProducts = ref([
      { asin: 'B09NEW1', title: 'Electric Spin Scrubber for Cleaning Bathroom', launchDate: '2026-05-10', reviews: 45, sales: 1200, rating: 4.5 },
      { asin: 'B09NEW2', title: 'Mini Projector 4K Supported Portable Home Theater', launchDate: '2026-05-08', reviews: 128, sales: 890, rating: 4.3 },
      { asin: 'B09NEW3', title: 'Smart Watch Fitness Tracker Heart Rate Monitor', launchDate: '2026-05-06', reviews: 312, sales: 2100, rating: 4.6 },
      { asin: 'B09NEW4', title: 'Foldable Electric Scooter for Adults 350W Motor', launchDate: '2026-05-05', reviews: 89, sales: 560, rating: 4.4 },
      { asin: 'B09NEW5', title: 'Robot Vacuum Cleaner with Mapping Navigation', launchDate: '2026-05-03', reviews: 567, sales: 3200, rating: 4.7 }
    ])

    const filters = ref({
      keyword: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: '',
      minSales: '',
      maxSales: '',
      minReviews: '',
      maxReviews: '',
      minGrowth: '',
      launchDateStart: '',
      launchDateEnd: ''
    })

    const sortBy = ref('sales')
    const currentPage = ref(1)
    const pageSize = ref(10)

    const filteredProducts = computed(() => {
      return mockProducts.value.filter(p => {
        if (filters.value.keyword && !p.title.toLowerCase().includes(filters.value.keyword.toLowerCase()) && !p.asin.toLowerCase().includes(filters.value.keyword.toLowerCase())) return false
        if (filters.value.category && p.category !== filters.value.category) return false
        if (filters.value.minPrice && p.price < parseFloat(filters.value.minPrice)) return false
        if (filters.value.maxPrice && p.price > parseFloat(filters.value.maxPrice)) return false
        if (filters.value.minRating && p.rating < parseFloat(filters.value.minRating)) return false
        if (filters.value.minSales && p.sales < parseInt(filters.value.minSales)) return false
        if (filters.value.maxSales && p.sales > parseInt(filters.value.maxSales)) return false
        if (filters.value.minReviews && p.reviews < parseInt(filters.value.minReviews)) return false
        if (filters.value.maxReviews && p.reviews > parseInt(filters.value.maxReviews)) return false
        if (filters.value.minGrowth !== '' && p.growthRate < parseInt(filters.value.minGrowth)) return false
        if (filters.value.launchDateStart && new Date(p.launchDate) < new Date(filters.value.launchDateStart)) return false
        if (filters.value.launchDateEnd && new Date(p.launchDate) > new Date(filters.value.launchDateEnd)) return false
        return true
      })
    })

    const sortedProducts = computed(() => {
      const sorted = [...filteredProducts.value]
      if (sortBy.value === 'sales') sorted.sort((a, b) => b.sales - a.sales)
      if (sortBy.value === 'price') sorted.sort((a, b) => a.price - b.price)
      if (sortBy.value === 'rating') sorted.sort((a, b) => b.rating - a.rating)
      if (sortBy.value === 'reviews') sorted.sort((a, b) => b.reviews - a.reviews)
      if (sortBy.value === 'growth') sorted.sort((a, b) => b.growthRate - a.growthRate)
      if (sortBy.value === 'bsr') sorted.sort((a, b) => a.bsr - b.bsr)
      return sorted
    })

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value
      const end = start + pageSize.value
      return sortedProducts.value.slice(start, end)
    })

    const totalPages = computed(() => Math.ceil(sortedProducts.value.length / pageSize.value))

    const visiblePages = computed(() => {
      const pages = []
      const total = totalPages.value
      const current = currentPage.value
      if (total <= 5) {
        for (let i = 1; i <= total; i++) pages.push(i)
      } else {
        if (current <= 3) {
          pages.push(1, 2, 3, 4, 5)
        } else if (current >= total - 2) {
          pages.push(total - 4, total - 3, total - 2, total - 1, total)
        } else {
          pages.push(current - 2, current - 1, current, current + 1, current + 2)
        }
      }
      return pages
    })

    function searchProducts() {
      currentPage.value = 1
      incrementAnalyzed()
    }

    function resetFilters() {
      filters.value = {
        keyword: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        minRating: '',
        minSales: '',
        maxSales: '',
        minReviews: '',
        maxReviews: '',
        minGrowth: '',
        launchDateStart: '',
        launchDateEnd: ''
      }
      currentPage.value = 1
    }

    const selectedProduct = ref(null)

    function showProductDetail(product) {
      selectedProduct.value = product
      setTimeout(() => {
        initProductSalesChart()
        initProductPriceChart()
      }, 100)
    }

    function addToProductLibrary(product) {
      const library = JSON.parse(localStorage.getItem('sj_productLibrary') || '[]')
      if (!library.find(p => p.asin === product.asin)) {
        library.push({ ...product, addedAt: new Date().toISOString() })
        localStorage.setItem('sj_productLibrary', JSON.stringify(library))
        loadStats()
        alert('已加入产品库')
      } else {
        alert('该产品已在产品库中')
      }
    }

    function addToCompetitor(product) {
      const competitors = JSON.parse(localStorage.getItem('sj_competitorList') || '[]')
      if (!competitors.find(c => c.asin === product.asin)) {
        competitors.push({ ...product, addedAt: new Date().toISOString() })
        localStorage.setItem('sj_competitorList', JSON.stringify(competitors))
        loadStats()
        alert('已加入竞品监控')
      } else {
        alert('该产品已在竞品列表中')
      }
    }

    function initProductSalesChart() {
      const ctx = document.getElementById('productSalesChart')
      if (!ctx) return
      const labels = ['1月', '2月', '3月', '4月', '5月']
      const baseSales = selectedProduct.value?.sales || 10000
      const data = labels.map((_, i) => Math.round(baseSales * (0.8 + i * 0.05 + Math.random() * 0.1)))
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: '月销量',
            data,
            borderColor: '#FF6900',
            backgroundColor: 'rgba(255,105,0,0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      })
    }

    function initProductPriceChart() {
      const ctx = document.getElementById('productPriceChart')
      if (!ctx) return
      const labels = ['1月', '2月', '3月', '4月', '5月']
      const basePrice = selectedProduct.value?.price || 25
      const data = labels.map(() => (basePrice * (0.95 + Math.random() * 0.1)).toFixed(2))
      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: '价格趋势',
            data,
            borderColor: '#00A86B',
            backgroundColor: 'rgba(0,168,107,0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      })
    }

    const marketFilters = ref({ category: '', site: 'US', minPrice: '', maxPrice: '' })
    const marketScore = ref(75)
    const marketScoreLabel = ref('中等机会')
    const marketAdvice = ref('谨慎进入')
    const marketData = ref({
      marketCap: 2580000,
      avgPrice: 35.6,
      avgRating: 4.3,
      competitionLevel: '中等',
      brandConcentration: 42,
      sellerConcentration: 35,
      top10Share: 28,
      avgReviews: 1250,
      returnRate: 5.2,
      avgWeight: 0.8,
      demand: 78,
      competition: 65,
      profit: 72,
      growth: 58
    })

    function analyzeMarket() {
      const scores = {
        'Electronics': { score: 72, demand: 85, competition: 70, profit: 65, growth: 68 },
        'Home & Kitchen': { score: 68, demand: 80, competition: 75, profit: 70, growth: 55 },
        'Beauty & Personal Care': { score: 65, demand: 82, competition: 78, profit: 68, growth: 60 },
        'Sports & Outdoors': { score: 78, demand: 75, competition: 60, profit: 80, growth: 72 },
        'Toys & Games': { score: 55, demand: 88, competition: 85, profit: 55, growth: 45 },
        'Health & Household': { score: 70, demand: 78, competition: 68, profit: 75, growth: 65 },
        'Baby Products': { score: 62, demand: 72, competition: 80, profit: 70, growth: 58 },
        'Pet Supplies': { score: 75, demand: 80, competition: 55, profit: 78, growth: 70 }
      }
      const data = scores[marketFilters.value.category] || { score: 70, demand: 75, competition: 65, profit: 70, growth: 60 }
      marketScore.value = data.score
      marketData.value.demand = data.demand
      marketData.value.competition = data.competition
      marketData.value.profit = data.profit
      marketData.value.growth = data.growth
      if (marketScore.value >= 70) { marketScoreLabel.value = '高机会'; marketAdvice.value = '建议进入' }
      else if (marketScore.value >= 50) { marketScoreLabel.value = '中等机会'; marketAdvice.value = '谨慎进入' }
      else { marketScoreLabel.value = '低机会'; marketAdvice.value = '不建议进入' }
    }

    const keywordInput = ref('')
    const keywordSite = ref('US')
    const keywordMode = ref('expand')
    const keywordResults = ref([])
    const wordBank = ref([])
    const selectedWordBank = ref('all')
    const wordBankCategories = ref([
      { id: 'traffic', name: '引流词', color: 'primary' },
      { id: 'conversion', name: '转化词', color: 'success' },
      { id: 'longtail', name: '长尾词', color: 'info' },
      { id: 'brand', name: '品牌词', color: 'warning' }
    ])

    const mockKeywords = [
      { keyword: 'silicone food storage bags', searchVolume: 125000, competition: 65, conversionRate: 8.5, trend: 12, related: ['reusable freezer bags', 'food storage containers'] },
      { keyword: 'reusable freezer bags', searchVolume: 89000, competition: 58, conversionRate: 7.2, trend: 8, related: ['silicone bags', 'leak proof bags'] },
      { keyword: 'wireless noise cancelling headphones', searchVolume: 256000, competition: 89, conversionRate: 4.5, trend: -3, related: ['bluetooth headphones', 'over ear headphones'] },
      { keyword: 'adjustable dumbbells', searchVolume: 78000, competition: 45, conversionRate: 6.8, trend: 15, related: ['home gym equipment', 'fitness weights'] },
      { keyword: 'LED strip lights RGB', searchVolume: 198000, competition: 72, conversionRate: 9.1, trend: 5, related: ['LED lights', 'RGB strip'] },
      { keyword: 'bamboo toothbrush eco', searchVolume: 45000, competition: 32, conversionRate: 11.2, trend: 23, related: ['eco toothbrush', 'bamboo oral care'] },
      { keyword: 'waterproof phone pouch', searchVolume: 67000, competition: 55, conversionRate: 7.8, trend: 18, related: ['phone dry bag', 'waterproof case'] },
      { keyword: 'baby safety gate', searchVolume: 52000, competition: 48, conversionRate: 10.5, trend: 6, related: ['stair gate', 'baby door gate'] },
      { keyword: 'dog bed memory foam', searchVolume: 38000, competition: 42, conversionRate: 8.9, trend: 11, related: ['orthopedic dog bed', 'waterproof pet bed'] },
      { keyword: 'portable blender smoothie', searchVolume: 112000, competition: 68, conversionRate: 7.3, trend: -2, related: ['personal blender', 'USB blender'] },
      { keyword: 'car phone mount', searchVolume: 145000, competition: 75, conversionRate: 6.1, trend: 4, related: ['phone holder car', 'magnetic mount'] },
      { keyword: 'yoga mat non slip', searchVolume: 95000, competition: 61, conversionRate: 8.2, trend: 17, related: ['exercise mat', 'fitness mat'] },
      { keyword: 'water bottle insulated', searchVolume: 88000, competition: 58, conversionRate: 9.5, trend: 9, related: ['sports water bottle', 'thermal bottle'] },
      { keyword: 'electric spin scrubber', searchVolume: 42000, competition: 35, conversionRate: 12.1, trend: 45, related: ['cleaning brush', 'bathroom cleaner'] },
      { keyword: 'mini projector 4k', searchVolume: 68000, competition: 52, conversionRate: 6.8, trend: 28, related: ['portable projector', 'home theater'] }
    ]

    function searchKeywords() {
      if (!keywordInput.value) {
        keywordResults.value = [...mockKeywords]
      } else {
        const searchTerm = keywordInput.value.toLowerCase()
        keywordResults.value = mockKeywords.filter(k =>
          k.keyword.toLowerCase().includes(searchTerm) ||
          k.related.some(r => r.toLowerCase().includes(searchTerm))
        )
      }
      if (keywordResults.value.length === 0) {
        keywordResults.value = [...mockKeywords].slice(0, 5)
      }
    }

    function expandKeywords(keyword) {
      const found = mockKeywords.find(k => k.keyword.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(k.keyword))
      if (found) {
        const related = found.related.map(r => ({
          keyword: r,
          searchVolume: Math.round(found.searchVolume * (0.3 + Math.random() * 0.4)),
          competition: Math.round(found.competition * (0.8 + Math.random() * 0.4)),
          conversionRate: (found.conversionRate * (0.8 + Math.random() * 0.4)).toFixed(1),
          trend: Math.round(found.trend * (0.5 + Math.random())),
          related: []
        }))
        keywordResults.value = [...keywordResults.value, ...related]
      }
    }

    function addToWordBank(kw, category = 'traffic') {
      if (!wordBank.value.find(w => w.keyword === kw.keyword)) {
        wordBank.value.push({ ...kw, category, addedAt: new Date().toISOString() })
        saveToLocalStorage()
        loadStats()
      }
    }

    function removeFromWordBank(index) {
      wordBank.value.splice(index, 1)
      saveToLocalStorage()
      loadStats()
    }

    function updateWordBankCategory(keyword, newCategory) {
      const item = wordBank.value.find(w => w.keyword === keyword)
      if (item) {
        item.category = newCategory
        saveToLocalStorage()
      }
    }

    const filteredWordBank = computed(() => {
      if (selectedWordBank.value === 'all') return wordBank.value
      return wordBank.value.filter(w => w.category === selectedWordBank.value)
    })

    function exportWordBank() {
      const data = filteredWordBank.value.map(w => ({
        keyword: w.keyword,
        searchVolume: w.searchVolume,
        competition: w.competition,
        conversionRate: w.conversionRate,
        trend: w.trend,
        category: w.category
      }))
      downloadCSV(data, '关键词库导出')
    }

    function importKeywords(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const lines = e.target.result.split('\n')
        lines.forEach(line => {
          const kw = line.trim()
          if (kw && !wordBank.value.find(w => w.keyword === kw)) {
            wordBank.value.push({
              keyword: kw,
              searchVolume: Math.round(Math.random() * 100000),
              competition: Math.round(Math.random() * 100),
              conversionRate: (Math.random() * 10).toFixed(1),
              trend: Math.round(Math.random() * 50) - 25,
              category: 'traffic',
              addedAt: new Date().toISOString()
            })
          }
        })
        saveToLocalStorage()
      }
      reader.readAsText(file)
    }

    const reverseAsin = ref('')
    const reverseResults = ref([])

    function reverseKeyword() {
      if (!reverseAsin.value) return
      const asin = reverseAsin.value.toUpperCase()
      reverseResults.value = mockKeywords.slice(0, Math.floor(Math.random() * 8) + 5).map(k => ({
        ...k,
        rank: Math.floor(Math.random() * 20) + 1,
        page: Math.floor(Math.random() * 5) + 1
      }))
    }

    const compareAsins = ref([])
    const compareResults = ref([])
    const newCompareAsin = ref('')

    function addToCompare(asin) {
      if (!compareAsins.value.includes(asin) && compareAsins.value.length < 5) {
        compareAsins.value.push(asin)
      }
    }

    function compareKeywords() {
      if (compareAsins.value.length < 2) return
      const baseKeywords = mockKeywords.slice(0, 10)
      compareResults.value = baseKeywords.map(k => {
        const result = { keyword: k.keyword, searchVolume: k.searchVolume }
        compareAsins.value.forEach(asin => {
          result[asin] = Math.floor(Math.random() * 20) + 1
        })
        return result
      })
    }

    const competitorList = ref([])
    const selectedCompetitor = ref(null)

    function loadCompetitors() {
      const stored = JSON.parse(localStorage.getItem('sj_competitorList') || '[]')
      competitorList.value = stored.length > 0 ? stored : [
        { asin: 'B08N5WRWNW', title: 'Silicone Food Storage Bags', price: 19.99, rating: 4.7, sales: 12500, reviews: 8923, bsr: 123, image: 'https://placehold.co/120x120/FF6900/white?text=Food+Bags', variants: 5, topKeywords: ['silicone food storage bags', 'reusable freezer bags', 'food storage containers'], addedAt: new Date().toISOString() },
        { asin: 'B07V3F1ZJQ', title: 'Wireless Bluetooth Headphones', price: 59.99, rating: 4.5, sales: 8900, reviews: 12450, bsr: 89, image: 'https://placehold.co/120x120/232F3E/white?text=Headphones', variants: 8, topKeywords: ['wireless headphones', 'noise cancelling', 'bluetooth earphones'], addedAt: new Date().toISOString() }
      ]
    }

    function addCompetitorByAsin() {
      const asin = prompt('请输入ASIN:')
      if (!asin) return
      const product = mockProducts.value.find(p => p.asin === asin.toUpperCase())
      if (product && !competitorList.value.find(c => c.asin === product.asin)) {
        competitorList.value.push({ ...product, addedAt: new Date().toISOString() })
        saveToLocalStorage()
        loadStats()
      } else if (product) {
        alert('该竞品已在列表中')
      } else {
        alert('未找到该ASIN')
      }
    }

    function selectCompetitor(comp) {
      selectedCompetitor.value = comp
      setTimeout(() => {
        initSalesTrendChart()
        initPriceTrendChart()
      }, 100)
    }

    function removeCompetitor(asin) {
      competitorList.value = competitorList.value.filter(c => c.asin !== asin)
      if (selectedCompetitor.value?.asin === asin) selectedCompetitor.value = null
      saveToLocalStorage()
      loadStats()
    }

    const reviewAsin = ref('')
    const reviewCount = ref('100')
    const reviewAnalysis = ref(null)
    const reviewDistribution = ref({})
    const reviewList = ref([])
    const reviewVariants = ref([])

    function analyzeReviews() {
      if (!reviewAsin.value) {
        alert('请输入ASIN')
        return
      }
      reviewAnalysis.value = {
        positive: Math.round(60 + Math.random() * 20),
        neutral: Math.round(10 + Math.random() * 10),
        negative: Math.round(5 + Math.random() * 15),
        positiveKeywords: [
          { word: '质量好', count: 156 },
          { word: '发货快', count: 89 },
          { word: '包装精美', count: 67 },
          { word: '使用方便', count: 54 },
          { word: '性价比高', count: 43 }
        ],
        negativeKeywords: [
          { word: '尺寸偏小', count: 23 },
          { word: '颜色不符', count: 18 },
          { word: '物流慢', count: 15 },
          { word: '容易损坏', count: 12 },
          { word: '说明书不清晰', count: 8 }
        ],
        painPoints: [
          { title: '产品尺寸问题', description: '部分用户反馈产品尺寸比描述的要小，建议在详情页更准确地标注尺寸信息', impact: 23 },
          { title: '颜色偏差', description: '用户反映收到的产品颜色与图片有差异，建议优化产品拍摄和颜色校准', impact: 18 },
          { title: '包装保护不足', description: '部分产品在运输过程中受损，建议加强包装防护', impact: 15 }
        ],
        suggestions: [
          '优化产品描述，确保尺寸信息准确无误',
          '改进产品拍摄，减少颜色偏差',
          '增加缓冲材料，提升包装质量',
          '提供更详细的使用说明书'
        ]
      }
      reviewDistribution.value = {
        5: { count: Math.round(3500 + Math.random() * 2000), percent: 55 + Math.round(Math.random() * 10) },
        4: { count: Math.round(1500 + Math.random() * 1000), percent: 20 + Math.round(Math.random() * 5) },
        3: { count: Math.round(500 + Math.random() * 500), percent: 5 + Math.round(Math.random() * 5) },
        2: { count: Math.round(200 + Math.random() * 300), percent: 2 + Math.round(Math.random() * 3) },
        1: { count: Math.round(100 + Math.random() * 200), percent: 1 + Math.round(Math.random() * 2) }
      }
      reviewList.value = [
        { rating: 5, content: 'Great product! Exactly as described and arrived quickly.', date: '2026-05-10', variant: 'Black', verified: true, helpful: 45 },
        { rating: 5, content: 'Excellent quality for the price. Highly recommend!', date: '2026-05-08', variant: 'White', verified: true, helpful: 32 },
        { rating: 4, content: 'Good product but shipping took longer than expected.', date: '2026-05-05', variant: 'Black', verified: true, helpful: 18 },
        { rating: 4, content: 'Works well, but could be a bit larger.', date: '2026-05-03', variant: 'Green', verified: false, helpful: 12 },
        { rating: 3, content: 'Average quality. Not bad but not great either.', date: '2026-04-28', variant: 'White', verified: true, helpful: 8 }
      ]
      reviewVariants.value = [
        { name: 'Black', reviews: 3456, avgRating: 4.7 },
        { name: 'White', reviews: 2890, avgRating: 4.8 },
        { name: 'Green', reviews: 1234, avgRating: 4.5 }
      ]
      setTimeout(() => initReviewCharts(), 100)
    }

    const storeUrl = ref('')
    const monitoredStores = ref([])
    const selectedStore = ref(null)

    function loadStores() {
      const stored = JSON.parse(localStorage.getItem('sj_storeList') || '[]')
      monitoredStores.value = stored.length > 0 ? stored : [
        { 
          name: 'TechPro Store', 
          productCount: 156, 
          newProducts: 5, 
          avgRating: 4.6, 
          avgPrice: '$45.99', 
          mainCategories: ['Electronics', 'Accessories'], 
          addedAt: new Date().toISOString(),
          newestProducts: [
            { title: 'Wireless Earbuds Pro', price: 79.99, launchDate: '2026-05-15', sales: 1200 },
            { title: 'Smart Watch X1', price: 149.99, launchDate: '2026-05-10', sales: 850 },
            { title: 'USB-C Hub 10-in-1', price: 49.99, launchDate: '2026-05-08', sales: 2100 }
          ]
        },
        { 
          name: 'HomeEssentials', 
          productCount: 89, 
          newProducts: 3, 
          avgRating: 4.8, 
          avgPrice: '$29.99', 
          mainCategories: ['Home & Kitchen', 'Storage'], 
          addedAt: new Date().toISOString(),
          newestProducts: [
            { title: 'Silicone Food Storage Set', price: 24.99, launchDate: '2026-05-14', sales: 3200 },
            { title: 'Bamboo Cutting Board', price: 19.99, launchDate: '2026-05-12', sales: 1800 },
            { title: 'Stainless Steel Water Bottle', price: 29.99, launchDate: '2026-05-09', sales: 1500 }
          ]
        }
      ]
    }

    function addStore() {
      if (!storeUrl.value) return
      const name = storeUrl.value.trim()
      if (!monitoredStores.value.find(s => s.name === name)) {
        monitoredStores.value.push({
          name,
          productCount: Math.floor(Math.random() * 100) + 50,
          newProducts: Math.floor(Math.random() * 5) + 1,
          avgRating: (4 + Math.random()).toFixed(1),
          avgPrice: '$' + (Math.floor(Math.random() * 50) + 20).toFixed(2),
          mainCategories: ['New Category'],
          addedAt: new Date().toISOString(),
          newestProducts: [
            { title: 'New Product A', price: (Math.floor(Math.random() * 50) + 20).toFixed(2), launchDate: new Date().toISOString().split('T')[0], sales: Math.floor(Math.random() * 500) + 100 }
          ]
        })
        saveToLocalStorage()
      }
      storeUrl.value = ''
    }

    function selectStore(store) {
      selectedStore.value = store
    }

    function removeStore(name) {
      monitoredStores.value = monitoredStores.value.filter(s => s.name !== name)
      saveToLocalStorage()
    }

    const profit = ref({
      cost: 8,
      price: 25,
      weight: 0.5,
      dimensions: '30×20×15',
      commission: 15,
      shippingPerKg: 5,
      monthlySales: 1000,
      adCost: 500,
      shippingType: 'fba'
    })

    const profitResult = computed(() => {
      const { cost, price, weight, commission, shippingPerKg, monthlySales, adCost } = profit.value
      const revenue = price * monthlySales
      const productCost = cost * monthlySales
      const commissionAmount = revenue * (commission / 100)
      const fulfillmentFee = monthlySales * (weight > 1 ? 6.5 : 5.5)
      const shippingCost = weight * shippingPerKg * monthlySales
      const grossProfit = revenue - productCost - commissionAmount - fulfillmentFee - shippingCost
      const netProfit = grossProfit - adCost
      const grossMargin = revenue > 0 ? ((grossProfit / revenue) * 100).toFixed(1) : 0
      const netMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : 0
      const roi = productCost > 0 ? ((netProfit / productCost) * 100).toFixed(1) : 0
      const breakeven = Math.ceil((adCost + (revenue * 0.15)) / (price - cost - (price * 0.15) - (weight > 1 ? 6.5 : 5.5) - (weight * shippingPerKg)))

      return {
        revenue: revenue.toFixed(2),
        productCost: productCost.toFixed(2),
        commission: commissionAmount.toFixed(2),
        fulfillmentFee: fulfillmentFee.toFixed(2),
        shippingCost: shippingCost.toFixed(2),
        grossProfit: grossProfit.toFixed(2),
        netProfit: netProfit.toFixed(2),
        grossMargin,
        netMargin,
        roi,
        breakeven
      }
    })

    function initProfitChart() {
      const ctx = document.getElementById('profitChart')
      if (!ctx) return
      const labels = ['收入', '产品成本', '佣金', '配送费', '头程', '广告', '净利润']
      const data = [
        profitResult.value.revenue,
        profitResult.value.productCost,
        profitResult.value.commission,
        profitResult.value.fulfillmentFee,
        profitResult.value.shippingCost,
        profit.value.adCost,
        profitResult.value.netProfit
      ].map(Number)
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: '金额 ($)',
            data,
            backgroundColor: ['#3498DB', '#E74C3C', '#9B59B6', '#F39C12', '#1ABC9C', '#E67E22', '#2ECC71']
          }]
        },
        options: { responsive: true }
      })
    }

    const listing = ref({
      title: '',
      bullets: '',
      searchTerms: ''
    })

    const listingCoverage = computed(() => {
      if (!listing.value.title) return 0
      const keywords = ['silicone', 'food storage', 'reusable', 'bags', 'kitchen', 'freezer', 'eco-friendly', 'leak proof']
      const text = (listing.value.title + ' ' + listing.value.bullets + ' ' + listing.value.searchTerms).toLowerCase()
      const found = keywords.filter(k => text.includes(k.toLowerCase())).length
      return Math.round((found / keywords.length) * 100)
    })

    const titleTips = computed(() => {
      const tips = [
        { label: '长度 80-200 字符', passed: listing.value.title.length >= 80 && listing.value.title.length <= 200 },
        { label: '包含核心关键词', passed: listing.value.title.includes('silicone') || listing.value.title.includes('storage') },
        { label: '包含品牌词', passed: listing.value.title.length > 0 },
        { label: '无关键词堆砌', passed: true }
      ]
      return tips
    })

    const suggestedKeywords = ref([
      { keyword: 'silicone', found: false },
      { keyword: 'food storage', found: false },
      { keyword: 'reusable', found: false },
      { keyword: 'leak proof', found: false },
      { keyword: 'freezer safe', found: false }
    ])

    function checkListingCoverage() {
      const text = (listing.value.title + ' ' + listing.value.bullets + ' ' + listing.value.searchTerms).toLowerCase()
      suggestedKeywords.value.forEach(kw => {
        kw.found = text.includes(kw.keyword.toLowerCase())
      })
    }

    function getKeywordScore(text) {
      if (!text) return 0
      const keywords = ['silicone', 'food', 'storage', 'bags', 'reusable', 'kitchen']
      const found = keywords.filter(k => text.toLowerCase().includes(k)).length
      return Math.round((found / keywords.length) * 100)
    }

    function getFilledPercent() {
      const max = 250
      const current = listing.value.searchTerms.length
      return Math.min(100, Math.round((current / max) * 100))
    }

    function optimizeListing() {
      listing.value.title = 'Premium Silicone Food Storage Bags - Reusable Freezer Bags, Leak Proof Kitchen Organization, Eco-Friendly 30 Pack'
      listing.value.bullets = '✓ PREMIUM SILICONE - Food grade silicone, BPA free, FDA approved\n✓ LEAK PROOF - Airtight seal keeps food fresh\n✓ REUSABLE - Washable and dishwasher safe\n✓ VERSATILE - Freezer, microwave, and dishwasher safe\n✓ ECO-FRIENDLY - Replace single-use plastic bags'
      listing.value.searchTerms = 'silicone food storage bags, reusable freezer bags, kitchen organization, leak proof containers, eco friendly storage, food saver bags, reusable food bags'
      checkListingCoverage()
    }

    function initDashboardChart() {
      const ctx = document.getElementById('categoryChart')
      if (!ctx) return
      if (window.categoryChartInstance) window.categoryChartInstance.destroy()
      window.categoryChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['电子', '家居', '美妆', '运动', '玩具', '宠物', '母婴', '汽车'],
          datasets: [{
            label: '月销量(K)',
            data: [256, 189, 156, 134, 98, 78, 65, 45],
            backgroundColor: ['#FF6900', '#232F3E', '#00A86B', '#FFB800', '#E74C3C', '#007185', '#9B59B6', '#3498DB']
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      })

      const pieCtx = document.getElementById('marketShareChart')
      if (!pieCtx) return
      if (window.marketShareChartInstance) window.marketShareChartInstance.destroy()
      window.marketShareChartInstance = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
          labels: ['$0-20', '$20-50', '$50-100', '$100+'],
          datasets: [{
            data: [35, 40, 18, 7],
            backgroundColor: ['#FF6900', '#232F3E', '#00A86B', '#FFB800']
          }]
        },
        options: { responsive: true, cutout: '60%' }
      })
    }

    function initSalesTrendChart() {
      const ctx = document.getElementById('salesTrendChart')
      if (!ctx) return
      if (window.salesTrendChartInstance) window.salesTrendChartInstance.destroy()
      const baseSales = selectedCompetitor.value?.sales || 10000
      window.salesTrendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1月', '2月', '3月', '4月', '5月'],
          datasets: [{
            label: '销量',
            data: [9800, 10500, 11200, 11800, 12500].map(() => Math.round(baseSales * (0.8 + Math.random() * 0.4))),
            borderColor: '#FF6900',
            backgroundColor: 'rgba(255,105,0,0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      })
    }

    function initPriceTrendChart() {
      const ctx = document.getElementById('priceTrendChart')
      if (!ctx) return
      if (window.priceTrendChartInstance) window.priceTrendChartInstance.destroy()
      const basePrice = selectedCompetitor.value?.price || 50
      window.priceTrendChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1月', '2月', '3月', '4月', '5月'],
          datasets: [{
            label: '价格',
            data: [basePrice * 0.95, basePrice * 0.98, basePrice * 1.02, basePrice * 0.99, basePrice].map(v => Math.round(v * 100) / 100),
            borderColor: '#00A86B',
            backgroundColor: 'rgba(0,168,107,0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: { 
          responsive: true, 
          plugins: { legend: { display: false } },
          scales: {
            y: {
              ticks: {
                callback: function(value) {
                  return '$' + value
                }
              }
            }
          }
        }
      })
    }

    function initReviewCharts() {
      const ctx = document.getElementById('reviewRatingChart')
      if (!ctx) return
      if (window.reviewRatingChartInstance) window.reviewRatingChartInstance.destroy()
      window.reviewRatingChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['5星', '4星', '3星', '2星', '1星'],
          datasets: [{
            data: [62, 24, 8, 4, 2],
            backgroundColor: ['#00A86B', '#7FBA00', '#FFB800', '#FFA500', '#E74C3C']
          }]
        },
        options: { responsive: true, cutout: '60%' }
      })

      const trendCtx = document.getElementById('reviewTrendChart')
      if (!trendCtx) return
      if (window.reviewTrendChartInstance) window.reviewTrendChartInstance.destroy()
      window.reviewTrendChartInstance = new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: ['1月', '2月', '3月', '4月', '5月'],
          datasets: [{
            label: '新增评论',
            data: [120, 145, 168, 189, 210],
            borderColor: '#007185',
            backgroundColor: 'rgba(0,113,133,0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
      })
    }

    function saveToLocalStorage() {
      localStorage.setItem('sj_keywordBank', JSON.stringify(wordBank.value))
      localStorage.setItem('sj_competitorList', JSON.stringify(competitorList.value))
      localStorage.setItem('sj_storeList', JSON.stringify(monitoredStores.value))
    }

    function loadFromLocalStorage() {
      const storedKeywords = JSON.parse(localStorage.getItem('sj_keywordBank') || '[]')
      if (storedKeywords.length > 0) {
        wordBank.value = storedKeywords
      }
      loadCompetitors()
      loadStores()
      loadStats()
    }

    function exportData(type) {
      let data = []
      let filename = ''
      if (type === 'products') {
        data = filteredProducts.value.map(p => ({
          ASIN: p.asin,
          标题: p.title,
          品牌: p.brand,
          类目: p.category,
          价格: p.price,
          月销量: p.sales,
          评分: p.rating,
          评论数: p.reviews,
          BSR: p.bsr,
          增长率: p.growthRate,
          上架时间: p.launchDate,
          FBA费用: p.fbaFee
        }))
        filename = '产品列表'
      } else if (type === 'keywords') {
        data = keywordResults.value.map(k => ({
          关键词: k.keyword,
          搜索量: k.searchVolume,
          竞争度: k.competition,
          转化率: k.conversionRate,
          趋势: k.trend,
          排名: k.rank || '-'
        }))
        filename = '关键词列表'
      } else if (type === 'wordbank') {
        data = wordBank.value.map(k => ({
          关键词: k.keyword,
          分类: wordBankCategories.value.find(c => c.id === k.category)?.name || k.category,
          搜索量: k.searchVolume,
          竞争度: k.competition,
          转化率: k.conversionRate,
          趋势: k.trend,
          添加时间: k.addedAt?.slice(0, 10) || ''
        }))
        filename = '词库'
      } else if (type === 'competitors') {
        data = competitorList.value.map(c => ({
          ASIN: c.asin,
          标题: c.title,
          价格: c.price,
          月销量: c.sales,
          评分: c.rating,
          评论数: c.reviews,
          BSR: c.bsr,
          变体数: c.variants,
          添加时间: c.addedAt?.slice(0, 10) || ''
        }))
        filename = '竞品列表'
      } else if (type === 'stores') {
        data = monitoredStores.value.map(s => ({
          店铺名称: s.name,
          产品数量: s.productCount,
          本周新品: s.newProducts,
          平均评分: s.avgRating,
          平均价格: s.avgPrice,
          主攻类目: s.mainCategories?.join('; ') || '',
          添加时间: s.addedAt?.slice(0, 10) || ''
        }))
        filename = '店铺列表'
      } else if (type === 'reviews' && reviewAnalysis.value) {
        data = reviewList.value.map(r => ({
          评分: r.rating,
          内容: r.content,
          日期: r.date,
          变体: r.variant || '-',
          已验证: r.verified ? '是' : '否',
          有帮助数: r.helpful
        }))
        filename = '评论列表'
      }
      if (data.length > 0) {
        downloadCSV(data, filename)
      } else {
        alert('没有数据可导出')
      }
    }

    function downloadCSV(data, filename) {
      const headers = Object.keys(data[0])
      const csv = [
        headers.join(','),
        ...data.map(row => headers.map(h => {
          const value = row[h]
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`
          }
          return value
        }).join(','))
      ].join('\n')
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`
      link.click()
    }

    const productLibrary = computed(() => {
      return JSON.parse(localStorage.getItem('sj_productLibrary') || '[]')
    })

    function removeFromLibrary(asin) {
      const library = JSON.parse(localStorage.getItem('sj_productLibrary') || '[]')
      const filtered = library.filter(p => p.asin !== asin)
      localStorage.setItem('sj_productLibrary', JSON.stringify(filtered))
      loadStats()
    }

    function renderProductLibrary() {
      loadStats()
    }

    function renderWordBank() {
      loadStats()
    }

    function formatNumber(num) {
      if (!num) return '0'
      if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
      if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
      return num.toString()
    }

    function truncate(str, len) {
      if (!str) return ''
      return str.length > len ? str.substring(0, len) + '...' : str
    }

    function getRatingBadgeClass(rating) {
      if (rating >= 4.5) return 'badge bg-success'
      if (rating >= 4) return 'badge bg-warning text-dark'
      return 'badge bg-danger'
    }

    function getRatingClass(rating) {
      if (rating >= 4.5) return 'text-success'
      if (rating >= 4) return 'text-warning'
      return 'text-danger'
    }

    function getCoverageClass(coverage) {
      if (coverage >= 80) return 'bg-success'
      if (coverage >= 50) return 'bg-warning'
      return 'bg-danger'
    }

    function getScoreClass(score) {
      if (score >= 80) return 'text-success'
      if (score >= 50) return 'text-warning'
      return 'text-danger'
    }

    function getMarketAdviceBadge(advice) {
      if (advice === '建议进入') return 'badge bg-success'
      if (advice === '谨慎进入') return 'badge bg-warning text-dark'
      return 'badge bg-danger'
    }

    function getCompetitionClass(competition) {
      if (competition >= 70) return 'bg-danger'
      if (competition >= 40) return 'bg-warning'
      return 'bg-success'
    }

    function getTrendClass(trend) {
      if (trend > 0) return 'text-success'
      if (trend < 0) return 'text-danger'
      return 'text-muted'
    }

    function getTrendIcon(trend) {
      if (trend > 0) return 'fas fa-arrow-up'
      if (trend < 0) return 'fas fa-arrow-down'
      return 'fas fa-minus'
    }

    watch(listing, () => {
      checkListingCoverage()
    }, { deep: true })

    onMounted(() => {
      loadFromLocalStorage()
      searchKeywords()
      loadStats()
      setTimeout(() => {
        if (currentTab.value === 'dashboard') initDashboardChart()
      }, 200)
    })

    return {
      currentTab,
      sidebarOpen,
      pageTitle,
      switchTab,
      stats,
      categories,
      selectedMarket,
      mockProducts,
      latestProducts,
      risingProducts,
      newProducts,
      filters,
      sortBy,
      currentPage,
      pageSize,
      filteredProducts,
      sortedProducts,
      paginatedProducts,
      totalPages,
      visiblePages,
      searchProducts,
      resetFilters,
      selectedProduct,
      showProductDetail,
      addToProductLibrary,
      addToCompetitor,
      marketFilters,
      marketScore,
      marketScoreLabel,
      marketAdvice,
      marketData,
      analyzeMarket,
      keywordInput,
      keywordSite,
      keywordMode,
      keywordResults,
      wordBank,
      selectedWordBank,
      wordBankCategories,
      filteredWordBank,
      searchKeywords,
      expandKeywords,
      addToWordBank,
      removeFromWordBank,
      updateWordBankCategory,
      exportWordBank,
      importKeywords,
      reverseAsin,
      reverseResults,
      reverseKeyword,
      compareAsins,
      compareResults,
      newCompareAsin,
      addToCompare,
      compareKeywords,
      competitorList,
      selectedCompetitor,
      addCompetitorByAsin,
      selectCompetitor,
      removeCompetitor,
      reviewAsin,
      reviewCount,
      reviewAnalysis,
      reviewDistribution,
      reviewList,
      reviewVariants,
      analyzeReviews,
      storeUrl,
      monitoredStores,
      selectedStore,
      selectStore,
      addStore,
      removeStore,
      profit,
      profitResult,
      initProfitChart,
      listing,
      listingCoverage,
      titleTips,
      suggestedKeywords,
      checkListingCoverage,
      getKeywordScore,
      getFilledPercent,
      optimizeListing,
      initDashboardChart,
      initSalesTrendChart,
      initReviewCharts,
      exportData,
      formatNumber,
      truncate,
      getRatingBadgeClass,
      getRatingClass,
      getCoverageClass,
      getScoreClass,
      getMarketAdviceBadge,
      getCompetitionClass,
      getTrendClass,
      getTrendIcon,
      productLibrary,
      removeFromLibrary
    }
  }
})

app.mount('#app')
