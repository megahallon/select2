define([
  'jquery',
  '../utils'
], function ($, Utils) {
  function MultipleButtons () { }

  MultipleButtons.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $buttons = $(
      '<div class="btn-group btn-group-xs btn-group-justified" style="padding: 2px">' +
        '<button id="select2-selectall" ' +
        'class="btn btn-default" style="width:50%">' +
        'All</button>' +
        '<button id="select2-deselectall" ' +
        'class="btn tn-default" style="width:50%">' +
        'None</button>' +
      '</div>'
    );

    this.$buttons = $buttons;

    $rendered.prepend($buttons);

    return $rendered;
  };

  MultipleButtons.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    this.$buttons.find('#select2-selectall').click(function () {
//      self.$element.val([]).trigger('change');
      self.trigger('select:all');
    });
    this.$buttons.find('#select2-deselectall').click(function () {
//      self.$element.val([]).trigger('change');
      self.trigger('select:none');
    });
  };

  return MultipleButtons;
});
