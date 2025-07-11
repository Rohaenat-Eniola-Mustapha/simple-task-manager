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
  admin_enabled       = true
}

resource "azurerm_cosmosdb_account" "cosmosdb" {
  name                = "${var.cosmosdb_account_name_prefix}${random_string.suffix.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  offer_type          = "Standard"
  kind                = "MongoDB"
  enable_free_tier    = true

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