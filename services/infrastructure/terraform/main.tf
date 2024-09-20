module "azure-infrastructure" {
  source = "./azure-infrastructure"
}

module "portafolio-application-k8s" {
  source                 = "./kubernetes-portafolio-app"
  host                   = module.azure-infrastructure.host
  client_certificate     = module.azure-infrastructure.client_certificate
  client_key             = module.azure-infrastructure.client_key
  cluster_ca_certificate = module.azure-infrastructure.cluster_ca_certificate
}
