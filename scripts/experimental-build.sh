docker build -t voltaml_experimental -f ./dockerfiles/experimental . && docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
docker tag voltaml_experimental:latest voltaml/volta_diffusion_webui:experimental