queue()
    .defer(d3.csv, "assets/data/data.csv")
    .await(makeGraphs);

function makeGraphs(error, data){
    var ndx = crossfilter(data);

     data.forEach(function(d){
        d.code = d["Code"];
        d.source = d["Source"];
    }) 

    show_year_selector(ndx);
    show_by_product_group(ndx);
    show_by_method_chart(ndx);

    dc.renderAll();

}

function show_year_selector(ndx) {
    dim = ndx.dimension(dc.pluck('Year'));
    group = dim.group();

    dc.selectMenu("#year-selector")
        .dimension(dim)
        .group(group);
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

function show_by_method_chart(ndx){
    var dim = ndx.dimension(dc.pluck('Source'));
    var group = dim.group();

    dc.pieChart("#byMethodChart")
        .width(550)
        .height(250)
        .slicesCap(4)
        .innerRadius(100)
        .dimension(dim)
        .group(group)
        .externalRadiusPadding(150)
        .ordinalColors(['red','green','blue'])
        .legend(dc.legend().x(50).y(20).itemHeight(15).gap(5));
}