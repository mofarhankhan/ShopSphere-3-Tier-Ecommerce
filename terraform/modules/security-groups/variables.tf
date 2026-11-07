variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "master_security_group_id" {
  description = "Security group ID of the Ansible control node"
  type        = string
}
