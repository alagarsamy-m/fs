// Set initial leave values
let casualLeave = localStorage.getItem("casualLeave")
  ? parseInt(localStorage.getItem("casualLeave"))
  : 10;
let medicalLeave = localStorage.getItem("medicalLeave")
  ? parseInt(localStorage.getItem("medicalLeave"))
  : 10;

// Update the displayed leave days
document.getElementById("casual-leave").textContent = casualLeave;
document.getElementById("medical-leave").textContent = medicalLeave;

// Handle leave application
document
  .getElementById("leave-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const leaveType = document.getElementById("leave-type").value;
    const leaveDays = parseInt(document.getElementById("leave-days").value);

    if (leaveType === "casual") {
      if (leaveDays <= casualLeave) {
        casualLeave -= leaveDays;
        localStorage.setItem("casualLeave", casualLeave);
        alert("Casual leave applied successfully!");
      } else {
        alert("Not enough Casual leave days available.");
      }
    } else if (leaveType === "medical") {
      if (leaveDays <= medicalLeave) {
        medicalLeave -= leaveDays;
        localStorage.setItem("medicalLeave", medicalLeave);
        alert("Medical leave applied successfully!");
      } else {
        alert("Not enough Medical leave days available.");
      }
    }

    // Check for total leave limit (max 20 days)
    if (casualLeave + medicalLeave > 20) {
      alert("Total leave days exceeded the maximum limit of 20 days!");
      return;
    }

    // Update the UI after applying leave
    document.getElementById("casual-leave").textContent = casualLeave;
    document.getElementById("medical-leave").textContent = medicalLeave;
  });
