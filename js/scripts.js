document.addEventListener("DOMContentLoaded", function () {
    let currentEngine = "bing"; // 默认搜索引擎

    const selectedEngineDiv = document.querySelector(".selected-engine");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const engineDropdown = document.querySelector(".dropdown");
    const searchInput = document.querySelector(".search-container input");
    const searchButton = document.querySelector(".search-container button");

    function updateSelectedIcon(engine) {
        let icon = "";
        switch (engine) {
            case "bing": icon = "/image/bing.svg"; break;
            case "baidu": icon = "/image/baidu.svg"; break;
            case "google": icon = "/image/google.svg"; break;
            case "so": icon = "/image/360.svg"; break;
            case "zhihu": icon = "/image/zhihu.svg"; break;
            case "sogou": icon = "/image/sogou.svg"; break;
            case "toutiao": icon = "/image/toutiao.svg"; break;
        }
        selectedEngineDiv.innerHTML = `<i class="${icon}"></i>`;
    }

    // 初始图标设置
    updateSelectedIcon(currentEngine);

    // 下拉菜单开关
    engineDropdown.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // 引擎选项点击
    document.querySelectorAll(".dropdown-menu li").forEach(li => {
        li.addEventListener("click", function (e) {
            e.stopPropagation();
            currentEngine = this.dataset.engine; // 更新当前引擎
            updateSelectedIcon(currentEngine);
            dropdownMenu.style.display = "none";
        });
    });

    // 回车键搜索
    searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") performSearch();
    });

    // 搜索按钮点击
    searchButton.addEventListener("click", performSearch);

    function performSearch() {
        const query = searchInput.value.trim();
        if (!query) return;

        let searchUrl = "";
        switch (currentEngine) {
            case "bing":
                searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
                break;
            case "baidu":
                searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
                break;
            case "google":
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                break;
            case "so":
                searchUrl = `https://www.so.com/s?q=${encodeURIComponent(query)}`;
                break;
            case "zhihu":
                searchUrl = `https://www.zhihu.com/search?q=${encodeURIComponent(query)}`;
                break;
            case "sogou":
                searchUrl = `https://www.sogou.com/web?query=${encodeURIComponent(query)}`;
                break;
            case "toutiao":
                searchUrl = `https://www.toutiao.com/search/?keyword=${encodeURIComponent(query)}`;
                break;
        }

        window.location.href = searchUrl;
    }
});