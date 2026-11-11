"use strict";

lucide.createIcons();

// ======================================================
// SELECT ELEMENTS
// ======================================================

const vehicleCardsContainer = document.querySelector(".vehicle-cards");
const searchInput = document.querySelector("#searchInput");
const addVehicleBtn = document.querySelector("#addVehicleBtn");

const vehicleOverview = document.querySelector("#vehicleOverview");
const vehicleOverviewLogo = document.querySelector("#vehicleOverviewLogo");
const vehicleOverviewName = document.querySelector("#vehicleOverviewName");
const vehicleOverviewYear = document.querySelector("#vehicleOverviewYear");
const vehicleOverviewMileage = document.querySelector(
  "#vehicleOverviewMileage",
);
const vehicleOverviewFuel = document.querySelector("#vehicleOverviewFuel");
const vehicleOverviewPlate = document.querySelector("#vehicleOverviewPlate");
const vehicleOverviewImage = document.querySelector("#vehicleOverviewImage");

const totalServicesValue = document.querySelector("#totalServicesValue");
const upcomingTasksValue = document.querySelector("#upcomingTasksValue");
const thisMonthCostValue = document.querySelector("#thisMonthCostValue");
const nextServiceValue = document.querySelector("#nextServiceValue");
const nextServiceType = document.querySelector("#nextServiceType");

const addServiceBtn = document.querySelector("#addServiceBtn");
const maintenanceList = document.querySelector("#maintenanceList");
const viewAllHistoryBtn = document.querySelector("#viewAllHistoryBtn");

const spendingSelect = document.querySelector("#spendingSelect");
const totalSpending = document.querySelector("#totalSpending");
const maintenanceChartCanvas = document.querySelector("#maintenanceChart");

const currentMileage = document.querySelector("#currentMileage");
const nextServiceMileage = document.querySelector("#nextServiceMileage");
const mileageProgress = document.querySelector("#mileageProgress");
const mileageProgressFill = document.querySelector("#mileageProgressFill");
const mileageProgressPercent = document.querySelector(
  "#mileageProgressPercent",
);
const mileageRemaining = document.querySelector("#mileageRemaining");

const vehicleModal = document.querySelector("#vehicleModal");
const vehicleForm = document.querySelector("#vehicleForm");
const vehicleOverviewBrand = document.querySelector("#vehicleOverviewBrand");
const vehicleModalTitle = document.querySelector("#vehicleModalTitle");
const vehicleIdInput = document.querySelector("#vehicleIdInput");
const vehicleBrandInput = document.querySelector("#vehicleBrandInput");
const vehicleModelInput = document.querySelector("#vehicleModelInput");
const vehicleYearInput = document.querySelector("#vehicleYearInput");
const vehicleMileageInput = document.querySelector("#vehicleMileageInput");
const vehicleFuelInput = document.querySelector("#vehicleFuelInput");
const vehicleImageInput = document.querySelector("#vehicleImageInput");
const closeVehicleModalBtn = document.querySelector("#closeVehicleModalBtn");
const cancelVehicleBtn = document.querySelector("#cancelVehicleBtn");
const saveVehicleText = document.querySelector("#saveVehicleText");

const serviceModal = document.querySelector("#serviceModal");
const serviceForm = document.querySelector("#serviceForm");
const serviceModalTitle = document.querySelector("#serviceModalTitle");
const serviceIdInput = document.querySelector("#serviceIdInput");
const serviceNameInput = document.querySelector("#serviceNameInput");
const serviceDescriptionInput = document.querySelector(
  "#serviceDescriptionInput",
);
const serviceDateInput = document.querySelector("#serviceDateInput");
const serviceCostInput = document.querySelector("#serviceCostInput");
const serviceMileageInput = document.querySelector("#serviceMileageInput");
const serviceStatusInput = document.querySelector("#serviceStatusInput");
const closeServiceModalBtn = document.querySelector("#closeServiceModalBtn");
const cancelServiceBtn = document.querySelector("#cancelServiceBtn");
const saveServiceText = document.querySelector("#saveServiceText");

