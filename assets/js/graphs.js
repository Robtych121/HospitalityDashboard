queue()
    .defer(d3.csv, "assets/data/data.csv")
    .await(makeGraphs);

function makeGraphs(error, data){
    var ndx = crossfilter(data);

     data.forEach(function(d){
        d.code = d["Code"];
    }) 

    show_by_product_group(ndx);

    dc.renderAll();

}

function show_by_product_group(ndx){
    var dim = ndx.dimension(dc.pluck('Code'));
    var group = dim.group();

    dc.barChart("#byProductGroupChart")
    .width(550)
    .height(250)
    .margins({top: 20, right: 50, bottom: 50, left: 70})
    .dimension(dim)
    .group(group)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Product Group")
    .yAxisLabel("Count Of Items")
    .yAxis().ticks(10);
}