<template>
  <div class="styleEditor" ref="container">
    <div class="code" v-html="codeInStyleTag"></div>
    <pre class="" v-html="highlightedCode"></pre><!--pre 元素可定义预格式化的文本-->
  </div>
</template>

<script>
  import Prism from 'prismjs'
  export default {
    name: 'Editor',
    props: ['code'],
    computed: {
      highlightedCode: function () {
        return Prism.highlight(this.code, Prism.languages.css)
        //return this.code
      },
      codeInStyleTag: function () {
        return `<style>${this.code}</style>`
      }
    },
    methods: {
      goBottom() {
        this.$refs.container.scrollTop = 100000
      }
    }
  }
</script>

<style scoped>
  .code {
    display: none;
  }
</style>