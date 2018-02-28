export const style = [
    `
/*
 * 简历__王枫
 */


/* 首先给所有元素加上过渡效果 */

* {
    -webkit-transition: all .3s;
    transition: all .3s;
}


/* 代码高亮 */

.token.selector {
    color: rgb(133, 153, 0);
}

.token.property {
    color: rgb(187, 137, 0);
}

.token.punctuation {
    color: yellow;
}

.token.function {
    color: rgb(42, 161, 152);
}

.token.comment {
    color: rgb(222, 222, 222)
}


/* 文字离边框太近了 */

.styleEditor {
    color: rgb(222, 222, 222);
    background: rgb(0, 43, 54);
    padding: .5em;
    border: 1px outset;
    /*邊框,粗細,樣式 */
    margin: .5em;
    overflow: auto;
    width: 45vw;
    height: 90vh;
}


/* 加点 3D 效果呗 */

html {
    -webkit-perspective: 1000px;
    perspective: 1000px;
}

.styleEditor {
    position: fixed;
    left: .5em;
    top: .5em;
    -webkit-transition: none;/*過渡動畫*/
    transition: none;
      rotateY(10deg) translateZ(-100px);
    transform: rotateY(10deg) translateZ(-100px);
    /**
     * translate 平移
     */
}


/* 接下来我给自己准备一个编辑器 */

.resumeEditor {
    position: fixed;
    right: 0;
    top: 0;
    padding: .5em;
    margin: .5em;
    width: 48vw;
    height: 90vh;
    border: 1px solid;
    background: white;
    color: #222;
    overflow: auto;
}


/* 好了，我开始写简历了 */
`,
    `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
    `
    ,
    `
/* 再对 HTML 加点样式 */

.resumeEditor {
	padding: 2em;
}

.resumeEditor h2 {
	display: inline - block;
	border-bottom: 1px solid;
	margin: 1em 0 .5em;
}

.resumeEditor ul,
.resumeEditor ol {
	list-style: none;
}

.resumeEditor ul>li::before {
	content: '•';
	margin-right: .5em;
}

.resumeEditor ol {
	counter-reset: section;
}

.resumeEditor ol li::before {
	counter-increment: section;
	content: counters(section, ".") " ";
	margin-right: .5em;
}
/**
 * counter-increment : section 設置 該標籤的计数器;(需在父标签中设置 counter-reset 属性后使用)
 */

.resumeEditor blockquote {
	margin: 1em;
	padding: .5em;
	background: #ddd;
}
`];
export const content = `王枫
----
资深前端工程师，资深前端讲师，现在在 爱赛德共作。
技能
----
* 前端开发
* Rails 开发
* Node.js 开发
* android 开发
工作经历
----
1. 高博
2. 爱赛德

链接
----

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/wangfengye/vue-demo)，打造你自己的简历！
`;