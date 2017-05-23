import {
    getStyle
} from '../config/mUtils'
import {
    imgBaseUrl
} from '../config/env'
/**
 * 自动义指令
 */
export const loadMore = {
    directives: {
        'load-more': {
            bind: (el, binding) => {
                let windowHeight = window.screen.height;//屏幕高度
                let height;
                let setTop;
                let paddingBottom;
                let marginBottom;
                let requestFram;
                let oldScrollTop;
                let scrollEl;
                let heightEl;
                let scrollType = el.attributes.type && el.attributes.type.value;//获取type属性
                let scrollReduce = 2;
                if (scrollType == 2) {
                    scrollEl = el;
                    heightEl = el.children[0];
                } else {
                    scrollEl = document.body;//绑定的元素
                    heightEl = el;
                }
                el.addEventListener('touchstart', () => {
                    console.log('touchstart');
                    height = heightEl.clientHeight;//获取元素高度
                    if (scrollType == 2) {
                        height = height
                    }
                    setTop = el.offsetTop;//指 obj 距离上方或上层控件的位置，整型，单位像素
                    paddingBottom=getStyle(el,'paddingBottom');
                    marginBottom =getStyle(el,'marginBottom');
                },false);
                el.addEventListener('touchmove',() =>{
                    console.log("touchmove");
                    //loadMore();
                },false);
                el.addEventListener('touchend',()=>{
                    console.log("touchend");
                    moveEnd();
                },false);
                const moveEnd =()=>{
                    //执行动画
                    requestFram = requestAnimationFrame(()=>{
                        if(scrollEl.scrollTope !=oldScrollTop){
                            oldScrollTop = scrollEl.scrollTope;
                            moveEnd();
                        }else{
                            cancelAnimationFrame(requestFram);
                            height = heightEl.clientHeight;
                            loadMore();
                        }
                    });
                };
              
                const loadMore = () =>{
                    //scrolltype获取一个元素距离他容器顶部的像素距离
                    console.log((scrollEl.scrollTop+windowHeight)+":"+(height+setTop+paddingBottom+marginBottom-scrollReduce));
                    if(scrollEl.scrollTop+windowHeight>=height+setTop+paddingBottom+marginBottom-scrollReduce){
                      //执行绑定的函数
                        binding.value();
                    };
                }
            }
        }
    }
};

export const getImgPath ={
    methods:{
        getImgPath(path){
            let  suffix;
            if(!path){
                return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg';
            }
            if(path.indexOf('jpeg')!== -1){
                suffix ='.jpeg'
            }else{
                suffix ='.png'
            }
            let url ='/'+path.substr(0,1)+'/'+path.substr(1,2)+'/'+path.substr(3)+suffix;
            return imgBaseUrl+url;
        }
    }
}