
const link = '/api/country_data';

// // Use the d3.json function to read in the data from the url
const dataset= d3.json(link);

// // Print to console to confirm
console.log(dataset);

dataset.then(function(data){
    console.log(data)
     //console.log(Object.keys(data));
     //console.log(Object.values(data));
})



// funtion that builds the bubble chart
//function buildBubbleChart(sample)
//{
     // use d3.json in order to get all of the data
     d3.json(link).then((data) => {
 
   
        let country_name = ['AE','AS','AT','AU','BE','BR','CA','CH','CL','CN','CO','CZ','DE','DK','DZ','EE','ES','FR','GB','GR','HN','HR','HU','IE','IL','IN','IQ','IR','IT','JP','KE','LU','MD','MT','MX','MY','NG','NL','NZ','PK','PL','PT','RO','RU','SG','SI','TR','UA','US','VN']
        let country_job_num = [3,1,4,3,2,3,30,2,1,2,1,2,28,3,1,1,14,15,47,11,1,1,1,1,1,24,1,1,2,6,1,3,1,1,3,1,2,4,1,3,4,4,1,2,1,2,3,1,355,1]

        color_array = [];

        let i = 0;
        color_num = 120;

        while (i <= country_name.length) {
            color_array.push(color_num);
            i++;
            color_num = color_num +5;
        }


        // set up the bubble chart
        let bubbleChart = {
            y: country_job_num,
            //x: otu_ids,
            x:country_name,
            text: country_name,
            mode: "markers",
            marker: {
                size: country_job_num,
                color: color_array,
                colorscale: "Bluered"
            }

 
        };

        // set up the layout
        let layout = {
            title: "Job Listings per Country",
            hovermode: "closest",
            xaxis: {title: "Countries"},
            yaxis: {title: "Job Listings"}
        };

        // call Plotly to plot the bubble chart on the page
        Plotly.newPlot("container", [bubbleChart], layout)
    });

