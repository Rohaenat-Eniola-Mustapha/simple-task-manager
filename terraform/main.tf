resource "random_string" "suffix" {
  length  = 8
  special = false
  upper   = false
  numeric = true
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_container_registry" "acr" {
  name                = "${var.acr_name_prefix}${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = false
}

resource "azurerm_cosmosdb_account" "cosmosdb" {
  name                = "${var.cosmosdb_account_name_prefix}${random_string.suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  offer_type          = "Standard"
  kind                = "MongoDB"
  free_tier_enabled   = true

  capabilities {
    name = "EnableMongo"
  }

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = azurerm_resource_group.rg.location
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_mongo_database" "mongo_db" {
  name                = var.cosmosdb_database_name
  resource_group_name = azurerm_resource_group.rg.name
  account_name        = azurerm_cosmosdb_account.cosmosdb.name
  throughput          = 400
}

resource "azurerm_container_app_environment" "aca_env" {
  name                = var.container_app_environment_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_container_app" "backend_app" {
  name                         = "stm-backend-${random_string.suffix.result}"
  resource_group_name          = azurerm_resource_group.rg.name
  container_app_environment_id = azurerm_container_app_environment.aca_env.id
  revision_mode                = "Single"

  identity {
    type = "SystemAssigned"
  }

  template {
    container {
      name   = "backend"
      image  = "nginx"
      cpu    = 0.5
      memory = "1.0Gi"

      env {
        name        = "MONGO_URI"
        secret_name = "cosmosdb-connection-string"
      }
    }
  }

  ingress {
    target_port      = 5000
    external_enabled = true
    transport        = "http"

    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  secret {
    name  = "cosmosdb-connection-string"
    value = var.cosmosdb_connection_string
  }

  lifecycle {
    ignore_changes = [
      template[0].container[0].image,
    ]
  }
}

resource "azurerm_role_assignment" "backend_acr_pull_permission" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_container_app.backend_app.identity[0].principal_id
}

resource "azurerm_container_app" "frontend_app" {
  name                         = "stm-frontend-${random_string.suffix.result}"
  resource_group_name          = azurerm_resource_group.rg.name
  container_app_environment_id = azurerm_container_app_environment.aca_env.id
  revision_mode                = "Single"

  identity {
    type = "SystemAssigned"
  }

  template {
    container {
      name   = "frontend"
      image  = "nginx"
      cpu    = 0.5
      memory = "1.0Gi"

      env {
        name  = "REACT_BASE_BACKEND_URL"
        value = "https://${azurerm_container_app.backend_app.ingress[0].fqdn}"
      }
    }
  }

  ingress {
    target_port      = 80
    external_enabled = true
    transport        = "http"

    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  lifecycle {
    ignore_changes = [
      template[0].container[0].image,
    ]
  }
}

resource "azurerm_role_assignment" "frontend_acr_pull_permission" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_container_app.frontend_app.identity[0].principal_id
}

output "resource_group_name" {
  description = "The name of the Azure Resource Group"
  value       = azurerm_resource_group.rg.name
}

output "frontend_app_url" {
  description = "The URL of the deployed frontend Container App"
  value       = "https://${azurerm_container_app.frontend_app.ingress[0].fqdn}"
}

output "backend_app_url" {
  description = "The URL of the deployed backend Container App"
  value       = "https://${azurerm_container_app.backend_app.ingress[0].fqdn}"
}