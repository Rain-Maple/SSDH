document.addEventListener('DOMContentLoaded', () => {
    // 常量提升 + 箭头函数
    const pad = n => `${n}`.padStart(2, '0');
    const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];
    
    // 解构时间对象
    const getTimeData = () => {
        const now = new Date();
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1, // 月份数值不补零
            day: now.getDate(),
            weekDay: WEEK_DAYS[now.getDay()],
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds()
        };
    };

    // DOM 元素缓存（现代 API 选择）
    const els = {
        date: document.querySelector('#show_date'), // 改用 querySelector
        time: document.querySelector('#show_time')
    };

    // 渲染逻辑
    const render = () => {
        const { year, month, day, weekDay, hours, minutes, seconds } = getTimeData();
        
        // 模板字符串多行排版
        els.date.textContent = `${year}年${month}月${day}日 星期${weekDay}`;
        els.time.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    // 使用逻辑与运算符初始化
    render();
    setInterval(render, 1000);
});