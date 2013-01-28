$(function () {
    var chart,
        chartCurrentSelection = "";
    $(document).ready(function() {

        var familyValuesContainerContentChanger = function (title, paragraph) {
            var html = '';
            
            html += '<span style="font-weight: bold;">';
            html += title;
            html += '</span><br/>';
            html += paragraph;
            

            // with animation 
            $('div.interactiveCompanyValuesSectionLeft').hide().html(html).fadeToggle('fast');

            // no animation
            //$('div.interactiveCompanyValuesSectionLeft').html( html );
            
        };


        // Radialize the colors
        Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function(color) {
            return {
                radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        });

        // build the chart
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                width: 600,
                height: 250,
                backgroundColor: 'none' ,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                events: {
                    load: function(event) {

                        var pointTitle = this.options.series[0].data[0].name,
                            pointParagraph = this.options.series[0].data[0].descrip,
                            chartCurrentSelection = pointTitle;

                        familyValuesContainerContentChanger(pointTitle, pointParagraph);
                    }
                }
            },
            title: {
                text: null
            },
            tooltip: {
                formatter: function(){

                    var pointTitle = this.key,
                        pointParagraph = this.series.data[this.point.x].descrip;

                    if (chartCurrentSelection != pointTitle)
                    {
                        familyValuesContainerContentChanger(pointTitle, pointParagraph);
                        chartCurrentSelection = pointTitle;
                    }

                    return false; // hide default tooltip
                }
            },


            plotOptions: {
                series: {
                    allowPointSelect: true,
                    stickyTracking: false,
                    point: {
                        events: {
                            mouseOver: function(event) {
                                var point = this;
                                
                                if (!point.selected) {
                                    chart.tooltip.shared = true;
                                    
                                    timeout = setTimeout(function () {
                                        point.firePointEvent('click');
                                        
                                        chart.tooltip.shared = false;
                                        chart.tooltip.refresh(point);
                                    }, 0);
                                }
                            }
                        }
                    },
                    events: {
                        mouseOut: function() {
                            chart.tooltip.shared = false;
                            clearTimeout(timeout);
                        }
                    }
                },
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>';
                        },
                        distance: 15,
                        overflow: true
                    }
                }

            },
            series: [{
                type: 'pie',
                name: 'ARM Values',
                data: [
                    {
                        name: 'Teamwork and Selflessness',
                        descrip: 'Connected to the business, communicates openly, shares information and knowledge, networks internally and externally, persuades rather than pushes, involves colleagues, includes and respects colleagues. Always thinks and acts for the company, the team, shareholders and the customer ahead of themselves. Works for the greater good of ARM - does not act selfishly or in their own interest.',
                        y: 1,
                        sliced: true,
                        selected: true
                    },
                    {
                        name: 'Personal Development',  
                        descrip: 'Strives for self-betterment through reflection and feedback, coaching and mentoring, training and education. Inquisitive and enthusiastic to learn, constantly aims to improve professional capability. Actively supports others’ development both within their team and in the wider ARM.',
                        y: 1
                    },
                    {
                        name: 'Innovation',       
                        descrip: 'Develops practical solutions to problems, draws upon alternative viewpoints and ideas to refine propositions, questions and challenges the way things have been done in the past, suggests new and better ways, recombines existing ideas in novel ways to create new things, is open to change, supports others in their innovation',
                        y: 1
                    },
                    {
                        name: 'Responsiveness',
                        descrip: 'Always reacts quickly and with a sense of urgency to requests, issues, e-mails or other events in a timely and flexible fashion based on consideration of the dependent needs of others.',
                        y: 1
                    },
                    {
                        name: 'Partner and Customer Focus',
                        descrip: 'An employee who is partner and customer (both internal and external) focused thinks and acts with the best interests of the customer, understands their needs, understands the strengths of ARM\'s business, and helps develop ARM business process and culture.',
                        y: 1
                    },
                    {
                        name: 'Constructive Pro-Activity',
                        descrip: 'Develops practical solutions, takes leadership, has a "can do" rather than a "won\'t do" approach, positive thinker, makes it happen, acts with a sense of urgency.',
                        y: 1
                    },
                    {
                        name: 'Results that Benefit ARM',
                        descrip: 'ARM employees produce results that either benefit the whole or part of ARM. Achieves the results by any acceptable means necessary including innovation, own expertise, and using others\' expertise.',
                        y: 1
                    }
                ]
            }],
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            }
        });
    });
    
});



Highcharts.theme = {
   colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
   title: {
      style: {
         color: '#000',
         font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
   },
   subtitle: {
      style: {
         color: '#666666',
         font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
   },
   xAxis: {
      gridLineWidth: 1,
      lineColor: '#000',
      tickColor: '#000',
      labels: {
         style: {
            color: '#000',
            font: '11px Trebuchet MS, Verdana, sans-serif'
         }
      },
      title: {
         style: {
            color: '#333',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Trebuchet MS, Verdana, sans-serif'

         }
      }
   },
   labels: {
      style: {
         color: '#000'
      }
   }
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);