queue()
    .defer(d3.csv, "assets/data/data.csv")
    .await(makeGraphs);

function makeGraphs(error, data){
    var ndx = crossfilter(data);
    var formatDate = d3.time.format("%d/%m/%Y");


     data.forEach(function(d){
        d.code = d["Code"];
        d.source = d["Source"];
        d.documentDate = formatDate.parse(d["DocumentDate"]);       
        d.StockUnitLineQuantity = d["StockUnitLineQuantity"];
        d.LineTotalValue = parseFloat(d["LineTotalValue"]);

    }) 
    show_year_selector(ndx);
    show_by_product_group(ndx);
    show_by_method_chart(ndx);
    show_by_month(ndx);
    show_sales_by_product_group(ndx);
    show_sales_by_method_chart(ndx);

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

function show_sales_by_product_group(ndx){
    var dim = ndx.dimension(dc.pluck('Code'));
    var group = dim.group().reduceSum(function(d) { return d.LineTotalValue});

    dc.barChart("#SalesbyProductGroupChart")
        .width(550)
        .height(250)
        .margins({top: 20, right: 50, bottom: 50, left: 70})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Product Group")
        .yAxisLabel("Sales Value")
        .yAxis().ticks(10);
}

function show_by_method_chart(ndx){
    var dim = ndx.dimension(dc.pluck('Source'));
    var group = dim.group();

    dc.pieChart("#byMethodChart")
        .width(550)
        .height(250)
        .slicesCap(3)
        .innerRadius(100)
        .dimension(dim)
        .group(group)
        .externalRadiusPadding(100)
        .ordinalColors(['red','green','blue'])
        .legend(dc.legend().x(50).y(20).itemHeight(25).gap(3));
}

function show_sales_by_method_chart(ndx){
    var dim = ndx.dimension(dc.pluck('Source'));
    var group = dim.group().reduceSum(function(d) { return d.LineTotalValue});

    dc.pieChart("#SalesbyMethodChart")
        .width(550)
        .height(250)
        .slicesCap(3)
        .innerRadius(100)
        .dimension(dim)
        .group(group)
        .externalRadiusPadding(100)
        .ordinalColors(['red','green','blue'])
        .legend(dc.legend().x(50).y(20).itemHeight(25).gap(3));
}

function show_by_month(ndx){

    var dim = ndx.dimension(function(d) {return d.documentDate});
    var group = dim.group().reduceSum(function(d) { return d.documentDate});

    dc.barChart("#byTimeChart")
        .width(1150)
        .height(450)
        .margins({top: 20, right: 50, bottom: 50, left: 70})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.time.scale())
        .xUnits(d3.time.months)
        .xAxisLabel("Month")
        .yAxisLabel("Count Of Items")
        .yAxis().ticks(10)
}