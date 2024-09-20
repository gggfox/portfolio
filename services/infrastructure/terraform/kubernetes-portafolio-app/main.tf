provider "kubernetes" {
  host                   = var.host
  client_certificate     = base64decode(var.client_certificate)
  client_key             = base64decode(var.client_key)
  cluster_ca_certificate = base64decode(var.cluster_ca_certificate)
}

resource "kubernetes_namespace" "example" {
  metadata {
    name = "example-namespace"
  }
}

resource "kubernetes_deployment" "example" {
  metadata {
    name      = "example-deployment"
    namespace = kubernetes_namespace.example.metadata[0].name
  }
  spec {
    replicas = 2
    selector {
      match_labels = {
        app = "example"
      }
    }
    template {
      metadata {
        labels = {
          app = "example"
        }
      }
      spec {
        container {
          image = "nginx:1.14.2"
          name  = "example"
          port {
            container_port = 80
          }
        }
      }
    }
  }
}
