import{_ as e,c as t,o as a,a as o}from"./app.86275763.js";const u=JSON.parse('{"title":"Image to Image","description":"","frontmatter":{},"headers":[{"level":2,"title":"Image to Image","slug":"image-to-image-1","link":"#image-to-image-1","children":[]},{"level":2,"title":"ControlNet","slug":"controlnet","link":"#controlnet","children":[{"level":3,"title":"Canny","slug":"canny","link":"#canny","children":[]},{"level":3,"title":"HED","slug":"hed","link":"#hed","children":[]},{"level":3,"title":"MLSD","slug":"mlsd","link":"#mlsd","children":[]},{"level":3,"title":"OpenPose","slug":"openpose","link":"#openpose","children":[]}]}],"relativePath":"webui/img2img.md","lastUpdated":1678814020000}'),i={name:"webui/img2img.md"},n=o('<h1 id="image-to-image" tabindex="-1">Image to Image <a class="header-anchor" href="#image-to-image" aria-hidden="true">#</a></h1><p>This page is focused on transforming input image with the power of Stable Diffusion Models. There are multiple ways to do this and we will cover all of the available options here.</p><p>If the parameter is not explained here, it is explained in the <a href="/voltaML-fast-stable-diffusion/webui/txt2img">Text to Image</a> page.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>All of these models require extra model to be loaded and sometimes even one more for the detection algorithm. TLDR: It sucks a lot of VRAM.</p></div><h2 id="image-to-image-1" tabindex="-1">Image to Image <a class="header-anchor" href="#image-to-image-1" aria-hidden="true">#</a></h2><p>This is the simplest way to transform an image. Stable Diffusion will take this image as an initial guide.</p><h4 id="denoising-strength" tabindex="-1">Denoising strength <a class="header-anchor" href="#denoising-strength" aria-hidden="true">#</a></h4><p>The higher the value, the more of the image will be forgotten and transformed by the model.</p><div class="info custom-block"><p class="custom-block-title">TODO</p><p>Plot of images showing the effect of this parameter</p></div><h2 id="controlnet" tabindex="-1">ControlNet <a class="header-anchor" href="#controlnet" aria-hidden="true">#</a></h2><p>ControlNet is a neural network structure to control diffusion models by adding extra conditions. More information can be found in the <a href="https://arxiv.org/abs/2302.05543" target="_blank" rel="noreferrer">paper</a> or on <a href="https://github.com/lllyasviel/ControlNet" target="_blank" rel="noreferrer">GitHub</a>.</p><p>For now, we only support 4 modes:</p><h3 id="canny" tabindex="-1">Canny <a class="header-anchor" href="#canny" aria-hidden="true">#</a></h3><div class="info custom-block"><p class="custom-block-title">TODO</p><p>Show an example of the Canny mode (input, output, and the Canny edges)</p></div><p>Canny is just an edge detection algorithm. It will detect edges in the image and use them as a guide for the model. This approach doesnt require any additional models like OpenPose or MLSD, so it can be considered lightweight.</p><h4 id="low-threshold-and-high-threshold" tabindex="-1">Low threshold and High threshold <a class="header-anchor" href="#low-threshold-and-high-threshold" aria-hidden="true">#</a></h4><p>These parameters are used by the Canny algorithm to detect edges. More broader values will detect more edges, but also more noise.</p><h3 id="hed" tabindex="-1">HED <a class="header-anchor" href="#hed" aria-hidden="true">#</a></h3><div class="info custom-block"><p class="custom-block-title">TODO</p><p>Show an example of the HED mode (input, output, and the HED edges)</p></div><p>More fancier edge detection algorithm. It requires extra model to be loaded, but is relatively lightweight.</p><h3 id="mlsd" tabindex="-1">MLSD <a class="header-anchor" href="#mlsd" aria-hidden="true">#</a></h3><div class="info custom-block"><p class="custom-block-title">TODO</p><p>Show an example of the MLSD mode (input, output, and the MLSD edges)</p></div><h3 id="openpose" tabindex="-1">OpenPose <a class="header-anchor" href="#openpose" aria-hidden="true">#</a></h3><div class="info custom-block"><p class="custom-block-title">TODO</p><p>Show an example of the OpenPose mode (input, output, and the OpenPose edges)</p></div><p>OpenPose is a pose estimation algorithm. It will detect human poses in the image and use them as a guide for the model. It is heavier than the previous modes.</p>',25),s=[n];function l(r,d,h,c,p,m){return a(),t("div",null,s)}const f=e(i,[["render",l]]);export{u as __pageData,f as default};
