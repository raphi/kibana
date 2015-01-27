define(function (require) {
  return function PointSeriesGetPoint() {
    function unwrap(aggConfigResult, def) {
      return aggConfigResult ? aggConfigResult.value : def;
    }

    return function getPoint(x, series, yScale, row, y) {
      var point = {
        x: unwrap(row[x.i], '_all'),
        y: unwrap(row[y.i]),
        aggConfigResult: row[y.i],
        yScale: yScale
      };

      if (point.y === 'NaN') {
        return;
      }

      if (series) {
        point.series = series.agg.fieldFormatter()(unwrap(row[series.i]));
      }

      if (yScale) {
        point.y *= yScale;
      }

      return point;
    };
  };
});