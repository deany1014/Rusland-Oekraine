// Make the casualties chart robust: only run when Chart.js and the canvas are available.
(function () {
  const dates = [
    "02/26/22","03/06/22","03/13/22","03/20/22","03/27/22",
    "04/03/22","04/10/22","04/17/22","04/24/22","05/01/22",
    "05/08/22","05/15/22","05/22/22","05/29/22","06/06/22",
    "06/12/22","06/19/22","06/23/22","07/03/22","07/11/22",
    "07/17/22","07/24/22","07/31/22","08/07/22","08/14/22",
    "08/21/22","08/28/22","09/04/22","09/11/22","09/18/22",
    "09/25/22","10/02/22","10/09/22","10/16/22","10/23/22",
    "10/30/22","11/06/22","11/13/22","11/20/22","11/27/22",
    "12/04/22","12/11/22","12/18/22","12/26/22","01/02/23",
    "01/09/23","01/15/23","01/22/23","01/29/23","02/05/23",
    "02/12/23","02/15/23","02/26/23","03/05/23","03/12/23",
    "03/19/23","03/26/23","04/02/23","04/09/23","04/17/23",
    "04/24/23","05/01/23","05/07/23","05/14/23","05/21/23",
    "06/04/23","06/18/23","06/30/23","07/30/23","08/14/23",
    "08/27/23","09/10/23","09/24/23","10/08/23","10/31/23",
    "11/30/23","12/31/23","01/31/24","02/29/24","03/31/24",
    "04/30/24","05/31/24","06/30/24","07/31/24","08/31/24",
    "09/30/24","10/31/24","11/30/24","12/31/24","01/31/25",
    "02/28/25","04/30/25","5/31/25"
  ];

  const killed = [
    64,406,636,925,1151,
    1430,1842,2072,2665,3153,
    3381,3668,3930,4074,4253,
    4395,4569,4677,4889,5024,
    5110,5237,5327,5401,5514,
    5587,5663,5718,5827,5916,
    5996,6114,6221,6306,6374,
    6430,6490,6557,6595,6655,
    6702,6755,6826,6884,6919,
    6952,7031,7068,7110,7155,
    7199,8006,8101,8173,8231,
    8317,8401,8451,8490,8534,
    8574,8709,8791,8836,8895,
    8983,9083,9177,9369,9444,
    9511,9614,9701,9806,9965,
    10058,10191,10378,10675,10810,
    10946,11126,11284,11520,11743,
    11973,12162,12340,12456,12605,
    12737,13134,13341
  ];

  const injured = [
    176,801,1125,1496,1824,
    2097,2493,2818,3053,3316,
    3680,3896,4532,4826,5141,
    5390,5691,5829,6263,6520,
    6752,7035,7257,7466,7698,
    7890,8055,8199,8421,8616,
    8848,9132,9371,9602,9776,
    9865,9972,10074,10189,10368,
    10479,10607,10769,10947,11075,
    11144,11327,11415,11547,11662,
    11756,13287,13479,13620,13734,
    13892,14023,14156,14244,14370,
    14441,14666,14815,14985,15117,
    15442,15779,15993,16646,16940,
    17206,17535,17748,17962,18380,
    18653,19139,19632,20080,20556,
    21154,21863,22594,23640,24614,
    25943,26919,27836,28382,29178,
    29768,31867,32744
  ];

  const defenseYears = [
    2000,2001,2002,2003,2004,
    2005,2006,2007,2008,2009,
    2010,2011,2012,2013,2014,
    2015,2016,2017,2018,2019,
    2020,2021,2022,2023,2024
  ];

  const defenseShareOfGdp = [
    0.0351,0.0277,0.0268,0.0275,0.0251,
    0.0279,0.0277,0.0287,0.0267,0.0284,
    0.0274,0.0226,0.0235,0.0239,0.0297,
    0.0385,0.0367,0.0324,0.0364,0.0407,
    0.044,0.0343,0.2564,0.3653,0.3448
  ];

  const gdpYears = [
    2000,2001,2002,2003,2004,
    2005,2006,2007,2008,2009,
    2010,2011,2012,2013,2014,
    2015,2016,2017,2018,2019,
    2020,2021,2022,2023,2024
  ];

  // GDP figures converted to billions of 2015 USD to keep the chart readable.
  const ukraineGdpBillions = [
    69.84,75.98,80.04,87.66,98.00,
    101.01,108.65,117.58,120.22,102.02,
    106.20,111.98,112.15,112.20,100.89,
    91.03,93.25,95.45,98.78,101.94,
    98.12,101.50,72.31,76.31,78.54
  ];

  const russiaGdpBillions = [
    780.43,820.24,858.79,921.48,987.82,
    1051.04,1137.23,1233.89,1298.06,1196.81,
    1250.66,1304.44,1356.94,1380.76,1390.92,
    1363.48,1366.12,1391.07,1430.12,1461.55,
    1422.77,1506.23,1484.61,1545.21,1612.34
  ];

  const netherlandsGdpBillions = [
    647.62,662.66,664.29,664.94,678.35,
    692.15,716.63,744.47,760.23,732.37,
    742.03,755.19,747.81,747.58,759.63,
    775.74,794.55,816.65,835.10,854.30,
    821.26,872.81,916.51,917.20,926.18
  ];

  const populationYears = [
    2000,2001,2002,2003,2004,
    2005,2006,2007,2008,2009,
    2010,2011,2012,2013,2014,
    2015,2016,2017,2018,2019,
    2020,2021,2022,2023,2024
  ];

  // Population figures converted to millions of people.
  const populationTotalMillions = [
    49.56,49.11,48.68,48.32,47.98,
    47.59,47.28,47.06,46.82,46.62,
    46.46,46.31,46.21,46.13,45.97,
    45.78,45.62,45.44,45.21,44.96,
    44.68,44.30,41.05,37.73,37.86
  ];

  const populationMenMillions = [
    23.10,22.88,22.67,22.50,22.34,
    22.14,21.99,21.88,21.76,21.67,
    21.59,21.53,21.50,21.47,21.40,
    21.32,21.25,21.17,21.07,20.95,
    20.82,20.64,19.12,17.54,17.60
  ];

  const populationWomenMillions = [
    26.46,26.23,26.00,25.82,25.64,
    25.45,25.29,25.18,25.06,24.96,
    24.86,24.78,24.71,24.66,24.57,
    24.46,24.37,24.26,24.14,24.00,
    23.86,23.65,21.93,20.19,20.26
  ];

  // Russia population figures (millions)
  const populationRussiaTotalMillions = [
    146.60,145.98,145.31,144.65,144.07,
    143.52,143.05,142.81,142.74,142.79,
    142.85,143.02,143.38,143.81,144.24,
    144.64,145.02,145.29,145.40,145.45,
    145.25,144.75,144.24,143.83,143.53
  ];

  const populationRussiaMenMillions = [
    68.54,68.15,67.73,67.33,66.94,
    66.57,66.25,66.09,66.03,66.04,
    66.08,66.18,66.38,66.62,66.85,
    67.06,67.27,67.43,67.51,67.54,
    67.45,67.24,67.01,66.79,66.61
  ];

  const populationRussiaWomenMillions = [
    78.06,77.82,77.57,77.32,77.13,
    76.95,76.80,76.72,76.71,76.75,
    76.77,76.84,77.00,77.19,77.39,
    77.58,77.75,77.86,77.89,77.91,
    77.79,77.51,77.23,77.04,76.93
  ];

  const ageYears = [2000,2005,2010,2015,2020,2024];

  const ageUkraineChildren = [17.9,14.7,15.6,15.1,15.3,13.9];
  const ageUkraineWorking = [68.7,70.0,70.8,69.8,67.7,67.2];
  const ageUkraineSenior = [13.4,15.3,13.6,15.1,17.0,18.9];

  const ageRussiaChildren = [15.2,15.0,14.8,16.6,17.2,17.0];
  const ageRussiaWorking = [74.5,73.0,72.2,69.2,67.5,67.0];
  const ageRussiaSenior = [10.3,12.0,13.0,14.2,15.3,16.0];

  function waitFor(conditionFn, interval = 100, maxAttempts = 50) {
    return new Promise((resolve) => {
      let attempts = 0;
      const id = setInterval(() => {
        if (conditionFn()) {
          clearInterval(id);
          resolve(true);
        } else if (++attempts >= maxAttempts) {
          clearInterval(id);
          resolve(false);
        }
      }, interval);
    });
  }

  async function initChart() {
    // wait for Chart global and for the canvas element
    const chartAvailable = await waitFor(() => typeof window.Chart !== 'undefined', 100, 50);
    if (!chartAvailable) {
      console.warn('Chart.js not available — casualties chart skipped');
      return;
    }

    const canvasExists = await waitFor(() => document.getElementById('casualtiesChart') !== null, 100, 20);
    if (!canvasExists) {
      console.warn('casualtiesChart canvas not found on this page — skipping chart creation');
      return;
    }

    const canvas = document.getElementById('casualtiesChart');
    const ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) {
      console.warn('Canvas context not available — skipping casualties chart');
      return;
    }

    // Ensure arrays line up — truncate to smallest length
    const minLen = Math.min(dates.length, killed.length, injured.length);
    const labels = dates.slice(0, minLen);
    const killedData = killed.slice(0, minLen);
    const injuredData = injured.slice(0, minLen);

    try {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Killed',
              data: killedData,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.3,
            },
            {
              label: 'Injured',
              data: injuredData,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.3,
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Slachtoffers per week' }
          },
          scales: {
            x: { ticks: { maxRotation: 90, minRotation: 45 } },
            y: { beginAtZero: true }
          }
        }
      });
    } catch (e) {
      console.error('Fout bij het maken van de casualties chart:', e);
    }
  }

  // Start initialization (non-blocking)
  initChart();
  initDamageChart();
  initDefenseSpendingChart();
  initTotalGdpChart();
  initPopulationChart();
  initPopulationRussiaChart();
  initPopulationAgeChart();
  initPopulationAgeRussiaChart();
  initPopulationToggle();

  async function initDamageChart() {
    const chartReady = await waitFor(() => typeof window.Chart !== 'undefined', 100, 50);
    if (!chartReady) {
      console.warn('Chart.js not available — damage chart skipped');
      return;
    }

    const canvasReady = await waitFor(() => document.getElementById('damageChart') !== null, 100, 20);
    if (!canvasReady) {
      console.warn('damageChart canvas not found on this page — skipping chart creation');
      return;
    }

    const damageCanvas = document.getElementById('damageChart');
    const damageCtx = damageCanvas.getContext && damageCanvas.getContext('2d');
    if (!damageCtx) {
      console.warn('Canvas context not available — skipping damage chart');
      return;
    }

    const sectors = [
      'Housing',
      'Transportation',
      'Energy',
      'Commerce and industry',
      'Education and science',
      'Agriculture',
      'Water supply and sanitation',
      'Culture and tourism',
      'Municipal services',
      'Telecom, digital, and media',
      'Environment and forestry',
      'Health',
      'Irrigation and water resources',
      'Social protection and livelihoods',
      'Justice and public administration',
      'Emergency response and civil protection'
    ];

    const damageInBillions = [
      57.6,
      36.7,
      20.5,
      17.5,
      13.4,
      11.2,
      4.6,
      4.1,
      2.9,
      2.2,
      1.7,
      1.6,
      0.7,
      0.4,
      0.4,
      0.4
    ];

    try {
      new Chart(damageCtx, {
        type: 'bar',
        data: {
          labels: sectors,
          datasets: [
            {
              label: 'Schade (miljard USD)',
              data: damageInBillions,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: 'Geschatte oorlogsschade per sector'
            }
          },
          scales: {
            x: {
              ticks: { maxRotation: 25, minRotation: 0 }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Miljarden USD'
              }
            }
          }
        }
      });
    } catch (e) {
      console.error('Fout bij het maken van de damage chart:', e);
    }
  }

  async function initDefenseSpendingChart() {
    const chartReady = await waitFor(() => typeof window.Chart !== 'undefined', 100, 50);
    if (!chartReady) {
      console.warn('Chart.js not available — defense spending chart skipped');
      return;
    }

    const canvasReady = await waitFor(() => document.getElementById('defenseSpendingChart') !== null, 100, 20);
    if (!canvasReady) {
      console.warn('defenseSpendingChart canvas not found on this page — skipping chart creation');
      return;
    }

    const defenseCanvas = document.getElementById('defenseSpendingChart');
    const defenseCtx = defenseCanvas.getContext && defenseCanvas.getContext('2d');
    if (!defenseCtx) {
      console.warn('Canvas context not available — skipping defense spending chart');
      return;
    }

    const percentages = defenseShareOfGdp.map((value) => +(value * 100).toFixed(2));

    try {
      new Chart(defenseCtx, {
        type: 'line',
        data: {
          labels: defenseYears,
          datasets: [
            {
              label: 'Defensie-uitgaven (% van BBP)',
              data: percentages,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.15)',
              tension: 0.25,
              fill: true,
              pointRadius: 3
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Besteding van het BBP aan defensie'
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y.toFixed(2)}%`
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Jaar'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Percentage van BBP'
              },
              ticks: {
                callback: (value) => {
                  const num = Number(value);
                  const decimals = num >= 10 ? 0 : 1;
                  return `${num.toFixed(decimals)}%`;
                }
              },
              suggestedMax: 40
            }
          }
        }
      });
    } catch (e) {
      console.error('Fout bij het maken van de defense spending chart:', e);
    }
  }

  async function initTotalGdpChart() {
    const chartReady = await waitFor(() => typeof window.Chart !== 'undefined', 100, 50);
    if (!chartReady) {
      console.warn('Chart.js not available — total GDP chart skipped');
      return;
    }

    const canvasReady = await waitFor(() => document.getElementById('totalGdpChart') !== null, 100, 20);
    if (!canvasReady) {
      console.warn('totalGdpChart canvas not found on this page — skipping chart creation');
      return;
    }

    const gdpCanvas = document.getElementById('totalGdpChart');
    const gdpCtx = gdpCanvas.getContext && gdpCanvas.getContext('2d');
    if (!gdpCtx) {
      console.warn('Canvas context not available — skipping total GDP chart');
      return;
    }

    try {
      new Chart(gdpCtx, {
        type: 'line',
        data: {
          labels: gdpYears,
          datasets: [
            {
              label: 'Oekraïne',
              data: ukraineGdpBillions,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.15)',
              tension: 0.25,
              fill: true,
              pointRadius: 3
            },
            {
              label: 'Rusland',
              data: russiaGdpBillions,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.15)',
              tension: 0.25,
              fill: true,
              pointRadius: 3
            },
            {
              label: 'Nederland',
              data: netherlandsGdpBillions,
              borderColor: 'rgba(255, 159, 64, 1)',
              backgroundColor: 'rgba(255, 159, 64, 0.15)',
              tension: 0.25,
              fill: true,
              pointRadius: 3
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: 'Totaal BBP (mrd USD, prijspeil 2015)'
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(2)} mrd USD`
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Jaar'
              }
            },
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: 'BBP (miljard USD)'
              }
            }
          }
        }
      });
    } catch (e) {
      console.error('Fout bij het maken van de totaal BBP chart:', e);
    }
  }

  async function initPopulationChart() {
    const chartReady = await waitFor(() => typeof window.Chart !== 'undefined', 100, 50);
    if (!chartReady) {
      console.warn('Chart.js not available — population chart skipped');
      return;
    }

    const canvasReady = await waitFor(() => document.getElementById('populationChart') !== null, 100, 20);
    if (!canvasReady) {
      console.warn('populationChart canvas not found on this page — skipping chart creation');
      return;
    }

    const populationCanvas = document.getElementById('populationChart');
    const populationCtx = populationCanvas.getContext && populationCanvas.getContext('2d');
    if (!populationCtx) {
      console.warn('Canvas context not available — skipping population chart');
      return;
    }

    try {
      new Chart(populationCtx, {
        type: 'bar',
        data: {
          labels: populationYears,
          datasets: [
            {
              type: 'bar',
              label: 'Mannen',
              data: populationMenMillions,
              backgroundColor: 'rgba(54, 162, 235, 0.8)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              stack: 'population'
            },
            {
              type: 'bar',
              label: 'Vrouwen',
              data: populationWomenMillions,
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              stack: 'population'
            },
            {
              type: 'line',
              label: 'Totaal',
              data: populationTotalMillions,
              borderColor: 'rgba(99, 255, 132, 1)',
              backgroundColor: 'rgba(99, 255, 132, 0.3)',
              tension: 0.2,
              fill: false,
              pointRadius: 3,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: 'Bevolking Oekraïne naar geslacht (miljoen inwoners)'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y;
                  if (typeof value !== 'number') {
                    return context.formattedValue;
                  }
                  return `${context.dataset.label}: ${value.toFixed(2)} mln`;
                }
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Jaar'
              }
            },
            y: {
              stacked: true,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Miljoen inwoners'
              },
              ticks: {
                callback: (value) => `${Number(value).toFixed(0)}`
              }
            }
          }
        }
      });
    } catch (e) {
      console.error('Fout bij het maken van de population chart:', e);
    }
  }

  async function initPopulationRussiaChart() {
    const chartReady = await waitFor(() => typeof window.Chart !== 'undefined', 100, 50);
    if (!chartReady) {
      console.warn('Chart.js not available — population Russia chart skipped');
      return;
    }

    const canvasReady = await waitFor(() => document.getElementById('populationRussiaChart') !== null, 100, 20);
    if (!canvasReady) {
      console.warn('populationRussiaChart canvas not found on this page — skipping chart creation');
      return;
    }

    const populationCanvas = document.getElementById('populationRussiaChart');
    const populationCtx = populationCanvas.getContext && populationCanvas.getContext('2d');
    if (!populationCtx) {
      console.warn('Canvas context not available — skipping population Russia chart');
      return;
    }

    try {
      new Chart(populationCtx, {
        type: 'bar',
        data: {
          labels: populationYears,
          datasets: [
            {
              type: 'bar',
              label: 'Mannen',
              data: populationRussiaMenMillions,
              backgroundColor: 'rgba(75, 192, 192, 0.8)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              stack: 'population-russia'
            },
            {
              type: 'bar',
              label: 'Vrouwen',
              data: populationRussiaWomenMillions,
              backgroundColor: 'rgba(255, 159, 64, 0.8)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
              stack: 'population-russia'
            },
            {
              type: 'line',
              label: 'Totaal',
              data: populationRussiaTotalMillions,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.25)',
              tension: 0.2,
              fill: false,
              pointRadius: 3,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: 'Bevolking Rusland naar geslacht (miljoen inwoners)'
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y;
                  if (typeof value !== 'number') {
                    return context.formattedValue;
                  }
                  return `${context.dataset.label}: ${value.toFixed(2)} mln`;
                }
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Jaar'
              }
            },
            y: {
              stacked: true,
              beginAtZero: true,
              title: {
                display: true,
                text: 'Miljoen inwoners'
              },
              ticks: {
                callback: (value) => `${Number(value).toFixed(0)}`
              }
            }
          }
        }
      });
    } catch (e) {
      console.error('Fout bij het maken van de population Russia chart:', e);
    }
  }

  async function initPopulationAgeChart() {
    const chartReady = await waitFor(() => typeof window.Chart !== 'undefined', 100, 50);
    if (!chartReady) {
      console.warn('Chart.js not available — population age chart skipped');
      return;
    }

    const canvasReady = await waitFor(() => document.getElementById('populationAgeChart') !== null, 100, 20);
    if (!canvasReady) {
      console.warn('populationAgeChart canvas not found on this page — skipping chart creation');
      return;
    }

    const ageCanvas = document.getElementById('populationAgeChart');
    const ageCtx = ageCanvas.getContext && ageCanvas.getContext('2d');
    if (!ageCtx) {
      console.warn('Canvas context not available — skipping population age chart');
      return;
    }

    try {
      new Chart(ageCtx, {
        type: 'bar',
        data: {
          labels: ageYears,
          datasets: [
            {
              label: '0–14 jaar',
              data: ageUkraineChildren,
              backgroundColor: 'rgba(54, 162, 235, 0.75)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              barPercentage: 0.55,
              categoryPercentage: 0.6
            },
            {
              label: '15–64 jaar',
              data: ageUkraineWorking,
              backgroundColor: 'rgba(255, 205, 86, 0.75)',
              borderColor: 'rgba(255, 205, 86, 1)',
              borderWidth: 1,
              barPercentage: 0.55,
              categoryPercentage: 0.6
            },
            {
              label: '65+ jaar',
              data: ageUkraineSenior,
              backgroundColor: 'rgba(255, 99, 132, 0.75)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              barPercentage: 0.55,
              categoryPercentage: 0.6
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: 'Leeftijdsopbouw Oekraïne (% van bevolking)'
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Jaar'
              }
            },
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Percentage van bevolking'
              },
              ticks: {
                callback: (value) => `${Number(value).toFixed(0)}%`
              }
            }
          }
        }
      });
    } catch (e) {
      console.error('Fout bij het maken van de population age chart:', e);
    }
  }

  async function initPopulationAgeRussiaChart() {
    const chartReady = await waitFor(() => typeof window.Chart !== 'undefined', 100, 50);
    if (!chartReady) {
      console.warn('Chart.js not available — population age Russia chart skipped');
      return;
    }

    const canvasReady = await waitFor(() => document.getElementById('populationAgeRussiaChart') !== null, 100, 20);
    if (!canvasReady) {
      console.warn('populationAgeRussiaChart canvas not found on this page — skipping chart creation');
      return;
    }

    const ageCanvas = document.getElementById('populationAgeRussiaChart');
    const ageCtx = ageCanvas.getContext && ageCanvas.getContext('2d');
    if (!ageCtx) {
      console.warn('Canvas context not available — skipping population age Russia chart');
      return;
    }

    try {
      new Chart(ageCtx, {
        type: 'bar',
        data: {
          labels: ageYears,
          datasets: [
            {
              label: '0–14 jaar',
              data: ageRussiaChildren,
              backgroundColor: 'rgba(54, 162, 235, 0.75)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              barPercentage: 0.55,
              categoryPercentage: 0.6
            },
            {
              label: '15–64 jaar',
              data: ageRussiaWorking,
              backgroundColor: 'rgba(255, 205, 86, 0.75)',
              borderColor: 'rgba(255, 205, 86, 1)',
              borderWidth: 1,
              barPercentage: 0.55,
              categoryPercentage: 0.6
            },
            {
              label: '65+ jaar',
              data: ageRussiaSenior,
              backgroundColor: 'rgba(255, 99, 132, 0.75)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              barPercentage: 0.55,
              categoryPercentage: 0.6
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: {
              display: true,
              text: 'Leeftijdsopbouw Rusland (% van bevolking)'
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Jaar'
              }
            },
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Percentage van bevolking'
              },
              ticks: {
                callback: (value) => `${Number(value).toFixed(0)}%`
              }
            }
          }
        }
      });
    } catch (e) {
      console.error('Fout bij het maken van de population age Russia chart:', e);
    }
  }

  function initPopulationToggle() {
    const toggle = document.getElementById('populationToggle');
    if (!toggle) {
      return;
    }

    const buttons = Array.from(toggle.querySelectorAll('button[data-target]'));
    if (buttons.length === 0) {
      return;
    }

    const chartContainers = Array.from(document.querySelectorAll('.population-chart[data-chart]'));

    function activate(target) {
      chartContainers.forEach((container) => {
        const isTarget = container.dataset.chart === target;
        if (isTarget) {
          container.removeAttribute('hidden');
        } else {
          container.setAttribute('hidden', '');
        }
      });

      buttons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.target === target);
      });
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        activate(button.dataset.target);
      });
    });

    // Ensure the default state is consistent if markup changes.
    const activeButton = buttons.find((btn) => btn.classList.contains('active')) || buttons[0];
    activate(activeButton.dataset.target);
  }
})();
