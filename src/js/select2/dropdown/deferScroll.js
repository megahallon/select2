define([
  'jquery'
], function ($) {
  function DeferScroll (decorated, $element, options, dataAdapter) {
    decorated.call(this, $element, options, dataAdapter);
  }

  DeferScroll.prototype.append = function (decorated, data) {
    decorated.call(this, data);

    var maxlines = data.resultLength;
    var lines = this.$results.find('li').length;
    var fillerlines = maxlines - lines;
    this.$filler.height(30 * fillerlines);
  };

  DeferScroll.prototype.position = function (decorated, $results, $dropdown) {
    decorated.call(this, $results, $dropdown);

    var maxlines = this.options.get('data').length;
    var lines = $results.find('li').length;
    var fillerlines = maxlines - lines;

    var $resultsContainer = $dropdown.find('.select2-results');
    var $filler = $(
      '<span class="select2-filler" style="display:block"></span>');
    $resultsContainer.append($filler);
    $filler.height(30 * fillerlines);
    this.$filler = $filler;
  };

  DeferScroll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    var $oldscroller = this.$results.parent();
    $oldscroller.off('scroll');

    container.on('close', function () {
      self.trigger('results:all', {
        data: {results: []},
        query: {term: ''}
      });
    });

    var $scroller = this.$results.parent();
    $scroller.on('scroll', function () {
      var isLoadMoreVisible = $.contains(
        document.documentElement,
        self.$loadingMore[0]
      );

      if (self.loading || !isLoadMoreVisible) {
        return;
      }

      var currentOffset = $scroller.offset().top +
        $scroller.outerHeight(false);
      var loadingMoreOffset = self.$loadingMore.offset().top +
        self.$loadingMore.outerHeight(false);


      var page = Math.floor($scroller.scrollTop() / 30);

      if (currentOffset + 50 >= loadingMoreOffset) {
        self.loadMore(page);
      }
    });
  };

  DeferScroll.prototype.loadMore = function (_, page) {
    this.loading = true;

    var params = $.extend({}, {page: 1}, this.lastParams);

    params.lastpage = params.page;
    params.page = page;
    this.trigger('query:append', params);
  };

  return DeferScroll;
});
