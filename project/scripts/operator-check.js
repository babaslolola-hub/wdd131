
const operators = [
    "Test Operator 001", "Test Operator 002", "Test Operator 003",
    "Test Operator 004", "Test Operator 005", "Test Operator 006",
    "Test Operator 007", "Test Operator 008", "Test Operator 009",
    "Test Operator 010", "Test Operator 011", "Test Operator 012",
    "Test Operator 013", "Test Operator 014", "Test Operator 015",
    "Test Operator 016", "Test Operator 017", "Test Operator 018",
    "Test Operator 019", "Test Operator 020", "Test Operator 021",
    "Test Operator 022", "Test Operator 023", "Test Operator 024",
    "Test Operator 025", "Test Operator 026", "Test Operator 027",
    "Test Operator 028", "Test Operator 029", "Test Operator 030",
    "Test Operator 031", "Test Operator 032", "Test Operator 033",
    "Test Operator 034", "Test Operator 035", "Test Operator 036",
    "Test Operator 037", "Test Operator 038", "Test Operator 039",
    "Test Operator 040", "Test Operator 041", "Test Operator 042",
    "Test Operator 043", "Test Operator 044", "Test Operator 045",
    "Test Operator 046", "Test Operator 047", "Test Operator 048",
    "Test Operator 049", "Test Operator 050", "Test Operator 051",
    "Test Operator 052", "Test Operator 053", "Test Operator 054",
    "Test Operator 055", "Test Operator 056", "Test Operator 057",
    "Test Operator 058", "Test Operator 059", "Test Operator 060",
    "Test Operator 061", "Test Operator 062", "Test Operator 063",
    "Test Operator 064", "Test Operator 065", "Test Operator 066",
    "Test Operator 067", "Test Operator 068", "Test Operator 069",
    "Test Operator 070", "Test Operator 071", "Test Operator 072",
    "Test Operator 073", "Test Operator 074", "Test Operator 075",
    "Test Operator 076", "Test Operator 077", "Test Operator 078",
    "Test Operator 079", "Test Operator 080", "Test Operator 081",
    "Test Operator 082", "Test Operator 083", "Test Operator 084",
    "Test Operator 085", "Test Operator 086", "Test Operator 087",
    "Test Operator 088", "Test Operator 089", "Test Operator 090",
    "Test Operator 091", "Test Operator 092", "Test Operator 093",
    "Test Operator 094", "Test Operator 095", "Test Operator 096",
    "Test Operator 097", "Test Operator 098", "Test Operator 099",
    "Test Operator 100", "Test Operator 101", "Test Operator 102",
    "Test Operator 103", "Test Operator 104", "Test Operator 105"
];

const machines = [
    "717", "718", "719", "720", "721", "722", "724", "726",
    "727", "728", "729", "730", "731", "732", "733", "734",
    "735", "736", "737", "738", "701", "702", "703", "391",
    "393", "394", "399", "497", "498", "200"
];

const checklistItems = [
    "Tires and wheels",
    "Forks and attachments",
    "Mast, chains and lift mechanism",
    "Service brake and parking brake",
    "Steering",
    "Horn",
    "Lights and warning devices",
    "Seat belt and operator restraint",
    "Hydraulic hoses and fluid leaks",
    "Battery, cables or fuel system",
    "Overhead guard and load backrest",
    "General condition and visible damage"
];

const operatorName = document.getElementById("operator-name");
const fltNumber = document.getElementById("flt-number");
const checklistBody = document.getElementById("operator-checklist-body");
const operatorForm = document.getElementById("operator-check-form");
const result = document.getElementById("operator-check-result");

// Populate operator dropdown
operators.forEach(function (operator) {
    const option = document.createElement("option");
    option.value = operator;
    option.textContent = operator;
    operatorName.appendChild(option);
});

