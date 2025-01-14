#  Copyright (c) Meta Platforms, Inc. and affiliates.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#
from io import BytesIO

import requests
import torch
from aitemplate.testing.benchmark_pt import benchmark_torch_function
from PIL import Image

from ..src.ait_img2img import StableDiffusionImg2ImgAITPipeline


def run(
    local_dir: str,
    prompt: str,
    width: int = 512,
    height: int = 512,
    benchmark: bool = False,
):
    # load the pipeline
    device = "cuda"
    pipe = StableDiffusionImg2ImgAITPipeline.from_pretrained(
        local_dir,
        revision="fp16",
        torch_dtype=torch.float16,
        safety_checker=None,
        feature_extractor=None,
    )
    assert isinstance(pipe, StableDiffusionImg2ImgAITPipeline)
    pipe = pipe.to(device)
    # let's download an initial image
    url = "https://raw.githubusercontent.com/CompVis/stable-diffusion/main/assets/stable-samples/img2img/sketch-mountains-input.jpg"

    response = requests.get(url)
    init_image = Image.open(BytesIO(response.content)).convert("RGB")
    init_image = init_image.resize((height, width))

    with torch.autocast("cuda"):  # type: ignore
        images = pipe(
            prompt=prompt, init_image=init_image, strength=0.75, guidance_scale=7.5
        ).images  # type: ignore
        if benchmark:
            args = (prompt, init_image)
            t = benchmark_torch_function(10, pipe, *args)
            print(f"sd e2e: {t} ms")

    images[0].save("fantasy_landscape_ait.png")
