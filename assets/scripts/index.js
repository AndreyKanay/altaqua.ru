const initSelect = () => {
  const selects = document.querySelectorAll(".select");
  if (selects.length === 0) return;

  selects.forEach((select) => {
    const input = select.querySelector("input");
    const value = select.querySelector(".select__value");
    const text = select.querySelector(".select__text");
    const items = select.querySelectorAll(".select__item");

    value.addEventListener("click", () => {
      select.classList.toggle("select--active");
    });

    items.forEach((item) => {
      item.addEventListener("click", (event) => {
        const el = event.currentTarget;
        input.value = el.dataset.selectValue;
        text.innerText = el.innerText;
        value.dataset.tooltip = el.innerText;
        select.classList.remove("select--active");
      });
    });

    document.addEventListener("click", (event) => {
      selects.forEach((select) => {
        if (!select.contains(event.target)) {
          select.classList.remove("select--active");
        }
      });
    });
  });
};

const initFilter = () => {
  const header = document.querySelector(".header");
  const filters = document.querySelector(".filters");
  const filters__header = document.querySelector(".filters__header");
  const filters__content = document.querySelector(".filters__content");
  console.log(header);
  filters__header.addEventListener("click", () => {
    if (window.innerWidth > 1220) return;
    filters__header.classList.toggle("filters__header--active");
    filters__content.classList.toggle("filters__content--show");
  });

  window.addEventListener("resize", () => {
    filters.style.top = `${header.clientHeight}px`;
  });
};

const initModal = () => {
  const buttons = document.querySelectorAll("[data-dialog]");
  buttons.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.dataset.dialog;
      const modal = document.querySelector(`#${id}`);
      const title = modal.querySelector(".modal__title");
      const close = modal.querySelector(".modal__close");

      modal.classList.add("modal--show");
      title.innerText = item.dataset.dialogTitle;
      modal.addEventListener("click", (event) => {
        if (event.target !== event.currentTarget) return;
        modal.classList.remove("modal--show");
      });

      close.addEventListener("click", () => {
        modal.classList.remove("modal--show");
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initSelect();
  initFilter();
  initModal();

  const selectivityRange = document.getElementById("selectivity-range");
  const selectivityRangeMin = document.getElementById("selectivity-min");
  const selectivityRangeMax = document.getElementById("selectivity-max");

  selectivityRangeMin.addEventListener("change", (event) => {
    console.log(Number(event.target.value), Number(selectivityRangeMax.value));

    selectivityRange.noUiSlider.set([
      Number(event.target.value),
      Number(selectivityRangeMax.value),
    ]);
  });

  noUiSlider.create(selectivityRange, {
    start: [89, 99.7], // начальные позиции бегунков
    connect: true, // закрашивание области между бегунками
    range: {
      min: 89,
      max: 99.7,
    },
    step: 0.5, // Шаг бегунков
    // tooltips: [true, true],
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return Number(value);
      },
    },
  });

  selectivityRange.noUiSlider.on("update", (event) => {
    selectivityRangeMin.value = event[0];
    selectivityRangeMax.value = event[1];
  });
});
