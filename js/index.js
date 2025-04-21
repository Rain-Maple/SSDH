//时间&日期
window.onload = function() {
	var item_index = -1;
	var item_array = [];
	setInterval(showTime, 500);
	showSearch();
	inputAction();
	take_advice();
}

function showTime() {
	var date = document.getElementById("show_date");
	var week = document.getElementById("show_week");
	var time = document.getElementById("show_time");
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var weeks = ["天", "一", "二", "三", "四", "五", "六"];
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	hour = (hour >= 10) ? hour : "0" + hour;
	minute = (minute >= 10) ? minute : "0" + minute;
	second = (second >= 10) ? second : "0" + second;

	var date_str = year + "年" + month + "月" + day + "日";
	var week_str = "星期" + weeks[now.getDay()];
	var time_str = hour + ":" + minute + ":" + second;

	date.innerHTML = date_str + week_str;
	time.innerHTML = time_str;
}

// 搜索引擎配置数据集中管理
const searchEngines = [
  {
    slogan: "必应",
    action: "https://cn.bing.com/search",
    paramKey: "q",
    hidden: { name: "", value: "n" }
  },
  {
    slogan: "百度一下，你就知道",
    action: "http://www.baidu.com/s",
    paramKey: "wd",
    hidden: { name: "ie", value: "utf-8" }
  },
  {
    slogan: "Google",
    action: "https://www.google.com/search",
    paramKey: "query",
    hidden: { name: "qs", value: "n" }
  },
  {
    slogan: "360搜索，SO靠谱",
    action: "https://www.so.com/s",
    paramKey: "q",
    hidden: { name: "ie", value: "utf-8" }
  },
  {
    slogan: "知乎",
    action: "https://www.zhihu.com/search",
    paramKey: "q",
    hidden: { name: "", value: "" }
  },
  {
    slogan: "搜狗搜索引擎 - 上网从搜狗开始",
    action: "https://www.sogou.com/web",
    paramKey: "query",
    hidden: { name: "ie", value: "utf8" }
  },
		{
    slogan: "今日头条",
    action: "https://www.toutiao.com/search",
    paramKey: "query",
    hidden: { name: "ie", value: "utf8" }
  }
];

// DOM 元素缓存
const dom = {
  tabs: document.querySelectorAll(".tab_title span"),
  form: document.querySelector(".search_box"),
  hidden: document.querySelector(".search_hidden"),
  input: document.querySelector(".search_input"),
  title: document.querySelector("title")
};

// 切换搜索标签功能
function showSearch() {
  dom.tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      // 切换选中状态
      document.querySelector(".tab_title span.select")?.classList.replace("select", "none");
      tab.classList.replace("none", "select");
      
      // 更新搜索配置
      changeSearch(index);
    });
  });
}

// 更新搜索表单功能
function changeSearch(index) {
  const { slogan, action, paramKey, hidden } = searchEngines[index];
  const { textContent: tabName } = dom.tabs[index];

  // 更新页面元素
  dom.title.textContent = slogan;
  dom.input.placeholder = `${tabName}搜索`;
  
  // 更新表单属性
  dom.form.action = action;
  dom.input.name = paramKey;
  dom.hidden.name = hidden.name;
  dom.hidden.value = hidden.value;
}

// 模块私有变量
let itemIndex = -1;
let itemArray = [];

const inputAction = () => {
    const BAIDU_API = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=#CONTENT#&cb=window_baidu_sug";
    const searchInput = document.querySelector(".search_input");
    
    const handleInput = () => {
        const inputValue = searchInput.value;
        if (inputValue.length >= 24) return;

        const existingScript = document.getElementById("baidu_script");
        existingScript?.parentNode.removeChild(existingScript);

        const script = document.createElement("script");
        script.id = "baidu_script";
        script.src = BAIDU_API.replace("#CONTENT#", encodeURIComponent(inputValue));
        document.head.appendChild(script);
    };

    searchInput.addEventListener("input", handleInput);
};

// 必须保持全局函数
window.window_baidu_sug = (result) => {
    const suggestions = result.s || [];
    const searchInput = document.querySelector(".search_input");
    const resultContainer = document.querySelector(".search_result");
    const resultItems = Array.from(document.querySelectorAll(".result_item"));
    const inputValue = searchInput.value.trim();

    // 重置样式
    resultItems.forEach(item => item.style.background = "none");

    if (suggestions.length === 0) {
        resultContainer.style.display = "none";
        return;
    }

    resultContainer.style.display = "block";
    itemArray = [];

    resultItems.forEach((item, index) => {
        if (index >= suggestions.length) {
            item.style.display = "none";
            return;
        }

        const suggestion = suggestions[index];
        const matchIndex = suggestion.indexOf(inputValue);
       const formattedText = `
            <img src="image/fangdajing.svg" class="suggestion-icon">
            ${matchIndex >= 0 
                ? `${inputValue}${suggestion.slice(matchIndex + inputValue.length)}`
                : suggestion}
        `;

        item.innerHTML = formattedText;
        item.style.display = "block";
        itemArray.push(suggestion);
    });

    itemArray.push(inputValue);
    itemIndex = -1;
};

const takeAdvice = () => {
    const searchInput = document.querySelector(".search_input");
    const submitButton = document.querySelector(".search_submit");
    const resultContainer = document.querySelector(".search_result");
    const resultItems = Array.from(document.querySelectorAll(".result_item"));

    const clearStyles = () => {
        resultItems.forEach(item => item.style.background = "none");
    };

    const handleItemClick = (event) => {
        searchInput.value = event.target.textContent;
        submitButton.click();
    };

    const handleKeyEvents = (event) => {
        if (!["ArrowUp", "ArrowDown", "Escape"].includes(event.key)) return;
        
        if (event.key === "Escape") {
            resultContainer.style.display = "none";
            return;
        }

        event.preventDefault();
        clearStyles();

        const direction = event.key === "ArrowUp" ? -1 : 1;
        itemIndex = (itemArray.length + itemIndex + direction) % itemArray.length;
        searchInput.value = itemArray[itemIndex];

        const targetItem = resultItems[itemIndex];
        if (targetItem) targetItem.style.background = "#eee";
    };

    resultItems.forEach((item, index) => {
        item.dataset.index = index;
        item.addEventListener("click", handleItemClick);
        item.addEventListener("mouseover", () => {
            clearStyles();
            itemIndex = index;
            item.style.background = "#eee";
        });
        item.addEventListener("mouseout", clearStyles);
    });

    document.addEventListener("click", () => {
        resultContainer.style.display = "none";
    });

    document.addEventListener("keydown", handleKeyEvents);
};

// 初始化
inputAction();
takeAdvice();

// 天气
WIDGET = {
    "CONFIG": {
        "modules": "01234",
        "background": "5",
        "tmpColor": "ffffff",
        "tmpSize": "16",
        "cityColor": "ffffff",
        "citySize": "16",
        "aqiColor": "ffffff",
        "aqiSize": "16",
        "weatherIconSize": "24",
        "alertIconSize": "18",
        "padding": "10px 10px 10px 10px",
        "shadow": "0",
        "language": "auto",
        "fixed": "true",
        "vertical": "top",
        "horizontal": "left",
        "left": "15",
        "top": "10",
        "key": "3fb5fa3fa5ce46feb8f1a00e2ea7534f"
    }
}