const navLinks = document.querySelectorAll(".nav-link");

// ======================================================
// DATA
// ======================================================

let vehicles = [
  {
    id: "volvo",
    brand: "Volvo",
    model: "XC60 B5 AWD Inscription",
    year: 2022,
    mileage: 42850,
    plate: "VXC 602",
    fuel: "Diesel",
    type: "SUV",
    drivetrain: "AWD",
    image: "images/volvo.webp",
    logo: "https://cdn.simpleicons.org/volvo/FFFFFF",
    lastServiceMileage: 35000,
    nextServiceMileage: 45000,
  },
  {
    id: "renault",
    brand: "Renault",
    model: "Clio",
    year: 2023,
    mileage: 28500,
    plate: "NR 458AB",
    fuel: "Petrol",
    type: "Hatchback",
    drivetrain: "FWD",
    image: "images/renault.webp",
    logo: "https://cdn.simpleicons.org/renault/FFFFFF",
    lastServiceMileage: 20000,
    nextServiceMileage: 30000,
  },
  {
    id: "seat",
    brand: "Seat",
    model: "Ibiza",
    year: 2020,
    mileage: 67200,
    plate: "NR 789CD",
    fuel: "Diesel",
    type: "Hatchback",
    drivetrain: "FWD",
    image: "images/seat.webp",
    logo: "https://cdn.simpleicons.org/seat/FFFFFF",
    lastServiceMileage: 60000,
    nextServiceMileage: 75000,
  },
  {
    id: "skoda",
    brand: "Škoda",
    model: "Enyaq",
    year: 2024,
    mileage: 18600,
    plate: "NR 321EF",
    fuel: "Electric",
    type: "SUV",
    drivetrain: "RWD",
    image: "images/skoda.webp",
    logo: "https://cdn.simpleicons.org/skoda/FFFFFF",
    lastServiceMileage: 10000,
    nextServiceMileage: 30000,
  },
];

// ======================================================
// STATE
// ======================================================

let selectedVehicleId = "volvo";

let maintenanceRecords = [];

let searchTerm = "";

let activeSpending = "6months";

let maintenanceChart = null;

// ======================================================
// LOCAL STORAGE
// ======================================================

function saveData() {
  const savedData = {
    vehicles,
    maintenanceRecords,
    selectedVehicleId,
  };

  localStorage.setItem("carMaintenanceData", JSON.stringify(savedData));
}

