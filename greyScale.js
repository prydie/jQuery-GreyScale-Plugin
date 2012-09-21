/*
 *  jQuery $.greyScale Plugin v0.3
 *  Written by Andrew Pryde (www.pryde-design.co.uk)
 *  Date: Mon 1 Aug 2011
 *  Licence: MIT Licence
 *
 *  Copyright (c) 2011 Andrew Pryde
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of this
 *  software and associated documentation files (the "Software"), to deal in the Software
 *  without restriction, including without limitation the rights to use, copy, modify, merge,
 *  publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 *  to whom the Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all copies or
 *  substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 *  BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 *  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($){

  /**
   * Returns <canvas> elements containing greyscale version of images in the selector
   */
  $.fn.getGSCanvas = function() {
    var canvasSupported = !!document.createElement("canvas").getContext;
    if (!canvasSupported)
      throw "<canvas> not supported";

    $ret = $();
    this.each(function(index) {
      $this = $(this);

      if (!$this.is('img'))
        return true;

      var width = $this.width() || this.width;
      var height = $this.height() || this.height;
      var image = $this[0];

      $can = $('<canvas>')
        .css({
          'display' : 'block',
          'left' : '0',
          'position' : 'absolute',
          'top' : '0'
        })
        .attr({
          'width': width,
          'height': height
        });

      ctx = $can[0].getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);

      imageData = ctx.getImageData(0, 0,  width, height);
      px = imageData.data;

      for (i = 0; i < px.length; i+= 4) {
        grey = px[i] * 0.3 + px[i+1] * 0.59 + px[i+2] * 0.11;
        px[i] = px[i+1] = px[i+2] = grey;
      }
      ctx.putImageData(imageData, 0, 0);
      $ret = $ret.add($can);
    });

    return $ret;
  };

  /**
   * Wraps an image in a <div> and inserts a grey-scale version of that image
   * into the same <div>. Handles cross-origin requests.
   * @param  {array} args  jQuery arguments array
   */
  $.fn.greyScale = function(args) {
    var canvasSupported = !!document.createElement("canvas").getContext;
    if (!canvasSupported)
      throw "<canvas> not supported";

    $options = $.extend({
      hide : false,
      opacity : 1
    }, args);

    this.each(function(index) {
      $this = $(this);
      $gsWrapper = $this
        .wrap('<div class="gsWrapper">')
        .parent()
        .css({
          'position' : 'relative',
          'display' : 'inline-block'
        });

      if (window.location.hostname !== this.src.split('/')[2]) {
        // If the image is on a different domain proxy the request
       $.getImageData({
          url: $this.attr('src'),
          success: $.proxy(function(image) {
            $can = $(image).getGSCanvas();

            $can.css({
              'opacity' : $options.opacity,
              'display' : ($options.hide) ? 'none' : 'block'
            });

            $can.appendTo($gsWrapper);
          }, $gsWrapper),
          error: function(xhr, text_status) {
            // do nothing
          }
        });
      } else {
        $can = $(this).getGSCanvas();

        $can.css({
          'opacity' : $options.opacity,
          'display' : ($options.hide) ? 'none' : 'block'
        });

        $can.appendTo($gsWrapper);
      }
    });
  };
})( jQuery );

// $.getImageData() (https://github.com/betamax/getImageData)
(function(X,U){function y(){}function c(d){R=[d]}function V(d,g,f){return d&&d.apply(g.context||g,f)}function s(B){function u(J){!q++&&U(function(){p();l&&(G[x]={s:[J]});z&&(J=z.apply(B,[J]));V(B.success,B,[J,k]);V(g,B,[B,k])},0)}function t(J){!q++&&U(function(){p();l&&J!=N&&(G[x]=J);V(B.error,B,[B,J]);V(g,B,[B,J])},0)}B=X.extend({},E,B);var g=B.complete,z=B.dataFilter,d=B.callbackParameter,I=B.callback,r=B.cache,l=B.pageCache,H=B.charset,x=B.url,w=B.data,C=B.timeout,f,q=0,p=y;B.abort=function(){!q++&&p()};if(V(B.beforeSend,B,[B])===false||q){return B}x=x||F;w=w?typeof w=="string"?w:X.param(w,B.traditional):F;x+=w?(/\?/.test(x)?"&":"?")+w:F;d&&(x+=(/\?/.test(x)?"&":"?")+encodeURIComponent(d)+"=?");!r&&!l&&(x+=(/\?/.test(x)?"&":"?")+"_"+(new Date).getTime()+"=");x=x.replace(/=\?(&|$)/,"="+I+"$1");l&&(f=G[x])?f.s?u(f.s[0]):t(f):U(function(J,K,L){if(!q){L=C>0&&U(function(){t(N)},C);p=function(){L&&clearTimeout(L);J[v]=J[D]=J[o]=J[A]=null;W[n](J);K&&W[n](K)};window[I]=c;J=X(m)[0];J.id=j+b++;if(H){J[a]=H}var M=function(O){(J[D]||y)();O=R;R=undefined;O?u(O[0]):t(i)};if(h.msie){J.event=D;J.htmlFor=J.id;J[v]=function(){/loaded|complete/.test(J.readyState)&&M()}}else{J[A]=J[o]=M;h.opera?(K=X(m)[0]).text="jQuery('#"+J.id+"')[0]."+A+"()":J[e]=e}J.src=x;W.insertBefore(J,W.firstChild);K&&W.insertBefore(K,W.firstChild)}},0);return B}var e="async",a="charset",F="",i="error",j="_jqjsp",D="onclick",A="on"+i,o="onload",v="onreadystatechange",n="removeChild",m="<script/>",k="success",N="timeout",h=X.browser,W=X("head")[0]||document.documentElement,G={},b=0,R,E={callback:j,url:location.href};s.setup=function(d){X.extend(E,d)};X.jsonp=s})(jQuery,setTimeout);(function(a){a.getImageData=function(c){var d=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;if(c.url){var e=location.protocol==="https:";var b="";if(c.server&&d.test(c.server)&&(c.server.indexOf("https:")&&(e||c.url.indexOf("https:")))){b=c.server}else{b="//img-to-json.appspot.com/"}b+="?callback=?";a.jsonp({url:b,data:{url:escape(c.url)},dataType:"jsonp",timeout:10000,success:function(h,f){var g=new Image();a(g).load(function(){this.width=h.width;this.height=h.height;if(typeof(c.success)==typeof(Function)){c.success(this)}}).attr("src",h.data)},error:function(g,f){if(typeof(c.error)==typeof(Function)){c.error(g,f)}}})}else{if(typeof(c.error)==typeof(Function)){c.error(null,"no_url")}}}})(jQuery);
