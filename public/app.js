class Values {
  constructor(name, occupation, money) {
    this.name = name;
    this.occupation = occupation;
    this.money = money;

    this.updateCard(this);
  }

  getFormattedMoney(number) {
    const num = parseFloat(number);
    const formatted = isNaN(num)
      ? "$0.00"
      : num.toLocaleString("en-us", {
          style: "currency",
          currency: "USD",
        });

    return formatted;
  }

  updateCard(values) {
    const nameSpan = document.querySelector(".name");
    const occupationSpan = document.querySelector(".occupation");
    const moneySpan = document.querySelector(".money");

    nameSpan.textContent = values.name.toUpperCase();
    occupationSpan.textContent = values.occupation.toUpperCase();

    const formatted = this.getFormattedMoney(this.money);
    const length = formatted.length;
    const size = Math.max(2, 10 - length * 0.3);

    moneySpan.style.fontSize = `${size}cqw`;
    moneySpan.textContent = formatted;
  }
}

const values = new Values("EXAMPLE NAME", "JOB OCCUPATION", 50000);

function bindValueInput(id, field) {
  document.getElementById(id).addEventListener("input", (e) => {
    values[field] = e.target.value;
    values.updateCard(values);
  });
}

function imageUploadController() {
  const field = document.getElementById("imageUpload");
  const portraitImage = document.querySelector(".portrait");
  const portraitFrame = document.getElementById("portrait-frame");

  field.addEventListener("change", function (e) {
    if (this.files && this.files[0]) {
      const url = URL.createObjectURL(this.files[0]);
      console.log(url);
      portraitImage.src = url;
      portraitImage.onload = () => {
        console.log("[IMAGES] Sucessfully loaded!");
        URL.revokeObjectURL(url);
      };
    }

    this.value = "";
  });
}

function imageToolsController() {
  const xPosSlider = document.getElementById("xPosSlider");
  const yPosSlider = document.getElementById("yPosSlider");
  const sizeSlider = document.getElementById("sizeSlider");
  const portraitFrame = document.getElementById("portrait-frame");

  xPosSlider.addEventListener("input", (e) => {
    portraitFrame.style.left = `${e.target.value}%`;
  });

  yPosSlider.addEventListener("input", (e) => {
    portraitFrame.style.top = `${e.target.value}%`;
  });

  sizeSlider.addEventListener("input", (e) => {
    const scale = e.target.value / 50;
    portraitFrame.style.transform = `scale(${scale})`;
    portraitFrame.style.transformOrigin = "top left";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const start = performance.now();
  console.log("[APP] DOM Loaded...");

  bindValueInput("name", "name");
  console.log("[APP] binded 'name' input to 'values.name'");

  bindValueInput("occupation", "occupation");
  console.log("[APP] binded 'occupation' input to 'values.occupation'");

  bindValueInput("money", "money");
  console.log("[APP] binded 'money' input to 'values.money'");

  console.log("[APP] loading image controllers...'");
  imageUploadController();
  imageToolsController();
  console.log("[APP] Loaded imageUploadController and imageToolsController!");

  const end = performance.now();
  console.log(`[APP] Sucessfully loaded in ${end - start}ms`);
}); //init
