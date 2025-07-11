variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "simple-task-manager-rg"
}

variable "location" {
  description = "Azure region where resources will be deployed"
  type        = string
  default     = "West US"
}

variable "acr_name_prefix" {
  description = "Prefix for the Azure Container Registry name (must be globally unique)"
  type        = string
  default     = "rm06stm"
}

variable "cosmosdb_account_name_prefix" {
  description = "Prefix for the Azure Cosmos DB account name (must be globally unique)"
  type        = string
  default     = "rm06stm"
}

variable "cosmosdb_database_name" {
  description = "Name for the MongoDB database inside Cosmos DB"
  type        = string
  default     = "simpletaskdb"
}

variable "container_app_environment_name" {
  description = "Name for the Azure Container Apps Environment"
  type        = string
  default     = "simple-task-manager-env"
}

variable "backend_container_app_name" {
  description = "Name for the backend Azure Container App"
  type        = string
  default     = "simple-task-manager-backend"
}

variable "frontend_container_app_name" {
  description = "Name for the frontend Azure Container App"
  type        = string
  default     = "simple-task-manager-frontend"
}