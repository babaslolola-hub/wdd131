const operators = [
    "Test Operator 001",
    "Test Operator 002",
    "Test Operator 003",
    "Test Operator 004",
    "Test Operator 005",
    "Test Operator 006",
    "Test Operator 007",
    "Test Operator 008",
    "Test Operator 009",
    "Test Operator 010",
    "Test Operator 011",
    "Test Operator 012",
    "Test Operator 013",
    "Test Operator 014",
    "Test Operator 015",
    "Test Operator 016",
    "Test Operator 017",
    "Test Operator 018",
    "Test Operator 019",
    "Test Operator 020",
    "Test Operator 021",
    "Test Operator 022",
    "Test Operator 023",
    "Test Operator 024",
    "Test Operator 025",
    "Test Operator 026",
    "Test Operator 027",
    "Test Operator 028",
    "Test Operator 029",
    "Test Operator 030",
    "Test Operator 031",
    "Test Operator 032",
    "Test Operator 033",
    "Test Operator 034",
    "Test Operator 035",
    "Test Operator 036",
    "Test Operator 037",
    "Test Operator 038",
    "Test Operator 039",
    "Test Operator 040",
    "Test Operator 041",
    "Test Operator 042",
    "Test Operator 043",
    "Test Operator 044",
    "Test Operator 045",
    "Test Operator 046",
    "Test Operator 047",
    "Test Operator 048",
    "Test Operator 049",
    "Test Operator 050",
    "Test Operator 051",
    "Test Operator 052",
    "Test Operator 053",
    "Test Operator 054",
    "Test Operator 055",
    "Test Operator 056",
    "Test Operator 057",
    "Test Operator 058",
    "Test Operator 059",
    "Test Operator 060",
    "Test Operator 061",
    "Test Operator 062",
    "Test Operator 063",
    "Test Operator 064",
    "Test Operator 065",
    "Test Operator 066",
    "Test Operator 067",
    "Test Operator 068",
    "Test Operator 069",
    "Test Operator 070",
    "Test Operator 071",
    "Test Operator 072",
    "Test Operator 073",
    "Test Operator 074",
    "Test Operator 075",
    "Test Operator 076",
    "Test Operator 077",
    "Test Operator 078",
    "Test Operator 079",
    "Test Operator 080",
    "Test Operator 081",
    "Test Operator 082",
    "Test Operator 083",
    "Test Operator 084",
    "Test Operator 085",
    "Test Operator 086",
    "Test Operator 087",
    "Test Operator 088",
    "Test Operator 089",
    "Test Operator 090",
    "Test Operator 091",
    "Test Operator 092",
    "Test Operator 093",
    "Test Operator 094",
    "Test Operator 095",
    "Test Operator 096",
    "Test Operator 097",
    "Test Operator 098",
    "Test Operator 099",
    "Test Operator 100",
    "Test Operator 101",
    "Test Operator 102",
    "Test Operator 103",
    "Test Operator 104",
    "Test Operator 105"
];
const machines = [
    "717",
    "718",
    "719",
    "720",
    "721",
    "722",
    "724",
    "726",
    "727",
    "728",
    "729",
    "730",
    "731",
    "732",
    "733",
    "734",
    "735",
    "736",
    "737",
    "738",
    "701",
    "702",
    "703",
    "391",
    "393",
    "394",
    "399",
    "497",
    "498",
    "200"
];

