import{_ as e,c as a,o as n,a as s}from"./app.0c235ae2.js";const b=JSON.parse('{"title":"PyTorch","description":"","frontmatter":{},"headers":[{"level":2,"title":"Requirements","slug":"requirements","link":"#requirements","children":[]},{"level":2,"title":"Running locally","slug":"running-locally","link":"#running-locally","children":[{"level":3,"title":"1. Clone the repository","slug":"_1-clone-the-repository","link":"#_1-clone-the-repository","children":[]},{"level":3,"title":"2. Move into the project directory","slug":"_2-move-into-the-project-directory","link":"#_2-move-into-the-project-directory","children":[]},{"level":3,"title":"3. Set up environmental variables","slug":"_3-set-up-environmental-variables","link":"#_3-set-up-environmental-variables","children":[]},{"level":3,"title":"4. Create virtual environment to keep dependencies isolated","slug":"_4-create-virtual-environment-to-keep-dependencies-isolated","link":"#_4-create-virtual-environment-to-keep-dependencies-isolated","children":[]},{"level":3,"title":"5. Activate Virtual environment","slug":"_5-activate-virtual-environment","link":"#_5-activate-virtual-environment","children":[]},{"level":3,"title":"6. Run the main.py file (it will install dependencies automatically)","slug":"_6-run-the-main-py-file-it-will-install-dependencies-automatically","link":"#_6-run-the-main-py-file-it-will-install-dependencies-automatically","children":[]},{"level":3,"title":"7. Access the API documentation to see if everything is working","slug":"_7-access-the-api-documentation-to-see-if-everything-is-working","link":"#_7-access-the-api-documentation-to-see-if-everything-is-working","children":[]}]}],"relativePath":"developers/pytorch.md","lastUpdated":1679226173000}'),i={name:"developers/pytorch.md"},t=s(`<h1 id="pytorch" tabindex="-1">PyTorch <a class="header-anchor" href="#pytorch" aria-hidden="true">#</a></h1><p>This is a guide to running this project with PyTorch only configuration.</p><h2 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-hidden="true">#</a></h2><ul><li><strong>Operating system:</strong> Windows or Linux</li><li><strong>Graphics card:</strong> NVIDIA GPU with CUDA support</li><li><strong>Driver version:</strong> 515+</li></ul><p>If you are running on Linux, you will need to install CUDA by following the instructions <a href="https://developer.nvidia.com/cuda-11-8-0-download-archive" target="_blank" rel="noreferrer">here</a> or if you are on Ubuntu, in the <code>Software &amp; Updates</code> manager.</p><h2 id="running-locally" tabindex="-1">Running locally <a class="header-anchor" href="#running-locally" aria-hidden="true">#</a></h2><h3 id="_1-clone-the-repository" tabindex="-1">1. Clone the repository <a class="header-anchor" href="#_1-clone-the-repository" aria-hidden="true">#</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro has-diff"><code><span class="line"><span style="color:#ABB2BF;">git </span><span style="color:#98C379;">clone</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">https://github.com/VoltaML/voltaML-fast-stable-diffusion.git</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">--branch</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">experimental</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-move-into-the-project-directory" tabindex="-1">2. Move into the project directory <a class="header-anchor" href="#_2-move-into-the-project-directory" aria-hidden="true">#</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro has-diff"><code><span class="line"><span style="color:#56B6C2;">cd</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">voltaML-fast-stable-diffusion</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_3-set-up-environmental-variables" tabindex="-1">3. Set up environmental variables <a class="header-anchor" href="#_3-set-up-environmental-variables" aria-hidden="true">#</a></h3><p>Required variables:</p><ul><li><code>HUGGINGFACE_TOKEN</code></li></ul><p>Optional variables:</p><ul><li><code>DISCORD_BOT_TOKEN</code></li><li><code>FASTAPI_ANALYTICS_KEY</code></li><li><code>LOG_LEVEL</code></li></ul><p>Refer to the <a href="https://github.com/VoltaML/voltaML-fast-stable-diffusion/blob/experimental/.env" target="_blank" rel="noreferrer">.env</a> file to see supported values with links and guides on how to obtain them.</p><hr><h4 id="windows" tabindex="-1">Windows <a class="header-anchor" href="#windows" aria-hidden="true">#</a></h4><p>Please read <a href="https://www.architectryan.com/2018/08/31/how-to-change-environment-variables-on-windows-10/" target="_blank" rel="noreferrer">this guide</a> to learn how to set up environmental variables on Windows.</p><p>Variables that are stored there are persistent and will be available after restarting your computer.</p><hr><h4 id="linux" tabindex="-1">Linux <a class="header-anchor" href="#linux" aria-hidden="true">#</a></h4><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">VARIABLE_NAME</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">VARIABLE_VALUE</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">PERSISTANCE</p><p>You can also add the following line to your <code>~/.bashrc</code> file to make the variable persistent (or <code>~/.zshrc</code> if you are using ZSH).</p></div><h3 id="_4-create-virtual-environment-to-keep-dependencies-isolated" tabindex="-1">4. Create virtual environment to keep dependencies isolated <a class="header-anchor" href="#_4-create-virtual-environment-to-keep-dependencies-isolated" aria-hidden="true">#</a></h3><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you are using Linux, you might need to install <code>python3-virtualenv</code> package. <br><br><code>sudo apt install python3-virtualenv</code><br><br></p><p>For Windows users, run this command: <br><br><code>pip install virtualenv</code></p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you are running Linux, you might need to use <code>python3</code> instead of <code>python</code>.</p></div><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#ABB2BF;">python </span><span style="color:#D19A66;">-m</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">virtualenv</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">venv</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_5-activate-virtual-environment" tabindex="-1">5. Activate Virtual environment <a class="header-anchor" href="#_5-activate-virtual-environment" aria-hidden="true">#</a></h3><br><h4 id="windows-1" tabindex="-1">Windows <a class="header-anchor" href="#windows-1" aria-hidden="true">#</a></h4><div class="language-powershell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">powershell</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#ABB2BF;">.\\venv\\Scripts\\activate.ps1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">or</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">.\\venv\\Scripts\\</span><span style="color:#56B6C2;">activate.bat</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="linux-1" tabindex="-1">Linux <a class="header-anchor" href="#linux-1" aria-hidden="true">#</a></h4><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#56B6C2;">source</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">venv/bin/activate</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_6-run-the-main-py-file-it-will-install-dependencies-automatically" tabindex="-1">6. Run the <code>main.py</code> file (it will install dependencies automatically) <a class="header-anchor" href="#_6-run-the-main-py-file-it-will-install-dependencies-automatically" aria-hidden="true">#</a></h3><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you are running Linux, you might need to use <code>python3</code> instead of <code>python</code>.</p></div><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#ABB2BF;">python </span><span style="color:#98C379;">main.py</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_7-access-the-api-documentation-to-see-if-everything-is-working" tabindex="-1">7. Access the API documentation to see if everything is working <a class="header-anchor" href="#_7-access-the-api-documentation-to-see-if-everything-is-working" aria-hidden="true">#</a></h3><p>You should now see that the WebUI is running on <code>http://localhost:5003/</code>.</p><hr><p>There is also an interactive documentation for the API available at <code>http://localhost:5003/api/docs</code>.</p>`,41),l=[t];function o(r,c,p,d,h,u){return n(),a("div",null,l)}const m=e(i,[["render",o]]);export{b as __pageData,m as default};
