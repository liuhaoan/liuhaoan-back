!function(h){"use strict";var r=function(t,e){this.options=h.extend({},r.DEFAULTS,e),this.$target=h(this.options.target).on("scroll.bs.affix.data-api",h.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",h.proxy(this.checkPositionWithEventLoop,this)),this.$element=h(t),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};function i(o){return this.each(function(){var t=h(this),e=t.data("bs.affix"),i="object"==typeof o&&o;e||t.data("bs.affix",e=new r(this,i)),"string"==typeof o&&e[o]()})}r.VERSION="3.3.5",r.RESET="affix affix-top affix-bottom",r.DEFAULTS={offset:0,target:window},r.prototype.getState=function(t,e,i,o){var f=this.$target.scrollTop(),n=this.$element.offset(),s=this.$target.height();if(null!=i&&"top"===this.affixed)return f<i&&"top";if("bottom"===this.affixed)return null!=i?!(f+this.unpin<=n.top)&&"bottom":!(f+s<=t-o)&&"bottom";var a=null==this.affixed,h=a?f:n.top;return null!=i&&f<=i?"top":null!=o&&t-o<=h+(a?s:e)&&"bottom"},r.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(r.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},r.prototype.checkPositionWithEventLoop=function(){setTimeout(h.proxy(this.checkPosition,this),1)},r.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=this.$element.height(),e=this.options.offset,i=e.top,o=e.bottom,f=Math.max(h(document).height(),h(document.body).height());"object"!=typeof e&&(o=i=e),"function"==typeof i&&(i=e.top(this.$element)),"function"==typeof o&&(o=e.bottom(this.$element));var n=this.getState(f,t,i,o);if(this.affixed!==n){null!=this.unpin&&this.$element.css("top","");var s="affix"+(n?"-"+n:""),a=new h.Event(s+".bs.affix");if(this.$element.trigger(a),a.isDefaultPrevented())return;this.affixed=n,this.unpin="bottom"===n?this.getPinnedOffset():null,this.$element.removeClass(r.RESET).addClass(s).trigger(s.replace("affix","affixed")+".bs.affix")}"bottom"===n&&this.$element.offset({top:f-t-o})}};var t=h.fn.affix;h.fn.affix=i,h.fn.affix.Constructor=r,h.fn.affix.noConflict=function(){return h.fn.affix=t,this},h(window).on("load",function(){h('[data-spy="affix"]').each(function(){var t=h(this),e=t.data();e.offset=e.offset||{},null!=e.offsetBottom&&(e.offset.bottom=e.offsetBottom),null!=e.offsetTop&&(e.offset.top=e.offsetTop),i.call(t,e)})})}(jQuery);