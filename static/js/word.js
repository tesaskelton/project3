anychart.onDocumentReady(function () {

      // URL for fetching the data
     const link = '/api/word_data';

    
    anychart.data.loadJsonFile(
      //'https://cdn.anychart.com/samples/tag-cloud/population-by-countries/data.json',
      link,
      function (data) {
        var dataSet = anychart.data.set(data);
        var colors = anychart.scales
          .ordinalColor()
          .colors(['#26959f', '#f18126', '#3b8ad8', '#60727b', '#e24b26']);
  
        // create tag cloud
        var chart = anychart.tagCloud();
  
        // set chart title
        chart
          .title('Job Title Tag Cloud')
          // set data with settings
          .data(dataSet)
          // set color scale
          .colorScale(colors)
          // set array of angles, by which words will be placed
          .angles([0, -45, 90]);
  
        // get the color range
        var colorRange = chart.colorRange();
        // enabled color range
        colorRange
          .enabled(true)
          // sets color line size
          .colorLineSize(15);
  
        // set container id for the chart
        chart.container('container');
        // initiate chart drawing
        chart.draw();
  
        // save normal fill function to variable
        var normalFillFunction = chart.normal().fill();
        // save hover fill function to variable
        var hoveredFillFunction = chart.hovered().fill();
  
        // create custom interactivity to hover colorRange
        chart.listen('pointsHover', function (e) {
          if (e.actualTarget === colorRange) {
            // if points exist
            if (e.points.length) {
              // set settings for normal state
              chart.normal({
                fill: 'black 0.1'
              });
              // set settings for hovered state
              chart.hovered({
                // get fill color ratio by its number and set fill to hovered state
                fill: chart
                  .colorScale()
                  .valueToColor(e.point.get('category'))
              });
            } else {
              // set function for normal state
              chart.normal({
                fill: normalFillFunction
              });
              // set function for hovered state
              chart.hovered({
                fill: hoveredFillFunction
              });
            }
          }
        });
      }
    );
  })