// Populate FLT dropdown
machines.forEach(function (machine) {
    const option = document.createElement("option");
    option.value = machine;
    option.textContent = machine;
    fltNumber.appendChild(option);
});

// Build checklist rows
checklistItems.forEach(function (item, index) {
    const row = document.createElement("tr");

    const numberCell = document.createElement("td");
    numberCell.textContent = index + 1;

    const itemCell = document.createElement("td");
    itemCell.textContent = item;

    const conditionCell = document.createElement("td");
    const conditionSelect = document.createElement("select");

    conditionSelect.name = `condition-${index}`;
    conditionSelect.dataset.item = item;
    conditionSelect.required = true;

    const choices = [
        { value: "", label: "Select condition" },
        { value: "OK", label: "OK" },
        { value: "Defect", label: "Defect" },
        { value: "Not Applicable", label: "Not Applicable" }
    ];

    choices.forEach(function (choice) {
        const option = document.createElement("option");
        option.value = choice.value;
        option.textContent = choice.label;
        conditionSelect.appendChild(option);
    });

    conditionCell.appendChild(conditionSelect);
    row.append(numberCell, itemCell, conditionCell);
    checklistBody.appendChild(row);
});

 // Handle form submission
operatorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const conditions = Array.from(
        checklistBody.querySelectorAll("select")
    ).map(function (select) {
        return {
            item: select.dataset.item,
            condition: select.value
        };
    });

    const defects = conditions.filter(function (entry) {
        return entry.condition === "Defect";
    });

    const remarks = document.getElementById("operator-remarks").value.trim();
    const photoInput = document.getElementById("defect-photo");

    if (!operatorName.value || !fltNumber.value) {
        result.textContent = "Please select the operator and forklift.";
        return;
    }

    if (conditions.some(function (entry) {
        return !entry.condition;
    })) {
        result.textContent = "Please complete every checklist item.";
        return;
    }

    if (
        defects.length > 0 &&
        remarks === "" &&
        photoInput.files.length === 0
    ) {
        result.textContent =
            "Defects were selected. Add defect details or a photo before submitting.";
        return;
    }

    const inspectionRecord = {
        operator: operatorName.value,
        forklift: fltNumber.value,
        submittedAt: new Date().toISOString(),
        conditions: conditions,
        defects: defects.map(function (entry) {
            return entry.item;
        }),
        remarks: remarks,
        status: defects.length > 0
            ? "Defect Reported"
            : "No Defects Selected"
    };

    try {
        const storedData = localStorage.getItem("fleetSafeOperatorChecks");
        const savedRecords = storedData ? JSON.parse(storedData) : [];

        if (!Array.isArray(savedRecords)) {
            throw new Error("Saved inspection data is not a valid list.");
        }

        savedRecords.push(inspectionRecord);

        localStorage.setItem(
            "fleetSafeOperatorChecks",
            JSON.stringify(savedRecords)
        );

        // Confirm that the record was actually stored.
        const verifyRecords = JSON.parse(
            localStorage.getItem("fleetSafeOperatorChecks") || "[]"
        );

        const wasSaved = verifyRecords.some(function (record) {
            return record.submittedAt === inspectionRecord.submittedAt &&
                record.forklift === inspectionRecord.forklift;
        });

        if (!wasSaved) {
            throw new Error("The new inspection could not be verified in storage.");
        }

        if (defects.length > 0) {
            result.textContent =
                `Warning: ${defects.length} defect(s) reported for FLT ${fltNumber.value}. ` +
                "Do not operate until the machine has been assessed and cleared by an authorised person. " +
                "The inspection record was saved successfully.";
        } else {
            result.textContent =
                `Pre-shift check for FLT ${fltNumber.value} was saved successfully.`;
        }

        operatorForm.reset();

    } catch (error) {
        result.textContent =
            "ERROR: The inspection could not be saved. " +
            "Please report this to the system administrator and do not assume the record was submitted.";

        console.error("FleetSafe submission error:", error);
    }
});
