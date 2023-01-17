
dataset = {"children": [{'Name': 'AE', 'Count': 3},
                    {'Name': 'AS', 'Count': 1},
                    {'Name': 'AT', 'Count': 4},
                    {'Name': 'AU', 'Count': 3},
                    {'Name': 'BE', 'Count': 2},
                    {'Name': 'BR', 'Count': 3},
                    {'Name': 'CA', 'Count': 30},
                    {'Name': 'CH', 'Count': 2},
                    {'Name': 'CL', 'Count': 1},
                    {'Name': 'CN', 'Count': 2},
                    {'Name': 'CO', 'Count': 1},
                    {'Name': 'CZ', 'Count': 2},
                    {'Name': 'DE', 'Count': 28},
                    {'Name': 'DK', 'Count': 3},
                    {'Name': 'DZ', 'Count': 1},
                    {'Name': 'EE', 'Count': 1},
                    {'Name': 'ES', 'Count': 14},
                    {'Name': 'FR', 'Count': 15},
                    {'Name': 'GB', 'Count': 47},
                    {'Name': 'GR', 'Count': 11},
                    {'Name': 'HN', 'Count': 1},
                    {'Name': 'HR', 'Count': 1},
                    {'Name': 'HU', 'Count': 1},
                    {'Name': 'IE', 'Count': 1},
                    {'Name': 'IL', 'Count': 1},
                    {'Name': 'IN', 'Count': 24},
                    {'Name': 'IQ', 'Count': 1},
                    {'Name': 'IR', 'Count': 1},
                    {'Name': 'IT', 'Count': 2},
                    {'Name': 'JP', 'Count': 6},
                    {'Name': 'KE', 'Count': 1},
                    {'Name': 'LU', 'Count': 3},
                    {'Name': 'MD', 'Count': 1},
                    {'Name': 'MT', 'Count': 1},
                    {'Name': 'MX', 'Count': 3},
                    {'Name': 'MY', 'Count': 1},
                    {'Name': 'NG', 'Count': 2},
                    {'Name': 'NL', 'Count': 4},
                    {'Name': 'NZ', 'Count': 1},
                    {'Name': 'PK', 'Count': 3},
                    {'Name': 'PL', 'Count': 4},
                    {'Name': 'PT', 'Count': 4},
                    {'Name': 'RO', 'Count': 1},
                    {'Name': 'RU', 'Count': 2},
                    {'Name': 'SG', 'Count': 1},
                    {'Name': 'SI', 'Count': 2},
                    {'Name': 'TR', 'Count': 3},
                    {'Name': 'UA', 'Count': 1},
                    {'Name': 'US', 'Count': 355},
                    {'Name': 'VN', 'Count': 1}]};


        var diameter = 600;
        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var bubble = d3.pack(dataset)
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select("body")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(dataset)
            .sum(function(d) { return d.Count; });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        node.append("title")
            .text(function(d) {
                return d.Name + ": " + d.Count;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(i);
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Name.substring(0, d.r / 3);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.Count;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/5;
            })
            .attr("fill", "white");

        d3.select(self.frameElement)
            .style("height", diameter + "px");