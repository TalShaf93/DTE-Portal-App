const Projects = [
  { id: '8985338442', name: 'Skylotec Rework-General .2,', productID: '', productName: 'TN15S2P-50S-01', numOfItems: 30 },
  { id: '9631570013', name: 'Skylotec 810 TN15S2P-50S-01 .6.', productID: '5507872717', productName: 'TN15S2P-50S-01', numOfItems: 127 },
  { id: '9410466104', name: 'UFORM 1100 PCS', productID: '3934899671', productName: '1S1P U-Form 7mm tabs', numOfItems: 1100 },
  { id: '9300831255', name: 'E4 DE TN2S2P-29M .2.', productID: '3944049148', productName: 'TN2S2P-26J-02', numOfItems: 500},
  { id: '9511825757', name: 'E4 DE TN2S2P-MJ1 .3.', productID: '3944049148', productName: 'TN2S2P-26J-02', numOfItems: 400}
];


//example for fatch items result for project id: 9631570013
const projectItems = [
  {
    "id": "9448531925",
    "name": "BX1145A5943"
  },
  {
    "id": "9529442123",
    "name": "BX1145A6024"
  },
  {
    "id": "9529442951",
    "name": "BX1145A6028"
  },
  {
    "id": "9609673472",
    "name": "BX1145A6058"
  },
  {
    "id": "9609675092",
    "name": "BX1145A6061"
  },
  {
    "id": "9609676147",
    "name": "BX1145A6063"
  },
  {
    "id": "9609678225",
    "name": "BX1145A6067"
  },
  {
    "id": "9609678808",
    "name": "BX1145A6068"
  },
  {
    "id": "9609679283",
    "name": "BX1145A6069"
  },
  {
    "id": "9609679777",
    "name": "BX1145A6070"
  },
  {
    "id": "9609684905",
    "name": "BX1145A6079"
  },
  {
    "id": "9609685290",
    "name": "BX1145A6080"
  },
  {
    "id": "9609685622",
    "name": "BX1145A6081"
  },
  {
    "id": "9609685939",
    "name": "BX1145A6082"
  },
  {
    "id": "9609686250",
    "name": "BX1145A6083"
  },
  {
    "id": "9609686784",
    "name": "BX1145A6084"
  },
  {
    "id": "9609687419",
    "name": "BX1145A6085"
  },
  {
    "id": "9609687950",
    "name": "BX1145A6086"
  },
  {
    "id": "9609688312",
    "name": "BX1145A6087"
  },
  {
    "id": "9609688555",
    "name": "BX1145A6088"
  },
  {
    "id": "9609688819",
    "name": "BX1145A6089"
  },
  {
    "id": "9609689099",
    "name": "BX1145A6090"
  },
  {
    "id": "9609689338",
    "name": "BX1145A6091"
  },
  {
    "id": "9609689592",
    "name": "BX1145A6092"
  },
  {
    "id": "9609689815",
    "name": "BX1145A6093"
  },
  {
    "id": "9609690051",
    "name": "BX1145A6094"
  },
  {
    "id": "9609690272",
    "name": "BX1145A6095"
  },
  {
    "id": "9609690524",
    "name": "BX1145A6096"
  },
  {
    "id": "9609690719",
    "name": "BX1145A6097"
  },
  {
    "id": "9609691032",
    "name": "BX1145A6098"
  },
  {
    "id": "9609691589",
    "name": "BX1145A6099"
  },
  {
    "id": "9609691821",
    "name": "BX1145A6100"
  },
  {
    "id": "9609692101",
    "name": "BX1145A6101"
  },
  {
    "id": "9609692344",
    "name": "BX1145A6102"
  },
  {
    "id": "9609692869",
    "name": "BX1145A6103"
  },
  {
    "id": "9609693496",
    "name": "BX1145A6104"
  },
  {
    "id": "9609694260",
    "name": "BX1145A6105"
  },
  {
    "id": "9609694886",
    "name": "BX1145A6106"
  },
  {
    "id": "9609695462",
    "name": "BX1145A6107"
  },
  {
    "id": "9609696004",
    "name": "BX1145A6108"
  },
  {
    "id": "9609696576",
    "name": "BX1145A6109"
  },
  {
    "id": "9609697157",
    "name": "BX1145A6110"
  },
  {
    "id": "9609697755",
    "name": "BX1145A6111"
  },
  {
    "id": "9609698337",
    "name": "BX1145A6112"
  },
  {
    "id": "9609698893",
    "name": "BX1145A6113"
  },
  {
    "id": "9609700111",
    "name": "BX1145A6114"
  },
  {
    "id": "9609700948",
    "name": "BX1145A6115"
  },
  {
    "id": "9609701618",
    "name": "BX1145A6116"
  },
  {
    "id": "9609702703",
    "name": "BX1145A6117"
  },
  {
    "id": "9670766691",
    "name": "BX1145A6118"
  },
  {
    "id": "9670766734",
    "name": "BX1145A6119"
  },
  {
    "id": "9670766807",
    "name": "BX1145A6120"
  },
  {
    "id": "9670766889",
    "name": "BX1145A6121"
  },
  {
    "id": "9670766966",
    "name": "BX1145A6122"
  },
  {
    "id": "9670767057",
    "name": "BX1145A6123"
  },
  {
    "id": "9670767133",
    "name": "BX1145A6124"
  },
  {
    "id": "9670767208",
    "name": "BX1145A6125"
  },
  {
    "id": "9670767298",
    "name": "BX1145A6126"
  },
  {
    "id": "9670767396",
    "name": "BX1145A6127"
  },
  {
    "id": "9670767483",
    "name": "BX1145A6128"
  },
  {
    "id": "9670767598",
    "name": "BX1145A6129"
  },
  {
    "id": "9670767831",
    "name": "BX1145A6130"
  },
  {
    "id": "9670767977",
    "name": "BX1145A6131"
  },
  {
    "id": "9670768116",
    "name": "BX1145A6132"
  },
  {
    "id": "9670768299",
    "name": "BX1145A6133"
  },
  {
    "id": "9670768551",
    "name": "BX1145A6134"
  },
  {
    "id": "9670768712",
    "name": "BX1145A6135"
  },
  {
    "id": "9670768898",
    "name": "BX1145A6136"
  },
  {
    "id": "9670769175",
    "name": "BX1145A6137"
  },
  {
    "id": "9670769343",
    "name": "BX1145A6138"
  },
  {
    "id": "9670769533",
    "name": "BX1145A6139"
  },
  {
    "id": "9670769666",
    "name": "BX1145A6140"
  },
  {
    "id": "9670769771",
    "name": "BX1145A6141"
  },
  {
    "id": "9670769869",
    "name": "BX1145A6142"
  },
  {
    "id": "9670769956",
    "name": "BX1145A6143"
  },
  {
    "id": "9670770043",
    "name": "BX1145A6144"
  },
  {
    "id": "9670770125",
    "name": "BX1145A6145"
  },
  {
    "id": "9670770242",
    "name": "BX1145A6146"
  },
  {
    "id": "9670770348",
    "name": "BX1145A6147"
  },
  {
    "id": "9670770479",
    "name": "BX1145A6148"
  },
  {
    "id": "9670770565",
    "name": "BX1145A6149"
  },
  {
    "id": "9670770664",
    "name": "BX1145A6150"
  },
  {
    "id": "9670770752",
    "name": "BX1145A6151"
  },
  {
    "id": "9670770820",
    "name": "BX1145A6152"
  },
  {
    "id": "9670770932",
    "name": "BX1145A6153"
  },
  {
    "id": "9670771075",
    "name": "BX1145A6154"
  },
  {
    "id": "9670771217",
    "name": "BX1145A6155"
  },
  {
    "id": "9670771361",
    "name": "BX1145A6156"
  },
  {
    "id": "9670771471",
    "name": "BX1145A6157"
  },
  {
    "id": "9670771551",
    "name": "BX1145A6158"
  },
  {
    "id": "9670771626",
    "name": "BX1145A6159"
  },
  {
    "id": "9670771693",
    "name": "BX1145A6160"
  },
  {
    "id": "9670771772",
    "name": "BX1145A6161"
  },
  {
    "id": "9670771959",
    "name": "BX1145A6162"
  },
  {
    "id": "9670772198",
    "name": "BX1145A6163"
  },
  {
    "id": "9670772388",
    "name": "BX1145A6164"
  },
  {
    "id": "9670772583",
    "name": "BX1145A6165"
  },
  {
    "id": "9670772989",
    "name": "BX1145A6166"
  },
  {
    "id": "9670773221",
    "name": "BX1145A6167"
  },
  {
    "id": "9670773417",
    "name": "BX1145A6168"
  },
  {
    "id": "9670773614",
    "name": "BX1145A6169"
  },
  {
    "id": "9670773776",
    "name": "BX1145A6170"
  },
  {
    "id": "9670773910",
    "name": "BX1145A6171"
  },
  {
    "id": "9670774063",
    "name": "BX1145A6172"
  },
  {
    "id": "9670774144",
    "name": "BX1145A6173"
  },
  {
    "id": "9670774193",
    "name": "BX1145A6174"
  },
  {
    "id": "9670774262",
    "name": "BX1145A6175"
  },
  {
    "id": "9670774312",
    "name": "BX1145A6176"
  },
  {
    "id": "9670774361",
    "name": "BX1145A6177"
  },
  {
    "id": "9683083579",
    "name": "BX1145A6178"
  },
  {
    "id": "9683085142",
    "name": "BX1145A6179"
  },
  {
    "id": "9683086710",
    "name": "BX1145A6180"
  },
  {
    "id": "9683088209",
    "name": "BX1145A6181"
  },
  {
    "id": "9683089519",
    "name": "BX1145A6182"
  },
  {
    "id": "9683090893",
    "name": "BX1145A6183"
  },
  {
    "id": "9683092557",
    "name": "BX1145A6184"
  },
  {
    "id": "9683094106",
    "name": "BX1145A6185"
  },
  {
    "id": "9683110205",
    "name": "BX1145A6186"
  },
  {
    "id": "9683110649",
    "name": "BX1145A6187"
  },
  {
    "id": "9683111094",
    "name": "BX1145A6188"
  },
  {
    "id": "9683111418",
    "name": "BX1145A6189"
  },
  {
    "id": "9683111679",
    "name": "BX1145A6190"
  },
  {
    "id": "9683111850",
    "name": "BX1145A6191"
  },
  {
    "id": "9683112013",
    "name": "BX1145A6192"
  },
  {
    "id": "9683112191",
    "name": "BX1145A6193"
  },
  {
    "id": "9401066848",
    "name": "BX1145A5900"
  },
  {
    "id": "9693664158",
    "name": "BX1145A6194"
  }
];

//example for fatch items status result for item id: 9448531925
const itemStatus = {
  "Initial Assembly": "Done",
  "Welding": "Done",
  "Soldering": "Done",
  "Test & Validation": "Done",
  "Final Assembly": "In Progress",
};

//example for fatch product information result for product id: 5507872717 in project id: 9631570013
const productInfo = {
  "name": "TN15S2P-50S-01",
  "files": [
    {
      "link": "https://dan-tech-team.monday.com/protected_static/13237311/resources/1241918141/TN15S2P-50S-01.pdf"
    },
    {
      "link": "https://dan-tech-team.monday.com/protected_static/13237311/resources/1892251614/Production%20manual%20Skylotec.pdf"
    },
  ],
  "final assembly": [
    {
      "value": "Vacuum passed"
    },
    {
      "value": "Charger connection ON"
    },
    {
      "value": "Battery suitable to socket"
    },
    {
      "value": "Straight adhesive panel"
    },
    {
      "value": "Label is clean and straight with no air bubbles"
    },
    {
      "value": "No scratches and no cracks clean case"
    },
    {
      "value": "Pins are fully screwed in and not broken"
    },
    {
      "value": "Shake test"
    },
  ]
};




export { Projects, projectItems, itemStatus, productInfo };
