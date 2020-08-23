!function(){function e(){if(!e._executed){var t,o=parcelRequire("79wSh"),n={},r={popupContent:{tooltip:{position:"absolute",zIndex:"2",width:"200px",background:"rgb(255, 255, 255)",border:"1px solid rgb(187, 187, 187)",boxShadow:"rgba(0, 0, 0, 0.2) 0px 1px 3px",padding:"5px"},modal:{position:"relative",background:"rgb(255, 255, 255)",width:"50%",margin:"auto",border:"1px solid rgb(187, 187, 187)",padding:"5px"}},popupArrow:{height:"10px",width:"10px",position:"absolute",background:"rgb(255, 255, 255)",transform:"rotate(45deg)",margin:"-5px",zIndex:"-1",boxShadow:"rgba(0, 0, 0, 0.2) 1px 1px 1px"},overlay:{tooltip:{position:"fixed",top:"0",bottom:"0",left:"0",right:"0"},modal:{position:"fixed",top:"0",bottom:"0",left:"0",right:"0",background:"rgba(0, 0, 0,0.5)",display:"flex",zIndex:"999"}}},i=["top left","top center","top right","right top","right center","right bottom","bottom left","bottom center","bottom right","left top","left center","left bottom","center center"],s=(t=o())&&t.__esModule?t.default:t,a=function(e){function t(e){var o,n,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,a=u(t).call(this,e),o=!a||"object"!=typeof a&&"function"!=typeof a?d(n):a,p(d(o),"repositionOnResize",(function(){o.setPosition()})),p(d(o),"onEscape",(function(e){"Escape"===e.key&&o.closePopup()})),p(d(o),"lockScroll",(function(){var e=o.props.lockScroll;o.state.modal&&e&&(document.getElementsByTagName("body")[0].style.overflow="hidden")})),p(d(o),"resetScroll",(function(){var e=o.props.lockScroll;o.state.modal&&e&&(document.getElementsByTagName("body")[0].style.overflow="auto")})),p(d(o),"togglePopup",(function(e){e.persist(),o.state.isOpen?o.closePopup(e):o.openPopup(e)})),p(d(o),"openPopup",(function(e){var t=o.props,n=t.disabled,r=t.onOpen;o.state.isOpen||n||(r(e),o.setState({isOpen:!0},(function(){o.setPosition(),o.lockScroll()})))})),p(d(o),"closePopup",(function(e){var t=o.props.onClose;o.state.isOpen&&(t(e),o.setState({isOpen:!1},(function(){o.resetScroll()})))})),p(d(o),"onMouseEnter",(function(){clearTimeout(o.timeOut);var e=o.props.mouseEnterDelay;o.timeOut=setTimeout((function(){return o.openPopup()}),e)})),p(d(o),"onMouseLeave",(function(){clearTimeout(o.timeOut);var e=o.props.mouseLeaveDelay;o.timeOut=setTimeout((function(){return o.closePopup()}),e)})),p(d(o),"getTooltipBoundary",(function(){var e=o.props.keepTooltipInside,t={top:0,left:0,width:window.innerWidth,height:window.innerHeight};if("string"==typeof e){var n=document.querySelector(e);0,t=n.getBoundingClientRect()}return t})),p(d(o),"setPosition",(function(){var e=o.state,t=e.modal,n=e.isOpen;if(!t&&n){var r=o.props,s=r.arrow,a=r.position,l=r.offsetX,p=r.offsetY,c=r.keepTooltipInside,u=r.arrowStyle,f=r.className,d=o.HelperEl.getBoundingClientRect(),y=o.TriggerEl.getBoundingClientRect(),m=o.ContentEl.getBoundingClientRect(),w=o.getTooltipBoundary(),b=Array.isArray(a)?a:[a];(c||Array.isArray(a))&&(b=[].concat(g(b),i));var v=function(e,t,o,n,r,i){for(var s,a=r.offsetX,l=r.offsetY,p=0;p<o.length;){var c={top:(s=h(e,t,o[p],n,{offsetX:a,offsetY:l})).top,left:s.left,width:t.width,height:t.height};if(!(c.top<=i.top||c.left<=i.left||c.top+c.height>=i.top+i.height||c.left+c.width>=i.left+i.width))break;p++}return s}(y,m,b,s,{offsetX:l,offsetY:p},w);o.ContentEl.style.top="".concat(v.top-d.top,"px"),o.ContentEl.style.left="".concat(v.left-d.left,"px"),s&&(o.ArrowEl.style.transform=v.transform,o.ArrowEl.style["-ms-transform"]=v.transform,o.ArrowEl.style["-webkit-transform"]=v.transform,o.ArrowEl.style.top=u.top||v.arrowTop,o.ArrowEl.style.left=u.left||v.arrowLeft,o.ArrowEl.classList.add("popup-arrow"),""!==f&&o.ArrowEl.classList.add("".concat(f,"-arrow"))),"static"!==window.getComputedStyle(o.TriggerEl,null).getPropertyValue("position")&&""!==window.getComputedStyle(o.TriggerEl,null).getPropertyValue("position")||(o.TriggerEl.style.position="relative")}})),p(d(o),"addWarperAction",(function(){var e=o.props,t=e.contentStyle,n=e.className,i=e.on,s=o.state.modal,a=s?r.popupContent.modal:r.popupContent.tooltip,l={className:"popup-content ".concat(""!==n?"".concat(n,"-content"):""),style:Object.assign({},a,t),ref:o.setContentRef,onClick:function(e){e.stopPropagation()}};return!s&&i.indexOf("hover")>=0&&(l.onMouseEnter=o.onMouseEnter,l.onMouseLeave=o.onMouseLeave),l})),p(d(o),"renderTrigger",(function(){for(var e={key:"T",ref:o.setTriggerRef},t=o.props,n=t.on,r=t.trigger,i=o.state.isOpen,a=Array.isArray(n)?n:[n],l=0,p=a.length;l<p;l++)switch(a[l]){case"click":e.onClick=o.togglePopup;break;case"hover":e.onMouseEnter=o.onMouseEnter,e.onMouseLeave=o.onMouseLeave;break;case"focus":e.onFocus=o.onMouseEnter}return"function"==typeof r?!!r&&s.cloneElement(r(i),e):!!r&&s.cloneElement(r,e)})),p(d(o),"renderContent",(function(){var e=o.props,t=e.arrow,n=e.arrowStyle,i=e.children,a=o.state,l=a.modal,p=a.isOpen;return s.createElement("div",c({},o.addWarperAction(),{key:"C"}),t&&!l&&s.createElement("div",{ref:o.setArrowRef,style:Object.assign({},r.popupArrow,n)}),"function"==typeof i?i(o.closePopup,p):i)})),o.setTriggerRef=function(e){return o.TriggerEl=e},o.setContentRef=function(e){return o.ContentEl=e},o.setArrowRef=function(e){return o.ArrowEl=e},o.setHelperRef=function(e){return o.HelperEl=e},o.timeOut=0;var l=e.open,f=e.modal,y=e.defaultOpen,m=e.trigger;return o.state={isOpen:l||y,modal:!!f||!m},o}var o,n,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,e),o=t,(n=[{key:"componentDidMount",value:function(){var e=this.props,t=e.closeOnEscape,o=e.defaultOpen,n=e.repositionOnResize;o&&this.setPosition(),t&&window.addEventListener("keyup",this.onEscape),n&&window.addEventListener("resize",this.repositionOnResize)}},{key:"componentDidUpdate",value:function(e){var t=this.props,o=t.open,n=t.disabled,r=this.state.isOpen;e.open!==o&&(o?this.openPopup():this.closePopup(void 0,!0)),e.disabled!==n&&n&&r&&this.closePopup()}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeOut);var e=this.props,t=e.closeOnEscape,o=e.repositionOnResize;t&&window.removeEventListener("keyup",this.onEscape),o&&window.removeEventListener("resize",this.repositionOnResize),this.resetScroll()}},{key:"render",value:function(){var e=this.props,t=e.overlayStyle,o=e.closeOnDocumentClick,n=e.className,i=e.on,a=(e.trigger,this.state),l=a.modal,p=a.isOpen,c=p&&!(i.indexOf("hover")>=0),u=l?r.overlay.modal:r.overlay.tooltip;return[this.renderTrigger(),p&&s.createElement("div",{key:"H",style:{position:"absolute",top:"0px",left:"0px"},ref:this.setHelperRef}),c&&s.createElement("div",{key:"O",className:"popup-overlay ".concat(""!==n?"".concat(n,"-overlay"):""),style:Object.assign({},u,t),onClick:o?this.closePopup:void 0},l&&this.renderContent()),p&&!l&&this.renderContent()]}}])&&l(o.prototype,n),a&&l(o,a),t}(s.PureComponent);p(a,"defaultProps",{trigger:null,onOpen:function(){},onClose:function(){},defaultOpen:!1,open:!1,disabled:!1,closeOnDocumentClick:!0,repositionOnResize:!0,closeOnEscape:!0,on:["click"],contentStyle:{},arrowStyle:{},overlayStyle:{},className:"",position:"bottom center",modal:!1,lockScroll:!1,arrow:!0,offsetX:0,offsetY:0,mouseEnterDelay:100,mouseLeaveDelay:100,keepTooltipInside:!1}),n.default=a,parcelRequire.register("1XGhg",(function(){return n})),e._executed=!0}function l(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function p(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e}).apply(this,arguments)}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e){return function(e){if(Array.isArray(e)){for(var t=0,o=new Array(e.length);t<e.length;t++)o[t]=e[t];return o}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function h(e,t,o,n,r){var i=r.offsetX,s=r.offsetY,a=n?8:0,l=o.split(" "),p=e.top+e.height/2,c=e.left+e.width/2,u=t.height,f=t.width,d=p-u/2,g=c-f/2,h="",y="0%",m="0%";switch(l[0]){case"top":d-=u/2+e.height/2+a,h="rotate(45deg)",y="100%",m="50%";break;case"bottom":d+=u/2+e.height/2+a,h="rotate(225deg)",m="50%";break;case"left":g-=f/2+e.width/2+a,h=" rotate(-45deg)",m="100%",y="50%";break;case"right":g+=f/2+e.width/2+a,h="rotate(135deg)",y="50%"}switch(l[1]){case"top":d=e.top,y="".concat(e.height/2,"px");break;case"bottom":d=e.top-u+e.height,y="".concat(u-e.height/2,"px");break;case"left":g=e.left,m="".concat(e.width/2,"px");break;case"right":g=e.left-f+e.width,m="".concat(f-e.width/2,"px")}return{top:d="top"===l[0]?d-s:d+s,left:g="left"===l[0]?g-i:g+i,transform:h,arrowLeft:m,arrowTop:y}}}for(var t=["1XGhg"],o=0;o<t.length;o++)parcelRequire.registerBundle(t[o],e)}();
//# sourceMappingURL=reactjs-popup.es.59d7aee1.js.map