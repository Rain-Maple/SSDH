// 响应式核心控制器
class ResponsiveEngine {
  constructor() {
    this.baseWidth = 640; // 设计稿基准宽度 (iPhone 13 mini)
    this.elements = new Map(); // 需要响应的元素池
    this.init();
  }

  // 初始化方法
  init() {
    this.setViewport();
    this.bindEvents();
    this.autoDetectElements();
    this.updateLayout();
  }

  // 动态设置 viewport
  setViewport() {
    const dpr = window.devicePixelRatio || 1;
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = `width=device-width, initial-scale=${1/dpr}, maximum-scale=${1/dpr}, user-scalable=no`;
    document.head.prepend(meta);
  }

  // 自动检测带 data-responsive 属性的元素
  autoDetectElements() {
    document.querySelectorAll('[data-responsive]').forEach(el => {
      const type = el.dataset.responsive;
      this.registerElement(el, type);
    });
  }

  // 注册响应元素
  registerElement(element, type = 'width') {
    const originalSize = {
      width: element.offsetWidth,
      height: element.offsetHeight,
      fontSize: parseFloat(getComputedStyle(element).fontSize)
    };
    this.elements.set(element, { type, originalSize });
  }

  // 核心布局计算
  calculateLayout() {
    const screenWidth = window.innerWidth;
    const scaleFactor = screenWidth / this.baseWidth;
    
    return Array.from(this.elements.entries()).map(([element, config]) => {
      const { type, originalSize } = config;
      return { element, type, originalSize, scaleFactor };
    });
  }

  // 应用布局更新
  applyLayoutUpdates(calculations) {
    calculations.forEach(({ element, type, originalSize, scaleFactor }) => {
      switch(type) {
        case 'full':
          element.style.width = `${window.innerWidth}px`;
          element.style.height = `${window.innerHeight}px`;
          break;
          
        case 'width':
          element.style.width = `${originalSize.width * scaleFactor}px`;
          element.style.fontSize = `${originalSize.fontSize * scaleFactor}px`;
          break;
          
        case 'height':
          element.style.height = `${originalSize.height * scaleFactor}px`;
          break;
          
        default:
          element.style.transform = `scale(${scaleFactor})`;
      }
    });
  }

  // 更新布局
  updateLayout() {
    const calculations = this.calculateLayout();
    this.applyLayoutUpdates(calculations);
  }

  // 事件绑定
  bindEvents() {
    const debouncedUpdate = this.debounce(() => this.updateLayout(), 100);
    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', debouncedUpdate);
  }

  // 防抖函数
  debounce(fn, delay) {
    let timer;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
  window.ResponsiveController = new ResponsiveEngine();
});