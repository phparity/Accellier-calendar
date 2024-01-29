import { Line, Doughnut, Pie, Bar, Chart, Radar, PolarArea } from "react-chartjs-2";
import { Table } from "react-bootstrap";

import "../../assets/style/Home.css"
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ReportGraph = (props) => {
    const { graphlistData } = props;

    let graphDataSets = [];
    let newColors = [];
    let randomColor = [];

    // console.log(graphlistData, '11', graphDataSets);
    return (
        <>
            {graphlistData?.length > 0 &&
                graphlistData?.map((item, index) => {
                    if (item?.charttype === "polar_area" || item?.charttype === "doughnut" || item?.charttype === "pie") {
                        for (let i = 0; i < item?.labels?.length; i++) {
                            randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
                            newColors.push(randomColor);
                        }
                    }

                    // console.log(index, '18', item);
                    return (
                        <>
                            <div className="chartjs-size-monitor">
                                <div className="chartjs-size-monitor-expand">
                                    <div className=""></div>
                                </div>
                                <div className="chartjs-size-monitor-shrink">
                                    <div className=""></div>
                                </div>
                            </div>

                            <div className="col-md-6 col-12" key={index}>
                                <div className="rezise" style={{ backgroundColor: "#fff", maxHeight:'80vh' }}>
                                    {/* <div className="chartjs-size-monitor">
                                        <div className="chartjs-size-monitor-expand">
                                            <div className=""></div>
                                        </div>
                                        <div className="chartjs-size-monitor-shrink">
                                            <div className=""></div>
                                        </div>
                                    </div> */}

                                    {(item?.charttype === "bar_line") ? (
                                        <>
                                            {graphDataSets = []}
                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, backgroundColor: newItem?.color, borderColor: newItem?.color, borderWidth: 1, radius: 0.5, type: newItem?.type, pointStyle: newItem?.type, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Chart
                                                type="bar"
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets,
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                          legend: {
                                                              position: 'top',
                                                              display: item?.datasets?.[0]?.legend
                                                          },
                                                    },
                                                    scales: {
                                                        x:
                                                        {
                                                            ticks: {
                                                                fontSize: 13,
                                                            },
                                                        },

                                                        y:
                                                        {
                                                            ticks: {
                                                                fontSize: 12,
                                                            },
                                                        },

                                                    },
                                                }}
                                            />
                                        </>
                                    ) : (item?.charttype === "line_bar") ? (
                                        <>
                                            {graphDataSets = []}
                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn !== null})`, fill: false, backgroundColor: newItem?.color, borderColor: newItem?.color, borderWidth: 1, radius: 0, type: newItem?.type, pointStyle: newItem?.type, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Chart
                                                type="bar"
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets,
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                        legend: {
                                                            position: 'top',
                                                            display: item?.datasets?.[0]?.legend
                                                        },
                                                    },
                                                    scales: {
                                                        x:
                                                        {
                                                            ticks: {
                                                                fontSize: 13,
                                                            },
                                                        },

                                                        y:
                                                        {
                                                            ticks: {
                                                                fontSize: 12,
                                                            },
                                                        },

                                                    },
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "line" ? (
                                        <>
                                            {graphDataSets = []}
                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, {label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, lineTension: 0.5, backgroundColor: newItem?.color, borderColor: newItem?.color, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Line
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                          legend: {
                                                              position: 'top',
                                                              display: item?.datasets?.[0]?.legend
                                                          },
                                                    },
                                                    legend: {
                                                        labels: {
                                                            boxHeight: 1,
                                                        },
                                                    }
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "bar" ? (
                                        <>
                                            {graphDataSets = []}
                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, lineTension: 0.5, backgroundColor: newItem?.color, borderColor: newItem?.color, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Bar
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                        legend: {
                                                            position: 'top',
                                                            display: item?.datasets?.[0]?.legend
                                                        },
                                                    },
                                                    legend: {
                                                        labels: {
                                                            boxHeight: 1,
                                                        },
                                                    }
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "stacked_bar" ? (
                                        <>
                                            {graphDataSets = []}
                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, lineTension: 0.5, backgroundColor: newItem?.color, borderColor: newItem?.color, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Bar
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                          legend: {
                                                              position: 'top',
                                                              display: item?.datasets?.[0]?.legend
                                                          },
                                                    },
                                                    responsive: true,
                                                    scales: {
                                                        x: {
                                                            stacked: true,
                                                        },
                                                        y: {
                                                            stacked: true,
                                                        },
                                                    },
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "horizontal_bar" ? (
                                        <>
                                            {graphDataSets = []}
                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, lineTension: 0.5, backgroundColor: newItem?.color, borderColor: newItem?.color, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Bar
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    indexAxis: 'y',
                                                    elements: {
                                                        bar: {
                                                            borderWidth: 1,
                                                        },
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                          legend: {
                                                              position: 'right',
                                                              display: item?.datasets?.[0]?.legend
                                                          },
                                                    }
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "horizontal_stacked_bar" ? (
                                        <>
                                            {graphDataSets = []}
                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, lineTension: 0.5, backgroundColor: newItem?.color, borderColor: newItem?.color, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Bar
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    indexAxis: 'y',
                                                    elements: {
                                                        bar: {
                                                            borderWidth: 1,
                                                        },
                                                    },
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        legend: {
                                                            position: 'right',
                                                            display: item?.datasets?.[0]?.legend
                                                        },
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          }
                                                    },
                                                    scales: {
                                                        x: {
                                                            stacked: true,
                                                        },
                                                        y: {
                                                            stacked: true,
                                                        },
                                                    },
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "grouped_bar" ? (
                                        <>
                                            {graphDataSets = []}
                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, lineTension: 0.5, backgroundColor: newItem?.color, borderColor: newItem?.color, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Bar
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    interaction: {
                                                        mode: 'index',
                                                        intersect: false,
                                                    },
                                                    plugins: {
                                                        legend: {
                                                            position: 'top',
                                                            display: item?.datasets?.[0]?.legend
                                                        },
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          }
                                                    },
                                                    scales: {
                                                        x: {
                                                            stacked: true,
                                                        },
                                                        y: {
                                                            stacked: true,
                                                        },
                                                    },
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "radar" ? (
                                        <>
                                            {graphDataSets = []}
                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, backgroundColor: newItem?.color, borderColor: newItem?.color, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Radar
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                          legend: {
                                                              position: 'top',
                                                              display: item?.datasets?.[0]?.legend
                                                          },
                                                    },
                                                    legend: {
                                                        labels: {
                                                            boxHeight: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "polar_area" ? (

                                        <>
                                            {graphDataSets = []}

                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, backgroundColor: newColors, borderColor: newColors, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <PolarArea
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                          legend: {
                                                              position: 'top',
                                                              display: item?.datasets?.[0]?.legend
                                                          },
                                                    },
                                                    legend: {
                                                        labels: {
                                                            boxHeight: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "doughnut" ? (
                                        <>
                                            {graphDataSets = []}

                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} (${newItem?.graphFn})`, fill: false, backgroundColor: newColors, borderColor: newColors, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Doughnut
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                          legend: {
                                                              position: 'top',
                                                              display: item?.datasets?.[0]?.legend
                                                          },
                                                    },
                                                    legend: {
                                                        labels: {
                                                            boxHeight: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        </>
                                    ) : item?.charttype === "pie" ? (
                                        <>
                                            {graphDataSets = []}

                                            <div className="pt-2 pb-2">
                                                <div className="text-center"></div>
                                                <div className="text-center"></div>
                                            </div>
                                            {
                                                item?.datasets?.map((newItem, index) => {
                                                    graphDataSets = [...graphDataSets, { label: `${newItem?.fieldName} ${newItem?.graphFn !== null ? newItem?.graphFn : ''} `, fill: false, backgroundColor: newColors, borderColor: newColors, borderWidth: 1, data: newItem?.fieldData }]
                                                })
                                            }
                                            <Pie
                                                data={{
                                                    labels: item?.labels,
                                                    datasets: graphDataSets.length > 0 && graphDataSets
                                                }}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        title: {
                                                            display: true,
                                                            text: item?.title,
                                                            fontSize: 24,
                                                        },
                                                        subtitle: {
                                                            display: true,
                                                            text: item?.subtitle,
                                                            padding: {
                                                              bottom: 10
                                                            }
                                                          },
                                                          legend: {
                                                              position: 'top',
                                                              display: item?.datasets?.[0]?.legend
                                                          },
                                                    },
                                                    legend: {
                                                        labels: {
                                                            boxHeight: 1,
                                                        },
                                                    },
                                                }}
                                            />
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </>
                    )
                })}

        </>
    );
};

export default ReportGraph;
