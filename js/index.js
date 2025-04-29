// 搜索引擎配置数据集中管理
const searchEngines = [
  {
    slogan: "必应",
    action: "https://www.bing.com/search?q="
  },
  {
    slogan: "百度一下，你就知道",
    action: "http://www.baidu.com/s?wd="
  },
  {
    slogan: "Google",
    action: "https://www.google.com/search?q="
  },
  {
    slogan: "360搜索，SO靠谱",
    action: "https://www.so.com/s?q="
  },
  {
    slogan: "知乎",
    action: "https://www.zhihu.com/search?q="
  },
  {
    slogan: "搜狗搜索引擎 - 上网从搜狗开始",
    action: "https://www.sogou.com/web?query="
  },
  {
    slogan: "今日头条",
    action: "https://www.toutiao.com/search?keyword="
  }
];

// DOM 元素缓存
const dom = {
  tabs: document.querySelectorAll(".tab_title span"),
  input: document.querySelector(".search_input"),
  title: document.querySelector("title"),
  // 假设有一个搜索按钮（如果没有，需在HTML中添加）
  searchButton: document.querySelector(".search_button") 
};

// 当前选中的搜索引擎索引
let currentEngineIndex = 0;

// 初始化函数
function init() {
  // 设置默认选中第一个标签
  dom.tabs[0]?.classList.add('select');
  dom.tabs.forEach(tab => tab.classList.add('none'));
  dom.tabs[0]?.classList.replace('none', 'select');

  // 绑定标签切换事件
  showSearch();
  
  // 绑定搜索事件（按钮点击或回车键）
  bindSearchEvent();
}

// 标签切换逻辑
function showSearch() {
  dom.tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // 清除所有标签的选中状态
      dom.tabs.forEach(t => {
        t.classList.add('none');
        t.classList.remove('select');
      });

      // 设置当前选中状态
      tab.classList.remove('none');
      tab.classList.add('select');

      // 更新当前搜索引擎
      currentEngineIndex = index;
      changeSearch(index);
    });
  });
}

// 更新搜索界面
function changeSearch(index) {
  const { slogan } = searchEngines[index];
  const { textContent: tabName } = dom.tabs[index];

  // 更新页面元素
  dom.title.textContent = slogan;
  dom.input.placeholder = `${tabName}搜索`;
}

// 绑定搜索事件（按钮点击 + 回车键）
function bindSearchEvent() {
  // 点击搜索按钮触发搜索
  if (dom.searchButton) {
    dom.searchButton.addEventListener("click", triggerSearch);
  }

  // 回车键触发搜索
  dom.input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  });
}

// 触发搜索逻辑
function triggerSearch() {
  const searchText = dom.input.value.trim();
  if (searchText) {
    const searchUrl = searchEngines[currentEngineIndex].action + encodeURIComponent(searchText);
    // 在新标签页打开
    window.open(searchUrl, "_blank");
  }
}

// 在DOM加载完成后初始化
document.addEventListener("DOMContentLoaded", init);