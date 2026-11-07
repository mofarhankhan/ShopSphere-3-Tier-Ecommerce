output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = module.networking.private_subnet_ids
}

output "private_route_table_id" {
  description = "Private route table ID"
  value       = module.networking.private_route_table_id
}

output "private_subnet_cidrs" {
  description = "Private subnet CIDRs"
  value       = module.networking.private_subnet_cidrs
}

output "app_security_group_id" {
  value = module.security_groups.app_security_group_id
}

output "jenkins_security_group_id" {
  value = module.security_groups.jenkins_security_group_id
}

output "k3s_security_group_id" {
  value = module.security_groups.k3s_security_group_id
}

output "jenkins_instance_id" {
  value = module.compute.jenkins_instance_id
}

output "jenkins_public_ip" {
  value = module.compute.jenkins_public_ip
}

output "k3s_instance_id" {
  value = module.compute.k3s_instance_id
}

output "k3s_public_ip" {
  value = module.compute.k3s_public_ip
}
