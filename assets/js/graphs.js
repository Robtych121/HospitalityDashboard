queue()
    .defer(d3.csv, "assets/data/data.csv")
    .await(makeGraphs);

function makeGraphs(error, data){
    var ndx = crossfilter(data);
    var formatDate = d3.time.format.utc("%d/%m/%Y");


     data.forEach(function(d){
        d["DocumentDate"] = formatDate.parse(d["DocumentDate"]);       
        d["LineTotalValue"] = parseFloat(d["LineTotalValue"]);

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

    var dim = ndx.dimension(function(d) { return d3.time.month(d.DocumentDate)});
    var group = dim.group().reduce(
        function (p, v) {
            p.total += v.LineTotalValue ;
            return p;
        },
        function (p, v) {
            p.total -= v.LineTotalValue ;
            return p;
        },
        function () {
            return {total: 0};
        }
    );

    //.reduceSum(function(d) { return d.Code});




    var minDate = dim.bottom(1)[0]["DocumentDate"];
    var maxDate = dim.top(1)[0]["DocumentDate"];
    console.log(minDate);

    dc.lineChart("#byTimeChart")
        .width(1150)
        .height(450)
        .margins({top:10,bottom:30,right:50, left:50})
        .dimension(dim)
        .group(group)
        .valueAccessor(function (d) {
                  return d.value.total;
              })
        .brushOn(false)
        .mouseZoomable(false)
        .renderHorizontalGridLines(true)
        .renderArea(true)
        .renderDataPoints([{fillOpacity: 0.8, strokeOpacity: 1.0, radius: 4}])
        .yAxisLabel("Sales Value")
        .x(d3.time.scale().domain([minDate, maxDate]))
        .xUnits(d3.time.month)
        .yAxis().ticks(12);
}