const inspectionTableBody = document.getElementById("inspection-table-body");
machines.forEach(function (machine, index) {

    const row = document.createElement("tr");

    const serialNumber = document.createElement("td");
    serialNumber.textContent = index + 1;

    const machineNumber = document.createElement("td");
    machineNumber.textContent = machine;

    row.appendChild(serialNumber);
    row.appendChild(machineNumber);
    const driverCell = document.createElement("td");
    const driverSelect = document.createElement("select");

    driverSelect.id = `driver-${machine}`;
    driverSelect.name = `driver-${machine}`;

    const driverLabel = document.createElement("label");
    driverLabel.htmlFor = driverSelect.id;
    driverLabel.textContent = `Driver name for FLT ${machine}`;
    driverLabel.className = "visually-hidden";

    driverCell.appendChild(driverLabel);


    const defaultDriver = document.createElement("option");
    defaultDriver.value = "";
    defaultDriver.textContent = "Select driver";
    driverSelect.appendChild(defaultDriver);

    operators.forEach(function (operator) {
        const option = document.createElement("option");
        option.value = operator;
        option.textContent = operator;
        driverSelect.appendChild(option);
    });

    driverCell.appendChild(driverSelect);
    row.appendChild(driverCell);
    const ratingCell = document.createElement("td");
    const ratingSelect = document.createElement("select");

    ratingSelect.id = `rating-${machine}`;
    ratingSelect.name = `rating-${machine}`;

    const ratingLabel = document.createElement("label");
    ratingLabel.htmlFor = ratingSelect.id;
    ratingLabel.textContent = `Preshift rating for FLT ${machine}`;
    ratingLabel.className = "visually-hidden";

    ratingCell.appendChild(ratingLabel);

    const ratings = [
        "Satisfactory",
        "Unsatisfactory",
        "Not Done",
        "Not Applicable"
    ];

    const defaultRating = document.createElement("option");
    defaultRating.value = "";
    defaultRating.textContent = "Select rating";
    ratingSelect.appendChild(defaultRating);

    ratings.forEach(function (rating) {
        const option = document.createElement("option");
        option.value = rating;
        option.textContent = rating;
        ratingSelect.appendChild(option);
    });

    ratingCell.appendChild(ratingSelect);
    row.appendChild(ratingCell);
    const hrCell = document.createElement("td");
    const hrInput = document.createElement("input");
    hrInput.id = `hr-${machine}`;
    hrInput.name = `hr-${machine}`;

    const hrLabel = document.createElement("label");
    hrLabel.htmlFor = hrInput.id;
    hrLabel.textContent = `Hour meter reading for FLT ${machine}`;
    hrLabel.className = "visually-hidden";

    hrCell.appendChild(hrLabel);

    hrInput.type = "number";
    hrInput.step = "0.1";
    hrInput.min = "0";
    hrInput.placeholder = "HR reading";

    hrCell.appendChild(hrInput);
    row.appendChild(hrCell);
    const remarkCell = document.createElement("td");
    const remarkInput = document.createElement("input");
    remarkInput.id = `remark-${machine}`;
    remarkInput.name = `remark-${machine}`;

    const remarkLabel = document.createElement("label");
    remarkLabel.htmlFor = remarkInput.id;
    remarkLabel.textContent = `Remark for FLT ${machine}`;
    remarkLabel.className = "visually-hidden";

    remarkCell.appendChild(remarkLabel);

    remarkInput.type = "text";
    remarkInput.placeholder = "Enter remark";

    remarkCell.appendChild(remarkInput);
    row.appendChild(remarkCell);
    const photoCell = document.createElement("td");
    const photoInput = document.createElement("input");
    photoInput.id = `photo-${machine}`;
    photoInput.name = `photo-${machine}`;

    const photoLabel = document.createElement("label");
    photoLabel.htmlFor = photoInput.id;
    photoLabel.textContent = `Machine photo for FLT ${machine}`;
    photoLabel.className = "visually-hidden";

    photoCell.appendChild(photoLabel);

    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoInput.capture = "environment";

    photoCell.appendChild(photoInput);
    row.appendChild(photoCell);
    const supervisorCell = document.createElement("td");
    const supervisorSelect = document.createElement("select");
    supervisorSelect.id = `supervisor-${machine}`;
    supervisorSelect.name = `supervisor-${machine}`;

    const supervisorLabel = document.createElement("label");
    supervisorLabel.htmlFor = supervisorSelect.id;
    supervisorLabel.textContent = `Supervisor inspection status for FLT ${machine}`;
    supervisorLabel.className = "visually-hidden";

    supervisorCell.appendChild(supervisorLabel);

    const supervisorOptions = [
        "Inspected",
        "Not Inspected",
        "Breakdown"
    ];

    const defaultSupervisor = document.createElement("option");
    defaultSupervisor.value = "";
    defaultSupervisor.textContent = "Select";
    supervisorSelect.appendChild(defaultSupervisor);

    supervisorOptions.forEach(function (status) {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        supervisorSelect.appendChild(option);
    });

    supervisorCell.appendChild(supervisorSelect);
    row.appendChild(supervisorCell);
    inspectionTableBody.appendChild(row);
});
const inspectionForm = document.getElementById("inspection-form");
const inspectionResult = document.getElementById("inspection-result");
inspectionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Inspection form submitted");
});
