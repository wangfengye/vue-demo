<template>
    <div id="resume" class="bg">
        <resume-style ref="styleEditor" :code="currentStyle"></resume-style>
        <resume-editor ref="resumeEditor" :markdown="currentMarkdown" :enableHtml="enableHtml"></resume-editor>
    
    </div>
</template>

<script>
import { getResumeStyle, getResumeContent } from 'src/service/getData'
import resumeEditor from '../components/resume/resume-editor.vue'
import resumeStyle from '../components/resume/resume-style.vue'
export default {
    data() {
        return {
            interval: 50,//打字时间间隔
            currentStyle: '',
            enableHtml: false,
            fullStyle: [],
            currentMarkdown: '',
            fullMarkdown: ``
        }
    },
    created() {

    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            await getResumeStyle().then(res =>
                this.fullStyle = res);
            await getResumeContent().then(res =>
                this.fullMarkdown = res);
            this.makeResume();
        },
        makeResume: async function () {
            await this.progressivelyShowStyle(0)
            await this.progressivelyShowResume()
            await this.progressivelyShowStyle(1)
            await this.showHtml()
            await this.progressivelyShowStyle(2)
        },
        showHtml: function () {
            return new Promise((resolve, reject) => {
                this.enableHtml = true
                resolve()
            })
        },
        progressivelyShowStyle(n) {
            return new Promise((resolve, reject) => {
                let interval = this.interval
                let showStyle = (async function () {
                    let style = this.fullStyle[n]//当前需要输入的字符串
                    if (!style) { return }
                    // 计算前 n 个 style 的字符总数
                    let length = this.fullStyle.filter((_, index) => index <= n).map((item) => item.length).reduce((p, c) => p + c, 0)//字符串集总长度
                    let prefixLength = length - style.length//该字符串未输入前,已有的长度
                    if (this.currentStyle.length < length) {
                        let l = this.currentStyle.length - prefixLength
                        let char = style.substring(l, l + 1) || ' '
                        this.currentStyle += char;
                        console.log(char + new Date().getSeconds())
                        if (style.substring(l - 1, l) === '\n' && this.$refs.styleEditor) {
                            this.$nextTick(() => {
                                this.$refs.styleEditor.goBottom()//滚动到底部
                            })
                        }
                        setTimeout(showStyle, interval)
                    } else {
                        resolve()
                    }
                }).bind(this)
                showStyle()
            })
        },
        progressivelyShowResume() {
            return new Promise((resolve, reject) => {
                let length = this.fullMarkdown.length
                let interval = this.interval
                let showResume = () => {
                    if (this.currentMarkdown.length < length) {
                        this.currentMarkdown = this.fullMarkdown.substring(0, this.currentMarkdown.length + 1)
                        let lastChar = this.currentMarkdown[this.currentMarkdown.length - 1]
                        let prevChar = this.currentMarkdown[this.currentMarkdown.length - 2]
                        console.log(prevChar)
                        if (prevChar === '\n' && this.$refs.resumeEditor) {
                            this.$nextTick(() => this.$refs.resumeEditor.goBottom())
                        }
                        setTimeout(showResume, interval)
                    } else {
                        resolve()
                    }
                }
                showResume()
            })
        }
    },

    components: {
        resumeStyle,
        resumeEditor
    }
}
</script>

<style scoped>
#resume {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    /*字体*/
    /*  -webkit-font-smoothing: antialiased;*/
    /*字体平滑*/
    /*    -moz-osx-font-smoothing: grayscale;*/
}

html {
    min-height: 100vh;
    /*相对于视窗的高度(1~100), 宽度 vw*/
}

span {
    color: white
}

* {
    -webkit-transition: all .3s;
    transition: all .3s;
    font-size: 14px;
}

</style>