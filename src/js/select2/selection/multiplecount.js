define([
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleCountSelection ($element, options) {
    MultipleCountSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleCountSelection, BaseSelection);

  MultipleCountSelection.prototype.render = function () {
    var $selection = MultipleCountSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  MultipleCountSelection.prototype.bind = function (container, $container) {
    var self = this;

    MultipleCountSelection.__super__.bind.apply(this, arguments);

    this.$selection.on('click', function (evt) {
      self.trigger('toggle', {
        originalEvent: evt
      });
    });
  };

  MultipleCountSelection.prototype.clear = function () {
    this.$selection.find('.select2-selection__rendered').empty();
  };

  MultipleCountSelection.prototype.display = function (data) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data));
  };

  MultipleCountSelection.prototype.update = function (data) {
    this.clear();

    var text = '';
    var maxSelectCount = this.options.get('maxSelectCount');

    if (data.length === 0) {
      text = 'Nothing selected';
    }
    else if (maxSelectCount == 'auto') {
      // TODO
    }
    else if (data.length > maxSelectCount) {
      text = data.length + ' items selected';
    }
    else {
      var items = [];
      for (var d = 0; d < data.length; d++) {
        var selection = data[d];

        var formatted = this.display(selection);

        items.push(formatted);
      }
      text = items.join(', ');
    }

    this.$selection.find('.select2-selection__rendered').text(text);
  };

  return MultipleCountSelection;
});
