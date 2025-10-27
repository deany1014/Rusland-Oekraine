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
})();
