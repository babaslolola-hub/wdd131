
const recordsBody = document.getElementById("records-body");
const totalChecks = document.getElementById("total-checks");
const defectChecks = document.getElementById("defect-checks");
const clearChecks = document.getElementById("clear-checks");
const emptyMessage = document.getElementById("empty-message");
const refreshButton = document.getElementById("refresh-records");

function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

function loadOperatorChecks() {
    recordsBody.replaceChildren();

    let records = [];

    try {
        records = JSON.parse(
            localStorage.getItem("fleetSafeOperatorChecks") || "[]"
        );

        if (!Array.isArray(records)) {
            records = [];
        }
    } catch (error) {
        emptyMessage.textContent = "Saved records could not be read.";
        emptyMessage.hidden = false;
        console.error(error);
        return;
    }

    totalChecks.textContent = records.length;

    const reportedDefects = records.filter(function (record) {
        return Array.isArray(record.defects) &&
            record.defects.length > 0;
    });

    defectChecks.textContent = reportedDefects.length;
    clearChecks.textContent = records.length - reportedDefects.length;
    emptyMessage.hidden = records.length > 0;

    records.forEach(function (record, index) {
        if (!record.supervisorStatus) {
            record.supervisorStatus = "Pending Review";
        }

        if (typeof record.supervisorRemarks !== "string") {
            record.supervisorRemarks = "";
        }

        const row = document.createElement("tr");

        const date = new Date(record.submittedAt);

        row.appendChild(createCell(
            Number.isNaN(date.getTime())
                ? "Unknown date"
                : date.toLocaleString()
        ));

        row.appendChild(createCell(record.operator || "Not recorded"));
        row.appendChild(createCell(record.forklift || "Not recorded"));

        const hasDefects = Array.isArray(record.defects) &&
            record.defects.length > 0;

        row.appendChild(createCell(
            hasDefects ? "DEFECT REPORTED" : "No defects selected"
        ));

        row.appendChild(createCell(
            hasDefects ? record.defects.join(", ") : "None reported"
        ));

        row.appendChild(createCell(record.remarks || "No remarks"));

        // Show individual checklist answers.
        const detailsCell = document.createElement("td");
        const details = document.createElement("details");
        const summary = document.createElement("summary");

        summary.textContent = "View checklist";
        details.appendChild(summary);

        const list = document.createElement("ul");

        if (Array.isArray(record.conditions)) {
            record.conditions.forEach(function (entry) {
                const item = document.createElement("li");
                item.textContent =
                    (entry.item || "Checklist item") +
                    ": " +
                    (entry.condition || "Not recorded");
                list.appendChild(item);
            });
        }

        details.appendChild(list);
        detailsCell.appendChild(details);
        row.appendChild(detailsCell);

        // Supervisor status selector.
        const statusCell = document.createElement("td");
        const statusSelect = document.createElement("select");

        [
            "Pending Review",
            "Under Review",
            "Repair in Progress",
            "Repaired - Awaiting Verification",
            "Cleared for Use"
        ].forEach(function (status) {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            statusSelect.appendChild(option);
        });

        statusSelect.value = record.supervisorStatus;

        statusCell.appendChild(statusSelect);
        row.appendChild(statusCell);

        // Supervisor remarks field.
        const supervisorRemarksCell = document.createElement("td");
        const remarksInput = document.createElement("textarea");

        remarksInput.rows = 3;
        remarksInput.placeholder =
            "Enter repair, verification or safety findings";
        remarksInput.value = record.supervisorRemarks;

        supervisorRemarksCell.appendChild(remarksInput);
        row.appendChild(supervisorRemarksCell);

        // Save supervisor update.
        const actionCell = document.createElement("td");
        const saveButton = document.createElement("button");

        saveButton.type = "button";
        saveButton.textContent = "Save Update";

        saveButton.addEventListener("click", function () {
            const newStatus = statusSelect.value;
            const newRemarks = remarksInput.value.trim();

            // Require verification remarks before clearing reported defects.
            if (
                hasDefects &&
                newStatus === "Cleared for Use" &&
                !newRemarks.toLowerCase().includes("verified")
            ) {
                alert(
                    "Before clearing this forklift, enter supervisor " +
                    "remarks confirming that the repair was verified " +
                    "and the forklift is safe for use."
                );
                return;
            }

            try {
                const currentRecords = JSON.parse(
                    localStorage.getItem("fleetSafeOperatorChecks") || "[]"
                );

                if (
                    !Array.isArray(currentRecords) ||
                    !currentRecords[index]
                ) {
                    alert(
                        "Record not found. Please refresh the dashboard."
                    );
                    return;
                }

                currentRecords[index].supervisorStatus = newStatus;
                currentRecords[index].supervisorRemarks = newRemarks;

                localStorage.setItem(
                    "fleetSafeOperatorChecks",
                    JSON.stringify(currentRecords)
                );

                alert("Supervisor update saved.");
                loadOperatorChecks();
            } catch (error) {
                alert("Could not save the supervisor update.");
                console.error(error);
            }
        });

        actionCell.appendChild(saveButton);
        row.appendChild(actionCell);

        recordsBody.appendChild(row);
    });

    // Save default supervisor values for older records.
    try {
        localStorage.setItem(
            "fleetSafeOperatorChecks",
            JSON.stringify(records)
        );
    } catch (error) {
        console.error(
            "Could not save default supervisor statuses.",
            error
        );
    }
}

refreshButton.addEventListener("click", loadOperatorChecks);

loadOperatorChecks();
