variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}

variable "ami_id" {
  type = string
}

variable "instance_type" {
  type = string
}

variable "instance_profile_name" {
  type = string
}

variable "jenkins_subnet_id" {
  type = string
}

variable "k3s_subnet_id" {
  type = string
}

variable "jenkins_security_group_id" {
  type = string
}

variable "k3s_security_group_id" {
  type = string
}
