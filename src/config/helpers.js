export const downloadCanvasToImage = () => {
  const canvas = document.querySelector("canvas");
  const dataURL = canvas.toDataURL();
  const link = document.createElement("a");

  link.href = dataURL;
  link.download = "canvas.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const reader = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = () => reject(fileReader.error);
    fileReader.readAsDataURL(file);
  });

export const getContrastingColor = (color) => {
  // Remove the '#' character if it exists
  const hex = color.replace("#", "");

  // Convert the hex string to RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate the brightness of the color
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black or white depending on the brightness
  return brightness > 128 ? "black" : "white";
};

/**
 * Parses URL query parameters and returns an object with parameter values
 */
export const getURLParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fullTextureParam = urlParams.get("fullTexture");
  const logoTextureParam = urlParams.get("logoTexture");
  const designUrl = urlParams.get("design");
  const logoUrl = urlParams.get("logo");

  let logoDataURL = null;
  if (logoUrl) {
    logoDataURL = atob(logoUrl);
  }

  return {
    designUrl: designUrl,
    logoUrl: logoDataURL,
    color: urlParams.get("color"),
    isFullTexture:
      fullTextureParam !== null ? fullTextureParam === "true" : null,
    isLogoTexture:
      logoTextureParam !== null ? logoTextureParam === "true" : null,
  };
};

/**
 * Loads an image from URL and returns a promise with the image data URL
 */
export const loadImageFromURL = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve(null);
      return;
    }

    // Check if it's already a data URL
    if (url.startsWith("data:")) {
      resolve(url);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous"; // Handle CORS

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      } catch (error) {
        console.error("Error converting image to data URL:", error);
        reject(error);
      }
    };

    img.onerror = (error) => {
      console.error("Error loading image from URL:", error);
      reject(error);
    };

    img.src = url;
  });
};

/**
 * Applies URL parameters to the state
 */
export const applyURLParamsToState = async (state) => {
  const params = getURLParams();

  try {
    // Apply color if provided
    if (params.color) {
      const color = params.color.startsWith("#")
        ? params.color
        : `#${params.color}`;
      state.color = color;
    }

    // Load and apply full design texture from URL
    if (params.designUrl) {
      const designDataURL = await loadImageFromURL(params.designUrl);
      if (designDataURL) {
        state.fullDecal = designDataURL;
        // If fullTexture is explicitly set in URL, use that value, otherwise default to true
        state.isFullTexture =
          params.isFullTexture !== null ? params.isFullTexture : true;
      }
    }

    // Load and apply logo texture from URL
    if (params.logoUrl) {
      const logoDataURL = await loadImageFromURL(params.logoUrl);
      if (logoDataURL) {
        state.logoDecal = logoDataURL;
        // If logoTexture is explicitly set in URL, use that value, otherwise default to true
        state.isLogoTexture =
          params.isLogoTexture !== null ? params.isLogoTexture : true;
      }
    }

    // Apply texture flags only if explicitly set in URL
    if (params.isFullTexture !== null && !params.designUrl) {
      state.isFullTexture = params.isFullTexture;
    }

    if (params.isLogoTexture !== null && !params.logoUrl) {
      state.isLogoTexture = params.isLogoTexture;
    }

    return true;
  } catch (error) {
    console.error("Error applying URL parameters:", error);
    return false;
  }
};

/**
 * Generates a shareable URL with current design state
 */
export const generateShareableURL = (state) => {
  const baseURL = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();

  // Add color if it's not the default
  if (state.color && state.color !== "#353934") {
    params.set("color", state.color.replace("#", ""));
  }

  // Add design URL if full texture is enabled and not default
  if (
    state.isFullTexture &&
    state.fullDecal &&
    !state.fullDecal.includes("circuit.png")
  ) {
    params.set("design", state.fullDecal);
    params.set("fullTexture", "true");
  }

  // Add logo URL if logo texture is enabled and not default
  if (
    state.isLogoTexture &&
    state.logoDecal &&
    !state.logoDecal.includes("superman_logo1.png")
  ) {
    params.set("logo", state.logoDecal);
    params.set("logoTexture", "true");
  }

  const queryString = params.toString();
  return queryString ? `${baseURL}?${queryString}` : baseURL;
};

/**
 * Copies the shareable URL to clipboard
 */
export const copyShareableURL = async (state) => {
  const shareableURL = generateShareableURL(state);

  try {
    await navigator.clipboard.writeText(shareableURL);
    return { success: true, url: shareableURL };
  } catch (error) {
    console.error("Failed to copy URL to clipboard:", error);
    return { success: false, error };
  }
};
