function selectService(serviceName) {
  document.getElementById("service-name").textContent = serviceName;
}

function bookService() {
  const service = document.getElementById("service-name").textContent;
  if (service !== "None") {
    alert(`You have booked the ${service} service.`);
  } else {
    alert("Please select a service first.");
  }
}
