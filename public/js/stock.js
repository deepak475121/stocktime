$(document).ready(function(){ 
	var chart_bg_color = '#00000000';
	var markerFillColor = 'rgba(247, 154, 53, 0.2)';
	var graphColor = '#ff3333';
	var green = '#00a600';
	var red = '#ff3333';
	var fillColorHigh = 'rgba(255, 0, 0, 0.5)';
	var fillColorLow = 'rgba(255, 0, 0, 0.0)';

	$('#search-text').on('keyup',function(){
		console.log($('#search-text').val());
		search($('#search-text').val());
	});
	
	function search(input){
	    	var formData = 'qurey='+input;
			$.ajax({
				type: "POST",
				url: "/get_data",
				data:formData,
				headers: {
			        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				success: function(data) {
					$('.detail').empty();
				    $.each(data.result, function( index, value ) {
				    	// console.log(value.name);
				    	$('.detail').append('<div class="col-md-3 col-sm-4 col-xs-6 data-list">'+
										        '<p class="syb">'+value.symbol+'</p>'+
										        '<p class="index">'+value.exchDisp+'</p>'+
										        '<P class="name">'+value.name+'</P>'+
        										'<a href="#" class="chart" data-index="'+value.symbol+'">Get Chart</a>'+
      											'</div>');
					});
				},
				error: function(xhr, status, error) {
				 	console.log(error);
				}
			});
	}

	$(document).on("click",".chart",function(){
		getGraph($(this).data("index"))
		// console.log($(this).data("index"));
	});

	function getGraph(index){
		var formData = 'index='+index;
		$.ajax({
			type: "POST",
			url: "/get_graph",
			data:formData,
			headers: {
		        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			success: function(data) {
				console.log(data);
				$('#graph-view').modal('show');
				if (data.value.change < 0) {
					graphColor = red;
					fillColorHigh = 'rgba(255, 0, 0, 0.5)';
					fillColorLow = 'rgba(255, 0, 0, 0.0)';
				}else{
					graphColor = green;
					fillColorHigh = 'rgba(0, 255, 0, 0.5)';
					fillColorLow = 'rgba(0, 255, 0, 0.0)';
				}
				$('#graph-name').text(data.value.symbol);
				var graph_val = data.data;
				populate_data('chart-view',graph_val);
			},
			error: function(xhr, status, error) {
			 	console.log(error);
			}
		});
	}

	function populate_data(chart_id, data) 
	{
		// console.log(data);
	  Highcharts.stockChart(chart_id, {
		 xAxis: {
	            gapGridLineWidth: 0,
	            lineColor: '#232323',
	        },
	     yAxis: {
	            gridLineColor: '#232323'
	        },
		    credits: {
		        text: 'StockChart',
		        href: 'http:127.0.0.1:8000'
		    },
	        rangeSelector: {
	            selected: 5,
	            enabled:false
	            
	        },
	        chart: {
			      backgroundColor: chart_bg_color,
			      selectionMarkerFill: markerFillColor,
			                events: {
			              selection: function(event) {
			                  if (event.xAxis) {
			                      return false;
			                  }
			              }
			          },
			          zoomType: 'x'
			    
			  },
			chart: {
			      backgroundColor: chart_bg_color,
			      selectionMarkerFill: markerFillColor,
			                events: {
			              selection: function(event) {
			                  if (event.xAxis) {
			                      return false;
			                  }
			              }
			          },
			          zoomType: 'x'
			    
			  },
	        navigator: {
	            enabled: false
	        },
	        scrollbar: {
	            enabled: false
	        },
	        plotOptions: {
		      series: {
		        allowPointSelect: true,
		          marker: {
		              states: {
		                  select: {
		                      fillColor: 'black',
		                      lineWidth: 0
		                  }
		              }
		          },
		        point: {
		          events: {
		            mouseOver: function () {
		            //   if(range_stat == 1 && start_nav == '') {
		            //     var row_index = parseInt(this.index) - 1;
		            //     selected_nav = data[row_index];
		            //     start_date = new Date(data[row_index][0]);
		            //     start_nav = parseFloat(selected_nav[1]);console.log(start_nav);console.log(selected_nav);
		            //   }
		            //   var current_index = parseFloat(this.y);
		            //   if(range_stat == 1 && start_nav != '' ) {
		            //     var diff = current_index - start_nav;
		            //     var change = ((diff/start_nav)*100).toFixed(2); //console.log(current_nav);console.log(start_nav);console.log(diff);console.log(change);
		            //     myDate = new Date(this.x);
		            //     $(date_id).text(start_date.getDate()+'-'+(start_date.getMonth()+1)+'-'+start_date.getFullYear()+ ' -> '+myDate.getDate()+'-'+(myDate.getMonth()+1)+'-'+myDate.getFullYear());
		            //     $(value_id).text(' '+current_index.toFixed(2)+' ');
		            //     $(diff_id).html(' ('+change+'%)');
		            //     $(diff_id).removeClass('positive');
		            //     $(diff_id).removeClass('negetive');
		            //     if(change < 0) {
		            //       $(diff_id).addClass('negetive');
		            //     } else {
		            //       $(diff_id).addClass('positive');
		            //     }
		            //   } else {
		            //     myDate = new Date(this.x);
		            //     $(date_id).text(myDate.getDate()+'-'+(myDate.getMonth()+1)+'-'+myDate.getFullYear());
		            //     $(value_id).text(' '+current_index.toFixed(2)+' ');
		            //     $(diff_id).html('');


		            //   }
		            }
		          },    
		        },
		      }
		    },
	        series: [{
	            name: 'EOD',
	            type: 'area',
	            data: data,
	            gapSize: 0,
	            color : graphColor,
	            tooltip: {
	                valueDecimals: 2,
	                enabled: false,
	            },
	            fillColor: {
	                linearGradient: {
	                    x1: 0,
	                    y1: 0,
	                    x2: 0,
	                    y2: 1
	                },
	                stops: [
	                    [0, fillColorHigh],
	                    [1, fillColorLow],

	                ]
	            },
	            threshold: null
	        }]
	    });
	   
	}

});