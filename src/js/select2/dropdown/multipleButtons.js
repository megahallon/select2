define([
  'jquery',
  '../utils'
], function ($, Utils) {
  function MultipleButtons () { }

  MultipleButtons.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $buttons = $(
      '<div class="select2-multiple-buttons-group">' +
        '<button class="select2-selectall">All</button>' +
        '<button class="select2-deselectall">None</button>' +
      '</div>'
    );

    this.$buttons = $buttons;

    $rendered.prepend($buttons);

    return $rendered;
  };

  MultipleButtons.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$buttons.find('.select2-selectall').click(function () {
      var $options = container.$element.children();
      $options.each(function () {
        this.selected = false;
      });

      var $resultOptions = container.$results.find('li[role=treeitem]');
      $resultOptions.each(function () {
        $(this).data('data').element.selected = true;
      });
      container.$element.trigger('change');
      container.trigger('results:render');
    });
    this.$buttons.find('.select2-deselectall').click(function () {
      var $resultOptions = container.$results.find('li[role=treeitem]');
      $resultOptions.each(function () {
        $(this).data('data').element.selected = false;
      });
      container.$element.trigger('change');
      container.trigger('results:render');
    });
  };

  return MultipleButtons;
});
