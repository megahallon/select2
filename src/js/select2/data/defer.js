define([
  './array',
  '../utils',
  'jquery'
], function (ArrayData, Utils, $) {
  function DeferDataAdapter($element, options) {
    DeferDataAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(DeferDataAdapter, ArrayData);

  DeferDataAdapter.prototype.convertToOptions = function (callback) {
  };

  DeferDataAdapter.prototype.current = function (callback) {
    var found = [];
    var selected = this.$element.val();
    var data = this.options.get('data');
    var initialValue = this.options.get('initialValue');

    if (initialValue !== null) {
      selected = initialValue;
      this.options.set('initialValue', null);
    }
    else if (selected === null) {
      selected = data[0];
    }
    if (!$.isArray(selected)) {
      selected = [selected];
    }
    var options = [];
    for (var s = 0; s < selected.length; ++s) {
      found.push({id: selected[s], text: selected[s]});
      options.push($('<option>' + selected + '</option>'));
    }
    this.$element.html(options);

    callback(found);
  };

  DeferDataAdapter.prototype.query = function (params, callback) {
    params = $.extend({}, {page: 1, lastpage: 0}, params);

    var data = this.options.get('data');
    var pageSize = this.options.get('pageSize');

    var results = [];
    for (var d = 0; d < data.length; ++d) {
      var _data = {id:data[d], text:data[d]};
      var matches = this.matches(params, _data);
      if (matches !== null) {
        results.push(_data);
      }
    }

    callback({
      results: results.slice(params.lastpage * pageSize,
                             params.page * pageSize),
      resultLength: results.length,
      pagination: {
        more: results.length >= params.page * pageSize
      }
    });
  };

  return DeferDataAdapter;

});
