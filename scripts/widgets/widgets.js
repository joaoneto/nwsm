'use strict';

angular.module('app.widgets.widgets', [
  'widgets.wg-pane',
  'widgets.wg-split-pane'
])


angular.module('widgets.wg-pane', [])
.directive('wgPane', function () {
  return {
    restrict: 'EC',
    link: function (scope, element, attrs) {
      element.find('.wg-col').each(function (i, el) {
        console.log(el)
        $(el).css({
          height: $(el).height(),
          width: $(el).width(),
        });
      });
    }
  };
});


angular.module('widgets.wg-split-pane', [])
.directive('wgSplitPane', function () {
  return {
    restrict: 'EC',
    link: function (scope, element, attrs) {
      var min = 30;
      var max = 120;
      var mainmin = 200;

      var original_cursor = $('html').css('cursor');

      var prev = $(element).prev();

      element.css({
        'min-height': attrs.vertical ? '4px' : '100%',
        'min-width': attrs.vertical ? '100%' : '4px',
        display: attrs.vertical ? 'block' : 'table-cell',
        cursor: attrs.vertical ? 'row-resize' : 'col-resize'
      });

      element.on('mousedown.wg-split', function (e) {
        e.preventDefault();

        $('html').css({ cursor: attrs.vertical ? 'row-resize' : 'col-resize' });

        console.log('mousedown.wg-split')

        $(document).on('mousemove.wg-split', function (e) {
          e.preventDefault();

          if (attrs.vertical) {
            var y = e.pageY - prev.offset().top;
            console.log(y)

            // if (/*y > min && y < max && */e.pageY < ($(window).width() - mainmin)) {
              prev.css("height", y);
            // }
          } else {
            var x = e.pageX - prev.offset().left;
            console.log(x, prev.offset().left)

            // if (/*x > min && x < max && */e.pageX < ($(window).width() - mainmin)) {
              prev.css("width", x);
            // }
          }

        });
      });

      $(document).on('mouseup.wg-split', function (e) {
        $('html').css({ cursor: original_cursor });

        console.log('mouseup.wg-split')
        $(document).off('mousemove.wg-split');
      });


      console.log('wgSplitPane link')
    }
  };
});