function loadData() {
  try {
    const storedData = localStorage.getItem("carMaintenanceData");

    if (!storedData) return;

    const parsedData = JSON.parse(storedData);

    if (Array.isArray(parsedData?.vehicles)) {
      vehicles = parsedData.vehicles;
    }

    if (Array.isArray(parsedData?.maintenanceRecords)) {
      maintenanceRecords = parsedData.maintenanceRecords;
    }

    if (typeof parsedData?.selectedVehicleId === "string") {
      selectedVehicleId = parsedData.selectedVehicleId;
    }
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

// ======================================================
// VEHICLE SELECTION
// ======================================================

function selectVehicle(vehicleId) {
  selectedVehicleId = vehicleId;

  saveData();
  renderDashboard();
}

function deleteVehicle(vehicleId) {
  const vehicle = vehicles.find((item) => item.id === vehicleId);

  if (!vehicle) return;

  const confirmed = confirm(
    `Do you want to delete ${vehicle.brand} ${vehicle.model} and all its maintenance records?`,
  );

  if (!confirmed) return;

  vehicles = vehicles.filter((item) => {
    return item.id !== vehicleId;
  });

  maintenanceRecords = maintenanceRecords.filter((record) => {
    return record.vehicleId !== vehicleId;
  });

  if (selectedVehicleId === vehicleId) {
    selectedVehicleId = vehicles[0]?.id ?? null;
  }

  saveData();
  renderDashboard();
}

// ======================================================
// RENDER DASHBOARD
// ======================================================

function renderEmptyDashboard() {
  vehicleOverview.hidden = true;

  totalServicesValue.textContent = "0";
  upcomingTasksValue.textContent = "0";
  thisMonthCostValue.textContent = "0.00 €";

  nextServiceValue.textContent = "—";
  nextServiceType.textContent = "No upcoming service";

  maintenanceList.innerHTML = `
    <div class="maintenance-empty">
      <p>No vehicle selected. Add a vehicle to get started.</p>
    </div>
  `;

  totalSpending.textContent = "0.00 €";

  if (maintenanceChart) {
    maintenanceChart.data.datasets[0].data = maintenanceChart.data.labels.map(
      () => 0,
    );

    maintenanceChart.update();
  }

  currentMileage.textContent = "—";
  nextServiceMileage.textContent = "—";

  mileageProgressFill.style.width = "0%";
  mileageProgressPercent.textContent = "0% completed";
  mileageRemaining.textContent = "—";
}

function renderDashboard() {
  const vehicle = vehicles.find((item) => item.id === selectedVehicleId);

  if (!vehicle) {
    renderVehicleCards();
    renderEmptyDashboard();
    return;
  }

  vehicleOverview.hidden = false;

  vehicleOverviewBrand.textContent = vehicle.brand;
  vehicleOverviewName.textContent = vehicle.model;
  vehicleOverviewYear.textContent = vehicle.year;
  vehicleOverviewMileage.textContent = `${vehicle.mileage.toLocaleString("en-US")} km`;
  vehicleOverviewFuel.textContent = vehicle.fuel;
  vehicleOverviewPlate.textContent = vehicle.plate;

  vehicleOverviewLogo.hidden = !vehicle.logo;

  if (vehicle.logo) {
    vehicleOverviewLogo.src = vehicle.logo;
    vehicleOverviewLogo.alt = `${vehicle.brand} logo`;
  }

  vehicleOverviewImage.src = vehicle.image || "images/default-car.webp";
  vehicleOverviewImage.alt = `${vehicle.brand} ${vehicle.model}`;

  renderMaintenance();
  renderStats();
  renderMaintenanceChart();
  renderMileageProgress();
  renderVehicleCards();
}

// ======================================================
// SERVICE MANAGEMENT
// ======================================================

function getVehicleServices() {
  return maintenanceRecords.filter((record) => {
    return record.vehicleId === selectedVehicleId;
  });
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function renderMaintenance() {
  const services = getVehicleServices();

  if (services.length === 0) {
    maintenanceList.innerHTML = `
      <div class="maintenance-empty">
        <p>No maintenance records yet.</p>
      </div>`;
    return;
  }

  const serviceHTML = services
    .map((service) => {
      const title = escapeHTML(service.title);
      const description = escapeHTML(service.description);

      const date = service.date
        ? new Date(`${service.date}T00:00:00`).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "No date";

      const statusLabels = {
        scheduled: "Scheduled",
        "due-soon": "Due Soon",
        completed: "Completed",
      };

      const statusClass = statusLabels[service.status]
        ? service.status
        : "scheduled";

      const statusText = statusLabels[statusClass];

      const cost = Number(service.cost ?? 0);
      const mileage = Number(service.mileage ?? 0);

      return `
    
<article class="maintenance-item">
  <div class="maintenance-item__content">
    <h3>${title}</h3>
    <p>${description}</p>

  <div class="maintenance-item__meta">
      <span>${escapeHTML(date)}</span>

      <span>${mileage.toLocaleString("en-US")} km</span>

      <span>${cost.toFixed(2)} €</span>
    </div>
  </div>

  <div class="maintenance-item__status">
    <span class="maintenance-status ${statusClass}">
    ${statusText}
    </span>

  <button type="button" class="toggle-status-btn" data-id="${service.id}">
    Change Status
  </button> 

  <button type="button" class="delete-service-btn" data-id="${service.id}">
    Delete
  </button>

  </div>
</article> 
    `;
    })
    .join("");

  maintenanceList.innerHTML = serviceHTML;
}

function renderStats() {
  const services = getVehicleServices();

  // TOTAL SERVICES
  const totalServices = services.length;

  // UPCOMING TASKS
  const upcomingTasks = services.filter((service) => {
    return service.status === "scheduled" || service.status === "due-soon";
  });

  // THIS MONTH COST
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyServices = services.filter((service) => {
    if (service.status !== "completed" || !service.date) {
      return false;
    }

    const serviceDate = new Date(`${service.date}T00:00:00`);

    return (
      serviceDate.getMonth() === currentMonth &&
      serviceDate.getFullYear() === currentYear
    );
  });

  const monthlyCost = monthlyServices.reduce((total, service) => {
    return total + Number(service.cost || 0);
  }, 0);

  // NEXT SERVICE
  const nextService = services
    .filter((service) => {
      return service.status === "scheduled" || service.status === "due-soon";
    })
    .sort((a, b) => {
      return a.date.localeCompare(b.date);
    })[0];

  // UPDATE DOM
  totalServicesValue.textContent = totalServices;

  upcomingTasksValue.textContent = upcomingTasks.length;

  thisMonthCostValue.textContent = `${monthlyCost.toFixed(2)} €`;

  nextServiceValue.textContent = nextService
    ? new Date(`${nextService.date}T00:00:00`).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    : "—";

  nextServiceType.textContent = nextService
    ? nextService.title
    : "No upcoming service";
}

function addService() {
  const title = serviceNameInput.value.trim();
  const description = serviceDescriptionInput.value.trim();
  const date = serviceDateInput.value;
  const cost = Number(serviceCostInput.value);
  const mileage = Number(serviceMileageInput.value);
  const status = serviceStatusInput.value;

  if (!title || !date) return;

  if (
    !Number.isFinite(cost) ||
    !Number.isFinite(mileage) ||
    cost < 0 ||
    mileage < 0
  ) {
    return;
  }

  const newService = {
    id: crypto.randomUUID(),
    vehicleId: selectedVehicleId,
    title,
    description,
    date,
    cost,
    mileage,
    status,
  };

  maintenanceRecords.push(newService);

  saveData();
  renderDashboard();

  serviceForm.reset();
  serviceModal.close();
}

function deleteService(serviceId) {
  maintenanceRecords = maintenanceRecords.filter((record) => {
    return record.id !== serviceId;
  });

  saveData();
  renderDashboard();
}

function updateServiceStatus(serviceId) {
  const service = maintenanceRecords.find((record) => {
    return record.id === serviceId;
  });

  if (!service) return;

  if (service.status === "scheduled") {
    service.status = "due-soon";
  } else if (service.status === "due-soon") {
    service.status = "completed";
  } else {
    service.status = "scheduled";
  }

  saveData();
  renderDashboard();
}

// ======================================================
// MAINTENANCE CHART
// ======================================================

function renderMaintenanceChart() {
  const services = getVehicleServices();

  const monthCount = activeSpending === "12months" ? 12 : 6;

  const today = new Date();

  const labels = [];
  const monthlyTotals = [];
  const monthKeys = [];

  // PREPARE MONTHS

  for (let i = monthCount - 1; i >= 0; i--) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);

    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();

    const key = `${year}-${String(month + 1).padStart(2, "0")}`;

    monthKeys.push(key);

    labels.push(
      monthDate.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
    );

    monthlyTotals.push(0);
  }

  // CALCULATE MONTHLY SPENDING

  services.forEach((service) => {
    if (service.status !== "completed") return;
    if (!service.date) return;

    const serviceDate = new Date(`${service.date}T00:00:00`);

    if (Number.isNaN(serviceDate.getTime())) return;

    const year = serviceDate.getFullYear();
    const month = serviceDate.getMonth() + 1;

    const serviceKey = `${year}-${String(month).padStart(2, "0")}`;

    const monthIndex = monthKeys.indexOf(serviceKey);

    if (monthIndex === -1) return;

    const cost = Number(service.cost);

    if (!Number.isFinite(cost) || cost < 0) return;

    monthlyTotals[monthIndex] += cost;
  });

  // TOTAL SPENDING

  const total = monthlyTotals.reduce((sum, cost) => {
    return sum + cost;
  }, 0);

  totalSpending.textContent = `${total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;

  // UPDATE EXISTING CHART

  if (maintenanceChart) {
    maintenanceChart.data.labels = labels;
    maintenanceChart.data.datasets[0].data = monthlyTotals;

    maintenanceChart.update();
    return;
  }

  // CREATE CHART

  maintenanceChart = new Chart(maintenanceChartCanvas, {
    type: "bar",

    data: {
      labels,

      datasets: [
        {
          label: "Maintenance Spending",
          data: monthlyTotals,

          backgroundColor: "rgba(167, 139, 250, 0.65)",
          hoverBackgroundColor: "#a78bfa",

          borderColor: "#a78bfa",
          borderWidth: 1,
          borderRadius: 8,
          borderSkipped: false,

          maxBarThickness: 38,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      animation: {
        duration: 450,
      },

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          backgroundColor: "#171a2a",
          titleColor: "#f5f6fc",
          bodyColor: "#a0a5bb",
          borderColor: "#292d40",
          borderWidth: 1,
          padding: 12,

          callbacks: {
            label: (context) => {
              return `${context.parsed.y.toFixed(2)} €`;
            },
          },
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
          },

          ticks: {
            color: "#a0a5bb",
            font: {
              size: 11,
            },
          },

          border: {
            display: false,
          },
        },

        y: {
          beginAtZero: true,

          grid: {
            color: "rgba(255, 255, 255, 0.06)",
          },

          ticks: {
            color: "#a0a5bb",

            callback: (value) => {
              return `${value} €`;
            },
          },

          border: {
            display: false,
            dash: [4, 4],
          },
        },
      },
    },
  });
}

// ======================================================
// MILEAGE PROGRESS
// ======================================================

function renderMileageProgress() {
  const vehicle = vehicles.find((item) => {
    return item.id === selectedVehicleId;
  });

  if (!vehicle) return;

  const current = Number(vehicle.mileage);
  const last = Number(vehicle.lastServiceMileage);
  const next = Number(vehicle.nextServiceMileage);

  const progress = current - last;
  const interval = next - last;

  const percentage =
    interval > 0 ? Math.min(100, Math.max(0, (progress / interval) * 100)) : 0;

  mileageProgressFill.style.width = `${percentage}%`;

  const remaining = Math.max(0, next - current);

  currentMileage.textContent = `${current.toLocaleString("en-US")} km`;

  nextServiceMileage.textContent = `${next.toLocaleString("en-US")} km`;

  mileageProgressPercent.textContent = `${Math.round(percentage)} % completed`;

  mileageRemaining.textContent = `${remaining.toLocaleString("en-US")} km remaining`;
}

// ======================================================
// MODAL MANAGEMENT
// ======================================================

function closeServiceModal() {
  serviceModal.close();
  serviceForm.reset();
}

function closeVehicleModal() {
  vehicleModal.close();
  vehicleForm.reset();
}

function addVehicle() {
  const brand = vehicleBrandInput.value.trim();
  const model = vehicleModelInput.value.trim();
  const year = Number(vehicleYearInput.value);
  const mileage = Number(vehicleMileageInput.value);
  const fuel = vehicleFuelInput.value;
  const image = vehicleImageInput.value;

  if (
    !brand ||
    !model ||
    !Number.isInteger(year) ||
    year < 1886 ||
    year > new Date().getFullYear() + 1 ||
    !Number.isFinite(mileage) ||
    mileage < 0
  ) {
    return;
  }

  const newVehicle = {
    id: crypto.randomUUID(),
    brand,
    model,
    year,
    mileage,
    plate: "Not specified",
    fuel,
    type: "Other",
    drivetrain: "N/A",
    image: image || "images/default-car.webp",
    logo: "",
    lastServiceMileage: mileage,
    nextServiceMileage: mileage + 10000,
  };

  vehicles.push(newVehicle);

  selectedVehicleId = newVehicle.id;

  searchTerm = "";
  searchInput.value = "";

  saveData();
  renderDashboard();

  vehicleForm.reset();
  vehicleModal.close();
}

// ======================================================
// RENDER VEHICLE CARDS
// ======================================================

function renderVehicleCards() {
  const filteredVehicles = vehicles.filter((vehicle) => {
    const vehicleName = `${vehicle.brand} ${vehicle.model}`.toLowerCase();

    return vehicleName.includes(searchTerm.toLowerCase());
  });

  if (filteredVehicles.length === 0) {
    const message =
      vehicles.length === 0
        ? "No vehicles yet. Add your first vehicle."
        : "No vehicles found. Try another search.";

    vehicleCardsContainer.innerHTML = `
    <div class="vehicles-empty">
      <i data-lucide="car-front"></i>
      <p>${message}</p>
    </div>
  `;

    lucide.createIcons();
    return;
  }

  const vehicleHTML = filteredVehicles
    .map((vehicle) => {
      const isActive = vehicle.id === selectedVehicleId;

      const brand = escapeHTML(vehicle.brand);
      const model = escapeHTML(vehicle.model);
      const image = escapeHTML(vehicle.image || "images/default-car.webp");
      const logo = escapeHTML(vehicle.logo || "");
      const id = escapeHTML(vehicle.id);

      return ` 
  <div class="vehicle-card-wrapper">
    <button
      class="vehicle-card ${isActive ? "active" : ""}"
      type="button"
      data-vehicle="${id}"
      aria-pressed="${isActive}"
    >
      <img
        src="${image}"
        alt="${brand} ${model}"
        class="vehicle-image"
      />

      <div class="vehicle-card-overlay"></div>

      <div class="vehicle-card-header">
        ${logo ? `<img src="${logo}" alt="" class="vehicle-brand-logo" />` : ""}

        <h3>${brand} ${model}</h3>
      </div>

      <span class="vehicle-selected-icon">
        <i data-lucide="check"></i>
      </span>
    </button>

    <button
      type="button"
      class="delete-vehicle-btn"
      data-id="${id}"
      aria-label="Delete ${brand} ${model}"
      title="Delete vehicle"
    >
      <i data-lucide="trash-2"></i>
    </button>
  </div>
`;
    })
    .join("");

  vehicleCardsContainer.innerHTML = vehicleHTML;

  lucide.createIcons();
}

// ======================================================
// EVENT LISTENERS
// ======================================================

vehicleCardsContainer.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-vehicle-btn");

  if (deleteBtn) {
    deleteVehicle(deleteBtn.dataset.id);
    return;
  }

  const card = event.target.closest(".vehicle-card");

  if (!card || !vehicleCardsContainer.contains(card)) return;

  selectVehicle(card.dataset.vehicle);
});

addServiceBtn.addEventListener("click", () => {
  serviceModal.showModal();
});

serviceForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addService();
});

maintenanceList.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".delete-service-btn");

  if (deleteBtn) {
    const serviceId = deleteBtn.dataset.id;
    deleteService(serviceId);
    return;
  }

  const statusBtn = event.target.closest(".toggle-status-btn");

  if (statusBtn) {
    const serviceId = statusBtn.dataset.id;
    updateServiceStatus(serviceId);
  }
});

spendingSelect.addEventListener("change", () => {
  activeSpending = spendingSelect.value;

  renderMaintenanceChart();
});

cancelServiceBtn.addEventListener("click", () => {
  closeServiceModal();
});

closeServiceModalBtn.addEventListener("click", () => {
  closeServiceModal();
});

addVehicleBtn.addEventListener("click", () => {
  vehicleModal.showModal();
});

closeVehicleModalBtn.addEventListener("click", () => {
  closeVehicleModal();
});

cancelVehicleBtn.addEventListener("click", () => {
  closeVehicleModal();
});

vehicleForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addVehicle();
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim();

  renderVehicleCards();
});

// ======================================================
// INITIALIZE APP
// ======================================================

function initApp() {
  loadData();
  renderDashboard();
}

initApp();
