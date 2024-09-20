# Create a resource group
resource "azurerm_resource_group" "portfolio" {
  name     = "portfolio"
  location = var.location
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "PortfolioK8sCluster"
  location            = azurerm_resource_group.portfolio.location
  resource_group_name = azurerm_resource_group.portfolio.name

  dns_prefix = "portfoliok8scluster"

  default_node_pool {
    name       = "default"
    node_count = 2
    vm_size    = "standard_DS2_v2"
  }

  identity {
    type = "SystemAssigned"
  }
}
