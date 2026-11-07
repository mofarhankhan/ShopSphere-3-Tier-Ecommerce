variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Deployment environment"
  type        = string
}

variable "vpc_id" {
  description = "Existing VPC ID"
  type        = string
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets"
  type        = list(string)
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
}

variable "ami_id" {
  description = "Ubuntu AMI ID"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
}

variable "instance_profile_name" {
  description = "IAM instance profile for SSM"
  type        = string
}

variable "jenkins_subnet_id" {
  description = "Public subnet for Jenkins"
  type        = string
}

variable "k3s_subnet_id" {
  description = "Public subnet for K3s"
  type        = string
}

variable "master_security_group_id" {
  description = "Security group ID of the Ansible control node"
  type        = string
}
