const canvas = document.createElement("canvas");
canvas.width = 512;
canvas.height = 512;
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
};

const proxyUrl = "https:/rtx3090.loclx.io/generate"; // The proxy URL you're running
const apiUrl = "https://rtx3090.loclx.io/generate"; // Your Flask API endpoint

const inputElement = document.getElementById("prompt");
const inputValue = inputElement.value;
const context = canvas.getContext("2d");
context.font = "24px Arial"; // Set the font style before drawing text

// Draw text onto the canvas
context.fillText("GaaaaaaaaaaaaOM", 10, 50);

// Loading the original image onto the canvas
const img = new Image();
img.src = "creations/output.png"; // Replace with your image URL
img.onload = function () {
  context.drawImage(img, 0, 0, canvas.width, canvas.height);

  const url = canvas.toDataURL();
  const a = document.getElementById("imageContainer");
  a.download = "output.png";
  a.href = url;
  a.textContent = "Download PNG";

  imageContainer.appendChild(canvas);
};

async function run(event) {
  event.preventDefault();
  try {
    const inputElement = document.getElementById("prompt");
    const inputValue = inputElement.value;
    const payload = {
      input: inputValue,
      confirmation: 0, // Set to 1 to confirm that renderAi function is being used
    };
    const response = await fetch(proxyUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const imgElement = document.createElement("img");
      imgElement.src = URL.createObjectURL(blob);
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = ""; // Clear previous content
      imageContainer.appendChild(imgElement); // Append image element to container
      // Update the canvas with the new image
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
      context.fillText(inputValue, 10, 50); // Draw the new text
    } else {
      console.error("Failed to fetch image:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// img conversor to AI render
async function renderAi(event) {
  event.preventDefault();
  try {
    const promptElement = document.getElementById("prompt");
    const promptValue = inputElement.value;
    const inputValue = base64Result.innerHTML;
    const payload = {
      prompt: promptValue,
      input: inputValue,
      confirmation: 1, // Set to 1 to confirm that renderAi function is being used
    };
    const response = await fetch(proxyUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payload }),
    });

    if (response.ok) {
      const blob = await response.blob();
      const imgElement = document.createElement("img");
      imgElement.src = URL.createObjectURL(blob);
      const imageContainer = document.getElementById("imageContainer");
      imageContainer.innerHTML = ""; // Clear previous content
      imageContainer.appendChild(imgElement); // Append image element to container
      // Update the canvas with the new image
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
      context.fillText(inputValue, 10, 50); // Draw the new text
    } else {
      console.error("Failed to fetch image:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
function convertToBase64() {
  const fileInput = document.getElementById("imageInput");
  const base64Result = document.getElementById("base64Result");

  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const base64String = event.target.result;
      base64Result.innerHTML = `${base64String}`;

      renderAi(event);
    };

    reader.readAsDataURL(selectedFile);
  } else {
    base64Result.innerHTML = "No image selected.";
  }
}

// JavaScript function to previsualize the uploaded image

function previewImage() {
  var imageInput = document.getElementById("imageInput");
  var imagePreview = document.getElementById("imagePreview");

  // Clear any previous image
  imagePreview.innerHTML = "";

  if (imageInput.files && imageInput.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "512px";
      img.style.height = "512px";
      imagePreview.appendChild(img);
    };

    reader.readAsDataURL(imageInput.files[0]);
  }
}

function convertToJpgAndBase64() {
  const fileInput = document.getElementById("imageInput");
  const base64Result = document.getElementById("base64Result");

  const selectedFile = fileInput.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;

      img.onload = function () {
        // Create a canvas and draw the image on it
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Convert the canvas content to a Blob in JPG format
        canvas.toBlob(function (blob) {
          // Create a new FileReader to convert the Blob to base64
          const jpgReader = new FileReader();

          jpgReader.onload = function (event) {
            const base64String = event.target.result;
            base64Result.innerHTML = base64String;

            // You can now use the base64String as needed
            renderAi(event);
          };

          // Read the Blob as data URL (base64)
          jpgReader.readAsDataURL(blob);
        }, "image/jpeg");
      };
    };

    // Read the selected file as a data URL
    reader.readAsDataURL(selectedFile);
  } else {
    base64Result.innerHTML = "No image selected.";
  }
}
